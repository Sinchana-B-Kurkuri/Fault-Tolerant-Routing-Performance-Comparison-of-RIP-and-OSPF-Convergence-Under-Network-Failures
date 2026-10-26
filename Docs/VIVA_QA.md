# F1 Team21 viva preparation

Answers distinguish recorded evidence, illustrative assumptions and general theory. References [1]–[5] match the report/README.

## 1. What does RIP use as its metric?

Hop count. The captured route output has AD120 and metrics1,2 or3 for the observed paths. The protocol supports up to15 hops;16 means unreachable [1].

## 2. How does OSPF choose routes?

It floods link-state information, maintains an LSDB and runs SPF/Dijkstra using cumulative cost [2].

## 3. What is the distinction between AD and metric?

AD selects between routing sources locally. A protocol metric compares paths within that routing source. The captures show RIP AD120 and OSPF AD110.

## 4. Was OSPF always faster?

Only the recorded R1–R2 single-run OCRT comparison supports a measured difference:≈26s RIP versus≈7s OSPF. Estimated links and unmatched router runs do not prove a general rule.

## 5. Why might OSPF recover faster?

Triggered link-state processing is consistent with the observation. The experiment does not isolate detection, routing, ARP, stopwatch and simulator effects, so it cannot prove the mechanism caused the difference.

## 6. What is OCRT?

External-stopwatch time from the failure trigger until replies are consistently successful, defined as a successful reply followed by another consecutive successful reply.

## 7. Is OCRT pure protocol convergence?

No. It includes end-to-end detection/forwarding/ARP effects, simulator processing and human reaction.

## 8. Can timeout counts measure OCRT?

No. Packet Tracer ping intervals and timeout handling are not a calibrated wall clock. Timing comes from the recorded stopwatch observation.

## 9. What does n=1 mean here?

Each reported timed observation is one run, so it does not measure run-to-run variability or justify statistical significance.

## 10. Why is there no experimental mean±SD?

There are no repeated-trial datasets. A four-link arithmetic average is supplied descriptively but three inputs are assumed, so it is not a repeated-trial mean and has no SD/error bars.

## 11. Why are three link values assumed, and how would you replace them?

OCRT varies between runs, and those links were not individually timed. The team supplied estimates based on R1–R2 and expected protocol behaviour. They are labelled everywhere, have zero timed runs and no evidence IDs. Replace them only with recorded timing/evidence and update all data mirrors and outputs.

## 12. What are the four-link descriptive averages?

RIP25.75s and OSPF7.00s across the four supplied cases, including three Assumed (estimated – not measured) links. These are not repeated-trial averages.

## 13. What does72.82% represent?

The reduction of the two mixed-input descriptive averages: (25.75−7)/25.75×100. It includes three Assumed inputs and has no statistical interpretation.

## 14. What is the measured R1–R2 reduction?

(26−7)/26×100≈73.08%, based on one recorded run per protocol. It is not a statistically established improvement.

## 15. Why is ExpB not directly comparable?

RIP≈11s is a later run, while the OSPF no-loss observation is an earlier run. Conditions and active per-packet forwarding were not matched.

## 16. Why is no-loss OSPF not0s?

No interruption endpoint was observable, so recovery time could not be measured. Absence of observed loss is qualitative evidence, not a zero-second timing.

## 17. Does the ring remove equal-cost paths?

No. Opposite LANs have two equal-cost routes. E07/E23 show paths via R2 and R4 for PC1→PC3.

## 18. Could ECMP explain OSPF’s no-loss R4 failure?

Traffic might already have used R2. That is an unverified hypothesis because no capture proves each ping’s active forwarding path.

## 19. Why is the ring fault tolerant?

After one ring link or a transit router fails, a surviving path connects the remaining routers. The failed router’s own LAN lacks a second gateway.

## 20. What were the measured A paths?

Before: R1→R2. After: R1→R4→R3→R2. RIP metric1→3; OSPF cost2→4.

## 21. Why is OSPF cost2 when the adjacent router is one hop away?

The screenshot proves cumulative cost2 to the destination LAN, not one-hop count. Link and destination-network contributions can explain it theoretically, but individual interface costs are not directly captured.

## 22. What did TTL124→126 indicate?

A path change consistent with two fewer router traversals in these same-source replies. It does not independently time protocol-internal convergence.

## 23. What does OSPF restoration≈11s measure?

The observed interval until TTL/path change after restoration, not an outage-recovery OCRT.

## 24. Why is E22 excluded?

It shows a fresh PC1→PC2 ping with an initial timeout and replies, without a proven restoration action/run. It remains needs-confirmation.

## 25. How are PC and IOS pings different?

Captures show the PC accepting ping -t destination. IOS repeat/timeout syntax belongs to router CLI. Do not interchange them.

## 26. What are RIP’s common Cisco IOS timers?

Update30s, invalid180s, hold-down180s, flush240s [4]. These are reference defaults, not measured project timings; RIP also supports triggered updates.

## 27. What are OSPF Ethernet Hello/Dead defaults?

Common Cisco defaults are10/40s [5]. A local interface-down event can be detected without waiting for Dead expiry.

## 28. What multicast address does RIPv2 use?

224.0.0.9 [1]. It is protocol theory, not a captured packet measurement in this project.

## 29. Were RIP and OSPF layered together?

Read-only saved-file inspection found RIP only in all four routers of v2_rip and OSPF only in all four routers of v3_ospf. Running/startup configs agree in both files.

## 30. Did the saved OSPF file use the guide’s explicit router IDs?

No router-id commands were saved. E27 shows neighbour IDs192.168.2.1 and192.168.4.1. The report distinguishes actual saved configuration from intended examples.

## 31. What can saved-file inspection prove?

Persisted addressing and routing configuration, version metadata and protocol separation. It does not rerun the network or verify an external stopwatch reading.

## 32. What does the dashboard do?

It selects and presents recorded evidence, timing data and illustrative ring paths. It sends no test traffic and runs no routing protocol.

## 33. Why no backend?

All evidence and data are static local assets. Plain scripts work offline via file://, avoiding server installation and JSON fetch restrictions.

## 34. What are Chart.js and Python’s roles?

Chart.js renders interactive browser charts from data.js. Python reads the canonical CSV to generate static report figures and validate consistency.

## 35. How do you verify a screenshot-to-claim link?

Look up the evidence ID in Data/evidence_manifest.csv, inspect the original image and its confidence/context, and check the result row’s evidence_ids. Assumed rows must be blank.

## 36. How are missing packet-loss percentages handled?

Not recorded. The excerpts contain behaviour but no completed summary. No count or percentage is inferred.

## 37. What is the project’s novelty?

An educational same-topology comparison, an explicit OCRT boundary and an evidence-linked offline replay. No new routing protocol was invented.

## 38. What is the most useful future experiment?

Individually time all four links, repeat matched scenarios at least ten times, capture full summaries and automated timestamps, and verify active paths before router failure.

## 39. How are originals protected?

They remain at repository root with starting SHA-256 hashes. Submission PKTs are byte-identical added copies. No reset, history rewrite, commit or push was performed.

## 40. What must both members know?

Both protocols, all scenarios/data caveats, the IP plan, configurations, dashboard/code structure, validation and the meaning of every numeric comparison.
