# Document and cross-deliverable QA

Report:31 pages, generated from a copy of the official template. Abstract238 words on one page. Cover member order24BCE2479 then24BDS0352. Exact certificate sentence retained with only title/member substitutions; official student-signature layout retained. The supplied template does not specify a faculty/HoD signature block, so none was invented. Faculty Dr.Sreethar S is included in project metadata.

The packaged render_docx.py was attempted and failed because soffice.exe is unavailable. Microsoft Word was then used read-only for template export and natively for final report export. Fields were refreshed after repagination and saved again after export, so the editable DOCX’s cached TOC values agree with the PDF. PyMuPDF rendered every PDF page to PNG for inspection. The source DOCX remains hash-identical.

Visual review: all31 final report pages and all12 final slide images inspected individually. Checked cover/logo/date, names, abstract, certificate, TOC, typography, table wrapping/repeated headers, readable figures, evidence/status captions, source code listings, appendix rows, no clipping or overlapping objects. The final evidence-manifest heading stays with its table. Report source media, including the VIT logo, match the known source/chart hashes.

Presentation:12 editable slides. PowerPoint opened the final PPTX and exported all slides as1600×900 PNGs and a QA PDF. Native chart values match26/24/28/25 and7/6/8/7; six assumed bars have hatch fill and dashed outlines. Tables and slide text remain editable. Speaker notes on every slide carry source/caveat details. Geometry/package checks found no errors; one conservative table-height warning on slide7 was reviewed against the actual PowerPoint rendering, with no overlap present.

Data honesty: all supplied link timings retained. R1–R2 is a single-run measurement, the other three links are Assumed (estimated – not measured). Mixed descriptive averages25.75s/7.00s and72.82% reduction of averages are consistently labelled as including three assumed links. No repeated-trial SD, confidence interval, error bars or statistical significance. OSPF B has no numeric zero; RIP C remains unreliable timing. OSPF C≈11s is a TTL/path-return interval. ExpB run non-comparability is explicit. E22 remains flagged and excluded as restoration proof. No packet totals/loss percentages were invented.

Evidence correspondence: document/PPT media hashes checked against original manifest images, chart outputs or tested dashboard screenshots. Assumed rows have no experiment evidence IDs. All37 original PNG exports are byte-identical. Actual saved running-config exports are distinguished from guide-intended examples. PKT inspection verified protocol separation and saved version9.0.1.0858 without running new experiments.

References: verified primary RFCs and Cisco documentation only. No unverified candidate research-paper findings or metadata were added. The report makes an educational comparison, with no claim to outperform literature.

Checks and limits:

- Data/provenance validation: see data_validation.txt.
- Offline Chromium scenario/interaction/responsive verification:173 checks passed. Firefox’s downloaded executable could not launch (spawn UNKNOWN); Firefox is skipped, not certified.
- Chart reproducibility: all12 PNG/SVG hashes identical across two successive regenerations.
- Source ZIP portability: extracted into an isolated directory, generated all12 chart files from clean output state with identical hashes, validated data, loaded all37 images offline and passed360px layout. Source-only packages explicitly skip absent original-PKT preservation checks; full-repository checks include them.
- Document/cross-artifact checks:95 passed,0 failed, including35 real TOC page references.
- Public repository reachable without authentication; remote main matches original HEAD. This QA was completed before the user subsequently approved the commit and push. Publication state is recorded separately in Git history and Testing/publication_verification.json.
- Submission copies match originals and all files are below100MB. VTOP uploads, faculty acceptance of three stage-specific PKTs, institutional similarity checks, rehearsal and external backup remain human steps.

Final artifact SHA-256:

- Report/F1_Team21_Report.docx: `b3f8eff34b44b0303d765e4f3bce2f5956788a3b9785a376ec31080bc67e0300`
- Report/F1_Team21_Report.pdf: `93d2322553e9a019603e141a9916f4face038087b622dba02e1ec1f83c7b228a`
- Presentation/F1_Team21_PPT.pptx: `ccba1bc5a74f2055ff3fca46acc5e75dcf4593a2a1817929abcb862b40428f12`
