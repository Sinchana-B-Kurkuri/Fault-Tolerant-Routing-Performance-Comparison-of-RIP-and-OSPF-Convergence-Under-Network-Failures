# Results and evidence provenance

`results.csv` and `results.json` contain the 12 supplied experiment/protocol rows. `Dashboard/js/data.js` mirrors them locally so the dashboard opens without a server or fetch requests. The validator checks that these copies agree.

R1–R2 timings are single-run recorded measurements. R2–R3, R3–R4 and R4–R1 are **Assumed (estimated – not measured)**, with zero timed runs and no experiment evidence IDs. All four supplied links enter the descriptive averages of 25.75 s for RIP and 7.00 s for OSPF. The averages and derived reduction of 72.82% include the three assumed cases and are not repeated-trial statistics.

Missing numeric timings remain blank: OSPF's earlier no-loss R4 failure observation has no measurable OCRT, while RIP restoration timing is unreliable. OSPF restoration's approximately 11 s is a TTL/path-return interval. The earlier/later router-failure runs are not directly comparable. Completed ping summaries are absent, so no loss percentages are inferred.

`evidence_manifest.csv` maps all 37 original images from CNPj34.docx to their paths, descriptions and hashes. E22 remains needs-confirmation and is excluded as restoration proof. The dashboard preserves all original evidence images byte-identically.

`original_hashes.json` is the historical preservation record for the source documents and original repository files. Its source-document paths and original README hash describe that baseline; the source Word documents are not runtime dependencies. `packet_file_verification.json` records the read-only saved-configuration inspection. Final configuration exports remain in `Configs/`.

`summary_statistics.csv` records derived arithmetic. `charts/` contains six final PNG/SVG figure pairs. `references.json` contains the project references.

When adding a new experiment, record the timing, trial details and verified evidence, then synchronize CSV/JSON/data.js, regenerate arithmetic and charts, and update the report and slides. Estimates must not be promoted to measurements based only on an illustrative topology path.
