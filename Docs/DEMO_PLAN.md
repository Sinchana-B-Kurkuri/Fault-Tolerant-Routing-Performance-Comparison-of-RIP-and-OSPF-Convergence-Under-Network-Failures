# F1 Team21 demonstration plan

Target:5–7 minutes. Confirmed responsibilities: Harshith Reddy V (24BCE2479) handles topology, IP addressing, RIP configuration and report Chapters1–3. Sinchana B Kurkuri (24BDS0352) handles OSPF configuration, dashboard implementation, graphs and report Chapters4–6. Both must understand the complete project.

| Time | Presenter action and spoken point |
| --- | --- |
|0:00 |Open Dashboard/index.html by double-clicking offline. State that it replays recorded Packet Tracer experiments and that three link cases are Assumed (estimated – not measured). |
|0:30 |Define external-stopwatch OCRT. Explain consecutive successful replies and human/simulator effects. |
|1:15 |Inspect ring devices and addressing. Explain /30 transit links and /24 LANs. |
|2:00 |RIP, R1–R2 failure. Step before/failure/recovered. Show metric1→3, next hop R2→R4, unreachable/timeouts. |
|3:15 |OSPF, same link. Show cost2→4 and one visible timeout. Recorded OCRT≈26s versus≈7s, single runs. |
|4:15 |Four-link chart. Solid measured bars versus hatched Assumed estimates. Toggle assumptions off and on. State illustrative means25.75s/7.00s include three Assumed links, not repeated trials. |
|5:00 |R4 failure: RIP≈11s later run, OSPF earlier no loss; not directly comparable. Restoration: OSPF≈11s to TTL124→126, RIP timing unreliable. E22 excluded. |
|5:45 |Code walkthrough: data.js source values, app.js selection/path/gallery/charts, generate_charts.py, validate_data.py. No backend or fetch. |
|6:30 |Conclusion, n=1, assumptions, unmatched B runs, missing loss counts, repeated matched trials as future work. |

Use the presenter-tour button as a guide; it changes selected recorded scenarios and scroll position, not network state. Every illustrative animation carries its disclosure. Every original experiment screenshot is labelled Recorded evidence (Packet Tracer).

Fallback: open the PDF report and Testing/dashboard_1440x900.png or dashboard_experiment_player.png. Keep offline copies of report/PPT/PKT files on a second storage device before presentation. Do not claim a browser failure changes the recorded results.

Everyone must know: all addressing and next hops; RIP versus OSPF metric/AD; saved configurations versus intended commands; OCRT endpoint; timing/RTT/TTL distinctions; single-run limits; why estimates have no evidence IDs; mixed descriptive averages; ExpB unmatched conditions/equal-cost paths; source-file preservation; how to run and validate the offline code.
