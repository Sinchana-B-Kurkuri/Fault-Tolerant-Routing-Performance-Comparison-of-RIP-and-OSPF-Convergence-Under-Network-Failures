from pathlib import Path
import json,sys
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[1];O=R/'Testing';O.mkdir(exist_ok=True);url=(R/'Dashboard/index.html').as_uri()
checks=[];failures=[];skips=[]
def check(condition,name):
    checks.append({'test':name,'pass':bool(condition)})
    if not condition:failures.append(name)
with sync_playwright() as p:
    for browsername in ['chromium','firefox']:
        try:browser=getattr(p,browsername).launch(headless=True)
        except Exception as exc:
            skips.append(browsername+' unavailable: '+str(exc).split('Call log:')[0].strip());continue
        context=browser.new_context(viewport={'width':1440,'height':900},reduced_motion='reduce')
        page=context.new_page();errors=[];failed=[];remote=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.on('requestfailed',lambda r:failed.append(r.url))
        def route(r):
            if r.request.url.startswith(('http://','https://')):remote.append(r.request.url);r.abort()
            else:r.continue_()
        page.route('**/*',route);page.goto(url);page.wait_for_function('window.REPLAY && Object.keys(window.REPLAY.charts).length===7')
        check(not errors,browsername+' initial script execution')
        page.evaluate("document.querySelectorAll('img').forEach(i=>i.loading='eager')")
        page.wait_for_function("[...document.images].every(i=>i.id==='lightbox-image'||i.complete&&i.naturalWidth>0)")
        check(page.locator('#evidence-gallery .evidence-card').count()==37,browsername+' full 37-image gallery')
        check(page.evaluate("[...document.querySelectorAll('nav a,.hero-actions a')].every(a=>document.querySelector(a.getAttribute('href')))") ,browsername+' navigation anchor targets')
        for protocol in ['RIP','OSPF']:
            page.locator(f'[data-protocol="{protocol}"]').click()
            for scenario in ['normal','link','router','restore']:
                page.select_option('#scenario',scenario)
                for link in ['R1–R2','R2–R3','R3–R4','R4–R1'] if scenario=='link' else ['']:
                    if link:page.select_option('#failed-link',label=link)
                    stepcount=page.locator('[data-step]').count()
                    for step in range(stepcount):
                        page.locator(f'[data-step="{step}"]').click()
                        info=page.locator('#player-info').inner_text();gallery=page.locator('#player-gallery').inner_text()
                        key=f'{browsername} {protocol} {scenario} {link} step{step}'
                        check(bool(info.strip()) and bool(page.locator('#player-svg svg').count()),key+' renders')
                        if scenario=='link' and link!='R1–R2':
                            check('Assumed (estimated' in info and 'no recorded Packet Tracer evidence' in info,key+' assumed disclosure')
                            check(page.locator('#player-gallery [data-image]').count()==0,key+' no evidence associated')
                        if scenario=='link' and step>0:check(page.locator('#player-svg .edge-failed').count()==1,key+' correct failed-link count')
                        if scenario=='router' and step>0:check(page.locator('#player-svg .edge-failed').count()==2,key+' incident ring links failed')
                        check('E22' not in [e.get_attribute('data-image') for e in page.locator('#player-gallery [data-image]').all()],key+' E22 excluded')
                        if scenario=='router':check('Not directly comparable' in info,key+' unmatched-run disclosure')
                        if scenario in ['link','restore'] and not (scenario=='link' and link!='R1–R2') and step in [0,2]:
                            value=(1 if step==0 else 3) if protocol=='RIP' else (2 if step==0 else 4)
                            if scenario=='restore':value=(3 if step==0 else 1) if protocol=='RIP' else (4 if step==0 else 2)
                            check(('Hop metric: '+str(value) if protocol=='RIP' else 'OSPF cost: '+str(value)) in info,key+' recorded metric matches')
        plotted=page.evaluate("Object.fromEntries(Object.entries(REPLAY.charts).map(([k,v])=>[k,v.data.datasets.map(d=>d.data)]))")
        check(plotted['link-chart']==[[26,24,28,25],[7,6,8,7]],browsername+' Chart.js supplied values match CSV')
        check(plotted['router-chart']==[[11,None]],browsername+' no zero for missing OSPF OCRT')
        check(plotted['restore-chart']==[[None,11]],browsername+' no zero for missing RIP restoration')
        page.uncheck('#show-assumed');check(page.evaluate("REPLAY.charts['link-chart'].data.datasets[0].data")==[26],browsername+' measured-only toggle')
        check('25.75' not in page.locator('#summary-statistics').inner_text(),browsername+' mixed summary hidden with assumptions')
        page.check('#show-assumed');check('25.75' in page.locator('#summary-statistics').inner_text() and 'Assumed' in page.locator('#summary-statistics').inner_text(),browsername+' mixed means labelled')
        page.select_option('#gallery-protocol','RIP');check(page.locator('#evidence-gallery .evidence-card').count()==16,browsername+' protocol filter')
        page.select_option('#gallery-experiment','link_failure');check(page.locator('#evidence-gallery .evidence-card').count()==5,browsername+' scenario filter')
        page.select_option('#gallery-protocol','all');page.select_option('#gallery-experiment','all')
        page.locator('#evidence-gallery [data-image="E01"]').click();check(page.locator('#lightbox').evaluate('(e)=>e.open'),browsername+' lightbox opens')
        page.keyboard.press('ArrowRight');check('E02' in page.locator('#lightbox-caption').inner_text(),browsername+' lightbox right-arrow')
        page.keyboard.press('ArrowLeft');check('E01' in page.locator('#lightbox-caption').inner_text(),browsername+' lightbox left-arrow')
        page.keyboard.press('Escape');check(not page.locator('#lightbox').evaluate('(e)=>e.open'),browsername+' lightbox Escape')
        page.locator('#topology-svg [data-device="PC3"]').focus();page.keyboard.press('Enter');check('192.168.3.10' in page.locator('#device-panel').inner_text(),browsername+' keyboard device inspector')
        check(page.evaluate("getComputedStyle(document.querySelector('.packet-dot')).animationName")== 'none',browsername+' reduced motion')
        page.locator('#start-tour').click();check(page.locator('#tour-bar').is_visible(),browsername+' presenter tour starts');page.locator('#tour-next').click();check('0:30' in page.locator('#tour-label').inner_text(),browsername+' presenter tour advances');page.locator('#tour-stop').click()
        page.locator('#theme-toggle').click();check(page.locator('body').evaluate("e=>e.classList.contains('dark')"),browsername+' dark theme');page.locator('#theme-toggle').click()
        if browsername=='chromium':
            page.select_option('#scenario','link');page.locator('[data-protocol="OSPF"]').click();page.select_option('#failed-link',label='R1–R2');page.locator('[data-step="2"]').click()
            for width,height in [(375,812),(768,1024),(1440,900)]:
                page.set_viewport_size({'width':width,'height':height});page.evaluate('window.scrollTo(0,0)');page.screenshot(path=str(O/f'dashboard_{width}x{height}.png'))
                check(page.evaluate('document.documentElement.scrollWidth<=innerWidth'),f'{browsername} no page overflow {width}px')
            page.locator('#player').scroll_into_view_if_needed();page.screenshot(path=str(O/'dashboard_experiment_player.png'))
            page.locator('#analysis').scroll_into_view_if_needed();page.screenshot(path=str(O/'dashboard_analysis.png'))
        context.set_offline(True);page.reload();page.wait_for_function('window.REPLAY');check(page.locator('#evidence-gallery .evidence-card').count()==37,browsername+' offline file reload')
        check(not remote,browsername+' no runtime network requests');check(not failed,browsername+' no failed local requests');check(not errors,browsername+' no console/page errors')
        browser.close()
report='# Offline dashboard test report\n\nExecuted with Playwright against file:// in Chromium and Firefox, with HTTP(S) requests blocked and reduced motion enabled. Browser dependencies are test-only.\n\n'
report+='| Check | Result |\n| --- | --- |\n'+'\n'.join('| '+c['test']+' | '+('PASS' if c['pass'] else 'FAIL')+' |' for c in checks)
report+=f'\n\n{len(checks)-len(failures)} passed; {len(failures)} failed.\n'+'\n'.join('SKIP '+s for s in skips)+'\n'
(O/'dashboard_test_report.md').write_text(report,encoding='utf-8');(O/'dashboard_test_results.json').write_text(json.dumps(checks,indent=2),encoding='utf-8')
print(f'{len(checks)} checks; failures:',failures,'skips:',skips)
sys.exit(1 if failures else 0)
