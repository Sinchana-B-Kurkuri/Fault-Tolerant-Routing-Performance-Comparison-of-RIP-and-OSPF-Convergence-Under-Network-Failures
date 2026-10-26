"""Offline figures from supplied results. Assumed inputs are never new trials."""
from pathlib import Path
import csv,json,hashlib
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
import seaborn as sns

ROOT=Path(__file__).resolve().parents[1]
(ROOT/'Testing').mkdir(exist_ok=True)
OUT=ROOT/'Data/charts';OUT.mkdir(exist_ok=True)
df=pd.read_csv(ROOT/'Data/results.csv',keep_default_na=False)
ASSUMED='Assumed (estimated – not measured)'
COLORS={'RIP':'#176a9b','OSPF':'#dc7136'}
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':11,'axes.titleweight':'bold','axes.spines.top':False,'axes.spines.right':False,'figure.facecolor':'white','savefig.facecolor':'white','svg.hashsalt':'F1_Team21'})
logs=[]
def save(fig,name):
    fig.savefig(OUT/(name+'.png'),dpi=220,bbox_inches='tight',metadata={'Software':'F1 Team21 offline analysis'})
    fig.savefig(OUT/(name+'.svg'),bbox_inches='tight',metadata={'Date':None})
    plt.close(fig);logs.append(f'PASS {name}.png (220dpi) and .svg')
def legend(ax):
    ax.legend(handles=[Patch(facecolor=COLORS['RIP'],label='RIP'),Patch(facecolor=COLORS['OSPF'],label='OSPF'),Patch(facecolor='#eeeeee',edgecolor='#555',hatch='///',linestyle='--',label='Assumed (not measured)')],loc='upper right',fontsize=9)
links=list(dict.fromkeys(df[df.failure_type=='link_failure'].failed_element))
link=df[df.failure_type=='link_failure']
fig,ax=plt.subplots(figsize=(11,6))
for j,p in enumerate(['RIP','OSPF']):
    sub=link[link.protocol==p];vals=sub.ocrt_seconds.astype(float).tolist()
    bars=ax.bar(np.arange(4)+(j-.5)*.32,vals,.30,color=COLORS[p])
    for i,b in enumerate(bars):
        if i:b.set_hatch('///');b.set_alpha(.55);b.set_linestyle('--');b.set_edgecolor(COLORS[p])
        ax.text(b.get_x()+b.get_width()/2,b.get_height()+.5,f'{vals[i]:g}s'+('\nAssumed' if i else '\nn=1'),ha='center',fontsize=9)
ax.set(xticks=np.arange(4),xticklabels=[x+('\nMeasured, single run' if i==0 else '\nAssumed') for i,x in enumerate(links)],ylim=(0,36),ylabel='Supplied recovery time (s)',title='Link failure: recorded measurements and illustrative estimates')
legend(ax);fig.text(.12,.01,ASSUMED+' applies to the three hatched-link groups. No repeated trials or error bars.',fontsize=9)
save(fig,'01_link_failure')

fig,ax=plt.subplots(figsize=(10,5.3));ratios=[]
for i,l in enumerate(links):
    vals={r.protocol:float(r.ocrt_seconds) for r in link[link.failed_element==l].itertuples()};ratios.append(vals['RIP']/vals['OSPF'])
bars=ax.bar(links,ratios,color=COLORS['RIP'],width=.55)
for i,b in enumerate(bars):
    if i:b.set_hatch('///');b.set_alpha(.5);b.set_edgecolor('#176a9b');b.set_linestyle('--')
    ax.text(i,ratios[i]+.08,f'{ratios[i]:.2f}×\n'+('Single run' if i==0 else 'Assumed'),ha='center')
ax.set(ylim=(0,5.2),ylabel='RIP time / OSPF time',title='Per-link ratios inherit the status of their inputs')
fig.text(.12,.01,ASSUMED+' for R2–R3, R3–R4 and R4–R1.',fontsize=9)
save(fig,'02_link_ratios')

fig,ax=plt.subplots(figsize=(10,5));rip=float(df[(df.experiment_id=='B')&(df.protocol=='RIP')].iloc[0].ocrt_seconds)
ax.bar([0],[rip],color=COLORS['RIP'],width=.45);ax.text(0,rip+.4,f'≈{rip:g}s\nMeasured, later run',ha='center')
ax.text(1,5,'No loss observed\nOCRT not measurable\nEarlier run',ha='center',va='center',bbox=dict(facecolor='#fff4ea',edgecolor=COLORS['OSPF'],linestyle='--',pad=14))
ax.set(xticks=[0,1],xticklabels=['RIP','OSPF'],xlim=(-.7,1.7),ylim=(0,15),ylabel='OCRT (s)',title='R4 router failure: unlike runs, not directly comparable')
fig.text(.12,.01,'OSPF has no numeric recovery-time bar. The annotation is not a zero measurement.',fontsize=10)
save(fig,'03_router_failure')

fig,axes=plt.subplots(1,2,figsize=(11,4.8))
for ax,p in zip(axes,['RIP','OSPF']):
    sub=df[(df.experiment_id.isin(['A','B']))&(df.protocol==p)]
    ax.bar(np.arange(2)-.16,sub.metric_before.astype(float),.3,label='Before',color=COLORS[p],alpha=.55)
    ax.bar(np.arange(2)+.16,sub.metric_after.astype(float),.3,label='After',color=COLORS[p])
    for i,row in enumerate(sub.itertuples()):
        ax.text(i-.16,float(row.metric_before)+.08,str(row.metric_before),ha='center');ax.text(i+.16,float(row.metric_after)+.08,str(row.metric_after),ha='center')
    ax.set(xticks=[0,1],xticklabels=['A: R1–R2 failure','B: R4 failure'],ylim=(0,5),ylabel='Hop metric' if p=='RIP' else 'OSPF cost',title=p+' recorded route metrics');ax.legend()
fig.text(.1,.01,'Separate protocol scales: RIP hop metric and OSPF cost do not have interchangeable units.',fontsize=10)
save(fig,'04_route_metrics')

fig,ax=plt.subplots(figsize=(10,5));ax.bar([1],[11],color=COLORS['OSPF'],width=.45)
ax.text(1,11.4,'≈11s to TTL 124→126\nMeasured path-return interval',ha='center');ax.text(0,5,'Timing not reliably measured\nOriginal route restored',ha='center',bbox=dict(facecolor='#edf5fa',edgecolor=COLORS['RIP'],linestyle='--',pad=12))
ax.set(xticks=[0,1],xticklabels=['RIP','OSPF'],xlim=(-.7,1.8),ylim=(0,15),ylabel='Observed path-return interval (s)',title='R1–R2 restoration: original route returns')
fig.text(.12,.01,'The OSPF interval is not outage OCRT. RIP is missing, not zero. E22 is excluded as restoration proof.',fontsize=9)
save(fig,'05_restoration')

labels=['R1–R2 failure','R2–R3 failure','R3–R4 failure','R4–R1 failure','R4 off','R1–R2 restored']
codes=np.array([[3,3],[1,1],[1,1],[1,1],[3,2],[2,3]])
annotations=np.array([['Measured n=1','Measured n=1'],['Assumed','Assumed'],['Assumed','Assumed'],['Assumed','Assumed'],['Measured later','Partial: no loss'],['Partial: no timing','Measured path change']])
fig,ax=plt.subplots(figsize=(10,5.8));sns.heatmap(codes,annot=annotations,fmt='',cmap=sns.color_palette(['#e8d2b7','#f2a669','#b7d3df','#4c97b2'],as_cmap=True),vmin=0,vmax=3,cbar=False,xticklabels=['RIP','OSPF'],yticklabels=labels,linewidths=2,linecolor='white',ax=ax)
ax.set_title('Evidence coverage: timings, estimates and partial observations');ax.tick_params(axis='y',rotation=0)
fig.text(.12,.01,ASSUMED+'; partial means an observation exists without comparable numeric timing.',fontsize=9)
save(fig,'06_evidence_coverage')

# This mean describes the four supplied cases, three of which are estimates.
# It is intentionally not a repeated-trial mean, SD, or confidence interval.
summary=[]
for l in links:
    vals={r.protocol:float(r.ocrt_seconds) for r in link[link.failed_element==l].itertuples()};r,o=vals['RIP'],vals['OSPF']
    summary.append({'scope':l,'rip':r,'ospf':o,'reduction_percent':(r-o)/r*100,'status':'Measured single run' if l==links[0] else ASSUMED})
r=link[link.protocol=='RIP'].ocrt_seconds.astype(float).mean();o=link[link.protocol=='OSPF'].ocrt_seconds.astype(float).mean()
logs.append(f'DESCRIPTIVE MIXED INPUTS (three Assumed links): mean RIP={r:.2f}s, OSPF={o:.2f}s; reduction of means={(r-o)/r*100:.4f}%; not a trial mean.')
logs.append('PASS no SD, error bars, significance claims or fabricated loss figures generated.')
(ROOT/'Testing/chart_generation_log.txt').write_text('\n'.join(logs)+'\n',encoding='utf-8')
print('\n'.join(logs))
