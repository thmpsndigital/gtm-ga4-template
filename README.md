# GTM + GA4 Universal Container Template

A free, importable Google Tag Manager container for GA4. It covers lead-gen sites, ecommerce stores (WooCommerce and Shopify), and content sites: 26 tags, 29 triggers, and 20 variables, organized into 9 folders. It also tags likely bot traffic using a WebGL GPU check.

Built and maintained by [Thmpsn.digital](https://thmpsn.digital), a B2B performance marketing agency in Chicago. We use this container as the starting point on our own client installs.

## Quick Start

1. Open GTM > **Admin** > **Import Container**
2. Choose `container.json`
3. Select workspace (or create new)
4. Choose **Merge** > **Rename conflicting tags**
5. Update the `lu - GA4 ID by Hostname` lookup table with your hostnames and Measurement IDs (the template ships with `www.example.com` and `staging.example.com`)
6. Update the `lu - Content Group` lookup table for your URL structure
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
| Consent (Optional) | Google Consent Mode v2, paused by default |
| Bot Detection | GPU check variables, optional bot routing, and the ad-tag exception trigger |

### Tags (26 total)

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
| 26 | Form Submit (Data Layer) | `generate_lead` | Forms |

### Key Features

- **Google Tag fires on Initialization**: loads before all event tags. The optional consent defaults fire earlier, on Consent Initialization.
- **Debug mode via URL**: add `?debug=true` to activate GA4 DebugView without GTM Preview
- **Environment switching**: `lu - GA4 ID by Hostname` routes prod/staging traffic to separate GA4 properties
- **User properties**: `user_id` and `user_type` sent on every pageview when present in the data layer
- **Full ecommerce funnel**: all 11 GA4 recommended ecommerce events
- **Bot detection**: every event carries a `gpu_bucket` parameter (`virtual_gpu`, `physical_gpu`, or `gpu_not_found`), with optional routing of suspected bots to a separate property
- **Utility triggers included**: DOM Ready and Window Loaded triggers ready for site-specific tags

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
- [ ] Scrolls (covered by Tag #2)
- [ ] Outbound clicks (covered by Tag #3)
- [ ] File downloads (covered by Tag #6)
- [ ] Site search (covered by Tag #11)
- [ ] Video engagement (covered by Tag #10)

**Leave enabled:** Page views, Form interactions (backup for non-AJAX forms).

## Events It Sends

Event names follow GA4's recommended events wherever one exists, so standard reports and the ecommerce funnel work without remapping. The rest use plain snake_case names.

**Collected automatically by GTM** (no site code needed):

| Event | Fires when | Parameters |
|-------|------------|------------|
| `page_view` | Every page load, sent by the Google tag | `content_group`, `user_id` (if present) |
| `scroll` | Visitor reaches 25, 50, 75, or 90% of the page | `percent_scrolled` |
| `outbound_click` | Click on an `http(s)` link to another hostname (`tel:`, `mailto:`, and `javascript:` links are excluded) | `link_url`, `link_text`, `outbound` |
| `phone_click` | Click on a `tel:` link | `link_url`, `link_text` |
| `email_click` | Click on a `mailto:` link | `link_url`, `link_text` |
| `file_download` | Click on a link to a PDF, Office file, CSV, ZIP, and similar | `link_url`, `link_text`, `file_extension` |
| `cta_click` | Click on an element with a CTA class | `link_url`, `link_text`, `link_classes` |
| `generate_lead` | Native HTML form submission that passes validation | `form_id`, `form_classes`, `form_destination` |
| `video_start`, `video_progress`, `video_complete` | Embedded YouTube video starts, passes 25/50/75%, or ends | `video_title`, `video_url`, `video_provider`, `video_percent`, `video_current_time` |

**Sent when your site pushes a data layer event** (snippets in `data-layer-snippets.js`):

| Event sent to GA4 | Data layer `event` to push | Parameters |
|-------------------|----------------------------|------------|
| `page_not_found` | `page_not_found` | `page_location`, `page_referrer` |
| `view_search_results` | `site_search` | `search_term` |
| `sign_up` | `sign_up` | `method` |
| `generate_lead` | `generate_lead` (for AJAX forms) | `form_id`, `form_name`, `form_destination` |
| `view_item_list`, `select_item`, `view_item`, `add_to_cart`, `remove_from_cart`, `view_cart`, `begin_checkout`, `add_shipping_info`, `add_payment_info`, `purchase`, `refund` | Same as the GA4 event name | Read from the standard `ecommerce` object |

The two consent tags send no GA4 event. They set Consent Mode v2 defaults on page load and update them when your cookie banner pushes `consent_update`.

## Bot Detection (GPU Check)

Headless browsers running on servers usually have no graphics card, so they draw WebGL with a software renderer. Real phones and laptops report real hardware. The template reads the WebGL renderer once per page and sorts every visit into one of three buckets. The method is [Dana DiTomaso's](https://www.linkedin.com/pulse/how-im-removing-bot-traffic-from-ga4-dana-ditomaso-8ksce/); the code in this container is our own implementation of it.

| `gpu_bucket` | What the browser reported | How to treat it |
|--------------|---------------------------|-----------------|
| `virtual_gpu` | A software renderer: SwiftShader, llvmpipe, Microsoft Basic Render Driver, and similar | Likely a bot |
| `physical_gpu` | Real hardware, such as "Apple GPU" or ANGLE with Intel, AMD, NVIDIA, Apple, Adreno, or Mali | Likely a person |
| `gpu_not_found` | No WebGL, or a browser that hides the renderer | Unknown. Keep it in your data. |

Two variables in the **Bot Detection** folder do the work. `js - GPU Renderer` creates one canvas, reads the renderer, caches the result for the rest of the page, and returns it trimmed to 100 characters. `js - GPU Bucket` turns that string into the bucket. Both are wrapped in `try/catch`, so a failure returns `gpu_not_found` instead of breaking tags. In our tests in a normal Chrome, the first read took under 5 ms, and later events on the page reuse the cached value.

### Observe mode (the default)

`gpu_bucket` and `gpu_renderer` ride on every GA4 event through `gtes - Shared Event Settings`, which the Google tag and every GA4 event tag reference. (GA4 event tags also inherit the Google tag's shared event settings, so in an existing container it's enough to set it on the Google tag. The exception is an event tag that has its own event settings variable: add the two rows to that variable as well.) Nothing is filtered or rerouted. You get the data to see how much of your traffic is `virtual_gpu` before you act on it.

**Before you publish**, register `gpu_bucket` as an event-scoped custom dimension in GA4 Admin > Custom Definitions. Registration isn't retroactive, so events collected before it never show the dimension. We leave `gpu_renderer` unregistered: it has hundreds of distinct values, and GA4 warns against high-cardinality dimensions. It's still collected on every event, so you can register it later or read it in BigQuery.

To compare segments, build an Exploration with `gpu_bucket` as a dimension, or a comparison on any standard report.

### Route mode (optional, off by default)

Route mode sends suspected bots to a separate GA4 property, so your main property only gets `physical_gpu` and `gpu_not_found` traffic.

1. Create a test GA4 property, or use your staging one.
2. In `lu - GA4 ID (Bot Routing)`, replace the `G-BOTTEST` placeholder with that property's Measurement ID.
3. Change `cst - Bot Routing` from `off` to `on`.

Every tag reads its Measurement ID from `lu - GA4 ID (Bot Routing)`. With the switch off, that variable always returns `lu - GA4 ID by Hostname`, so the container behaves exactly as it does without route mode.

For ad tags (Google Ads, Meta, LinkedIn, and so on), add the `Exception - Suspected Bot (virtual_gpu)` trigger as a blocking trigger, so suspected bots don't fire conversions or build remarketing audiences. The template has no ad tags, so this trigger isn't attached to anything yet.

Run observe mode for a few weeks before turning either of these on, and check that `virtual_gpu` traffic looks like bots in your data: zero engagement, odd locations, and no conversions.

### Limits

- **WebGL off or masked.** Some privacy browsers and settings block WebGL or report a generic renderer ("WebKit WebGL", "Mozilla"). Those visits land in `gpu_not_found`, which is why that bucket stays in your main data.
- **SwiftShader is going away.** Chrome is removing its automatic fallback to SwiftShader. As it does, more headless bots will get no WebGL at all and move from `virtual_gpu` to `gpu_not_found`. The check will catch fewer bots over time, so watch the `gpu_not_found` share.
- **Real people on virtual machines.** A person using a remote desktop or a VM without a graphics card can report a software renderer and land in `virtual_gpu`. That's another reason to observe before routing.
- **It only catches lazy bots.** Bots that run on machines with GPUs, or that fake the WebGL response, get through.
- **The renderer string is a device signal.** It isn't personal data, but it's the kind of detail used in fingerprinting. If you'd rather not store it, delete the `gpu_renderer` row from `gtes - Shared Event Settings` and keep only `gpu_bucket`.

---

## Setup Checklist

### 1. GTM Container Setup

- [ ] Import `container.json` via GTM Admin > Import Container
- [ ] Update `cst - GA4 Measurement ID` from the `G-XXXXXXXXXX` placeholder to your Measurement ID
- [ ] Update `lu - GA4 ID by Hostname` with production + staging hostnames
- [ ] Update `lu - Content Group` lookup table for your URL paths
- [ ] Review the CTA trigger class regex and adjust `(cta|btn-cta|wp-block-button)` for your site's CSS
- [ ] Add 404 data layer push to your 404 template (see `data-layer-snippets.js`)
- [ ] Add site search data layer push if applicable
- [ ] Delete unused tags (ecommerce for lead-gen sites, etc.)

### 2. GA4 Property Settings (Often Missed)

- [ ] **Data retention**: Change from default 2 months to **14 months** (Admin > Data Settings > Data Retention)
- [ ] **Google Signals**: Enable for cross-device tracking and demographics (Admin > Data Settings > Data Collection)
- [ ] **Internal traffic filter**: Define IP rules, then **activate the filter** (Admin > Data Settings > Data Filters). It starts in "Testing" mode and does nothing until activated.
- [ ] **Referral exclusions**: Add payment gateways (PayPal, Stripe, Square) and booking systems (Calendly, Acuity) to prevent false new sessions (Admin > Data Streams > Configure Tag Settings > List Unwanted Referrals)
- [ ] **Cross-domain tracking**: If the site spans multiple domains, add them all (Admin > Data Streams > Configure Tag Settings > Configure Cross-Domain)
- [ ] **Reporting timezone**: Set to the business's timezone
- [ ] **Currency**: Set to the business's currency
- [ ] **Search Console link**: Connect for organic search data (Admin > Product Links)
- [ ] **Google Ads link**: Connect if running ads (Admin > Product Links)

### 3. Register Custom Dimensions (Required)

Every custom parameter sent via GTM is **invisible in reports** until registered in GA4 Admin > Custom Definitions > Custom Dimensions.

**Event-scoped dimensions to register:**

| Parameter | Scope | Description |
|-----------|-------|-------------|
| `content_group` | Event | Page category (Homepage, Blog, etc.) |
| `gpu_bucket` | Event | Bot check result: `virtual_gpu`, `physical_gpu`, or `gpu_not_found` |
| `gpu_renderer` | Event | WebGL renderer string, trimmed to 100 characters. Optional; high cardinality, so we usually leave it unregistered. |
| `percent_scrolled` | Event | Scroll depth percentage |
| `link_url` | Event | Clicked link destination |
| `link_text` | Event | Clicked link text |
| `file_extension` | Event | Downloaded file type |
| `link_classes` | Event | CSS classes of clicked element |
| `form_id` | Event | Form identifier |
| `form_classes` | Event | Form CSS classes |
| `form_name` | Event | Form name (data layer forms only) |
| `form_destination` | Event | Form action URL or thank-you path |
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

- [ ] `generate_lead`: form submissions
- [ ] `purchase`: transactions (ecommerce)
- [ ] `sign_up`: newsletter / account creation
- [ ] `phone_click`: phone number clicks
- [ ] `cta_click`: high-value CTA interactions (optional)

### 5. Lead-Gen Sites

- [ ] Verify form submission trigger works with your form plugin (Gravity Forms, CF7, etc.)
- [ ] For AJAX forms: push `generate_lead` to the data layer on success (see `data-layer-snippets.js`); Tag #26 sends it. If the same form also fires a native submit, pause Tag #8 so each lead counts once.
- [ ] Test phone/email click tracking
- [ ] Set up `sign_up` data layer push for newsletter forms

### 6. Ecommerce Sites

- [ ] Implement data layer pushes for all ecommerce events (see `data-layer-snippets.js`)
- [ ] For WooCommerce: install a data layer plugin (GTM4WP or similar)
- [ ] Verify `items` array structure matches GA4 spec
- [ ] Delete unused lead-gen tags if not needed

### 7. Consent (If Needed)

- [ ] Unpause both consent tags (Tags #17 and #18)
- [ ] Wire `consent_update` custom event to your cookie banner "Accept" action
- [ ] Test default-denied > update-granted flow in GTM Preview
- [ ] Consider a Google-certified CMP (Cookiebot, OneTrust, Complianz) for automated compliance

### 8. User Identity (If Applicable)

- [ ] Push `user_id` to data layer when user is logged in
- [ ] Push `user_type` to data layer (e.g., "prospect", "customer", "subscriber")
- [ ] See `data-layer-snippets.js` for examples

---

## QA & Debug Process

### Before Publishing

1. **GTM Preview Mode**: Click Preview in GTM, verify every tag fires on its correct trigger
2. **GA4 DebugView**: Open GA4 Admin > DebugView, confirm events appear with correct parameters
3. **URL Debug Mode**: Add `?debug=true` to any page to activate DebugView without GTM Preview
4. **Check "Tags Not Fired"**: In Preview, review why tags didn't fire (useful for catching trigger issues)
5. **Chrome DevTools > Network**: Filter by `collect` to see GA4 requests being sent
6. **Incognito mode**: Test without extensions, cached sessions, or login state
7. **Cross-browser**: Test at minimum Chrome and Safari
8. **Mobile**: Verify click triggers work on touch events

### After Publishing

9. **GA4 Realtime report**: Confirm live data is flowing within minutes
10. **Wait 24-48 hours**: Check standard reports for data completeness
11. **Compare to baseline**: Event counts should be within expected range
12. **Monitor PageSpeed**: Verify new tags haven't degraded Core Web Vitals

### Ongoing Maintenance

13. **Quarterly audit**: Remove paused/unused tags, verify triggers still match site structure
14. **Post-redesign audit**: CSS classes, form IDs, and URL structures may have changed
15. **Container backup**: Export JSON before every major change. Name versions descriptively (e.g., "2026-03-09 - Added ecommerce tracking")

---

## Future Enhancements

These are not in the template but are worth considering for some sites:

- **Server-side tagging**: Better data accuracy, ad-blocker resistance, faster pages. Requires Google Cloud Run or Stape.io.
- **Core Web Vitals tracking**: Simo Ahava's [Core Web Vitals template](https://www.simoahava.com/analytics/track-core-web-vitals-in-ga4-with-google-tag-manager/) sends LCP, INP, and CLS to GA4.
- **Google Ads conversion scaffold**: Paused conversion + remarketing tags as starting points.
- **Predictive audiences**: Requires `purchase` events with `value` and `currency`, plus 1,000+ users in both trigger and non-trigger groups within 28 days.

---

## Files

| File | Purpose |
|------|---------|
| `container.json` | Importable GTM container (26 tags, 29 triggers, 20 variables) |
| `README.md` | This file |
| `REFERENCE.md` | Detailed reference for every tag, trigger, and variable |
| `data-layer-snippets.js` | Copy-paste data layer push snippets for developers |
| `LICENSE` | MIT license |

---

## Compatibility

Checked against Google's Tag Manager release notes through October 2026. The container uses the standard Google tag and GA4 Event tags, which still work as they are. Recent changes that touch it:

- **Optimized containers and destinations (October 2026)** are opt-in. If you switch a container over, review the Google tag's configuration parameters (`content_group`, `user_id`, `debug_mode`) once the destination is linked, since destinations inherit container-level settings.
- **`gtag('config')` events in the data layer (October 2026)** can fire tags that use wildcard Custom Event triggers. Every Custom Event trigger that fires a tag in this template matches an exact event name, so none are affected. The one wildcard trigger, `Exception - Suspected Bot (virtual_gpu)`, is meant only as a blocking trigger.
- **Install path (July 2026):** load the container with the standard GTM snippet (`GTM-XXXXXX`). A container loaded through `/gtag/js` under a `G-` ID runs only Google-provided tags, which would block the Custom HTML consent tags.
- **New built-in variables (December 2025):** Client ID, Session ID, and Session Number are available under Utilities if you want to send them as parameters. The template doesn't use them.

---

## License

MIT. Use it, change it, and ship it on client sites, commercial or not. See `LICENSE`.

## Built by Thmpsn.digital

This template is maintained by [Thmpsn.digital](https://thmpsn.digital). Found a bug or a GTM import error? Open an issue. If you'd rather have someone set up GA4 and GTM for you, [get in touch](https://thmpsn.digital).
