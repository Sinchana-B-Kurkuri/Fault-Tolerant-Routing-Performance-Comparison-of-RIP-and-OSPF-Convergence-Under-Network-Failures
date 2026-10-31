# Configuration provenance

`R1`–`R4` `_RIP_pkt_running-config.txt` and `_OSPF_pkt_running-config.txt` are actual saved RUNNINGCONFIG line exports from the preserved `.pkt` files, decoded read-only. They are not screenshot reconstructions. Running and startup configurations agree in each protocol file. See [the inspection record](../Data/packet_file_verification.json) and [verification scope](PACKET_TRACER_VERIFICATION.md).

Baseline screenshots contain `show ip route`, not configuration transcripts. E27 captures `show ip ospf neighbor`. E12/E29 capture G0/0 `shutdown`; E16/E33 capture `no shutdown`. Those visible actions establish failure/restoration CLI behaviour without proving a full earlier command history. IOS hostname Router is retained exactly; R1–R4 are Packet Tracer display names.

## Guide-intended R1 example, not captured executed commands

```text
router ospf 1
 router-id 1.1.1.1
 network 10.0.12.0 0.0.0.3 area 0
 network 10.0.41.0 0.0.0.3 area 0
 network 192.168.1.0 0.0.0.255 area 0
```

This differs from the actual saved broad network statement and absent explicit router-id. It is included only to document the guide’s intention. No unrecorded command is presented as captured output.
