# Saved Packet Tracer file verification

The original `.pkt` files were inspected read-only. EAX authentication and decompression succeeded using [jeamxn/cisco-pka-to-xml](https://github.com/jeamxn/cisco-pka-to-xml), commit `efe407c41227d097f9469ed941f71371e7314074`. Temporary decoded XML and helper binaries were inspection tools, not runtime or submission dependencies.

| Original file | Saved version | Four-router configuration |
| --- | --- | --- |
| `v1_topology_base.pkt` | 9.0.1.0858 | No dynamic routing process in running configuration |
| `v2_rip.pkt` | 9.0.1.0858 | RIP only; version 2; no auto-summary; network 10.0.0.0 and each local LAN |
| `v3_ospf.pkt` | 9.0.1.0858 | OSPF only; process 1; area 0; broad 10/8 transit match and local LAN /24; no explicit router-id |

Running and startup configurations agree on every router in the RIP and OSPF files. They differ in the base topology file. Every router is powered on in the saved files. PC1–PC4 addresses 192.168.1–4.10/24 and gateways 192.168.1–4.1 match the addressing plan. The router display names are R1–R4; the saved IOS hostname is Router.

The guide's separate /30 OSPF matches and explicit router IDs are intended instructions, rather than the saved commands. The actual transit match is `network 10.0.0.0 0.255.255.255 area 0`. Screenshot E27 shows neighbour IDs 192.168.2.1 and 192.168.4.1.

The inspection verifies saved configuration and addressing. It does not replay failures, independently verify stopwatch timings or certify historical forwarding paths. Original hashes are retained in `Data/original_hashes.json`; the organisation checks in `Testing/verification_results.json` confirm that the original files remain unchanged.

For manual verification, open a copy in Packet Tracer 9.x. On each router inspect `show running-config`, `show ip protocols`, `show ip route` and, for OSPF, `show ip ospf neighbor`. Compare the outputs with these exports and the evidence manifest. Record any later experimental reruns as new runs.
