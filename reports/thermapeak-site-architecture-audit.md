# ThermaPeak Site Architecture Audit

Generated: 2026-05-28T17:59:20Z

## Summary

- Sitemap source audited: `app/sitemap.js`, `data/guides.json`, `data/best-lists.json`, `data/products.json`, `data/comparisons.json`.
- Current exported sitemap regenerated at `out/sitemap.xml` from ThermaPeak route data.
- Legacy pool-cleaner URLs were removed from the exported sitemap and mapped in `nginx.conf` to relevant ThermaPeak pages.
- Review URLs now use normalized lowercase slug generation through `lib/routes.js`.

## URLs Removed From Sitemap

- https://www.the-pool-lab.com
- https://www.the-pool-lab.com/about/
- https://www.the-pool-lab.com/guides/
- https://www.the-pool-lab.com/reviews/
- https://www.the-pool-lab.com/blog/robotic-pool-cleaner-weight-why-it-matters/
- https://www.the-pool-lab.com/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris/
- https://www.the-pool-lab.com/blog/corded-vs-cordless-robotic-pool-cleaners/
- https://www.the-pool-lab.com/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines/
- https://www.the-pool-lab.com/blog/why-you-need-a-robot-pool-cleaner/
- https://www.the-pool-lab.com/blog/top-5-features-to-look-for/
- https://www.the-pool-lab.com/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool/
- https://www.the-pool-lab.com/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier/
- https://www.the-pool-lab.com/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools/
- https://www.the-pool-lab.com/blog/polaris-vs-dolphin-robotic-pool-cleaners/
- https://www.the-pool-lab.com/blog/best-robotic-pool-cleaner-for-large-pools/
- https://www.the-pool-lab.com/blog/best-robotic-pool-cleaner-for-deep-pools/
- https://www.the-pool-lab.com/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport/
- https://www.the-pool-lab.com/best-of/overall/
- https://www.the-pool-lab.com/best-of/value/
- https://www.the-pool-lab.com/best-of/leaves/
- https://www.the-pool-lab.com/best-of/above-ground/
- https://www.the-pool-lab.com/best-of/vinyl/
- https://www.the-pool-lab.com/best-of/inground/
- https://www.the-pool-lab.com/reviews/Dolphin-Nautilus-CC-Plus/
- https://www.the-pool-lab.com/reviews/Dolphin-Premier/
- https://www.the-pool-lab.com/reviews/Dolphin-Nautilus-Titan/
- https://www.the-pool-lab.com/reviews/Dolphin-Sigma/
- https://www.the-pool-lab.com/reviews/Polaris-9650iQ-Sport/
- https://www.the-pool-lab.com/reviews/Polaris-F9550-Sport/
- https://www.the-pool-lab.com/reviews/Polaris-P39/
- https://www.the-pool-lab.com/reviews/Hayward-TigerShark-QC/
- https://www.the-pool-lab.com/reviews/Hayward-SharkVac-XL/
- https://www.the-pool-lab.com/reviews/Hayward-W3PVS20JST-Poolvergnuegen/
- https://www.the-pool-lab.com/reviews/Pentair-Prowler-930/
- https://www.the-pool-lab.com/reviews/Aiper-Scuba-S1/
- https://www.the-pool-lab.com/reviews/Aiper-Seagull-Pro/
- https://www.the-pool-lab.com/reviews/BWT-Pool-Robot-ES-Nano/
- https://www.the-pool-lab.com/reviews/Beatbot-AquaSense-2/

## URLs Added To Sitemap

- https://www.thermapeak.com
- https://www.thermapeak.com/about
- https://www.thermapeak.com/guides
- https://www.thermapeak.com/best-of
- https://www.thermapeak.com/reviews
- https://www.thermapeak.com/comparisons
- https://www.thermapeak.com/guides/cold-plunge-temperature-guide
- https://www.thermapeak.com/guides/cold-plunge-benefits-and-risks
- https://www.thermapeak.com/guides/cold-plunge-after-workout
- https://www.thermapeak.com/guides/cold-plunge-maintenance-guide
- https://www.thermapeak.com/guides/cold-plunge-chiller-guide
- https://www.thermapeak.com/guides/how-to-set-up-a-diy-cold-plunge
- https://www.thermapeak.com/guides/ice-vs-chiller-cost-guide
- https://www.thermapeak.com/guides/winterizing-an-outdoor-cold-plunge
- https://www.thermapeak.com/guides/cold-plunge-for-weight-loss-and-metabolism
- https://www.thermapeak.com/guides/are-cold-plunges-worth-it
- https://www.thermapeak.com/guides/how-to-choose-a-home-sauna
- https://www.thermapeak.com/guides/infrared-sauna-benefits
- https://www.thermapeak.com/best-of/best-cold-plunge-tubs
- https://www.thermapeak.com/best-of/best-cold-plunge-with-chiller
- https://www.thermapeak.com/best-of/best-budget-cold-plunge-tubs-under-200
- https://www.thermapeak.com/best-of/best-budget-cold-plunge
- https://www.thermapeak.com/best-of/best-cold-plunge-for-tall-people
- https://www.thermapeak.com/best-of/best-cold-plunge-for-small-spaces
- https://www.thermapeak.com/best-of/best-cold-plunge-outdoor
- https://www.thermapeak.com/best-of/best-cold-plunge-for-beginners
- https://www.thermapeak.com/best-of/best-home-saunas
- https://www.thermapeak.com/best-of/best-infrared-saunas
- https://www.thermapeak.com/best-of/best-outdoor-saunas
- https://www.thermapeak.com/reviews/sunhome-cold-plunge-pro
- https://www.thermapeak.com/reviews/sunhome-cold-plunge-portable-horizontal
- https://www.thermapeak.com/reviews/plunge-standard
- https://www.thermapeak.com/reviews/plunge-all-in
- https://www.thermapeak.com/reviews/renu-cold-stoic-classic
- https://www.thermapeak.com/reviews/renu-cold-stoic-2-0
- https://www.thermapeak.com/reviews/edgetheorylabs-tub-chiller-setup
- https://www.thermapeak.com/reviews/icebarrel-pro
- https://www.thermapeak.com/reviews/penguinchillers-tub-setup
- https://www.thermapeak.com/reviews/icebarrel-400
- https://www.thermapeak.com/reviews/icebarrel-300
- https://www.thermapeak.com/reviews/thecoldpod-icebath
- https://www.thermapeak.com/reviews/gganen-ice-bath-tub
- https://www.thermapeak.com/reviews/polar-recovery-tub
- https://www.thermapeak.com/reviews/tuffstuff-stock-tank-100gal
- https://www.thermapeak.com/reviews/nurecover-ice-bath
- https://www.thermapeak.com/reviews/lumi-recovery-pod
- https://www.thermapeak.com/reviews/vevor-ice-bath-tub
- https://www.thermapeak.com/reviews/calmmax-portable-ice-bath
- https://www.thermapeak.com/reviews/hydragun-supertub
- https://www.thermapeak.com/reviews/sunhome-equinox-2p-infrared
- https://www.thermapeak.com/reviews/sunhome-luminar-1p-infrared
- https://www.thermapeak.com/reviews/dynamic-barcelona-1-2p
- https://www.thermapeak.com/reviews/dynamic-andora-2p
- https://www.thermapeak.com/reviews/jnh-joyous-2p
- https://www.thermapeak.com/reviews/serenelife-portable-infrared
- https://www.thermapeak.com/reviews/higherdose-infrared-sauna-blanket
- https://www.thermapeak.com/reviews/almostheaven-barrel-morgan
- https://www.thermapeak.com/reviews/almostheaven-barrel-salem
- https://www.thermapeak.com/reviews/almostheaven-bluestone-3p
- https://www.thermapeak.com/reviews/dundalk-barrel-sauna
- https://www.thermapeak.com/reviews/aleko-barrel-sauna
- https://www.thermapeak.com/reviews/goldendesigns-monaco-3p
- https://www.thermapeak.com/reviews/goldendesigns-maxxus-2p
- https://www.thermapeak.com/reviews/dynamic-venice-2p
- https://www.thermapeak.com/reviews/jnh-ensi-4p
- https://www.thermapeak.com/reviews/sunlighten-mpulse-series
- https://www.thermapeak.com/reviews/sunhome-hybrid-series
- https://www.thermapeak.com/reviews/clearlight-sanctuary-2
- https://www.thermapeak.com/comparisons/portable-pod-vs-stock-tank-diy
- https://www.thermapeak.com/comparisons/ice-barrel-vs-tub-style-cold-plunge
- https://www.thermapeak.com/comparisons/ice-barrel-300-vs-ice-barrel-400
- https://www.thermapeak.com/comparisons/sun-home-cold-plunge-pro-vs-plunge-all-in
- https://www.thermapeak.com/comparisons/plunge-standard-vs-plunge-all-in
- https://www.thermapeak.com/comparisons/cold-plunge-vs-ice-bath
- https://www.thermapeak.com/comparisons/infrared-vs-traditional-sauna
- https://www.thermapeak.com/comparisons/cold-plunge-vs-cryotherapy
- https://www.thermapeak.com/comparisons/penguin-chiller-setup-vs-all-in-one-plunge-systems
- https://www.thermapeak.com/comparisons/sauna-vs-steam-room

## Required Pages Check

- Required guide pages present: cold-plunge-temperature-guide, are-cold-plunges-worth-it, how-to-choose-a-home-sauna, cold-plunge-maintenance-guide, infrared-sauna-benefits.
- Required sauna Best Of pages present: best-home-saunas, best-infrared-saunas, best-outdoor-saunas.
- Missing required guide pages: none.
- Missing required sauna Best Of pages: none.

## Missing Pages Still Recommended

- `/best-of/best-red-light-therapy-devices` for the secondary Red Light Therapy category.
- `/best-of/best-recovery-tools` for the secondary Recovery Tools category.
- `/comparisons/infrared-sauna-vs-sauna-blanket` to support sauna-adjacent decision traffic.
- `/guides/red-light-therapy-benefits` to add authority coverage for the secondary category.

## Internal Linking Gaps Discovered

- No blocking gaps found in the primary funnel: Guides -> Comparisons -> Best Of -> Reviews -> Affiliate CTA.
- Guide routes and guide metadata now use non-trailing-slash URLs.
- Sauna Best Of pages link to sauna guides and comparisons, and reviews are linked from Best Of tables/cards.
- Comparison pages expose related Best Of guides through `related_best_of`; keep adding this field for every new comparison page.
- Affiliate CTAs exist on review pages and Best Of product rows/cards.

## Sitemap Validation

- Total URLs: 78
- Legacy pool-related URLs in regenerated sitemap: none
- Trailing slash URLs in regenerated sitemap: none
