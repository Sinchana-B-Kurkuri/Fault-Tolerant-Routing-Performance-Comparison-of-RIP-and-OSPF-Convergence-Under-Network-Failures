# Verification results

The project retains dashboard screenshots, browser checks, canonical-data validation and chart reproducibility records. Temporary inspection files, historical publishing snapshots and duplicate document inventories have been removed.

## Current checks

- **Data and provenance:** 169 checks passed on the review machine, covering supplied values, data mirrors, derived arithmetic, image hashes, estimate labels, original `.pkt` preservation and saved protocol configurations. Three of these checks verify externally supplied source Word documents when they are available; a portable copy without those external documents runs the 166 repository checks. Run `python Scripts/validate_data.py` from the project root.
- **Browser dashboard:** 173 Chromium checks passed, covering scenario steps, all 37 images, evidence filters, lightbox keyboard controls, assumed-values toggle, offline reload, themes, reduced motion and responsive layouts. See `dashboard_test_report.md` and `dashboard_test_results.json`.
- **Firefox:** skipped because its executable could not launch. It is not certified by the Chromium result.
- **Charts:** `chart_reproducibility.json` records matching SHA-256 hashes for all six PNG/SVG figure pairs across successive regenerations.
- **Documents:** the final report and verification document each contain 31 rendered pages. The presentation contains 12 editable slides. Measured/assumed status, certificate wording, original screenshot provenance and table-of-contents references were checked.
- **Organisation and portability:** `verification_results.json` records the current protected-file checks, document validation, local HTTP preview and extracted teammate-package verification.

The dashboard implementation, existing data, charts, saved router configurations and original `.pkt` files were preserved byte-for-byte during folder organisation. Only documentation, packaging and test portability were changed.

## Files

`dashboard_1440x900.png`, `dashboard_experiment_player.png` and `dashboard_analysis.png` show the browser interface. `dashboard_768x1024.png` and `dashboard_375x812.png` show responsive layouts. These are frontend screenshots; the recorded network evidence remains in `Dashboard/assets/screenshots/`.

`data_validation.txt` and `chart_generation_log.txt` record analysis checks. Browser test dependencies are optional and listed separately in `Scripts/requirements-test.txt`. See the root README for installation and execution commands.

No new Packet Tracer experiment was performed for these checks. Saved-file configuration inspection does not independently verify historical stopwatch measurements. E22 remains unconfirmed and excluded as restoration proof; three of the four link-failure timing pairs remain assumed estimates.
