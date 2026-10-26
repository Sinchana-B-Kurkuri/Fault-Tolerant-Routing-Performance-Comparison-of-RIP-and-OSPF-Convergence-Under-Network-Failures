# Completion and remaining review steps

The local deliverables include the31-page editable/PDF report,12-slide editable PPTX with notes and a native chart, offline dashboard,37 lossless evidence images,12 PNG/SVG chart files,12 canonical result rows, five derived comparison rows, eight actual saved running-config exports, three byte-identical named PKT copies, source/evidence ZIPs, README, demo plan,40 viva Q&As and test logs. Every path is listed in Testing/DELIVERABLES.md; sizes/hashes are in Testing/file_inventory.csv.

Measured R1–R2 timings are≈26s RIP/≈7s OSPF, single run each. The other three link pairs are Assumed (estimated – not measured), retained throughout the analysis. The four-case descriptive averages are25.75s/7.00s; reduction of averages72.82%. These mixed-input summaries are not repeated-trial experimental estimates.

## Verification

- Data/provenance:169 checks passed,0 failed in the full repository.
- Chromium:173 offline scenario, interaction, image, responsive and accessibility-related checks passed,0 failed. This is functional coverage, not a formal WCAG certification.
- Document/cross-deliverable checks:95 passed,0 failed; all35 TOC references match the PDF.
- Chart reproducibility and clean source-package regeneration: all12 figure hashes match.
- Original inputs and three PKT submission copies: SHA-256 verification passed.
- Final report pages and slides visually inspected; native Word and PowerPoint export succeeded. LibreOffice is unavailable, so it was not used successfully.
- Firefox could not launch (spawn UNKNOWN), so it remains unverified.

## Disclosed assumptions and unresolved data gaps

Image22 remains needs-confirmation and is excluded as restoration proof. No completed ping summaries establish packet totals/loss percentages. No repeated-run dataset exists. No numeric recovery time is assigned to OSPF’s earlier no-loss router-failure observation. RIP restoration timing remains unreliable. OSPF restoration≈11s is a TTL/path-return interval. Router failure compares unlike earlier/later runs. The hypothesis that OSPF traffic was already forwarding via R2 remains unverified. Three unmeasured link values remain labelled estimates.

Saved file version9.0.1.0858 and protocol separation are verified. OSPF uses broad transit wildcard matching with no explicit router-id commands, differing from guide examples. This system’s hardware is reported as the test machine per the user’s direction. Three stage-specific submission PKTs are an organisational proposal still subject to faculty acceptance. VTOP uploads, rehearsal, institutional similarity review, external backup and post-push access checks require human completion.

## Three likely viva challenges

1. **Single runs:** acknowledge n=1 and stopwatch/simulator effects. The materials make no statistical significance claim and recommend repeated matched trials.
2. **Assumed links and averages:** show the hatch/status labels and measured-only toggle. Explain that the three estimates are illustrative, have no evidence IDs, and that the arithmetic average includes them.
3. **Router-failure comparison:** disclose RIP’s later run versus OSPF’s earlier run. No-loss OSPF is not0s, and no protocol ranking is made for this scenario.

## Git state

The user explicitly approved local commits and a push to the existing main branch. The commit series is recorded in Docs/COMMIT_PLAN.md and Git history. Original commit ab5da88 and all earlier historical commits remain preserved, as do the original PKT files. No force-push, history rewrite, remote branch or PR is part of this publication. Verify current local/remote state with git status and git log; the publication check confirms remote main and the public deliverable paths.
