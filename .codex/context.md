# Branch Context

## Branch
ThermaPeak

## Purpose
This branch represents a distinct version of the website focused on SEO and affiliate marketing. Its history should remain branch-specific so future work can continue without needing to re-explain the branch goal, prior decisions, and current state.

This repo skeleton is used for multiple affiliate website variants. The Pool Lab is another website based on the same project skeleton, and each site is tracked with its own distinct git branch.

## How To Use This File
- Keep this file version controlled so it travels with the branch.
- Append concise, high-signal session summaries instead of full transcripts.
- Record durable decisions, open questions, implementation notes, and verification results.
- Do not include secrets, API keys, credentials, customer data, or other sensitive information.

## Current Goal
Build ThermaPeak into a focused authority and affiliate website centered on cold plunge tubs, home saunas, and recovery equipment.

Primary objectives:
- Establish topical authority around cold plunge and sauna recovery.
- Create high-converting affiliate content that drives product research and purchase decisions.
- Prioritize revenue-generating content types: Best Of pages, Comparisons, Reviews, and Guides.
- Optimize every page for SEO, internal linking, user trust, and affiliate click-through rate.
- Develop reusable templates and JSON-driven content structures that scale efficiently.

Content architecture:
- Best Of: Primary money pages and product rankings.
- Comparisons: High-intent decision pages (e.g. Product A vs Product B).
- Reviews: Product-specific commercial pages.
- Guides: Evergreen authority content that educates users and funnels them toward commercial pages.

Current strategic focus:
1. Cold Plunge Tubs
2. Home Saunas

Future expansion (after authority is established):
- Red Light Therapy
- Recovery Tools
- Sleep Optimization

Success criteria:
- Strong organic search visibility.
- Clear topical authority in the recovery niche.
- Efficient internal-linking funnel:
  Guides → Comparisons → Best Of → Reviews → Affiliate Click.
- High-quality, conversion-focused page templates that can be reused across the site.


## Important Decisions
- Use `.codex/context.md` as the branch-specific working context file.
- Prefer concise session summaries over verbatim prompt/response history to keep the file useful.
- Keep this file tracked by git.
- After every website change, review and update both SEO test scripts as needed so test coverage stays aligned with the current site behavior:
  - `scripts/seo-smoke-test.sh`
  - `scripts/seo_crawler.py`

## Key Strategic Decisions

### Site Architecture
- Home
- Best Of
- Comparisons
- Guides
- Reviews
- About

### Content Type Definitions
- Best Of pages are primary money pages and should be optimized for affiliate conversions.
- Comparison pages are decision-stage content and should help users choose between products or approaches.
- Review pages are product-specific commercial pages.
- Guide pages are evergreen authority resources and should not be treated as blog posts.

### Internal Linking Funnel
Guides → Comparisons → Best Of → Reviews → Affiliate Click

Every major content type should naturally funnel users toward the next stage of the buying journey.

### Launch Focus
Current launch focus is intentionally narrow:
1. Cold Plunge Tubs
2. Home Saunas

Avoid expanding into broader wellness categories until authority is established.

### Phase 2 Expansion
Future categories include:
- Red Light Therapy
- Recovery Tools
- Sleep Optimization

These should not be prioritized ahead of cold plunge and sauna content.

### Comparison Page Strategy
- Comparisons are a top-level navigation item.
- Comparisons should remain separate from Best Of pages.
- Comparison pages should include FAQ schema.
- Comparison pages should contain clear conversion paths to reviews, Best Of pages, and affiliate destinations.

### Guide Strategy
- Guides are authority assets, not blogs.
- Guides should answer educational questions and support topical authority.
- Guides should link into comparison pages and Best Of pages.

### Design & Branding
Brand:
- ThermaPeak

Tagline:
- Best Cold Plunge & Sauna Equipment Reviewed

Visual direction:
- Premium
- Performance-focused
- Data-driven

Primary palette:
- Charcoal / dark backgrounds
- Ice blue accents
- Ember orange CTAs

### Template Priorities
Highest priority templates:
1. Best Of pages
2. Comparison pages
3. Review pages
4. Guide pages


## Open Questions

The following items remain intentionally unresolved and should be revisited as the site matures:

### Content Expansion
- When should Red Light Therapy be introduced?
- When should Recovery Tools become a primary category?
- When should Sleep Optimization become a primary category?
- Should future expansion remain under ThermaPeak or be split into separate niche sites?

### Monetization
- Should product reviews include a visible scoring methodology?
- Should Best Of pages display weighted category scores?
- Should affiliate links route directly to merchants or through review pages whenever possible?
- Should a Deals or Discounts section be introduced later?

### Site Architecture
- Should Guides eventually be subdivided into Buying Guides, Usage Guides, and Maintenance Guides?
- Should Comparisons eventually support comparison matrices and product scoring visualizations?
- Should category hub pages be expanded beyond the current structure?

### Conversion Optimization
- What CTA placement strategy ultimately produces the highest affiliate click-through rate?
- Should review pages contain comparison widgets?
- Should comparison pages surface live pricing when data sources become available?

### Future Technical Enhancements
- Dynamic affiliate pricing support.
- Automated product score calculations.
- Enhanced schema coverage.
- Programmatic internal-link recommendations.
- Automated content refresh workflows.

These questions should remain separate from settled strategy decisions until validated through testing, traffic, and revenue data.

## Current State
- The branch is named `ThermaPeak`.
- The worktree already contains unrelated uncommitted changes outside this context file.
- This context file was created to preserve branch-specific history going forward.

## Session Log

### 2026-06-08
User asked whether prior prompt history is available. Assistant clarified that only current visible session context is available unless prior context is carried forward.

User asked whether a version-controlled context file would make sense for retaining branch history. Assistant recommended a durable context file with summaries and decisions rather than a full prompt/response transcript.

User requested implementing that recommendation, version controlled, with branch-specific history for a website variant focused on SEO and affiliate marketing. Created `.codex/context.md` for the `ThermaPeak` branch.

User asked to troubleshoot deployment after a macOS update and losing the IntelliJ session, asking whether the issue is a connection issue. Findings:
- Deployment uses IntelliJ Cloud Code Cloud Run configurations.
- Test deployment targets GCP project `thermapeak`, service/image `thermapeak-test`.
- Production deployment configuration still targets `the-pool-lab` project/service/image.
- Initial local shell had `gcloud`, `node`, and `npm` missing from `PATH`.
- `gcloud` exists at `/Users/tomskradski/Downloads/google-cloud-sdk/bin/gcloud`, but no active GCP project is set and `gcloud auth list` reported no credentialed accounts.
- Docker Desktop was initially not running; after launching Docker Desktop, `docker version` succeeded.
- Network checks outside the sandbox reached Google Artifact Registry and the Cloud Run test URL. `https://www.thermapeak.com` responds from Squarespace, not the Cloud Run/Nginx deployment.
- Local Docker build of `Dockerfile` succeeded as image `thermapeak-deploy-test`.
- Local container smoke test passed when using host header `thermapeak-test-925569592209.us-east1.run.app`: `/`, `/reviews`, and `/sitemap.xml` returned `200`.
- With `Host: localhost`, the container redirects to `https://www.thermapeak.com` because the first Nginx server block handles unmatched hostnames.
- Immediate blockers are local Google Cloud SDK PATH/auth/project setup and possible production config/domain routing, not app build failure.
- User clarified there is no production environment for Thermapeak yet. The only Thermapeak Google Cloud deployment target currently in scope is the test Cloud Run instance.
- User clarified that The Pool Lab is a separate website based on the same project skeleton, and both sites are tracked by distinct branches.
- User asked for specific steps to configure the local dev environment to avoid the deployment errors. Recommended focus: put Google Cloud SDK on PATH, reauthenticate `gcloud`, set project to `thermapeak`, ensure Docker Desktop is running before Cloud Code deploys, verify Node/npm availability if needed outside Docker, and use only the Thermapeak test Cloud Run configuration for now.
- User continued having deployment trouble. Follow-up findings: `~/.zshrc` had the Google Cloud SDK path, but `~/.zprofile` was missing, so login shells/IntelliJ-launched contexts still did not see `gcloud` or `docker-credential-gcloud`. Added `~/.zprofile` with `export PATH="$HOME/Downloads/google-cloud-sdk/bin:$PATH"`.
- Docker auth to Artifact Registry works when the SDK path is available. Pulling the existing image without platform failed on Apple Silicon because the remote image is `linux/amd64`; pulling with `--platform linux/amd64` succeeded.
- Local default Docker builds on the Mac produced `linux/arm64`; explicit `docker buildx build --platform linux/amd64` succeeded. Added `scripts/deploy-thermapeak-test.sh` to build/push/deploy the Thermapeak test service using the correct platform and SDK path.
- Ran `bash scripts/deploy-thermapeak-test.sh`; deployment succeeded to Cloud Run revision `thermapeak-test-00034-qnf`, serving 100% of traffic at `https://thermapeak-test-925569592209.us-east1.run.app`.
- Post-deploy smoke checks returned `200` for `/`, `/reviews`, and `/sitemap.xml`.
- Deployment completed with warning: setting IAM policy failed. The service still deployed and served traffic. Suggested command from gcloud was `gcloud beta run services add-iam-policy-binding --region=us-east1 --member=allUsers --role=roles/run.invoker thermapeak-test`.
- User asked why the IntelliJ run configuration is not working correctly. Diagnosis: `.idea/runConfigurations/ThermaPeak_deploy_to_test.xml` uses Cloud Code with `buildEnvironment="Local"` and Docker builder, but it does not specify a target platform. On Apple Silicon, local Docker builds default to `linux/arm64`, while the existing Cloud Run/Artifact Registry path is `linux/amd64`. The run configuration also depends on IntelliJ's GUI process PATH being able to find `gcloud` and `docker-credential-gcloud`; before adding `~/.zprofile` and restarting IntelliJ, those tools were not visible even though the SDK existed.
- User asked to fix the IntelliJ run configuration issue. Updated `Dockerfile` to force both stages to `linux/amd64` via `FROM --platform=linux/amd64 ...`, so Cloud Code's plain local Docker build path produces the expected architecture without needing an explicit Docker CLI `--platform` flag in the run configuration.
- Verified plain `docker build -t thermapeak-cloudcode-plain-build-test .` now creates a `linux/amd64` image. Docker emits warnings that constant platform flags are not preferred, but the build succeeds and the resulting image architecture is correct.
- Verified the fixed plain-built image serves successfully locally with Cloud Run host header: `/` and `/reviews` returned `200`.
- User reported the IntelliJ run configuration still did not work after the Dockerfile platform fix. IntelliJ log showed the direct error: `Cannot run program "null/bin/gcloud"`, meaning Cloud Code's IDE-level Cloud SDK home was unset.
- Found Cloud Code's persistent property keys in the plugin class `CloudSdkServiceUserSettings`: `GCT_CLOUD_SDK_TYPE` and `GCT_CLOUD_SDK_HOME_PATH`. Patched IntelliJ options file `/Users/tomskradski/Library/Application Support/JetBrains/IntelliJIdea2025.3/options/other.xml` to set `GCT_CLOUD_SDK_TYPE` to `CUSTOM_SDK` and `GCT_CLOUD_SDK_HOME_PATH` to `/Users/tomskradski/Downloads/google-cloud-sdk`.
- User should restart IntelliJ after that IDE-level settings file change so Cloud Code reloads the SDK path.
- User asked to check the current Run window error. Latest IntelliJ `idea.log` no longer showed the active `null/bin/gcloud` failure after restart; instead Cloud Code was trying to use/install a Managed Cloud SDK and failing verification/install with `ManagedSdkVerificationException` / `CommandExitException: Process failed with exit code: 1`.
- Confirmed the real local SDK works outside the sandbox: active account `thomas@scorpius-llc.com`, active project `thermapeak`. Docker Desktop is reachable outside the sandbox and reports server arch `arm64` with Docker `29.4.3`.
- Found `/Users/tomskradski/Library/Application Support/JetBrains/IntelliJIdea2025.3/options/other.xml` was missing the Cloud Code SDK keys again, so Cloud Code had fallen back to Managed SDK. Re-added `GCT_CLOUD_SDK_TYPE=CUSTOM_SDK` and `GCT_CLOUD_SDK_HOME_PATH=/Users/tomskradski/Downloads/google-cloud-sdk`.
- Next required action: restart IntelliJ, then verify Settings > Tools > Google Cloud Code > Cloud SDK points to `/Users/tomskradski/Downloads/google-cloud-sdk`. If the Run window still fails, copy the first non-progress error line because the SDK/auth/Docker checks are now healthy from the shell.
- User asked to check `.codex/context.md` and fix the current Run window issue. Latest `idea.log` showed Cloud Code still attempting to install/use the Managed Cloud SDK and failing with `ManagedCloudSdkService` / `CommandExitException: Process failed with exit code: 1`; this means IntelliJ still had not persisted or reloaded the custom SDK setting.
- Re-added Cloud Code settings in `/Users/tomskradski/Library/Application Support/JetBrains/IntelliJIdea2025.3/options/other.xml`: `GCT_CLOUD_SDK_TYPE=CUSTOM_SDK` and `GCT_CLOUD_SDK_HOME_PATH=/Users/tomskradski/Downloads/google-cloud-sdk`.
- Verified the configured SDK home resolves correctly with `gcloud info`, active `gcloud` account is `thomas@scorpius-llc.com`, active project is `thermapeak`, and Docker Desktop is reachable from the real user environment. IntelliJ was still running during the patch, so it needs a full restart before Cloud Code reloads the custom SDK path.

### 2026-06-15
User requested a reusable review template monetization upgrade, prioritizing affiliate conversion quality over simply passing audits.

Implemented reusable review-page upgrades:
- Added an above-the-fold review CTA card with product image, product name, best-for positioning, overall score, summary, standardized CTA buttons, and affiliate disclosure.
- Added standardized CTA handling: `Check Current Price`, `View on Amazon`, and `Visit Official Website`.
- Added mid-article CTA and final verdict CTA sections.
- Added merchant URL fallback logic: `affiliateUrl` → `officialWebsite` → `amazonUrl`.
- Added automatic Product JSON-LD and FAQ JSON-LD on review detail pages.
- Added automatic related links to Best Of guides, comparisons, and guides.
- Added premium review-specific CSS styling in `public/css/style.css`.
- Normalized all products in `data/products.json` to include `score`, `bestFor`, `pros`, `cons`, `affiliateUrl`, `officialWebsite`, `amazonUrl`, `image`, `reviewSummary`, `ownershipExperience`, `overallScore`, and review FAQs.
- Updated `app/reviews/page.js` to use the same merchant URL fallback and standardized `Check Current Price` CTA wording.

Because the branch rule says website changes should update both SEO test scripts, updated:
- `scripts/seo-smoke-test.sh` with review monetization checks for Product schema, standardized CTA text, and outbound merchant CTA links.
- `scripts/seo_crawler.py` with review monetization checks for Product schema, standardized CTA text, and outbound merchant CTA links.

Validation:
- Product metadata validation passed for 39 products with no missing required monetization fields.
- `bash -n scripts/seo-smoke-test.sh` passed.
- `python3 -m py_compile scripts/seo_crawler.py` passed.
- `npm run build` passed inside Docker Node runtime after installing Linux SWC optional packages for the validation container.
- Attempted deploy to Thermapeak test Cloud Run. Build succeeded, but image push failed because `gcloud` needed interactive reauthentication: `Reauthentication failed. cannot prompt during non-interactive execution.`
- Since deploy was blocked by auth, validated the locally built production-equivalent Nginx image with the Cloud Run test host header. Audit result: 78 pages crawled, production readiness `Ready`, summary score `100`, conversion score `99`.
- Review-specific audit targets on the local production-equivalent image: 39 product reviews, 0 missing above-the-fold CTA, 0 missing merchant links, 0 missing Product schema, average review conversion score `100`.

Next required action before deployed test-site verification:
- Reauthenticate Google Cloud locally with `gcloud auth login` or equivalent, then rerun `bash scripts/deploy-thermapeak-test.sh` and `npm run site:audit` against `https://thermapeak-test-925569592209.us-east1.run.app`.

Follow-up after user reauthenticated `gcloud`:
- Reran `bash scripts/deploy-thermapeak-test.sh`; deployment succeeded to Cloud Run revision `thermapeak-test-00036-nxv`, serving 100% of traffic at `https://thermapeak-test-925569592209.us-east1.run.app`.
- Deployment still emitted the known warning that setting IAM policy failed, with suggested command `gcloud beta run services add-iam-policy-binding --region=us-east1 --member=allUsers --role=roles/run.invoker thermapeak-test`; service remained reachable and audit succeeded.
- Reran `npm run site:audit` against the deployed Cloud Run test service. Result: 78 pages crawled, production readiness `Ready`, summary score `100`, conversion score `99`, no blocking launch issues.
- Deployed review-specific audit targets: 39 product reviews, 0 missing above-the-fold CTA, 0 missing merchant links, 0 missing Product schema, average review conversion score `100`.

User requested remaining production-readiness fixes from `audits/latest/summary.md`, with emphasis on stricter launch quality and no Phase 2 category expansion.

Implemented:
- Refactored `/best-of` into a commercial buyer-guide hub with stronger hero, featured category cards, start-here CTAs, and `View Rankings` card CTAs.
- Refactored `/comparisons` into a decision hub with strong hero, featured comparison cards, and `View Comparison` CTAs.
- Added homepage featured category cards for primary cold plunge and sauna buyer paths.
- Added Article JSON-LD to `/guides/[slug]`.
- Added real ItemList JSON-LD to `/best-of/[listId]`; prior metadata-based attempt did not emit a script.
- Added FAQ content to `/best-of/best-budget-cold-plunge`.
- Added real internal CTA destinations to `infrared-vs-traditional-sauna` and `sauna-vs-steam-room`.
- Hardened `scripts/audit-site.js`: separates index pages from detail pages, scopes guide Article schema to detail pages, requires detail-page schema, makes high-priority issues prevent `Ready`, and strengthens money-page/review CTA scoring.
- Created `thermapeak-production-readiness-followup.md`.

Validation:
- Production-facing legacy reference search over `app`, `components`, `data`, `lib`, and `public` returned no hits for `localhost`, Pool Lab terms, `ThePoolLabOG.png`, `robotic pool cleaner`, or `the-pool-lab`.
- `npm run build` passed in Docker Node runtime.
- Deployed to Cloud Run test revision `thermapeak-test-00038-xzs`, serving 100% of traffic at `https://thermapeak-test-925569592209.us-east1.run.app`.
- Final hardened audit against deployed test site: 78 pages crawled, production readiness `Ready`, summary score `100`, all site-level scores `100`, 0 blocking issues, 0 high-priority issues, 0 medium-priority issues, missing schema counts all `0`, missing money-page CTAs `0`, review pages missing merchant links `0`.

User requested affiliate monetization data-model cleanup so product CTAs are fully data-driven and support multiple affiliate destinations.

Implemented:
- Added `affiliateLinks` to all 39 products in `data/products.json` with consistent empty-string values for `amazon`, `manufacturer`, `bestBuy`, `walmart`, `rei`, and `other`.
- Preserved existing `affiliateUrl`, `officialWebsite`, and `amazonUrl` fields for backward compatibility.
- Added `lib/affiliateLinks.js` to normalize `affiliateLinks`, map legacy fields when needed, reject empty/placeholder/non-HTTP destinations, dedupe duplicate URLs, and return valid destinations in the required order.
- Added `components/AffiliateButtons.js` so review pages, Best Of pages, comparison pages, homepage featured products, and the reviews index share the same CTA rendering logic.
- Updated review Product schema offer URLs to use the same primary normalized affiliate destination.
- Replaced local/hardcoded affiliate button builders in review, Best Of, comparison, homepage featured product, and reviews index rendering.
- Updated CTA labels to `Check Price on Amazon`, `View on Official Website`, `View at Best Buy`, `View at Walmart`, `View at REI`, and `Check Current Price`.
- Updated shared CTA CSS so affiliate buttons keep consistent height, radius, spacing, wrapping, and mobile stacking.

Test-script follow-up completed per branch rule:
- Updated `scripts/seo-smoke-test.sh` review monetization checks for the new affiliate CTA labels.
- Updated `scripts/seo_crawler.py` review monetization checks for the new affiliate CTA labels.
- Updated `scripts/audit-site.js` merchant CTA detection and product CTA signals for the new affiliate CTA labels.

Validation:
- Product migration validation passed: 39 products, no missing affiliate destination keys.
- `npm run build` passed in Docker Node; 82 static pages generated.
- Built HTML spot checks showed new CTA labels, Product schema offer URLs, and no disabled/hash placeholder affiliate buttons in the checked output paths.
- `python3 -m py_compile scripts/seo_crawler.py` passed.
- `bash -n scripts/seo-smoke-test.sh` passed.
- `node --check scripts/audit-site.js` passed in Docker Node.
- Deployed-site audit was intentionally not rerun in this turn because the Cloud Run test service was not redeployed after these local code changes.

User reported poor contrast on the review listing filter controls.

Implemented:
- Replaced the Bootstrap `bg-light` filter panel on `/reviews` with a theme-specific `review-filter-panel`.
- Added dark-theme CSS for the filter panel, labels, select control, focus state, options, and range slider track/thumb.
- Reviewed `scripts/seo-smoke-test.sh` and `scripts/seo_crawler.py`; no changes were needed because this was a visual contrast fix with no SEO/crawler behavior change.

Validation:
- `npm run build` passed in Docker Node; 82 static pages generated.

User requested an IntelliJ run configuration to run the site locally in a container for dynamic browser preview.

Implemented:
- Added `scripts/run-thermapeak-local-dev-container.sh`.
- Added `.idea/runConfigurations/ThermaPeak_Local_Dev_Container.xml`.
- The run configuration starts a Node dev container instead of the static Nginx production image, because dynamic preview requires `next dev` with the repo bind-mounted.
- Local URL is `http://localhost:3000`.
- The script uses a Docker named volume for `/work/node_modules` so Linux container dependencies do not pollute the macOS workspace.
- The script exposes optional overrides: `THERMAPEAK_LOCAL_PORT`, `THERMAPEAK_LOCAL_CONTAINER_NAME`, `THERMAPEAK_LOCAL_NODE_IMAGE`, and `THERMAPEAK_LOCAL_NODE_MODULES_VOLUME`.

Validation:
- `bash -n scripts/run-thermapeak-local-dev-container.sh` passed.

User reported the local dev container did not deploy/start.

Debug result:
- The Docker container started and `npm install` completed, but `npm run dev` failed during the lifecycle script.
- Root cause was `package.json` using `predev: "echo."`, which is Windows command syntax. In the Linux Alpine container, `sh` looked for an executable named `echo.` and failed with `sh: echo.: not found`, exit code `127`.

Fix:
- Changed `predev` to the portable shell command `echo .`.

Validation:
- Reran `bash scripts/run-thermapeak-local-dev-container.sh`; Next.js started successfully in Docker.
- Docker showed `thermapeak-local-dev` running with `0.0.0.0:3000->3000/tcp`.
- Host HTTP check to `http://localhost:3000/reviews` returned `200 OK`.

User asked to make optional production cleanup changes and run production tests/audit.

Implemented:
- Removed the stale `the-pool-lab.com` / `www.the-pool-lab.com` Nginx server block from `nginx.conf`.
- Removed old pool-cleaner redirect rules and pool-cleaner review regex from the ThermaPeak Nginx server block.
- Removed the stale `TODO: UPDATE FOR NEW SITE` comment above the ThermaPeak `server_name`.
- Kept ThermaPeak-specific legacy review slug normalization redirects.

Validation:
- Legacy-reference grep over production-facing app/data/public/nginx files now only reports intentional detection strings inside `scripts/audit-site.js`.
- `npm run build` passed in Docker Node; 82 static pages generated.
- Production SEO smoke test passed: 1,586 assertions passed, 0 failed, 188 requests.
- Production SEO crawler passed: 78 pages crawled, 78 sitemap URLs, 0 critical/high/medium/low issues.
- Production site audit against `https://www.thermapeak.com` passed: 78 pages crawled, production readiness `Ready`, summary score `100`, all site-level scores `100`, 0 blocking/high/medium issues, 0 legacy references.

User requested adding Impact site ownership verification to the homepage `<head>`.

Implemented:
- Added exact meta tag to the root layout head: `<meta name="impact-site-verification" value="ad10f236-1238-4f2c-8f1c-31f06727db71" />`.

Validation:
- `npm run build` passed in Docker Node; 82 static pages generated.
- Confirmed `out/index.html` contains the exact verification tag with the requested `value` attribute.

User requested a new top-level ThermaPeak authority section: The Science.

Implemented:
- Added JSON-driven science data files: `data/scienceCategories.json` and `data/scienceArticles.json`.
- Added five science categories: cold exposure, sauna and heat therapy, red light therapy, sleep and recovery, and performance and longevity.
- Added twelve published science article records with summaries, sections, studies, key takeaways, related commercial links, related science links, and FAQs where appropriate.
- Added routes for `/science`, `/science/[categorySlug]`, and `/science/[categorySlug]/[articleSlug]`.
- Added reusable science index, category, and article templates using JSON data rather than hardcoded page content.
- Added Article schema for science article pages and FAQ schema when article FAQs exist.
- Added the requested medical/informational disclaimer on science article pages.
- Added science metadata with production canonical URLs and ThermaPeak OG/Twitter image metadata.
- Added science pages to sitemap generation, including only articles with `status: "published"`.
- Added The Science top-level nav item between Guides and Reviews, with dropdown links to the science home page and all five categories.
- Added premium/research-oriented science styling in `public/css/style.css` for category cards, article shells, key takeaways, study cards, evidence labels, disclaimer, related links, FAQs, and the dropdown.
- Updated `scripts/audit-site.js` so science index, category, and article pages are recognized and scored separately.
- Added science article audit checks for H1, metadata, canonical, Article schema, key takeaways, studies reviewed, disclaimer, relevant internal commercial links, and FAQ schema when FAQs are present.
- Adjusted the audit production-origin check so localhost/127.0.0.1 static-export audits are not falsely blocked by the production canonical sitemap origin; production-domain audits still enforce canonical sitemap origins.

Validation:
- `npm run build` passed in Docker Node; 100 static pages generated.
- `node --check scripts/audit-site.js` passed in Docker Node.
- `bash -n scripts/seo-smoke-test.sh` passed; no smoke script changes were needed for this website change.
- `python3 -m py_compile scripts/seo_crawler.py` passed; no crawler script changes were needed for this website change.
- Local static-export audit against `http://127.0.0.1:4173` passed: 96 pages crawled, production readiness `Ready`, summary score `100`, all site-level scores `100`, 0 blocking/high/medium issues, 0 missing metadata counts, 0 missing schema counts, 0 legacy references.
- Built sitemap contains 18 science URLs: `/science`, five category pages, and twelve published article pages.
- Built article HTML spot-check confirmed The Science nav/dropdown, Article schema, FAQ schema, Key Takeaways, Studies Reviewed, and medical disclaimer are emitted.

Deployment note:
- These science changes have been validated locally against the static export but have not been deployed to Cloud Run or production in this turn.

Workflow preference update from user:
- Do not run local site instances for tests or validation by default.
- User will deploy changes to the Google Cloud test site for validation to avoid local testing/deployment discrepancies.
- Future testing should target the deployed gcloud test site unless the user explicitly requests a local instance.

User requested dynamic ThermaPeak category dropdown navigation and product category pages.

Implemented:
- Added `data/productCategories.json` as the shared category registry for product and science category labels/slugs/descriptions.
- Reduced `data/scienceCategories.json` to science-specific featured-article configuration only, so category names/descriptions are not duplicated there.
- Added `primaryCategory` to every product in `data/products.json` while preserving the existing legacy `category` field.
- Current product category counts: `cold-exposure` = 20, `sauna-heat-therapy` = 19, `red-light-therapy` = 0, `sleep-recovery` = 0, `performance-longevity` = 0.
- Added `lib/categoryRegistry.js` with reusable helpers for category counts, active product categories, product/category matching, and related Best Of/comparison/guide/science content lookup.
- Added `/products` and `/products/[categorySlug]` routes.
- Product category pages render category metadata, product count, product cards, review links, affiliate buttons, related Best Of pages, comparisons, guides, and science articles.
- Empty product categories are hidden from navigation, hidden from homepage/category grids, and omitted from sitemap; direct empty category routes render a coming-soon placeholder.
- Updated `components/Navbar.js` so Products appears after Home and only renders categories with productCount > 0; The Science uses the same shared category registry and continues to show all science categories.
- Updated homepage category cards to be data-driven from active product categories instead of hardcoded Best Of cards.
- Updated `app/sitemap.js` to include `/products` and active product category pages only.
- Added product category styling in `public/css/style.css`.
- Updated `scripts/audit-site.js` to recognize `products` pages and check Products dropdown presence, empty category exposure, product category cards, product category pages, product cards/placeholders, internal links, metadata, and canonicals.

Validation:
- No local site instance was started per user preference.
- `npm run build` passed in Docker Node; 106 static pages generated.
- `node --check scripts/audit-site.js` passed in Docker Node.
- `bash -n scripts/seo-smoke-test.sh` passed; no smoke script changes were needed.
- `python3 -m py_compile scripts/seo_crawler.py` passed; no crawler script changes were needed.
- Built sitemap includes only `/products`, `/products/cold-exposure`, and `/products/sauna-heat-therapy` for product routes.
- Built homepage HTML shows Products dropdown links for only Cold Exposure and Sauna and Heat Therapy; red light therapy, sleep/recovery, and performance/longevity product links are not present.
- Full site audit was not run in this turn because changes are not deployed yet and user requested future validation against the gcloud test site rather than local instances.

Deployed gcloud test validation run:
- Target: `https://thermapeak-test-925569592209.us-east1.run.app`.
- SEO smoke test passed: 1,908 assertions passed, 0 failed, 212 requests. Report: `reports/seo-smoke/latest-test/report.md`.
- Initial SEO crawler run failed because local Python `urllib` could not verify the Cloud Run TLS chain (`SSL: CERTIFICATE_VERIFY_FAILED`), while `curl`, smoke test, and audit all confirmed `/robots.txt` and `/sitemap.xml` returned HTTP 200.
- SEO crawler rerun with the existing `--insecure` diagnostic flag passed: 99 pages crawled, 99 sitemap URLs, 0 critical/high/medium/low issues. Report: `reports/seo-crawl/latest-test/summary.md`.
- Site audit passed: 99 pages crawled, 99 sitemap URLs, production readiness `Ready`, summary score `100`, all site-level scores `100`, 0 blocking/high/medium issues, 0 missing metadata/schema counts, 0 legacy references. Report: `audits/latest/summary.md`.
