// Canonical recorded rows and explicitly labelled illustrative estimates. No fetch is needed.
const DATA = {
  "results": [
    {
      "experiment_id": "A",
      "experiment_name": "Link failure R1–R2",
      "protocol": "RIP",
      "failure_type": "link_failure",
      "failed_element": "R1–R2",
      "test_traffic": "PC1→PC2",
      "route_before": "via 10.0.12.2 (R2)",
      "metric_before": 1,
      "route_after": "via 10.0.41.1 (R4), then R3, R2",
      "metric_after": 3,
      "ocrt_seconds": 26,
      "ocrt_status": "measured",
      "data_status": "MEASURED",
      "packet_loss_observed": "Unreachable messages and timeouts; counts/percentage not recorded",
      "run_count": 1,
      "run_note": "Single run; stopwatch value recorded in CNPj34 results table",
      "evidence_ids": "E11;E12;E13;E14;E15"
    },
    {
      "experiment_id": "A",
      "experiment_name": "Link failure R1–R2",
      "protocol": "OSPF",
      "failure_type": "link_failure",
      "failed_element": "R1–R2",
      "test_traffic": "PC1→PC2",
      "route_before": "via 10.0.12.2 (R2)",
      "metric_before": 2,
      "route_after": "via 10.0.41.1 (R4), then R3, R2",
      "metric_after": 4,
      "ocrt_seconds": 7,
      "ocrt_status": "measured",
      "data_status": "MEASURED",
      "packet_loss_observed": "One timeout visible; counts/percentage not recorded",
      "run_count": 1,
      "run_note": "Single run; stopwatch value recorded in CNPj34 results table",
      "evidence_ids": "E28;E29;E30;E31;E32"
    },
    {
      "experiment_id": "A2",
      "experiment_name": "Link failure R2–R3",
      "protocol": "RIP",
      "failure_type": "link_failure",
      "failed_element": "R2–R3",
      "test_traffic": "Not individually tested",
      "route_before": "Not recorded",
      "metric_before": "",
      "route_after": "Not recorded",
      "metric_after": "",
      "ocrt_seconds": 24,
      "ocrt_status": "assumed_not_measured",
      "data_status": "ASSUMED",
      "packet_loss_observed": "Not recorded",
      "run_count": 0,
      "run_note": "Assumed (estimated – not measured); link not individually timed",
      "evidence_ids": ""
    },
    {
      "experiment_id": "A2",
      "experiment_name": "Link failure R2–R3",
      "protocol": "OSPF",
      "failure_type": "link_failure",
      "failed_element": "R2–R3",
      "test_traffic": "Not individually tested",
      "route_before": "Not recorded",
      "metric_before": "",
      "route_after": "Not recorded",
      "metric_after": "",
      "ocrt_seconds": 6,
      "ocrt_status": "assumed_not_measured",
      "data_status": "ASSUMED",
      "packet_loss_observed": "Not recorded",
      "run_count": 0,
      "run_note": "Assumed (estimated – not measured); link not individually timed",
      "evidence_ids": ""
    },
    {
      "experiment_id": "A3",
      "experiment_name": "Link failure R3–R4",
      "protocol": "RIP",
      "failure_type": "link_failure",
      "failed_element": "R3–R4",
      "test_traffic": "Not individually tested",
      "route_before": "Not recorded",
      "metric_before": "",
      "route_after": "Not recorded",
      "metric_after": "",
      "ocrt_seconds": 28,
      "ocrt_status": "assumed_not_measured",
      "data_status": "ASSUMED",
      "packet_loss_observed": "Not recorded",
      "run_count": 0,
      "run_note": "Assumed (estimated – not measured); link not individually timed",
      "evidence_ids": ""
    },
    {
      "experiment_id": "A3",
      "experiment_name": "Link failure R3–R4",
      "protocol": "OSPF",
      "failure_type": "link_failure",
      "failed_element": "R3–R4",
      "test_traffic": "Not individually tested",
      "route_before": "Not recorded",
      "metric_before": "",
      "route_after": "Not recorded",
      "metric_after": "",
      "ocrt_seconds": 8,
      "ocrt_status": "assumed_not_measured",
      "data_status": "ASSUMED",
      "packet_loss_observed": "Not recorded",
      "run_count": 0,
      "run_note": "Assumed (estimated – not measured); link not individually timed",
      "evidence_ids": ""
    },
    {
      "experiment_id": "A4",
      "experiment_name": "Link failure R4–R1",
      "protocol": "RIP",
      "failure_type": "link_failure",
      "failed_element": "R4–R1",
      "test_traffic": "Not individually tested",
      "route_before": "Not recorded",
      "metric_before": "",
      "route_after": "Not recorded",
      "metric_after": "",
      "ocrt_seconds": 25,
      "ocrt_status": "assumed_not_measured",
      "data_status": "ASSUMED",
      "packet_loss_observed": "Not recorded",
      "run_count": 0,
      "run_note": "Assumed (estimated – not measured); link not individually timed",
      "evidence_ids": ""
    },
    {
      "experiment_id": "A4",
      "experiment_name": "Link failure R4–R1",
      "protocol": "OSPF",
      "failure_type": "link_failure",
      "failed_element": "R4–R1",
      "test_traffic": "Not individually tested",
      "route_before": "Not recorded",
      "metric_before": "",
      "route_after": "Not recorded",
      "metric_after": "",
      "ocrt_seconds": 7,
      "ocrt_status": "assumed_not_measured",
      "data_status": "ASSUMED",
      "packet_loss_observed": "Not recorded",
      "run_count": 0,
      "run_note": "Assumed (estimated – not measured); link not individually timed",
      "evidence_ids": ""
    },
    {
      "experiment_id": "B",
      "experiment_name": "R4 router failure",
      "protocol": "RIP",
      "failure_type": "router_failure",
      "failed_element": "R4",
      "test_traffic": "PC1→PC3",
      "route_before": "Equal-cost via R2 (10.0.12.2) and R4 (10.0.41.1)",
      "metric_before": 2,
      "route_after": "via R2 (10.0.12.2)",
      "metric_after": 2,
      "ocrt_seconds": 11,
      "ocrt_status": "measured",
      "data_status": "MEASURED",
      "packet_loss_observed": "Temporary interruption; counts/percentage not recorded",
      "run_count": 1,
      "run_note": "Later run; unlike OSPF earlier run; not directly comparable",
      "evidence_ids": "E07;E18;E19;E20;E21"
    },
    {
      "experiment_id": "C",
      "experiment_name": "R1–R2 restoration",
      "protocol": "RIP",
      "failure_type": "restoration",
      "failed_element": "R1–R2",
      "test_traffic": "PC1→PC2",
      "route_before": "via 10.0.41.1 (R4), then R3, R2",
      "metric_before": 3,
      "route_after": "via 10.0.12.2 (R2)",
      "metric_after": 1,
      "ocrt_seconds": "",
      "ocrt_status": "not_reliably_measured",
      "data_status": "NOT_RECORDED",
      "packet_loss_observed": "Packet summary not confirmed; E22 excluded as restoration proof",
      "run_count": 1,
      "run_note": "Route restored; timing not reliably measured",
      "evidence_ids": "E14;E16;E17"
    },
    {
      "experiment_id": "B",
      "experiment_name": "R4 router failure",
      "protocol": "OSPF",
      "failure_type": "router_failure",
      "failed_element": "R4",
      "test_traffic": "PC1→PC3",
      "route_before": "Equal-cost via R2 (10.0.12.2) and R4 (10.0.41.1)",
      "metric_before": 3,
      "route_after": "via R2 (10.0.12.2)",
      "metric_after": 3,
      "ocrt_seconds": "",
      "ocrt_status": "not_measurable_no_loss",
      "data_status": "NOT_RECORDED",
      "packet_loss_observed": "No loss observed in earlier run; no completed summary",
      "run_count": 1,
      "run_note": "Earlier run; unlike RIP later run; no numeric OCRT; not directly comparable",
      "evidence_ids": "E23;E34;E35;E36;E37"
    },
    {
      "experiment_id": "C",
      "experiment_name": "R1–R2 restoration",
      "protocol": "OSPF",
      "failure_type": "restoration",
      "failed_element": "R1–R2",
      "test_traffic": "PC1→PC2",
      "route_before": "via 10.0.41.1 (R4), then R3, R2",
      "metric_before": 4,
      "route_after": "via 10.0.12.2 (R2)",
      "metric_after": 2,
      "ocrt_seconds": 11,
      "ocrt_status": "measured",
      "data_status": "MEASURED",
      "packet_loss_observed": "Continuous replies with TTL 124→126; no completed summary",
      "run_count": 1,
      "run_note": "Single run; approx.11s to TTL/path change, not outage recovery OCRT",
      "evidence_ids": "E01;E02;E03;E04;E05;E33"
    }
  ],
  "summary": [
    {
      "statistic": "per_link_comparison",
      "scope": "R1–R2",
      "rip_seconds": 26,
      "ospf_seconds": 7,
      "difference_seconds": 19,
      "reduction_percent": 73.0769,
      "ratio": 3.7143,
      "data_status": "MEASURED_SINGLE_RUN",
      "label": "Measured – single run"
    },
    {
      "statistic": "per_link_comparison",
      "scope": "R2–R3",
      "rip_seconds": 24,
      "ospf_seconds": 6,
      "difference_seconds": 18,
      "reduction_percent": 75.0,
      "ratio": 4.0,
      "data_status": "ASSUMED",
      "label": "Assumed (estimated – not measured)"
    },
    {
      "statistic": "per_link_comparison",
      "scope": "R3–R4",
      "rip_seconds": 28,
      "ospf_seconds": 8,
      "difference_seconds": 20,
      "reduction_percent": 71.4286,
      "ratio": 3.5,
      "data_status": "ASSUMED",
      "label": "Assumed (estimated – not measured)"
    },
    {
      "statistic": "per_link_comparison",
      "scope": "R4–R1",
      "rip_seconds": 25,
      "ospf_seconds": 7,
      "difference_seconds": 18,
      "reduction_percent": 72.0,
      "ratio": 3.5714,
      "data_status": "ASSUMED",
      "label": "Assumed (estimated – not measured)"
    },
    {
      "statistic": "arithmetic_mean_across_supplied_links",
      "scope": "All four links",
      "rip_seconds": 25.75,
      "ospf_seconds": 7.0,
      "difference_seconds": 18.75,
      "reduction_percent": 72.8155,
      "ratio": 3.6786,
      "data_status": "MIXED_MEASURED_ASSUMED",
      "label": "Illustrative four-link summary: one measured link and three Assumed estimates; not a repeated-trial average"
    }
  ],
  "evidence": [
    {
      "id": "E01",
      "filename": "Dashboard/assets/screenshots/ospf/restoration/ospf_C_01_route_before.png",
      "protocol": "OSPF",
      "experiment": "restoration",
      "phase": "before",
      "caption": "Initial path",
      "what_it_shows": "192.168.2.0/24 via 10.0.12.2, G0/0, ospf 1, AD 110, cost 2.",
      "source_docx_index": 1,
      "confidence": "confirmed",
      "sha256": "fa069a6cc246f12f0b397c28a86556045b716f6903d35eed42c127d74a64f68f",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E02",
      "filename": "Dashboard/assets/screenshots/ospf/restoration/ospf_C_02_shutdown.png",
      "protocol": "OSPF",
      "experiment": "restoration",
      "phase": "during",
      "caption": "Putting the r1->r2 link down",
      "what_it_shows": "G0/0 shutdown; OSPF process 1 neighbour 192.168.2.1 goes FULL to DOWN.",
      "source_docx_index": 2,
      "confidence": "confirmed",
      "sha256": "8dae43c9b423a5183c07b6aa86a43972a1d7de2e2802a1c708ee7393ea1b2598",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E03",
      "filename": "Dashboard/assets/screenshots/ospf/restoration/ospf_C_03_detour.png",
      "protocol": "OSPF",
      "experiment": "restoration",
      "phase": "after link failure",
      "caption": "New path",
      "what_it_shows": "192.168.2.0/24 via 10.0.41.1, G0/1, OSPF cost 4.",
      "source_docx_index": 3,
      "confidence": "confirmed",
      "sha256": "659c2f1afdb8489bb1b33f88443f70f180e956f854e4b82dbbd6eb670ac30f48",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E04",
      "filename": "Dashboard/assets/screenshots/ospf/restoration/ospf_C_04_ttl_change.png",
      "protocol": "OSPF",
      "experiment": "restoration",
      "phase": "during/after",
      "caption": "TTL change",
      "what_it_shows": "PC1 replies from 192.168.2.10 change TTL 124 to 126; no summary or stopwatch shown.",
      "source_docx_index": 4,
      "confidence": "confirmed",
      "sha256": "7e05332e50a9fafa7185b82faf54e2a1dafedafa054f17fed33df89422d2b8f2",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E05",
      "filename": "Dashboard/assets/screenshots/ospf/restoration/ospf_C_05_restored_route.png",
      "protocol": "OSPF",
      "experiment": "restoration",
      "phase": "after",
      "caption": "Confirming the initial path is taken again",
      "what_it_shows": "192.168.2.0/24 restored via 10.0.12.2, G0/0, OSPF cost 2.",
      "source_docx_index": 5,
      "confidence": "confirmed",
      "sha256": "8010008d431c82caeef675f4b6bdb26daa3317be14a452f3b47c6c1ab90ef426",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E06",
      "filename": "Dashboard/assets/screenshots/topology/topology_ring.png",
      "protocol": "Topology",
      "experiment": "baseline",
      "phase": "proof",
      "caption": "Topology and IP addressing",
      "what_it_shows": "Four 2911 routers, four 2960-24TT switches and four PC-PT devices in plain ring; no IP labels/configuration visible. Caption overstates IP proof.",
      "source_docx_index": 6,
      "confidence": "confirmed",
      "sha256": "302ad9097c3291932d1f434ba6ca3b016679cbfa5aa9c88496376fb3a702f023",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E07",
      "filename": "Dashboard/assets/screenshots/rip/baseline/rip_baseline_R1.png",
      "protocol": "RIP",
      "experiment": "baseline",
      "phase": "before",
      "caption": "R1 RIP",
      "what_it_shows": "show ip route, not config. R1 local IPs .12.1/.41.2/192.168.1.1; LAN2 [120/1]; LAN3 [120/2] equal-cost via R4 and R2.",
      "source_docx_index": 7,
      "confidence": "confirmed",
      "sha256": "de134898f1da01ff42c81d3885a8e4e86942347441a4ee29e11bc6da13a68124",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E08",
      "filename": "Dashboard/assets/screenshots/rip/baseline/rip_baseline_R2.png",
      "protocol": "RIP",
      "experiment": "baseline",
      "phase": "before",
      "caption": "R2 RIP",
      "what_it_shows": "show ip route, not config. R2 local IPs .12.2/.23.1/192.168.2.1; LAN4 [120/2] via R1 and R3.",
      "source_docx_index": 8,
      "confidence": "confirmed",
      "sha256": "6c8ed516080b391d6dad40ea91a60469235ff022307e30d1bd5355beb44553d3",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E09",
      "filename": "Dashboard/assets/screenshots/rip/baseline/rip_baseline_R3.png",
      "protocol": "RIP",
      "experiment": "baseline",
      "phase": "before",
      "caption": "R3 RIP",
      "what_it_shows": "show ip route, not config. R3 local IPs .23.2/.34.1/192.168.3.1; LAN1 [120/2] via R2 and R4.",
      "source_docx_index": 9,
      "confidence": "confirmed",
      "sha256": "36a4779ec5d4dd52783076abc2865a1ae39e21d64cbb37f9889d737e7cd82c47",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E10",
      "filename": "Dashboard/assets/screenshots/rip/baseline/rip_baseline_R4.png",
      "protocol": "RIP",
      "experiment": "baseline",
      "phase": "before",
      "caption": "R4 RIP",
      "what_it_shows": "show ip route, not config. R4 local IPs .34.2/.41.1/192.168.4.1; LAN2 [120/2] via R1 and R3.",
      "source_docx_index": 10,
      "confidence": "confirmed",
      "sha256": "eccb683f93eae44530263f52a01de7a5ea2993c7196ad58dc962451c3c630a2e",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E11",
      "filename": "Dashboard/assets/screenshots/rip/link_failure/rip_A_01_route_before.png",
      "protocol": "RIP",
      "experiment": "link_failure",
      "phase": "before",
      "caption": "RIP route before failure",
      "what_it_shows": "R1 window: LAN2 via 10.0.12.2 G0/0, RIP metric 1, AD 120.",
      "source_docx_index": 11,
      "confidence": "confirmed",
      "sha256": "5317c4db823e85e5dd440f718d895b462115b29929def39a9bcfd60a9a46fd12",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E12",
      "filename": "Dashboard/assets/screenshots/rip/link_failure/rip_A_02_shutdown.png",
      "protocol": "RIP",
      "experiment": "link_failure",
      "phase": "during",
      "caption": "Disabling the r1->r2 link",
      "what_it_shows": "G0/0 shutdown, interface and line protocol down; protocol inferred from surrounding RIP evidence.",
      "source_docx_index": 12,
      "confidence": "confirmed",
      "sha256": "a60cacc61092abbb694c13a7706c7e8948161a498ae9fc8c770808b684aa9b68",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E13",
      "filename": "Dashboard/assets/screenshots/rip/link_failure/rip_A_03_ping.png",
      "protocol": "RIP",
      "experiment": "link_failure",
      "phase": "during/after",
      "caption": "Disabling the r1->r2 link",
      "what_it_shows": "PC1 ping -t 192.168.2.10; initial timeout, replies TTL126, unreachable/timeouts, then replies TTL124. No summary.",
      "source_docx_index": 13,
      "confidence": "confirmed",
      "sha256": "8416d645ee3c694be25adff9560b59a1311dc2c70e9593906c81f1e55a339b94",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E14",
      "filename": "Dashboard/assets/screenshots/rip/link_failure/rip_A_04_route_after.png",
      "protocol": "RIP",
      "experiment": "link_failure",
      "phase": "after",
      "caption": "New path after r1->r2 was disabled",
      "what_it_shows": "LAN2 via 10.0.41.1 G0/1, RIP metric 3.",
      "source_docx_index": 14,
      "confidence": "confirmed",
      "sha256": "8774b286272e048e1bdb4b78e1918214bd32a3ad7615f5760990d90ea5c87c6a",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E15",
      "filename": "Dashboard/assets/screenshots/rip/link_failure/rip_A_05_link_down.png",
      "protocol": "RIP",
      "experiment": "link_failure",
      "phase": "proof",
      "caption": "Visual proof that r1->r2 was disabled",
      "what_it_shows": "Ring topology with R1-R2 red/down and remaining ring links green; no protocol text in image.",
      "source_docx_index": 15,
      "confidence": "confirmed",
      "sha256": "c5309711fcfd68b17f3a2a463bb5f9e8dfa0231866dc998721135a27d8c4b739",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E16",
      "filename": "Dashboard/assets/screenshots/rip/restoration/rip_C_01_no_shutdown.png",
      "protocol": "RIP",
      "experiment": "restoration",
      "phase": "during",
      "caption": "Restoring the r1->r2 link",
      "what_it_shows": "G0/0 no shutdown; interface and line protocol return up.",
      "source_docx_index": 16,
      "confidence": "confirmed",
      "sha256": "958bd265fe58aab595e778d74d85cb2c56a4400352cd7fe53077ff65d09a4dbe",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E17",
      "filename": "Dashboard/assets/screenshots/rip/restoration/rip_C_02_route_restored.png",
      "protocol": "RIP",
      "experiment": "restoration",
      "phase": "after",
      "caption": "Verifying that its back",
      "what_it_shows": "LAN2 restored via 10.0.12.2 G0/0, RIP metric 1.",
      "source_docx_index": 17,
      "confidence": "confirmed",
      "sha256": "4329900991f30733555cb22d94718c9201ef81d6ba3e77fdd697af4ef99a9ce2",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E18",
      "filename": "Dashboard/assets/screenshots/rip/router_failure/rip_B_01_ping.png",
      "protocol": "RIP",
      "experiment": "router_failure",
      "phase": "during/after",
      "caption": "RIP router failure test",
      "what_it_shows": "PC1 ping -t 192.168.3.10, TTL125 replies, unreachable/timeouts, resumed TTL125 replies. No summary/stopwatch; run identity from table/context.",
      "source_docx_index": 18,
      "confidence": "confirmed",
      "sha256": "19946a29ef1b474f3909e9a07065c7ce3c0c4c65659ea3baf233c994eecc064e",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E19",
      "filename": "Dashboard/assets/screenshots/rip/router_failure/rip_B_02_R4_links_down.png",
      "protocol": "RIP",
      "experiment": "router_failure",
      "phase": "proof",
      "caption": "Visual evidence that r4 is down",
      "what_it_shows": "All three R4 incident links red/down, surviving R1-R2-R3 links green; supports R4 unavailable, not timing.",
      "source_docx_index": 19,
      "confidence": "confirmed",
      "sha256": "9b5c53470e6ebdfbff8a5b517974db9ccd0ee0ddca2a552ed854c5ab1a2451f5",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E20",
      "filename": "Dashboard/assets/screenshots/rip/router_failure/rip_B_03_route_after.png",
      "protocol": "RIP",
      "experiment": "router_failure",
      "phase": "after",
      "caption": "Verifying the change",
      "what_it_shows": "LAN3 via 10.0.12.2 G0/0 only, RIP metric 2.",
      "source_docx_index": 20,
      "confidence": "confirmed",
      "sha256": "ea3d2657521aaec1b5cdf703ec13ce5997219915692b5ebbf4c10fa79b6963a0",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E21",
      "filename": "Dashboard/assets/screenshots/rip/router_failure/rip_B_04_power_view.png",
      "protocol": "RIP",
      "experiment": "router_failure",
      "phase": "proof",
      "caption": "R4 is down",
      "what_it_shows": "R4 Physical device/power view; corroborate with image19, not a timestamped failure record.",
      "source_docx_index": 21,
      "confidence": "confirmed",
      "sha256": "881e8362fb0094108d5d2259a8a3693eb4c7b8707da271ba259a98c6bbe46e82",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E22",
      "filename": "Dashboard/assets/screenshots/rip/restoration/rip_unconfirmed_ping_E22.png",
      "protocol": "RIP",
      "experiment": "restoration",
      "phase": "uncertain",
      "caption": "Restoring ping for RIP",
      "what_it_shows": "PC1 fresh ping -t 192.168.2.10; one initial timeout then three TTL126 replies. No TTL transition, restoration action or summary. Could be startup reachability.",
      "source_docx_index": 22,
      "confidence": "needs-confirmation",
      "sha256": "2db4d6cfaa81522ea9652c97a5c85f7002449bf0de24ae16b6484a3299008e21",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E23",
      "filename": "Dashboard/assets/screenshots/ospf/baseline/ospf_baseline_R1.png",
      "protocol": "OSPF",
      "experiment": "baseline",
      "phase": "before",
      "caption": "OSPF R1 baseline",
      "what_it_shows": "OSPF process1, LAN2 [110/2]; LAN3 [110/3] via 10.0.41.1 and 10.0.12.2; route table, not config.",
      "source_docx_index": 23,
      "confidence": "confirmed",
      "sha256": "639fd3b4f39bd4d9c8ac45b4c0cb32328effdf55b9eab55497e13c0ef3fb2bd4",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E24",
      "filename": "Dashboard/assets/screenshots/ospf/baseline/ospf_baseline_R2.png",
      "protocol": "OSPF",
      "experiment": "baseline",
      "phase": "before",
      "caption": "R2 baseline",
      "what_it_shows": "O routes, local .12.2/.23.1/192.168.2.1; LAN4 equal cost 3 via R3 and R1; no config.",
      "source_docx_index": 24,
      "confidence": "confirmed",
      "sha256": "08061042ee9a3a4a23ce47de972182033346dd643099d69395bf3a6da29170d0",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E25",
      "filename": "Dashboard/assets/screenshots/ospf/baseline/ospf_baseline_R3.png",
      "protocol": "OSPF",
      "experiment": "baseline",
      "phase": "before",
      "caption": "R3 baseline",
      "what_it_shows": "O routes, local .23.2/.34.1/192.168.3.1; LAN1 equal cost 3 via R2 and R4; no config.",
      "source_docx_index": 25,
      "confidence": "confirmed",
      "sha256": "0003d630835fbc0884c55ba56ab84546f4c24db3b2651260d1fcabac3138f893",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E26",
      "filename": "Dashboard/assets/screenshots/ospf/baseline/ospf_baseline_R4.png",
      "protocol": "OSPF",
      "experiment": "baseline",
      "phase": "before",
      "caption": "R4 baseline",
      "what_it_shows": "O routes, local .34.2/.41.1/192.168.4.1; LAN2 equal cost 3 via R3 and R1; no config.",
      "source_docx_index": 26,
      "confidence": "confirmed",
      "sha256": "c407d34a42f0777c955f504c69a4c3ef5f2ce79184b07c7e014876fc4067e099",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E27",
      "filename": "Dashboard/assets/screenshots/ospf/baseline/ospf_baseline_neighbors.png",
      "protocol": "OSPF",
      "experiment": "baseline",
      "phase": "before",
      "caption": "OSPF baseline neighbors",
      "what_it_shows": "Two FULL/DR neighbours: IDs 192.168.2.1 and 192.168.4.1 at 10.0.12.2 G0/0 and 10.0.41.1 G0/1; remaining Dead Time 37s, not a configured timer proof.",
      "source_docx_index": 27,
      "confidence": "confirmed",
      "sha256": "26c1aea9e65bcb2e1975c3478f86e3cb3a17155404481c17c5e82b37b1e209f9",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E28",
      "filename": "Dashboard/assets/screenshots/ospf/link_failure/ospf_A_01_route_before.png",
      "protocol": "OSPF",
      "experiment": "link_failure",
      "phase": "before",
      "caption": "OSPF link route before ",
      "what_it_shows": "LAN2 via 10.0.12.2 G0/0, OSPF process1, cost2.",
      "source_docx_index": 28,
      "confidence": "confirmed",
      "sha256": "064abdc60cbad6ba48973462235022f057a74c79498c114df4bc7a96c7933db5",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E29",
      "filename": "Dashboard/assets/screenshots/ospf/link_failure/ospf_A_02_shutdown.png",
      "protocol": "OSPF",
      "experiment": "link_failure",
      "phase": "during",
      "caption": "Disabling the link",
      "what_it_shows": "G0/0 shutdown; process1 neighbour 192.168.2.1 FULL to DOWN.",
      "source_docx_index": 29,
      "confidence": "confirmed",
      "sha256": "62faacfea22df944d826f61c1b65147a6a097f052f93b535993a21d4e995e993",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E30",
      "filename": "Dashboard/assets/screenshots/ospf/link_failure/ospf_A_03_ping.png",
      "protocol": "OSPF",
      "experiment": "link_failure",
      "phase": "during/after",
      "caption": "Pinglog of PC1",
      "what_it_shows": "PC1-to-PC2 replies TTL126, one visible timeout, replies TTL124; no summary.",
      "source_docx_index": 30,
      "confidence": "confirmed",
      "sha256": "006c5a4f2fc9b7287a1ac88d406c3428168d9466592e96439bee4f6dd1d40c79",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E31",
      "filename": "Dashboard/assets/screenshots/ospf/link_failure/ospf_A_04_route_after.png",
      "protocol": "OSPF",
      "experiment": "link_failure",
      "phase": "after",
      "caption": "New route",
      "what_it_shows": "LAN2 via 10.0.41.1 G0/1, OSPF cost4.",
      "source_docx_index": 31,
      "confidence": "confirmed",
      "sha256": "20fd64fcd13d51df2162b6d384496bdf38468ce4579877eb2133a83d2e39c1dc",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E32",
      "filename": "Dashboard/assets/screenshots/ospf/link_failure/ospf_A_05_link_down.png",
      "protocol": "OSPF",
      "experiment": "link_failure",
      "phase": "proof",
      "caption": "Proof that the link is down",
      "what_it_shows": "R1-R2 red/down, remaining ring green; protocol association by document context.",
      "source_docx_index": 32,
      "confidence": "confirmed",
      "sha256": "f9383ebe1aea74e7f4f493d354d3c1c235f2f883824c737a766ddc0ce0f79d80",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E33",
      "filename": "Dashboard/assets/screenshots/ospf/restoration/ospf_C_06_no_shutdown.png",
      "protocol": "OSPF",
      "experiment": "restoration",
      "phase": "during",
      "caption": "Reenabling the link",
      "what_it_shows": "G0/0 no shutdown, interface and line protocol up; contextual OSPF association.",
      "source_docx_index": 33,
      "confidence": "confirmed",
      "sha256": "3009446fc064a9e8ad9c980a70f05660f2d1d882ab659bbbc9224b07c29560ae",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E34",
      "filename": "Dashboard/assets/screenshots/ospf/router_failure/ospf_B_01_ping.png",
      "protocol": "OSPF",
      "experiment": "router_failure",
      "phase": "during/after",
      "caption": "Pinglog for router failure testing",
      "what_it_shows": "PC1 replies from 192.168.3.10 continuously in visible crop, TTL125; no summary, no timestamped failure point, protocol/run association by table/context.",
      "source_docx_index": 34,
      "confidence": "confirmed",
      "sha256": "ccb919f01e7135b0701803ff09442039287efe71ae06a2b56ab127f2b6993ed6",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E35",
      "filename": "Dashboard/assets/screenshots/ospf/router_failure/ospf_B_02_power_view.png",
      "protocol": "OSPF",
      "experiment": "router_failure",
      "phase": "proof",
      "caption": "Proof that R4 is down for this test",
      "what_it_shows": "R4 Physical device/power view; corroborate with image36; does not independently identify protocol/timing.",
      "source_docx_index": 35,
      "confidence": "confirmed",
      "sha256": "bc567dffdd1ffb0777eda1444ba59f1ddc3e80ce9766c217938b5f629e793a59",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E36",
      "filename": "Dashboard/assets/screenshots/ospf/router_failure/ospf_B_03_R4_links_down.png",
      "protocol": "OSPF",
      "experiment": "router_failure",
      "phase": "proof",
      "caption": "Proof that R4 is down for this test",
      "what_it_shows": "R4 three incident links red/down, remaining R1-R2-R3 links green.",
      "source_docx_index": 36,
      "confidence": "confirmed",
      "sha256": "7915f56637c38a3744d9a09eb3b9c7e81b0337481119a4617f914a62cddb9693",
      "source_label": "Recorded evidence (Packet Tracer)"
    },
    {
      "id": "E37",
      "filename": "Dashboard/assets/screenshots/ospf/router_failure/ospf_B_04_route_after.png",
      "protocol": "OSPF",
      "experiment": "router_failure",
      "phase": "after",
      "caption": "Route after R4 is down",
      "what_it_shows": "LAN3 via 10.0.12.2 G0/0 only, OSPF process1, cost3.",
      "source_docx_index": 37,
      "confidence": "confirmed",
      "sha256": "655fc6156d6c95a74df96f0a01bfd6c91a6c4a00b8ad5c139b63200325328d54",
      "source_label": "Recorded evidence (Packet Tracer)"
    }
  ],
  "limitation": "Convergence values reported in this project are Observed Connectivity Recovery Times, measured via external stopwatch against Packet Tracer's simulated continuous ping — not laboratory-grade, isolated routing-protocol convergence measurements. They include human stopwatch reaction time (approx. 0.3–1 second), Packet Tracer's own simulation/event-processing delay, and end-to-end effects (link-down detection, routing recalculation, ARP refresh) rather than pure routing-protocol convergence alone. The metric remains valid for comparing RIP and OSPF because the identical method is applied to both, under identical topology and failure conditions.",
  "references": [
    {
      "id": 1,
      "title": "G. Malkin, “RIP Version 2,” RFC 2453, Nov. 1998, doi:10.17487/RFC2453.",
      "url": "https://www.rfc-editor.org/info/rfc2453/"
    },
    {
      "id": 2,
      "title": "J. Moy, “OSPF Version 2,” RFC 2328, Apr. 1998, doi:10.17487/RFC2328.",
      "url": "https://www.rfc-editor.org/info/rfc2328/"
    },
    {
      "id": 3,
      "title": "C. Hedrick, “Routing Information Protocol,” RFC 1058, Jun. 1988, doi:10.17487/RFC1058.",
      "url": "https://www.rfc-editor.org/info/rfc1058/"
    },
    {
      "id": 4,
      "title": "Cisco, “Cisco IOS IP Routing: RIP Command Reference: RIP Commands,” online documentation, accessed Oct.26,2026.",
      "url": "https://www.cisco.com/c/en/us/td/docs/ios/iproute_rip/command/reference/irr_book/irr_rip.html"
    },
    {
      "id": 5,
      "title": "Cisco, “IP Routing: OSPF Configuration Guide, Cisco IOS XE Release 2,” online documentation, accessed Oct.26,2026.",
      "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_ospf/configuration/xe-2/iro-xe-2-book.pdf"
    }
  ],
  "packetVerification": [
    {
      "filename": "v1_topology_base.pkt",
      "version": "9.0.1.0858",
      "sha256": "25fc6ad5448cd6a1a31ad7dec66bc4093a5231fc67c05f95d24351629e4d260b",
      "routers": [
        {
          "name": "R1",
          "power": "true",
          "protocols": [],
          "running_startup_equal": false
        },
        {
          "name": "R2",
          "power": "true",
          "protocols": [],
          "running_startup_equal": false
        },
        {
          "name": "R3",
          "power": "true",
          "protocols": [],
          "running_startup_equal": false
        },
        {
          "name": "R4",
          "power": "true",
          "protocols": [],
          "running_startup_equal": false
        }
      ],
      "pcs": [
        {
          "name": "PC1",
          "type": "Pc",
          "ip_fields": [
            [
              "IP",
              "192.168.1.10"
            ],
            [
              "SUBNET",
              "255.255.255.0"
            ],
            [
              "PORT_GATEWAY",
              "192.168.1.1"
            ],
            [
              "GATEWAY",
              "192.168.1.1"
            ]
          ]
        },
        {
          "name": "PC2",
          "type": "Pc",
          "ip_fields": [
            [
              "IP",
              "192.168.2.10"
            ],
            [
              "SUBNET",
              "255.255.255.0"
            ],
            [
              "PORT_GATEWAY",
              "192.168.2.1"
            ],
            [
              "GATEWAY",
              "192.168.2.1"
            ]
          ]
        },
        {
          "name": "PC3",
          "type": "Pc",
          "ip_fields": [
            [
              "IP",
              "192.168.3.10"
            ],
            [
              "SUBNET",
              "255.255.255.0"
            ],
            [
              "PORT_GATEWAY",
              "192.168.3.1"
            ],
            [
              "GATEWAY",
              "192.168.3.1"
            ]
          ]
        },
        {
          "name": "PC4",
          "type": "Pc",
          "ip_fields": [
            [
              "IP",
              "192.168.4.10"
            ],
            [
              "SUBNET",
              "255.255.255.0"
            ],
            [
              "PORT_GATEWAY",
              "192.168.4.1"
            ],
            [
              "GATEWAY",
              "192.168.4.1"
            ]
          ]
        }
      ]
    },
    {
      "filename": "v2_rip.pkt",
      "version": "9.0.1.0858",
      "sha256": "888f7aa7ed70c81b59054cd0b8e89fdedfb1a9c2d9e08cc77abfec660797a77e",
      "routers": [
        {
          "name": "R1",
          "power": "true",
          "protocols": [
            "router rip"
          ],
          "running_startup_equal": true
        },
        {
          "name": "R2",
          "power": "true",
          "protocols": [
            "router rip"
          ],
          "running_startup_equal": true
        },
        {
          "name": "R3",
          "power": "true",
          "protocols": [
            "router rip"
          ],
          "running_startup_equal": true
        },
        {
          "name": "R4",
          "power": "true",
          "protocols": [
            "router rip"
          ],
          "running_startup_equal": true
        }
      ],
      "pcs": [
        {
          "name": "PC1",
          "type": "Pc",
          "ip_fields": [
            [
              "IP",
              "192.168.1.10"
            ],
            [
              "SUBNET",
              "255.255.255.0"
            ],
            [
              "PORT_GATEWAY",
              "192.168.1.1"
            ],
            [
              "GATEWAY",
              "192.168.1.1"
            ]
          ]
        },
        {
          "name": "PC2",
          "type": "Pc",
          "ip_fields": [
            [
              "IP",
              "192.168.2.10"
            ],
            [
              "SUBNET",
              "255.255.255.0"
            ],
            [
              "PORT_GATEWAY",
              "192.168.2.1"
            ],
            [
              "GATEWAY",
              "192.168.2.1"
            ]
          ]
        },
        {
          "name": "PC3",
          "type": "Pc",
          "ip_fields": [
            [
              "IP",
              "192.168.3.10"
            ],
            [
              "SUBNET",
              "255.255.255.0"
            ],
            [
              "PORT_GATEWAY",
              "192.168.3.1"
            ],
            [
              "GATEWAY",
              "192.168.3.1"
            ]
          ]
        },
        {
          "name": "PC4",
          "type": "Pc",
          "ip_fields": [
            [
              "IP",
              "192.168.4.10"
            ],
            [
              "SUBNET",
              "255.255.255.0"
            ],
            [
              "PORT_GATEWAY",
              "192.168.4.1"
            ],
            [
              "GATEWAY",
              "192.168.4.1"
            ]
          ]
        }
      ]
    },
    {
      "filename": "v3_ospf.pkt",
      "version": "9.0.1.0858",
      "sha256": "49044ec2731f86b17ad12f604c5d6f922d4c5c1b539a2161a2c9dbc27fcc2240",
      "routers": [
        {
          "name": "R1",
          "power": "true",
          "protocols": [
            "router ospf 1"
          ],
          "running_startup_equal": true
        },
        {
          "name": "R2",
          "power": "true",
          "protocols": [
            "router ospf 1"
          ],
          "running_startup_equal": true
        },
        {
          "name": "R3",
          "power": "true",
          "protocols": [
            "router ospf 1"
          ],
          "running_startup_equal": true
        },
        {
          "name": "R4",
          "power": "true",
          "protocols": [
            "router ospf 1"
          ],
          "running_startup_equal": true
        }
      ],
      "pcs": [
        {
          "name": "PC1",
          "type": "Pc",
          "ip_fields": [
            [
              "IP",
              "192.168.1.10"
            ],
            [
              "SUBNET",
              "255.255.255.0"
            ],
            [
              "PORT_GATEWAY",
              "192.168.1.1"
            ],
            [
              "GATEWAY",
              "192.168.1.1"
            ]
          ]
        },
        {
          "name": "PC2",
          "type": "Pc",
          "ip_fields": [
            [
              "IP",
              "192.168.2.10"
            ],
            [
              "SUBNET",
              "255.255.255.0"
            ],
            [
              "PORT_GATEWAY",
              "192.168.2.1"
            ],
            [
              "GATEWAY",
              "192.168.2.1"
            ]
          ]
        },
        {
          "name": "PC3",
          "type": "Pc",
          "ip_fields": [
            [
              "IP",
              "192.168.3.10"
            ],
            [
              "SUBNET",
              "255.255.255.0"
            ],
            [
              "PORT_GATEWAY",
              "192.168.3.1"
            ],
            [
              "GATEWAY",
              "192.168.3.1"
            ]
          ]
        },
        {
          "name": "PC4",
          "type": "Pc",
          "ip_fields": [
            [
              "IP",
              "192.168.4.10"
            ],
            [
              "SUBNET",
              "255.255.255.0"
            ],
            [
              "PORT_GATEWAY",
              "192.168.4.1"
            ],
            [
              "GATEWAY",
              "192.168.4.1"
            ]
          ]
        }
      ]
    }
  ],
  "assumedLabel": "Assumed (estimated – not measured)",
  "mixedLabel": "Illustrative four-link summary: one measured link and three Assumed estimates; not a repeated-trial average"
};
