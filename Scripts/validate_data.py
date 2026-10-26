"""Validate provenance, mirrors and labelled arithmetic without running Packet Tracer."""
from pathlib import Path
import csv,json,hashlib,re,sys
ROOT=Path(__file__).resolve().parents[1]
(ROOT/'Testing').mkdir(exist_ok=True)
errors=[];checks=[];skips=[]
def check(condition,message):
    (checks if condition else errors).append(message)
def csvrows(name):
    with (ROOT/'Data'/name).open(encoding='utf-8-sig',newline='') as f:return list(csv.DictReader(f))
rows=csvrows('results.csv');ev=csvrows('evidence_manifest.csv');summary=csvrows('summary_statistics.csv')
check(len(rows)==12,'12 supplied experiment/protocol rows')
check(len(ev)==37,'37 original screenshot records')
byid={r['id']:r for r in ev}
for e in ev:
    path=ROOT/e['filename'];check(path.is_file(),'Evidence file exists: '+e['id'])
    if path.is_file():check(hashlib.sha256(path.read_bytes()).hexdigest()==e['sha256'],'Lossless image hash: '+e['id'])
for r in rows:
    ids=[x for x in r['evidence_ids'].split(';') if x]
    check(all(x in byid for x in ids),'Valid evidence references: '+r['experiment_id']+' '+r['protocol'])
    check('E22' not in ids,'Unconfirmed E22 excluded from measurement proof')
    if r['data_status']=='ASSUMED':
        check(not ids and r['run_count']=='0' and r['ocrt_status']=='assumed_not_measured','Assumed row has no evidence or timed run')
        check('Assumed' in r['run_note'],'Assumed row explicitly labelled')
    elif r['ocrt_status']=='measured':check(r['run_count']=='1' and bool(ids),'Measured row is single run with behavioural evidence')
    if r['ocrt_status'] in ['not_measurable_no_loss','not_reliably_measured']:check(r['ocrt_seconds']=='','Missing numeric timing is blank, not zero')
    check(not any(k.lower() in ['sd','std','stderr','confidence_interval'] for k in r),'No inferential aggregate fields')
expected={'R1–R2':(26,7),'R2–R3':(24,6),'R3–R4':(28,8),'R4–R1':(25,7)}
for link,pair in expected.items():
    for p,value in zip(['RIP','OSPF'],pair):
        match=[r for r in rows if r['failed_element']==link and r['failure_type']=='link_failure' and r['protocol']==p]
        check(len(match)==1 and float(match[0]['ocrt_seconds'])==value,'Supplied timing preserved: '+link+' '+p)
jsonrows=json.loads((ROOT/'Data/results.json').read_text(encoding='utf-8'))
normalize=lambda row:{k:str(v) for k,v in row.items()}
check([normalize(r) for r in jsonrows]==rows,'CSV and JSON mirrors agree exactly')
js=(ROOT/'Dashboard/js/data.js').read_text(encoding='utf-8');data=json.loads(js.split('const DATA = ',1)[1].rsplit(';',1)[0])
check(data['results']==jsonrows,'Dashboard canonical experimental values equal results.json')
for item in summary:
    r=float(item['rip_seconds']);o=float(item['ospf_seconds'])
    check(abs(float(item['reduction_percent'])-(r-o)/r*100)<.0001,'Derived reduction arithmetic: '+item['scope'])
    if item['data_status']!='MEASURED_SINGLE_RUN':check('Assumed' in item['label'],'Assumed/mixed arithmetic explicitly labelled')
mixed=summary[-1];check(float(mixed['rip_seconds'])==25.75 and float(mixed['ospf_seconds'])==7,'Four-case descriptive means use every supplied value')
check(data['summary']==[{k:(float(v) if k in ['rip_seconds','ospf_seconds','difference_seconds','reduction_percent','ratio'] else v) for k,v in s.items()} for s in summary],'Dashboard derived statistics match summary CSV')
check(byid['E22']['confidence']=='needs-confirmation','E22 remains flagged')
for path in [ROOT/'Dashboard/index.html',ROOT/'Dashboard/css/style.css',ROOT/'Dashboard/js/app.js']:
    if path.exists():
        text=path.read_text(encoding='utf-8')
        check(not re.search(r'(?:src|href)\s*=\s*[\"\']https?://|@import|url\([\"\']?https?://|\bfetch\s*\(',text),'No remote runtime resource/fetch in '+path.name)
hashes=json.loads((ROOT/'Data/original_hashes.json').read_text())
pkt_records=[item for item in hashes['tracked'] if item['name'].endswith('.pkt')]
source_only=not (ROOT/'.git').exists() and not any((ROOT/item['name']).exists() for item in pkt_records)
for item in hashes['tracked']:
    if item['name'].endswith('.pkt'):
        original=ROOT/item['name']
        if original.exists():check(hashlib.sha256(original.read_bytes()).hexdigest()==item['sha256'],'Original PKT unchanged: '+item['name'])
        elif source_only:skips.append('Original PKT absent from source-only package: '+item['name']+'; verify preservation in the full repository')
        else:check(False,'Original PKT missing from full repository: '+item['name'])
for key in ['guide','template','evidence']:
    item=hashes[key];path=Path(item['path'])
    if path.exists():check(hashlib.sha256(path.read_bytes()).hexdigest()==item['sha256'],'Original DOCX unchanged: '+key)
for p in ['RIP','OSPF']:
    for n in range(1,5):
        cfg=(ROOT/f'Configs/R{n}_{p}_pkt_running-config.txt').read_text()
        check(('router rip' in cfg and 'version 2' in cfg and 'no auto-summary' in cfg and 'router ospf' not in cfg) if p=='RIP' else ('router ospf 1' in cfg and 'area 0' in cfg and 'router rip' not in cfg),'Saved protocol configuration verified: R'+str(n)+' '+p)
report='\n'.join('PASS '+x for x in checks)+'\n'+''.join('FAIL '+x+'\n' for x in errors)+''.join('SKIP '+x+'\n' for x in skips)+f'\n{len(checks)} passed; {len(errors)} failed.\n'
(ROOT/'Testing/data_validation.txt').write_text(report,encoding='utf-8');print(report)
sys.exit(1 if errors else 0)
