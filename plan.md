# Website Expansion Plan (Living Document)

Last updated: 2026-03-29
Status: Phase 1 complete, Phase 2 ready for execution
Owner: Client project (forHer)

## Purpose

This document is the single source of truth for planning and development.
From this point onward, every major decision, scope change, and implementation step should be recorded here so we do not lose context between prompts.

## Conversation Log

### 2026-03-29 - Initial expansion request

Client goals captured:

- Expand family/friends content significantly.
- Move from brief mentions to dedicated pages for key people.
- Add navigation entries for:
  - Me
  - My Parents
  - My Sister
  - My Cousins
  - My Aunts and Uncles
  - My Friends
  - Him
- Cousin count: around 40 (plus/minus)
- Aunts/uncles also need stronger representation and dedicated coverage.
- "Him" page must be password protected because parents may view the site and access should be restricted.

Proposed information architecture from conversation:

- Me:
  - Personal page about the client.
- My Parents:
  - Parent gateway page.
  - This page links to two dedicated detail pages:
    - Father page
    - Mother page
  - Constraint: father/mother pages are only discoverable through the parents page.
- My Sister:
  - Dedicated page for sister.
- My Cousins:
  - Cousin gateway page with cards.
  - Each cousin card links to a dedicated cousin detail page.
- My Aunts and Uncles:
  - Gateway page with cards.
  - Each card links to a dedicated page per aunt/uncle.
- My Friends:
  - Gateway page featuring main best friend prominently.
  - Best friend links to her own dedicated detail page.
  - Additional friends listed below and each can have dedicated pages.
- Him:
  - Dedicated password-protected page.

### 2026-03-29 - Focus shifted to Me page audit (content + flow + structure)

Requested analysis points:

- Check whether the Me page covers:
  - Academic journey (end-to-end)
  - Where she is from / hometown
  - Early childhood and growing up
  - Dreams and ambitions
  - Primary school and high school
  - Journey to UJ and why UJ
  - Lecturers / support system
  - Personal story arc, challenges, breakthroughs
  - Exams, graduation, and post-grad direction
- Evaluate whether the narrative has conversational flow.
- Decide whether all content should stay on one Me page or be split into inner pages.
- Evaluate design vibe target: memory lane / scrapbook / diary / picture gallery / on-paper.

Audit snapshot against current implementation:

- Covered strongly:
  - Why UJ
  - University-year progression
  - Struggle/challenge arc
  - Graduation day
  - Short post-grad outlook
  - Photo-led storytelling
- Partially covered:
  - Exams (indirect references only)
  - Breakthroughs (present but broad)
- Missing or very thin:
  - Hometown/origin story
  - Early childhood and growing-up background
  - Primary school and high school phases
  - Specific lecturers/mentors and their influence
  - Concrete post-grad plan (industry role, timeline, goals)

Proposed content architecture for Me:

- Keep on main Me page:
  - Hero + identity statement
  - Why UJ summary
  - 5-year timeline summary
  - Signature challenge + breakthrough story
  - Graduation + short "what next" block
  - Curated gallery/memory strip
- Move to dedicated inner pages (recommended):
  - Origin Story page (hometown, childhood, early influences)
  - School Years page (primary + high school journey)
  - UJ Deep Dive page (modules, lecturers, exam seasons, projects)
  - Next Chapter page (post-grad plan, ambitions, milestones)

Flow recommendation:

- Use one narrative spine on Me page: "Before UJ -> Why UJ -> The Grind -> Breakthrough -> Graduation -> What's Next".
- Use "Read more" links at each major chapter to open deeper inner pages.

Design direction recommendation:

- Keep current photo-rich chapter structure.
- Push visuals further toward "memory lane / scrapbook / diary" with:
  - Date-stamped notes
  - Polaroid-style photo frames
  - Handwritten-style callouts
  - "Tape" and paper texture motifs
  - Scanned-note style micro-captions

### 2026-03-29 - Me page implementation pass (focus-only scope)

Completed in this pass:

- Added a new "Before UJ" chapter on the Me page to introduce:
  - Hometown context
  - Early childhood tone
  - Primary/high school bridge
  - Dreams/ambition setup
- Improved narrative continuity between pre-UJ and UJ chapters.
- Added lecturer/mentor influence mention in the grind chapter.
- Strengthened challenge arc with explicit test/exam pressure reference.
- Updated highlights content to better align with Food Technology story consistency.
- Expanded post-grad copy with clearer near-term direction.
- Added an "Open The Full Story" entry-map section on Me page that plans inner pages for:
  - Origin Story
  - School Years
  - UJ Deep Dive
  - Next Chapter
- Added CSS styling and reveal animations for all newly introduced Me-page sections.

Status after this pass:

- Me page moved from "high-level university story" to "hub page with structured depth and planned deep-link entry points".
- Inner pages are intentionally not created yet in this pass; entry points are presented as planned cards.

## Scope Breakdown

### Navigation and routing

- [ ] Add/replace global nav labels and links with final structure.
- [ ] Ensure nav consistency across all pages.
- [ ] Define URL/page naming conventions before creating many files.

### Core pages (top-level)

- [x] Me page (hub + 4 inner pages complete and linked in narrative flow)
- [ ] My Parents gateway page
- [ ] My Sister page
- [ ] My Cousins gateway page
- [ ] My Aunts and Uncles gateway page
- [ ] My Friends gateway page
- [ ] Him (protected) page

### Parent detail pages

- [ ] Father detail page
- [ ] Mother detail page
- [ ] Parents-only discoverability behavior (from parents page pathing)

### Cousin system

- [ ] Data model for ~40 cousins (name, image, optional note)
- [ ] Cousin gateway cards
- [ ] Individual cousin pages
- [ ] At least one displayed photo for each cousin

### Aunts and uncles system

- [ ] Data model for aunts/uncles (name, image, optional note)
- [ ] Gateway cards
- [ ] Individual detail pages

### Friends system

- [ ] Highlight section for main best friend
- [ ] Dedicated best-friend page
- [ ] Additional friends list
- [ ] Optional dedicated pages for each additional friend

### Access protection (Him)

- [ ] Select protection method (client-side gate now, stronger backend later if needed)
- [ ] Implement password gate UX
- [ ] Prevent obvious page content exposure before password entry
- [ ] Document limitation: front-end-only protection is obfuscation, not true security

## Technical Strategy (Draft)

- Reuse existing CSS and JavaScript structure where possible to avoid duplication.
- Prefer data-driven rendering for cousin/aunt/friend cards to scale content.
- Store people metadata in JSON and generate cards/pages from templates or reusable JS patterns.
- Keep mobile support and performance in mind because image count will grow.

## Risks and Constraints

- Managing 40+ cousin pages manually can be error-prone without templates.
- Large number of images can slow load times; we should optimize/resize and lazy-load.
- Password protection on static frontend has security limitations.

## Open Questions

- Final naming convention for generated pages (slug pattern).
- Final count and list of cousins, aunts/uncles, and friends.
- Content depth per person page (short bio only vs timeline/gallery).
- Password policy/wording for the protected page.

## Immediate Next Steps

1. Confirm and lock final navigation labels and page slugs.
2. Design a scalable data model for all person categories.
3. Build one complete vertical slice:
   - One gateway page
   - Two detail pages
   - Shared card component style
4. Then scale generation across cousins/aunts/friends.

## Change Log

- 2026-03-29: Created this plan document and captured initial architecture proposal from client conversation.
- 2026-03-29: Added Me-page content audit criteria, gap analysis, and proposed split between main page and inner pages.
- 2026-03-29: Implemented Me-page content and structure update with pre-UJ chapter and inner-page entry-map cards.
- 2026-03-29: Restructured entry points: moved from separate bottom section to inline "Go Deeper" buttons embedded within Roots, Timeline, and Next Chapter sections.
- 2026-03-29: Designed and built Origin Story inner page (first of four planned inner Me pages) with rich layouts and multiple photo showcases:
  - Hero gateway section with context bridge from Me page
  - Hometown context section with two-column content + 5-item photo gallery
  - Early childhood section with hero image + memory grid + photo strip carousel
  - Family foundation section with 3 family member/house cards + complex family photo grid showcase
  - Early influences section with 3 influence cards (teacher, mentor, peer)
  - Ambition timeline section with 4 timeline nodes (age progression)
  - Reflection/bridge section with quote and photo
  - CTA footer to return to Me page
  - Full CSS styling (origin-story.css) with responsive layouts for all sections
  - Comprehensive JavaScript animations (origin-story.js) with scroll-triggered reveals, hover effects, and smooth transitions
- 2026-03-29: DECISION: Each inner page uses completely unique layout structure (not template-based) to maintain visual variety and intensity.
- 2026-03-29: Built School Years inner page (second of four planned inner Me pages) with completely different layout approach:
  - Hero gateway section with deep context intro
  - Primary school era section: left sidebar timeline with 3 dot markers + right photo grid (hero + pair layout)
  - High school section: 5 grade cards (8-12) with alternating left-right layout, grade header with separator, key moment callout
  - Friendships section: 3 alternating profile cards (text + photo alternating sides)
  - Achievements section: 4-card wall (academic, science fair, leadership, exams) with emoji icons
  - Ambition shift section: 2-col (thoughts + values list) with photo on right
  - Reflection section: centered quote + final words with stagger
  - CTA footer with back-to-me-page + forward-to-uj-deep-dive buttons
  - Full CSS styling (school-years.css) with 550+ lines: split layouts, grade card progressions, alternating profiles, centered reflections
  - Comprehensive JavaScript animations (school-years.js) with 400+ lines: counter animations (grade numbers), alternating entrances (left/right x-offset), rotation-based stagger, line-draw effects, hover lift + shadow interactions
  - Same intensity and photo-richness as Origin Story but with completely distinct visual approach
- 2026-03-29: Built UJ Deep Dive inner page (third of four planned inner Me pages) with completely unique layout structure:
  - Hero gateway section with deep university context intro
  - Lecturer profiles section: 4 lecturer cards (horizontal grid) with icon, name, role, impact statement, influence area
  - Semester progression: 3 year blocks (Y1/Y2/Y3) with semester-scoped module cards (offset staggered grid, color-coded by level: foundational/specialized/advanced)
  - Lab work section: 3 showcase items with alternating left-right layout (content/image alternating), lab technique labels, key learnings
  - Projects section: 3 project cards (header/body/image progression) with challenge/image/result breakdown
  - Skills progression section: 3 skill domains (lab techniques, analytical/data, conceptual understanding) with 4 skills per domain + visual progress bars (width-based animation)
  - Breakthrough moment: centered narrative section with marker + title + 4-paragraph story
  - Reflection section: 2-col layout (h2 + 4-point grid + closing box) with centered closing reflection
  - CTA footer with back-to-me + forward-to-next-chapter buttons
  - Full CSS styling (uj-deep-dive.css) with 700+ lines: lecturer 4-up grid, offset module cards, alternating lab items, project card progression, skill domain cards with progress bars, centered breakthrough, reflection grid
  - Comprehensive JavaScript animations (uj-deep-dive.js) with 400+ lines: lecturer card hover (top border draw), module stagger with rotation, lab items alternating entrance, project cards left-right stagger, skill bar width animation, breakthrough fade-stagger, reflection grid bounce entrance
  - Completely different approach from Origin Story + School Years: no carousels, no grade cards, no achievement wall—instead: lecturers grid, semester module progression, project breakdown, skills with visual bars
- 2026-03-29: Built Next Chapter inner page (fourth and final planned inner Me page) with completely unique layout structure:
  - Hero gateway section with post-grad context intro
  - 90-day immediate next section: 3 timeline cards (search & apply → interview & decide → commit & onboard) with timeline dot markers, task lists, priority labels
  - 5-year career pathway: 5 phase cards (entry/establish/lead/specialize/impact) with phase-scoped goals and focus areas
  - Dual growth tracks section: 2-col layout (career track left + personal track right) with vertical connector between them, 4 yearly markers per track
  - Vision statement section: centered vision box + 4 pillar cards (technical mastery, leadership, impact, authenticity)
  - Challenges & reality section: 6 challenge cards (impostor syndrome, burnout, wrong company, limiting beliefs, isolation, comparison) with problem/preparation breakdown
  - Commitment section: centered commitment statement + 8-item commitment list with checkmark animation
  - CTA footer with back-to-me + home buttons
  - Full CSS styling (next-chapter.css) with 650+ lines: timeline with dot markers, pathway 5-phase grid, dual growth tracks with connector, vision pillars, challenge cards, commitment list
  - Comprehensive JavaScript animations (next-chapter.js) with 400+ lines: timeline marker pop animations, pathway phase stagger with scale, growth track parallel entrances (left/right simultaneous), vision pillar bounce entrance, challenge card scale-entrance, commitment list checkmark stagger
  - Completely different approach from all previous pages: no photo galleries, no semester modules, no achievement wall—instead: timeline progression, phase-based roadmap, dual-track visualization, vision pillars, challenges with strategies

## All Four Inner Me Pages Complete

- Page 1: Origin Story (origin.html) - Photo galleries, family cards, influences, timeline, reflection
- Page 2: School Years (school-years.html) - Timeline dots, grade cards, friendship profiles, achievement wall, values
- Page 3: UJ Deep Dive (uj-deep-dive.html) - Lecturer grid, semester modules, lab items, projects, skills bars, breakthrough
- Page 4: Next Chapter (next-chapter.html) - 90-day timeline, 5-phase pathway, dual growth tracks, vision pillars, challenges, commitment

Each page has completely unique layout structure, CSS patterns, and animation approach. All maintain intensity and photo/content richness while being visually distinct.

## Deliverables Completed ✓

### Me Page and Inner Pages (COMPLETE)

- ✅ Main Me page hub with entry buttons for all 4 inner pages
- ✅ Origin Story inner page (HTML + CSS + JS)
- ✅ School Years inner page (HTML + CSS + JS)
- ✅ UJ Deep Dive inner page (HTML + CSS + JS)
- ✅ Next Chapter inner page (HTML + CSS + JS)
- ✅ All pages responsive (1024px and 768px breakpoints)
- ✅ All pages use GSAP 3.12.2 + ScrollTrigger animations
- ✅ Manifest system prepared for photo population

## Next Phases (Ready to Begin)

1. **Photo Population** — Populate images across all 5 pages (index + 4 inner pages) using manifest system
2. **Navigation Updates** — Update global nav from old labels to: Me, My Parents, My Sister, My Cousins, My Aunts and Uncles, My Friends, Him
3. **Family System Pages** — Build parent gateway, sister page, cousin/aunt/uncle/friend card systems
4. **Password Protection** — Implement password gate for Him page
5. **Data Models** — Create ~40 cousin records + aunt/uncle/friend data

## Status

All Me-page architecture and inner pages complete and functional. Ready for phase 2: photo population and family system expansion.

## Immediate Implementation Queue (Phase 2)

1. Navigation pass across all pages

- Replace legacy labels with final labels: Me, My Parents, My Sister, My Cousins, My Aunts and Uncles, My Friends, Him.
- Ensure nav active states and button opacity are consistent with index design system.

2. Photo population pass

- Fill image slots for index + all four inner Me pages.
- Validate image crops, file sizes, and mobile rendering.

3. Family vertical slice

- Build My Parents gateway page.
- Build Father and Mother detail pages with constrained discoverability from My Parents only.

4. Data model kickoff

- Create initial JSON schemas for cousins, aunts/uncles, and friends.
- Seed with first batch records so card rendering can be tested.

5. Protected page setup

- Implement front-end password gate for Him page with clear UX and limitations documented.

## Readiness Notes

- Inner-page continuity is now enabled from School Years to UJ Deep Dive (removed the previous Coming Soon blocker).
- Color token mismatches were corrected in new page stylesheets so shared nav styling behavior matches index.
- No architecture blockers remain for starting family-system implementation.
