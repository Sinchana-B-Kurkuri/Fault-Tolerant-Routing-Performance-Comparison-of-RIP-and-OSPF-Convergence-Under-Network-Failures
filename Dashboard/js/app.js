/* Evidence replay only. State changes select recorded observations or explicitly
   illustrative ring paths. No network traffic or protocol simulation runs here. */
'use strict';
const $ = id => document.getElementById(id);
const state = {protocol:'RIP',scenario:'link',link:'R1–R2',step:0};
const chartObjects = {};
const edges = [['R1','R2'],['R2','R3'],['R3','R4'],['R4','R1']];
const positions = {R1:[260,105],R2:[640,105],R3:[640,380],R4:[260,380]};
const ips = {
  R1:['G0/0 · 10.0.12.1/30','G0/1 · 10.0.41.2/30','G0/2 · 192.168.1.1/24'],
  R2:['G0/0 · 10.0.12.2/30','G0/1 · 10.0.23.1/30','G0/2 · 192.168.2.1/24'],
  R3:['G0/0 · 10.0.23.2/30','G0/1 · 10.0.34.1/30','G0/2 · 192.168.3.1/24'],
  R4:['G0/0 · 10.0.34.2/30','G0/1 · 10.0.41.1/30','G0/2 · 192.168.4.1/24']
};
const colors={RIP:'#176a9b',OSPF:'#cc602c'};
const escapeHTML = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isAssumed=()=>state.scenario==='link'&&state.link!=='R1–R2';
const rowFor=()=>DATA.results.find(r=>r.protocol===state.protocol&&(state.scenario==='link'?r.failure_type==='link_failure'&&r.failed_element===state.link:r.experiment_id===(state.scenario==='router'?'B':'C')));
const edgeKey=(a,b)=>[a,b].sort().join('-');
function pathEdges(path){return path.slice(1).map((r,i)=>edgeKey(path[i],r));}
function alternatePath(link){
  const [start,end]=link.split('–');const queue=[[start]];const blocked=edgeKey(start,end);
  while(queue.length){const path=queue.shift(),last=path.at(-1);if(last===end)return path;
    for(const [a,b] of edges){const next=a===last?b:b===last?a:null;if(next&&!path.includes(next)&&edgeKey(a,b)!==blocked)queue.push([...path,next]);}}
  return [];
}
function ringSVG({path=[],failedLink='',failedRouter='',both=false,mini=false,interactive=false}={}){
  const active=pathEdges(path),alt=both?[...pathEdges(['R1','R2','R3']),...pathEdges(['R1','R4','R3'])]:[];
  let svg=`<svg viewBox="0 0 ${mini?'900 490':'900 500'}" role="img" aria-label="Illustrative four-router ring. ${failedLink?'Failed link '+failedLink:failedRouter?'Router '+failedRouter+' unavailable':'Ring topology'}. ${both?'Equal-cost alternatives, active per-packet path unverified.':path.length?'Selected path '+path.join(' to '):''}">`;
  edges.forEach(([a,b],i)=>{const [x1,y1]=positions[a],[x2,y2]=positions[b];let cls='ring-edge';if(active.includes(edgeKey(a,b)))cls+=' edge-active';if(alt.includes(edgeKey(a,b)))cls+=' edge-alternate';if(edgeKey(a,b)===failedLink.replace('–','-')||[a,b].includes(failedRouter))cls+=' edge-failed';
    if(failedLink&&edgeKey(a,b)===edgeKey(...failedLink.split('–'))&&!cls.includes('edge-failed'))cls+=' edge-failed';
    svg+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
    if(!mini){const labels=[['10.0.12.0/30','R1 G0/0 ↔ R2 G0/0',450,58],['10.0.23.0/30','R2 G0/1 ↔ R3 G0/0',720,235],['10.0.34.0/30','R3 G0/1 ↔ R4 G0/0',450,431],['10.0.41.0/30','R4 G0/1 ↔ R1 G0/1',174,235]][i];svg+=`<text x="${labels[2]}" y="${labels[3]}" text-anchor="middle">${labels[0]}</text><text x="${labels[2]}" y="${labels[3]+17}" text-anchor="middle" class="muted-svg">${labels[1]}</text>`;}
  });
  for(const [name,[x,y]] of Object.entries(positions)){
    const n=Number(name[1]),left=n===1||n===4,top=n<=2,swx=left?105:795,swy=top?165:325,pcx=left?45:855,pcy=top?215:370;
    if(!mini){svg+=`<line x1="${x}" y1="${y}" x2="${swx}" y2="${swy}" class="lan-edge"/><line x1="${swx}" y1="${swy}" x2="${pcx}" y2="${pcy}" class="lan-edge"/>`;svg+=device(`SW${n}`,swx,swy,'switch',interactive)+device(`PC${n}`,pcx,pcy,'pc',interactive);svg+=`<text x="${left?100:800}" y="${top?267:445}" text-anchor="middle" class="muted-svg">LAN ${n} · 192.168.${n}.0/24</text>`;}
    svg+=`<g ${interactive?`data-device="${name}" tabindex="0" role="button" aria-label="Inspect ${name}" class="device-click"`:''}><rect x="${x-29}" y="${y-21}" width="58" height="42" rx="12" class="device-shape router-shape ${name===failedRouter?'failed-device':''}"/><text x="${x}" y="${y+5}" text-anchor="middle" class="router-text">${name}</text></g>`;
  }
  if(!mini&&path.length>1&&!both){const [x,y]=positions[path[0]],[nx,ny]=positions[path[1]];svg+=`<circle cx="${x+(nx-x)*.2}" cy="${y+(ny-y)*.2}" r="5" class="packet-dot"/>`;}
  return svg+'</svg>';
}
function device(name,x,y,type,interactive){return `<g ${interactive?`data-device="${name}" tabindex="0" role="button" aria-label="Inspect ${name}" class="device-click"`:''}><rect x="${x-24}" y="${y-13}" width="48" height="27" rx="${type==='pc'?3:0}" class="device-shape"/><text x="${x}" y="${y+34}" text-anchor="middle">${name}</text></g>`;}
function showDevice(name){
  const n=name.match(/\d/)[0];let body='';
  if(name.startsWith('R'))body=`<dl><dt>Model</dt><dd>Cisco 2911</dd>${ips[name].map(x=>`<dt>${x.split(' · ')[0]}</dt><dd>${x.split(' · ')[1]}</dd>`).join('')}<dt>Saved protocols</dt><dd>v2_rip: RIPv2 only<br>v3_ospf: OSPF process 1, area 0 only</dd></dl>`;
  else if(name.startsWith('PC'))body=`<dl><dt>Model</dt><dd>PC-PT</dd><dt>IP / mask</dt><dd>192.168.${n}.10 /24</dd><dt>Default gateway</dt><dd>192.168.${n}.1</dd><dt>Connected LAN</dt><dd>SW${n} / R${n} G0/2</dd></dl>`;
  else body=`<dl><dt>Model</dt><dd>Cisco 2960-24TT</dd><dt>Connections</dt><dd>R${n} G0/2 and PC${n}</dd><dt>LAN</dt><dd>192.168.${n}.0/24</dd><dt>Management IP</dt><dd>Not assigned in the project IP plan</dd></dl>`;
  $('device-panel').innerHTML=`<span class="eyebrow">DEVICE INSPECTOR</span><h3>${name}</h3>${body}<p class="small-note">Addressing checked against saved .pkt files. Diagram is illustrative.</p>`;
}
function statusBadge(row){
  if(row.data_status==='ASSUMED')return `<span class="badge assumed">${DATA.assumedLabel}</span>`;
  return `<span class="badge measured">Recorded evidence (Packet Tracer)${row.ocrt_status==='measured'?' · single run':''}</span>`;
}
function evidenceForStep(){
  const p=state.protocol,s=state.scenario,k=state.step;
  if(isAssumed())return [];
  if(s==='normal')return p==='RIP'?['E07','E08','E09','E10']:['E23','E24','E25','E26','E27'];
  const sets={RIP:{link:[['E11'],['E12','E13','E15'],['E14','E13']],router:[['E07'],['E18','E19','E21'],['E20','E18']],restore:[['E14'],['E16'],['E17']]},OSPF:{link:[['E28'],['E29','E30','E32'],['E31','E30']],router:[['E23'],['E34','E35','E36'],['E37','E34']],restore:[['E03'],['E33'],['E04','E05']]}};
  return sets[p][s][k];
}
function paths(){
  if(state.scenario==='normal')return {before:['R1','R2'],after:['R1','R2']};
  if(state.scenario==='router')return {before:[],after:['R1','R2','R3'],both:true};
  if(state.scenario==='restore')return {before:['R1','R4','R3','R2'],after:['R1','R2']};
  return {before:state.link.split('–'),after:alternatePath(state.link)};
}
function renderPlayer(){
  const labels=state.scenario==='normal'?['Baseline']:state.scenario==='restore'?['Before','Restoration','Restored route']:['Before','Failure','Recovered path'];
  state.step=Math.min(state.step,labels.length-1);
  $('link-control').hidden=state.scenario!=='link';
  $('stepper').innerHTML=labels.map((label,i)=>`<button data-step="${i}" ${i===state.step?'aria-current="step"':''}><span>0${i+1}</span>${label}</button>`).join('');
  document.querySelectorAll('[data-protocol]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.protocol===state.protocol));
  const row=rowFor(),ps=paths(),failed=state.step>0&&state.scenario==='link',down=state.step>0&&state.scenario==='router';
  let opts={path:state.step===0?ps.before:state.step===2?ps.after:[],both:ps.both&&state.step===0,failedLink:failed?state.link:'',failedRouter:down?'R4':''};
  if(state.scenario==='restore')opts={path:state.step===2?ps.after:ps.before,failedLink:state.step===0?'R1–R2':''};
  $('player-svg').innerHTML=ringSVG(opts);
  $('before-svg').innerHTML=ringSVG({path:ps.before,both:ps.both,mini:true,failedLink:state.scenario==='restore'?'R1–R2':''});
  $('after-svg').innerHTML=ringSVG({path:ps.after,mini:true,failedLink:state.scenario==='link'?state.link:'',failedRouter:state.scenario==='router'?'R4':''});
  const prefix=isAssumed()?'Expected alternate path (ring topology logic). ':'';
  $('before-path').textContent=ps.both?'Equal-cost via R2 and R4. Per-packet active path not verified.':ps.before.join(' → ')+'. Illustrative animation – not simulation evidence.';
  $('after-path').textContent=prefix+ps.after.join(' → ')+'. Illustrative animation – not simulation evidence.';
  if(state.scenario==='normal'){
    $('player-info').innerHTML=`<span class="badge measured">Recorded evidence (Packet Tracer)</span><h3>${state.protocol} baseline</h3><p>Captured routing tables establish remote routes. The separate saved .pkt inspection verifies ${state.protocol==='RIP'?'RIPv2 and no auto-summary':'OSPF process 1 in area 0'}.</p><p class="route">PC1 → PC2 through R1 → R2</p><p>Failure recovery time: not applicable in normal operation. No baseline packet-loss percentage is inferred.</p>`;
  }else{
    const time=row.ocrt_seconds!==''?`≈${row.ocrt_seconds}<small> s</small>`:row.ocrt_status==='not_measurable_no_loss'?'No loss observed':'Not reliably measured';
    const route=state.step===0?row.route_before:state.step===2?row.route_after:'Transition evidence only; instantaneous forwarding state not recorded';
    const metric=state.step===0?row.metric_before:state.step===2?row.metric_after:'';
    $('player-info').innerHTML=`${statusBadge(row)}<h3>${escapeHTML(row.experiment_name)}</h3><div class="time" style="${row.ocrt_seconds===''?'font-size:27px':''}">${time}</div><p>${state.scenario==='restore'&&state.protocol==='OSPF'?'Observed TTL/path-change interval, not outage OCRT':row.ocrt_status==='not_measurable_no_loss'?'OCRT not measurable':'Observed Connectivity Recovery Time'}</p>${isAssumed()?`<p class="notice">Assumed value – no recorded Packet Tracer evidence for this link.</p><p>${prefix}${ps.after.join(' → ')}. Illustrative animation – not simulation evidence.</p>`:`<p class="route">${escapeHTML(route)}${metric!==''?`<br>${state.protocol==='RIP'?'Hop metric':'OSPF cost'}: ${metric}`:''}</p>`}<p>${escapeHTML(row.run_note)}</p><p>${escapeHTML(row.packet_loss_observed)}</p>${state.scenario==='router'?'<p class="notice">Unlike earlier/later runs. Not directly comparable. Equal-cost forwarding via R2 is an unverified explanation for the OSPF no-loss observation.</p>':''}${state.scenario==='restore'&&state.protocol==='RIP'?'<p class="notice">E22 remains needs-confirmation and is excluded as restoration proof.</p>':''}`;
  }
  const ids=evidenceForStep();$('player-gallery').innerHTML=isAssumed()?'<div class="missing-note">Assumed value – no recorded Packet Tracer evidence for this link</div>':ids.length?ids.map(id=>evidenceCard(DATA.evidence.find(e=>e.id===id))).join(''):'<div class="missing-note">No recorded evidence for this step</div>';
}
function evidenceCard(e){
  return `<article class="evidence-card"><button data-image="${e.id}" aria-label="Open ${e.id}: ${escapeHTML(e.caption)}"><img src="../${e.filename}" alt="${escapeHTML(e.what_it_shows)}" loading="lazy"></button><div class="caption"><span class="badge ${e.confidence==='needs-confirmation'?'unconfirmed':'measured'}">${e.confidence==='needs-confirmation'?'Needs confirmation · excluded as proof':'Recorded evidence (Packet Tracer)'}</span><h3>${e.id} · ${escapeHTML(e.caption)}</h3><p>${e.protocol} / ${e.experiment.replaceAll('_',' ')} / ${escapeHTML(e.phase)}</p></div></article>`;
}
function renderGallery(){const p=$('gallery-protocol').value,exp=$('gallery-experiment').value;const list=DATA.evidence.filter(e=>(p==='all'||e.protocol===p)&&(exp==='all'||e.experiment===exp));$('evidence-gallery').innerHTML=list.map(evidenceCard).join('');$('gallery-count').textContent=`${list.length} source images`;}
let lightboxList=[],lightboxIndex=0;
function openImage(id){lightboxList=[...document.querySelectorAll('button[data-image]')].map(b=>b.dataset.image).filter((x,i,a)=>a.indexOf(x)===i);lightboxIndex=lightboxList.indexOf(id);renderLightbox();if(!$('lightbox').open)$('lightbox').showModal();}
function renderLightbox(){const e=DATA.evidence.find(e=>e.id===lightboxList[lightboxIndex]);$('lightbox-image').src='../'+e.filename;$('lightbox-image').alt=e.what_it_shows;$('lightbox-caption').textContent=`${e.id} · ${e.source_label} · ${e.caption}. ${e.what_it_shows} Confidence: ${e.confidence}.`;$('previous-image').disabled=lightboxIndex===0;$('next-image').disabled=lightboxIndex===lightboxList.length-1;}
function moveImage(delta){lightboxIndex=Math.max(0,Math.min(lightboxList.length-1,lightboxIndex+delta));renderLightbox();}
function table(headers,rows){return `<table><thead><tr>${headers.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td ${String(c).includes('Assumed')?'class="assumed-cell"':''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;}
function pattern(color){const c=document.createElement('canvas');c.width=9;c.height=9;const x=c.getContext('2d');x.fillStyle=color+'25';x.fillRect(0,0,9,9);x.strokeStyle=color+'aa';x.lineWidth=1.4;x.beginPath();x.moveTo(-2,2);x.lineTo(7,11);x.moveTo(2,-2);x.lineTo(11,7);x.stroke();return x.createPattern(c,'repeat');}
const dashedAssumed={id:'dashedAssumed',afterDatasetsDraw(chart){const ctx=chart.ctx;chart.data.datasets.forEach((ds,d)=>{if(!ds.assumedIndexes)return;const meta=chart.getDatasetMeta(d);ds.assumedIndexes.forEach(i=>{const b=meta.data[i];if(!b||ds.data[i]===null)return;ctx.save();ctx.setLineDash([4,3]);ctx.strokeStyle=ds.outlineColor||'#80612d';ctx.lineWidth=1;ctx.strokeRect(b.x-b.width/2,b.y,b.width,b.base-b.y);ctx.restore();});});}};
Chart.register(dashedAssumed);
Chart.defaults.font.size=14;
function makeChart(id,labels,datasets,ylabel,tooltip){
  chartObjects[id]?.destroy();const dark=document.body.classList.contains('dark'),ink=dark?'#d1e1e7':'#526670';
  chartObjects[id]=new Chart($(id),{type:'bar',data:{labels,datasets},options:{responsive:true,maintainAspectRatio:false,animation:false,plugins:{legend:{labels:{color:ink,font:{size:12},boxWidth:10}},tooltip:{callbacks:{label:tooltip||((ctx)=>`${ctx.dataset.label}: ${ctx.raw??'Not measured'}`)}}},scales:{x:{ticks:{color:ink,font:{size:11}},grid:{display:false}},y:{beginAtZero:true,title:{display:true,text:ylabel,color:ink,font:{size:12}},ticks:{color:ink,font:{size:11}},grid:{color:dark?'#33505a':'#e7edeb'}}}}});
}
function renderCharts(){
  const show=$('show-assumed').checked;const labels=show?['R1–R2','R2–R3 (Assumed)','R3–R4 (Assumed)','R4–R1 (Assumed)']:['R1–R2'];
  const rows=DATA.results.filter(r=>r.failure_type==='link_failure'&&(show||r.data_status==='MEASURED'));
  const ds=['RIP','OSPF'].map(p=>{const s=rows.filter(r=>r.protocol===p);return {label:p+' · hatched = Assumed',data:s.map(r=>r.ocrt_seconds),backgroundColor:s.map(r=>r.data_status==='ASSUMED'?pattern(colors[p]):colors[p]),borderColor:colors[p],borderWidth:1,assumedIndexes:s.map((r,i)=>r.data_status==='ASSUMED'?i:-1).filter(i=>i>=0),outlineColor:colors[p]};});
  makeChart('link-chart',labels,ds,'Supplied recovery time (s)',ctx=>{const p=ctx.datasetIndex===0?'RIP':'OSPF',r=rows.filter(r=>r.protocol===p)[ctx.dataIndex];return [`${p}: ${r.ocrt_seconds} s`,r.data_status==='ASSUMED'?DATA.assumedLabel:'Recorded evidence (Packet Tracer) – single run',r.run_note,r.evidence_ids||'No recorded evidence'];});
  $('link-table').innerHTML=table(['Link','RIP','OSPF','Status'],DATA.summary.filter(s=>s.statistic==='per_link_comparison'&&(show||s.data_status==='MEASURED_SINGLE_RUN')).map(s=>[s.scope,`${s.rip_seconds} s`,`${s.ospf_seconds} s`,s.label]));
  const sums=DATA.summary.filter(s=>s.statistic==='per_link_comparison'&&(show||s.data_status==='MEASURED_SINGLE_RUN'));
  makeChart('ratio-chart',labels,[{label:'RIP / OSPF · hatched = Assumed',data:sums.map(s=>s.ratio),backgroundColor:sums.map((s,i)=>i?pattern(colors.RIP):colors.RIP),assumedIndexes:sums.map((s,i)=>i).slice(1)}],'Time ratio',ctx=>[ctx.raw+'×',sums[ctx.dataIndex].label]);
  $('ratio-table').innerHTML=table(['Link','Ratio','Shorter OCRT','Status'],sums.map(s=>[s.scope,s.ratio.toFixed(2)+'×',s.reduction_percent.toFixed(2)+'%',s.label]));
  makeChart('router-chart',['RIP (later run)','OSPF (earlier run)'],[{label:'Recorded OCRT · unlike runs',data:[11,null],backgroundColor:[colors.RIP,colors.OSPF]}],'OCRT (s)');
  $('router-table').innerHTML=table(['Protocol','Observation','Status'],[['RIP','≈11 s','Recorded evidence (Packet Tracer) – single later run'],['OSPF','No loss observed – OCRT not measurable','Recorded earlier run; unlike conditions']]);
  for(const p of ['RIP','OSPF']){
    const s=['A','B'].map(id=>DATA.results.find(r=>r.experiment_id===id&&r.protocol===p));
    makeChart(p.toLowerCase()+'-metric-chart',['A: link','B: router'],[{label:'Before',data:s.map(r=>r.metric_before),backgroundColor:colors[p]+'66'},{label:'After',data:s.map(r=>r.metric_after),backgroundColor:colors[p]}],p==='RIP'?'Hop metric':'Cost');
  }
  $('metric-table').innerHTML=table(['Case','RIP before / after','OSPF before / after','Status'],[['A: link','1 / 3','2 / 4','Recorded route output'],['B: R4','2 / 2','3 / 3','Recorded route output; unlike timing runs']]);
  makeChart('restore-chart',['RIP','OSPF'],[{label:'Recorded path-return interval',data:[null,11],backgroundColor:[colors.RIP,colors.OSPF]}],'Path-return interval (s)');
  $('restore-table').innerHTML=table(['Protocol','Restoration','Status'],[['RIP','Route restored; timing not reliably measured','Recorded route evidence; E22 excluded'],['OSPF','≈11 s to TTL 124→126','Recorded evidence (Packet Tracer) – single run path-change interval']]);
  const cov=[['R1–R2','Measured n=1','Measured n=1'],...(show?[['R2–R3',DATA.assumedLabel,DATA.assumedLabel],['R3–R4',DATA.assumedLabel,DATA.assumedLabel],['R4–R1',DATA.assumedLabel,DATA.assumedLabel]]:[]),['R4 off','Measured, later','Partial: no measurable OCRT'],['Restored','Partial: no reliable timing','Measured path change']];
  $('coverage-table').innerHTML=table(['Case','RIP','OSPF'],cov);
  chartObjects['coverage-chart']?.destroy();
  const points={Measured:[],Assumed:[],Partial:[]};
  cov.forEach((r,y)=>[1,2].forEach((col,x)=>{const status=r[col].includes('Assumed')?'Assumed':r[col].includes('Partial')?'Partial':'Measured';points[status].push({x,y,status:r[col]});}));
  chartObjects['coverage-chart']=new Chart($('coverage-chart'),{type:'scatter',data:{datasets:Object.entries(points).map(([label,points])=>({label:label==='Assumed'?'Assumed (not measured)':label,data:points,pointRadius:13,pointStyle:'rect',backgroundColor:label==='Assumed'?pattern('#aa7530'):label==='Measured'?'#268368':'#79a6b8',borderColor:label==='Assumed'?'#aa7530':'#396778',borderWidth:1}))},options:{responsive:true,maintainAspectRatio:false,animation:false,plugins:{legend:{labels:{font:{size:11},boxWidth:9}},tooltip:{callbacks:{label:c=>c.raw.status}}},scales:{x:{min:-.5,max:1.5,ticks:{stepSize:1,callback:v=>v===0?'RIP':v===1?'OSPF':''},grid:{display:false}},y:{min:-.5,max:cov.length-.5,reverse:true,ticks:{stepSize:1,font:{size:11},callback:v=>cov[v]?.[0]||''},grid:{display:false}}}}});
  const summary=DATA.summary.at(-1);
  $('summary-statistics').innerHTML=show?`<span class="badge assumed">Includes Assumed (estimated – not measured) inputs</span><strong>${summary.rip_seconds.toFixed(2)} s / ${summary.ospf_seconds.toFixed(2)} s</strong><p>RIP / OSPF arithmetic average across four supplied links.<br>Reduction of averages: ${summary.reduction_percent.toFixed(2)}%. Ratio of averages: ${summary.ratio.toFixed(2)}×.</p><p>${DATA.mixedLabel}. These are not means from repeated trials.</p>`:'<span class="badge measured">Measured-only view</span><p>Only R1–R2 has recorded link timings: ≈26 s RIP / ≈7 s OSPF, single run each. Four-link descriptive statistics are hidden.</p>';
}
const tour=[['overview','0:00 · Scope and data honesty'],['methodology','0:30 · OCRT and stopwatch limits'],['topology','1:15 · Ring and addressing'],['player','2:00 · RIP, recorded R1–R2 failure'],['player','3:15 · OSPF, same link'],['analysis','4:15 · Measured versus Assumed'],['player','5:00 · Router failure and restoration'],['methodology','5:45 · Limitations and code walkthrough']];let tourIndex=0;
function tourStop(){const [id,label]=tour[tourIndex];$('tour-label').textContent=label;if(tourIndex===3||tourIndex===4){state.protocol=tourIndex===3?'RIP':'OSPF';state.scenario='link';state.link='R1–R2';state.step=0;syncControls();renderPlayer();}if(tourIndex===6){state.scenario='router';state.step=2;syncControls();renderPlayer();}$(id).scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});$('tour-next').textContent=tourIndex===tour.length-1?'Finish tour':'Next stop →';}
function syncControls(){$('scenario').value=state.scenario;$('failed-link').value=state.link;}
document.addEventListener('click',event=>{const protocol=event.target.closest('[data-protocol]'),step=event.target.closest('[data-step]'),device=event.target.closest('[data-device]'),img=event.target.closest('[data-image]');if(protocol){state.protocol=protocol.dataset.protocol;renderPlayer();}if(step){state.step=Number(step.dataset.step);renderPlayer();}if(device)showDevice(device.dataset.device);if(img)openImage(img.dataset.image);});
document.addEventListener('keydown',event=>{const d=event.target.closest('[data-device]');if(d&&['Enter',' '].includes(event.key)){event.preventDefault();showDevice(d.dataset.device);}if($('lightbox').open){if(event.key==='ArrowLeft')moveImage(-1);if(event.key==='ArrowRight')moveImage(1);}});
$('scenario').addEventListener('change',()=>{state.scenario=$('scenario').value;state.step=0;renderPlayer();});
$('failed-link').addEventListener('change',()=>{state.link=$('failed-link').value;state.step=0;renderPlayer();});
['gallery-protocol','gallery-experiment'].forEach(id=>$(id).addEventListener('change',renderGallery));
$('show-assumed').addEventListener('change',renderCharts);
$('theme-toggle').addEventListener('click',()=>{document.body.classList.toggle('dark');renderCharts();});
$('close-lightbox').addEventListener('click',()=>$('lightbox').close());$('previous-image').addEventListener('click',()=>moveImage(-1));$('next-image').addEventListener('click',()=>moveImage(1));
$('start-tour').addEventListener('click',()=>{tourIndex=0;$('tour-bar').hidden=false;tourStop();});$('tour-next').addEventListener('click',()=>{if(++tourIndex>=tour.length)$('tour-bar').hidden=true;else tourStop();});$('tour-stop').addEventListener('click',()=>$('tour-bar').hidden=true);
$('topology-svg').innerHTML=ringSVG({interactive:true});showDevice('R1');$('topology-evidence').src='../'+DATA.evidence.find(e=>e.id==='E06').filename;
$('limitation').textContent=DATA.limitation;$('references').innerHTML='<h3>References</h3>'+DATA.references.map(r=>`<p>[${r.id}] ${escapeHTML(r.title)} <a href="${r.url}" target="_blank" rel="noopener">Primary source ↗</a></p>`).join('');
renderPlayer();renderGallery();renderCharts();
// Read-only test hook exposes the plotted values and selection for offline QA.
window.REPLAY={state,charts:chartObjects,renderPlayer,renderCharts};
