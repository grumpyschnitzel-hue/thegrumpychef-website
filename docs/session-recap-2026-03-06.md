# Session Recap: 2026-03-06 — Funnel Fixes & SEO Optimization

## Objective
Fix the broken conversion funnel ("circular logic") and resolve critical SEO indexing issues for `thegrumpychef.ca`.

## I. Funnel Optimization ("Real" Product Bridging)
Identified a major "profit leak" where customers were trapped in a loop of free tools without clear paths to purchase. Updated success states across the site to bridge immediately to paid offerings.

| Source Tool | Previous Action | **New "Real" Action** |
| :--- | :--- | :--- |
| **Profit Calculator** | "Check your inbox" | **Sell: 72-Hour Discovery Kit ($197)** |
| **Menu Assessment** | "Action plan coming" | **Sell: Operator's Toolkit ($47)** |
| **Academy Waitlist** | Point back to Free Tools | **Sell: Operator's Toolkit ($47)** |
| **Discovery Call** | "I'll be in touch" | **Up-sell: 72-Hour Kit ($197) to pre-qualify** |

## II. Product Protection (Plugging Paid Leaks)
Discovered that the internal components of the **$197 Discovery Kit** were publicly indexed on Google, allowing anyone to access the paid workbooks for free.

*   **Action**: Applied `noindex, nofollow` meta tags to all 5 kit component files:
    *   `discovery-kit-diagnosis-workbook.html`
    *   `discovery-kit-exposure-sheet.html`
    *   `discovery-kit-measurement-tracker.html`
    *   `discovery-kit-protocol-builder.html`
    *   `discovery-kit-response-cards.html`

## III. SEO & Technical Repairs
*   **Navigation Fix**: Removed malformed ` `n` artifacts from the navigation bar in multiple HTML files that were breaking the document structure and preventing proper indexing.
*   **Sitemap Update**: 
    *   Added `kit.html`, `toolkit-bundle.html`, and `testimonials.html`.
    *   Removed private `/toolkit/thank-you` page.
*   **Academy SEO**: Added missing canonical tags and OpenGraph meta data to `academy.html`.
*   **Linting**: Fixed CSS compatibility issues (`appearance` property and `print-color-adjust`) across Discovery Kit files.

## IV. Next Steps
1.  **Search Console**: Re-request indexing for the root and modified product pages.
2.  **Kit (ConvertKit) Audit**: Verify that the 6 email sequences lead to the new `/kit.html` or `/toolkit-bundle.html` pages rather than looping back to free tools.
3.  **Blog Alignment**: Audit the newly opened `blog/systems-over-hustle.html` to ensure it links to the "Protocol" (The Discovery Kit) as the primary solution.
