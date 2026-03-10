# GTM + GA4 Universal Container Template

Reusable Google Tag Manager container for GA4. Import into any client's GTM workspace — covers lead-gen sites, ecommerce (WooCommerce/Shopify), and content sites.

## Quick Start

1. Open GTM > **Admin** > **Import Container**
2. Choose `container.json`
3. Select workspace (or create new)
4. Choose **Merge** > **Rename conflicting tags**
5. Update `lu - GA4 ID by Hostname` lookup table with client's hostnames and Measurement IDs
6. Update `lu - Content Group` lookup table for client's URL structure
7. Delete tags you don't need (ecommerce, consent, etc.)
8. Preview, test, publish

## What's Included

### Folders (organization)

| Folder | Purpose |
|--------|---------|
| Core | Google Tag config, shared variables, utility triggers |
| Engagement | Scroll depth, video tracking |
| Clicks | Outbound, phone, email, file download, CTA |
| Forms | Form submission, sign up |
| Ecommerce | Full GA4 ecommerce funnel (11 events) |
| Errors | 404 tracking |
| Search | Site search tracking |
| Consent (Optional) | Google Consent Mode v2 — paused by default |

### Tags (25 total)

| # | Tag | Event Name | Folder |
|---|-----|------------|--------|
| 1 | GA4 - Google Tag | (config) | Core |
| 2 | Scroll Depth | `scroll` | Engagement |
| 3 | Outbound Click | `outbound_click` | Clicks |
| 4 | Phone Click | `phone_click` | Clicks |
| 5 | Email Click | `email_click` | Clicks |
| 6 | File Download | `file_download` | Clicks |
| 7 | CTA Click | `cta_click` | Clicks |
| 8 | Form Submit | `generate_lead` | Forms |
| 9 | 404 Error | `page_not_found` | Errors |
| 10 | Video Engagement | `video_start` / `video_progress` / `video_complete` | Engagement |
| 11 | Site Search | `view_search_results` | Search |
| 12 | Add to Cart | `add_to_cart` | Ecommerce |
| 13 | Begin Checkout | `begin_checkout` | Ecommerce |
| 14 | Purchase | `purchase` | Ecommerce |
| 15 | View Item | `view_item` | Ecommerce |
| 16 | View Item List | `view_item_list` | Ecommerce |
| 17 | Consent Default | (Consent Mode v2 default) | Consent |
| 18 | Consent Update | (Consent Mode v2 update) | Consent |
| 19 | Select Item | `select_item` | Ecommerce |
| 20 | Remove from Cart | `remove_from_cart` | Ecommerce |
| 21 | View Cart | `view_cart` | Ecommerce |
| 22 | Add Shipping Info | `add_shipping_info` | Ecommerce |
| 23 | Add Payment Info | `add_payment_info` | Ecommerce |
| 24 | Refund | `refund` | Ecommerce |
| 25 | Sign Up | `sign_up` | Forms |

### Key Features

- **Google Tag fires on Initialization** — loads before all event tags and after consent defaults
- **Debug mode via URL** — add `?debug=true` to activate GA4 DebugView without GTM Preview
- **Environment switching** — `lu - GA4 ID by Hostname` routes prod/staging traffic to separate GA4 properties
- **User properties** — `user_id` and `user_type` sent on every pageview when present in the data layer
- **Full ecommerce funnel** — all 11 GA4 recommended ecommerce events
- **Utility triggers included** — DOM Ready and Window Loaded triggers ready for client-specific tags

### Enhanced Measurement Overlap

These template tags overlap with GA4 Enhanced Measurement. Disable the EM equivalents in GA4 Admin when using custom tags for more control:

| EM Feature | Template Replacement | Why Custom? |
|-----------|---------------------|-------------|
| Scrolls | Tag #2 | EM only fires at 90%. Template fires at 25/50/75/90. |
| Outbound clicks | Tag #3 | Custom event params, no EM naming collision |
| File downloads | Tag #6 | Adds `file_extension` param |
| Site search | Tag #11 | Data layer approach, no URL parameter dependency |
| Video engagement | Tag #10 | All YouTube events in one tag with full params |

**EM toggles to disable** (GA4 Admin > Data Streams > Enhanced Measurement > gear icon):
- [ ] Scrolls — covered by Tag #2
- [ ] Outbound clicks — covered by Tag #3
- [ ] File downloads — covered by Tag #6
- [ ] Site search — covered by Tag #11
- [ ] Video engagement — covered by Tag #10

**Leave enabled:** Page views, Form interactions (backup for non-AJAX forms).

---

## Per-Client Setup Checklist

### 1. GTM Container Setup

- [ ] Import `container.json` via GTM Admin > Import Container
- [ ] Update `cst - GA4 Measurement ID` to client's `G-XXXXXXXXXX`
- [ ] Update `lu - GA4 ID by Hostname` with production + staging hostnames
- [ ] Update `lu - Content Group` lookup table for client's URL paths
- [ ] Review CTA trigger class regex — adjust `(cta|btn-cta|wp-block-button)` for client's CSS
- [ ] Add 404 data layer push to client's 404 template (see `data-layer-snippets.js`)
- [ ] Add site search data layer push if applicable
- [ ] Delete unused tags (ecommerce for lead-gen sites, etc.)

### 2. GA4 Property Settings (Critical — Often Missed)

- [ ] **Data retention** — Change from default 2 months to **14 months** (Admin > Data Settings > Data Retention)
- [ ] **Google Signals** — Enable for cross-device tracking and demographics (Admin > Data Settings > Data Collection)
- [ ] **Internal traffic filter** — Define IP rules, then **activate the filter** (Admin > Data Settings > Data Filters). It starts in "Testing" mode and does nothing until activated.
- [ ] **Referral exclusions** — Add payment gateways (PayPal, Stripe, Square) and booking systems (Calendly, Acuity) to prevent false new sessions (Admin > Data Streams > Configure Tag Settings > List Unwanted Referrals)
- [ ] **Cross-domain tracking** — If client has multiple domains, add them all (Admin > Data Streams > Configure Tag Settings > Configure Cross-Domain)
- [ ] **Reporting timezone** — Set to client's business timezone
- [ ] **Currency** — Set to client's business currency
- [ ] **Search Console link** — Connect for organic search data (Admin > Product Links)
- [ ] **Google Ads link** — Connect if running ads (Admin > Product Links)

### 3. Register Custom Dimensions (Required)

Every custom parameter sent via GTM is **invisible in reports** until registered in GA4 Admin > Custom Definitions > Custom Dimensions.

**Event-scoped dimensions to register:**

| Parameter | Scope | Description |
|-----------|-------|-------------|
| `content_group` | Event | Page category (Homepage, Blog, etc.) |
| `percent_scrolled` | Event | Scroll depth percentage |
| `link_url` | Event | Clicked link destination |
| `link_text` | Event | Clicked link text |
| `file_extension` | Event | Downloaded file type |
| `link_classes` | Event | CSS classes of clicked element |
| `form_id` | Event | Form identifier |
| `form_classes` | Event | Form CSS classes |
| `form_destination` | Event | Form action URL |
| `search_term` | Event | Site search query |
| `video_title` | Event | YouTube video title |
| `video_url` | Event | YouTube video URL |
| `video_percent` | Event | Video progress percentage |
| `page_location` | Event | URL of 404 page |
| `page_referrer` | Event | Referrer to 404 page |

**User-scoped dimensions to register:**

| Parameter | Scope | Description |
|-----------|-------|-------------|
| `user_type` | User | Customer segment (prospect, customer, etc.) |

### 4. Mark Key Events (Conversions)

In GA4 Admin > Events, toggle "Mark as key event" for:

- [ ] `generate_lead` — form submissions
- [ ] `purchase` — transactions (ecommerce)
- [ ] `sign_up` — newsletter / account creation
- [ ] `phone_click` — phone number clicks
- [ ] `cta_click` — high-value CTA interactions (optional)

### 5. Lead-Gen Sites

- [ ] Verify form submission trigger works with client's form plugin (Gravity Forms, CF7, etc.)
- [ ] For AJAX forms: use data layer push instead of native form submission trigger
- [ ] Test phone/email click tracking
- [ ] Set up `sign_up` data layer push for newsletter forms

### 6. Ecommerce Sites

- [ ] Implement data layer pushes for all ecommerce events (see `data-layer-snippets.js`)
- [ ] For WooCommerce: install a data layer plugin (GTM4WP or similar)
- [ ] Verify `items` array structure matches GA4 spec
- [ ] Delete unused lead-gen tags if not needed

### 7. Consent (If Needed)

- [ ] Unpause both consent tags (Tags #17 and #18)
- [ ] Wire `consent_update` custom event to client's cookie banner "Accept" action
- [ ] Test default-denied > update-granted flow in GTM Preview
- [ ] Consider a Google-certified CMP (Cookiebot, OneTrust, Complianz) for automated compliance

### 8. User Identity (If Applicable)

- [ ] Push `user_id` to data layer when user is logged in
- [ ] Push `user_type` to data layer (e.g., "prospect", "customer", "subscriber")
- [ ] See `data-layer-snippets.js` for examples

---

## QA & Debug Process

### Before Publishing

1. **GTM Preview Mode** — Click Preview in GTM, verify every tag fires on its correct trigger
2. **GA4 DebugView** — Open GA4 Admin > DebugView, confirm events appear with correct parameters
3. **URL Debug Mode** — Add `?debug=true` to any page to activate DebugView without GTM Preview
4. **Check "Tags Not Fired"** — In Preview, review why tags didn't fire (useful for catching trigger issues)
5. **Chrome DevTools > Network** — Filter by `collect` to see GA4 requests being sent
6. **Incognito mode** — Test without extensions, cached sessions, or login state
7. **Cross-browser** — Test at minimum Chrome and Safari
8. **Mobile** — Verify click triggers work on touch events

### After Publishing

9. **GA4 Realtime report** — Confirm live data is flowing within minutes
10. **Wait 24-48 hours** — Check standard reports for data completeness
11. **Compare to baseline** — Event counts should be within expected range
12. **Monitor PageSpeed** — Verify new tags haven't degraded Core Web Vitals

### Ongoing Maintenance

13. **Quarterly audit** — Remove paused/unused tags, verify triggers still match site structure
14. **Post-redesign audit** — CSS classes, form IDs, and URL structures may have changed
15. **Container backup** — Export JSON before every major change. Name versions descriptively (e.g., "2026-03-09 - Added ecommerce tracking - JT")

---

## Future Enhancements

These are not in the template but worth considering per-client:

- **Server-side tagging** — Better data accuracy, ad-blocker resistance, faster pages. Requires Google Cloud Run or Stape.io.
- **Core Web Vitals tracking** — Simo Ahava's CWV GTM template sends LCP/INP/CLS to GA4.
- **Google Ads conversion scaffold** — Paused conversion + remarketing tags as starting points.
- **Predictive audiences** — Requires `purchase` events with `value` and `currency`, plus 1,000+ users in both trigger and non-trigger groups within 28 days.

---

## Files

| File | Purpose |
|------|---------|
| `container.json` | Importable GTM container (25 tags, 26 triggers, 12 variables) |
| `README.md` | This file |
| `REFERENCE.md` | Detailed reference for every tag, trigger, variable |
| `data-layer-snippets.js` | Copy-paste data layer push snippets for developers |
