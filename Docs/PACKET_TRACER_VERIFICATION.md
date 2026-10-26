# Read-only Packet Tracer file verification

The originals were not launched, resaved or modified. A read-only decoder recovered XML into a scratch directory outside the repository. EAX authentication and decompression succeeded. The inspected source was jeamxn/cisco-pka-to-xml commit efe407c41227d097f9469ed941f71371e7314074 (MIT): https://github.com/jeamxn/cisco-pka-to-xml . The Twofish block helper was compiled locally because the available compiler is32-bit; only decoding/inspection was performed. No activity grades or authentication state were altered. XML outputs and helper binaries are build intermediates, not submission dependencies.

| File | Saved version | Four-router routing state |
| --- | --- | --- |
|v1_topology_base.pkt |9.0.1.0858 |No dynamic routing process in running configuration |
|v2_rip.pkt |9.0.1.0858 |RIP only; version2; no auto-summary; transit network10.0.0.0 and local LAN |
|v3_ospf.pkt |9.0.1.0858 |OSPF only; process1; area0; broad10/8 wildcard and local LAN/24; no explicit router-id |

Running/startup configurations agree on every router in the two protocol files. They differ in the base topology stage, so do not assume a reload preserves its running setup. Every router is powered on in the saved files. Full verified running-config exports are in Configs/. Router display names R1–R4 differ from the IOS hostname Router. PC1–PC4 saved addresses192.168.1–4.10/24 and gateways192.168.1–4.1 match the plan.

The guide differs from the saved files: its separate/30 OSPF matches and explicit router IDs were intended instructions. The actual saved OSPF process uses `network 10.0.0.0 0.255.255.255 area 0`, and neighbour screenshots show192.168.2.1/192.168.4.1. Do not substitute guide commands into actual-config transcripts.

Inspection verifies saved configuration and addressing only. It does not replay failures, verify timing, certify historical active paths, or replace the screenshot/results evidence. All original hashes match the Phase0 baseline. Source and submission-copy hashes are recorded in Data/original_hashes.json and Testing/submission_hashes.json.

Optional human verification, without saving over originals: open a copy in Packet Tracer9.x; on every router use `show running-config`, `show ip protocols`, `show ip route`, and for OSPF `show ip ospf neighbor`. Compare with Configs/ and manifest images. Any later experimental reruns must be explicitly recorded as new runs, not substituted silently. Current work did not redo experiments.
