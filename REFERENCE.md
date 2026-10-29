# Reference: Tags, Triggers, Variables

Detailed breakdown of every component in the GTM container template.

---

## Variables

### Custom Variables (20)

| Variable | Type | Value | Folder | Notes |
|----------|------|-------|--------|-------|
| `cst - GA4 Measurement ID` | Constant | `G-XXXXXXXXXX` | Core | Fallback ID. **Update per client.** |
| `dlv - ecommerce.items` | Data Layer | `ecommerce.items` | Ecommerce | GA4 item array |
| `dlv - ecommerce.value` | Data Layer | `ecommerce.value` | Ecommerce | Transaction/cart value |
| `dlv - ecommerce.transaction_id` | Data Layer | `ecommerce.transaction_id` | Ecommerce | Order ID |
| `dlv - ecommerce.currency` | Data Layer | `ecommerce.currency` | Ecommerce | ISO 4217 code |
| `dlv - search_term` | Data Layer | `search_term` | Search | Site search query |
| `js - File Extension` | Custom JS | Extracts extension from Click URL | Clicks | Returns lowercase extension |
| `lu - Content Group` | Lookup Table | Maps Page Path to group name | Core | **Update per client** |
| `url - debug` | URL (Query) | Reads `?debug=` query param | Core | Activates GA4 DebugView |
| `lu - GA4 ID by Hostname` | Lookup Table | Maps Page Hostname to Measurement ID | Core | **Update per client.** Falls back to `cst - GA4 Measurement ID`. |
| `dlv - user_id` | Data Layer | `user_id` | Core | Logged-in user identifier |
| `dlv - user_type` | Data Layer | `user_type` | Core | User segment (prospect, customer, etc.) |
| `dlv - form_id` | Data Layer | `form_id` | Forms | Form identifier from an AJAX form push |
| `dlv - form_name` | Data Layer | `form_name` | Forms | Human-readable form name from an AJAX form push |
| `dlv - form_destination` | Data Layer | `form_destination` | Forms | Thank-you path from an AJAX form push |
| `js - GPU Renderer` | Custom JS | WebGL renderer string, read once per page and cached on `window.__gtmGpuRenderer` | Bot Detection | Returns the first 100 characters. Empty string when WebGL is unavailable. |
| `js - GPU Bucket` | Custom JS | `virtual_gpu`, `physical_gpu`, or `gpu_not_found` | Bot Detection | Classifies the full cached renderer string. See README, Bot Detection. |
| `gtes - Shared Event Settings` | Google Tag: Event Settings | `gpu_bucket`, `gpu_renderer` | Core | Referenced by the Google tag and every GA4 event tag, so these parameters go on every event. |
| `cst - Bot Routing` | Constant | `off` | Bot Detection | Set to `on` to send `virtual_gpu` traffic to the bot test property. |
| `lu - GA4 ID (Bot Routing)` | Lookup Table | Input `{{cst - Bot Routing}}\|{{js - GPU Bucket}}`; `on\|virtual_gpu` maps to `G-BOTTEST` | Bot Detection | Every tag's Measurement ID. Falls back to `lu - GA4 ID by Hostname`, so with routing off nothing changes. **Replace `G-BOTTEST`** before turning routing on. |

### Built-in Variables (29 enabled)

Click: Element, Classes, ID, URL, Text
Form: Element, Classes, ID, URL, Text
Video: Provider, Title, URL, Current Time, Percent, Visible, Duration, Status
Scroll: Depth Threshold, Depth Units, Direction
Page: URL, Hostname, Path, Referrer
Other: Event, Container ID, HTML ID, Debug Mode

---

## Triggers (29)

### Core / Utility

#### Consent Initialization - All Pages (Trigger #28)
- **Type:** Consent Initialization
- **Used by:** Tag #17 (Consent Default)
- **Notes:** Fires before every other trigger, including Initialization, so consent defaults are always set before the Google tag loads.

#### Initialization - All Pages (Trigger #17)
- **Type:** Initialization
- **Used by:** Tag #1 (Google Tag)
- **Notes:** Fires before All Pages. Google Tag and consent defaults must fire here.

#### DOM Ready - All Pages (Trigger #25)
- **Type:** DOM Ready
- **Used by:** Available for client-specific tags that need the full DOM
- **Notes:** Utility trigger — not used by any template tags, but commonly needed for custom implementations.

#### Window Loaded - All Pages (Trigger #26)
- **Type:** Window Loaded
- **Used by:** Available for client-specific tags that should not block rendering
- **Notes:** Utility trigger — fires after all resources loaded.

### Engagement

#### Scroll Depth - 25/50/75/90 (Trigger #1)
- **Type:** Scroll Depth
- **Thresholds:** 25%, 50%, 75%, 90% (vertical only)
- **Fires on:** Window Load
- **Used by:** Tag #2 (Scroll Depth)
- **Notes:** GA4 EM only tracks 90%. This gives granular scroll data.

#### YouTube Video - All Events (Trigger #9)
- **Type:** YouTube Video
- **Captures:** Start, Progress (25/50/75%), Complete
- **Fires on:** Window Load, with missing API fix
- **Used by:** Tag #10 (Video Engagement)
- **Notes:** Single trigger fires for all video states. Tag uses dynamic event name `video_{{Video Status}}`.

### Clicks

#### Click - Outbound Links (Trigger #2)
- **Type:** Just Links
- **Conditions:** Click URL does NOT contain Page Hostname, AND Click URL matches regex `^https?://`
- **Notes:** The second condition keeps `tel:`, `mailto:`, `javascript:`, and empty links out, so phone and email clicks aren't also counted as outbound.
- **Wait for tags:** Yes (2s timeout)
- **Used by:** Tag #3 (Outbound Click)

#### Click - Phone Links (tel) (Trigger #3)
- **Type:** Just Links
- **Condition:** Click URL starts with `tel:`
- **Wait for tags:** Yes (2s timeout)
- **Used by:** Tag #4 (Phone Click)

#### Click - Email Links (mailto) (Trigger #4)
- **Type:** Just Links
- **Condition:** Click URL starts with `mailto:`
- **Wait for tags:** Yes (2s timeout)
- **Used by:** Tag #5 (Email Click)

#### Click - File Downloads (Trigger #5)
- **Type:** Just Links
- **Condition:** Click URL matches regex `\.(pdf|docx?|xlsx?|pptx?|csv|zip|rar|gz|txt|rtf|eps|ai|psd)(\?|#|$)`
- **Wait for tags:** Yes (2s timeout)
- **Used by:** Tag #6 (File Download)
- **Notes:** Extend regex for additional file types as needed.

#### Click - CTA Buttons (Trigger #6)
- **Type:** All Elements
- **Condition:** Click Classes matches regex `(^|\s)(cta|btn-cta|wp-block-button)(\s|$)`
- **Used by:** Tag #7 (CTA Click)
- **Notes:** **Update regex per client.** Match the CSS classes used for CTAs on the client's site.

### Forms

#### Form Submission - All Forms (Trigger #7)
- **Type:** Form Submission
- **Condition:** All forms (no filter)
- **Wait for tags:** Yes (2s timeout)
- **Check validation:** Yes
- **Used by:** Tag #8 (Form Submit)
- **Notes:** Only fires on native HTML form submissions. For AJAX forms (Gravity Forms, CF7, WPForms), use a data layer push instead.

#### CE - generate_lead (Trigger #27)
- **Type:** Custom Event
- **Event name:** `generate_lead`
- **Used by:** Tag #26 (Form Submit, Data Layer)
- **Notes:** Push from the form plugin's success callback. See `data-layer-snippets.js`.

#### CE - sign_up (Trigger #24)
- **Type:** Custom Event
- **Event name:** `sign_up`
- **Used by:** Tag #25 (Sign Up)
- **Notes:** Fire from newsletter signup or account creation success callback.

### Errors

#### CE - page_not_found (Trigger #8)
- **Type:** Custom Event
- **Event name:** `page_not_found`
- **Used by:** Tag #9 (404 Error)
- **Notes:** Requires a data layer push on 404 pages. See `data-layer-snippets.js`.

### Search

#### CE - site_search (Trigger #10)
- **Type:** Custom Event
- **Event name:** `site_search`
- **Used by:** Tag #11 (Site Search)
- **Notes:** Requires a data layer push when search results load. See `data-layer-snippets.js`.

### Ecommerce

All ecommerce triggers are Custom Event type. They fire when the matching event is pushed to the data layer.

| Trigger | Event Name | Used By |
|---------|-----------|---------|
| CE - add_to_cart (#11) | `add_to_cart` | Tag #12 |
| CE - begin_checkout (#12) | `begin_checkout` | Tag #13 |
| CE - purchase (#13) | `purchase` | Tag #14 |
| CE - view_item (#14) | `view_item` | Tag #15 |
| CE - view_item_list (#15) | `view_item_list` | Tag #16 |
| CE - select_item (#18) | `select_item` | Tag #19 |
| CE - remove_from_cart (#19) | `remove_from_cart` | Tag #20 |
| CE - view_cart (#20) | `view_cart` | Tag #21 |
| CE - add_shipping_info (#21) | `add_shipping_info` | Tag #22 |
| CE - add_payment_info (#22) | `add_payment_info` | Tag #23 |
| CE - refund (#23) | `refund` | Tag #24 |

**Notes:** These require data layer pushes from the ecommerce platform. WooCommerce users should install a data layer plugin (GTM4WP or similar). Shopify users can use the native data layer or a Shopify GTM app.

### Consent

#### CE - consent_update (Trigger #16)
- **Type:** Custom Event
- **Event name:** `consent_update`
- **Used by:** Tag #18 (Consent Update)
- **Notes:** Fire this event from the cookie consent banner when the user accepts.

### Bot Detection

#### Exception - Suspected Bot (virtual_gpu) (Trigger #29)
- **Type:** Custom Event, event name matches regex `.*`
- **Condition:** `js - GPU Bucket` equals `virtual_gpu`
- **Used by:** Nothing by default
- **Notes:** Add as a blocking trigger on ad tags so suspected bots don't fire conversions or remarketing. The wildcard matches every data layer event, so it can block tags on any trigger type.

---

## Tags (26)

### Core

#### GA4 - Google Tag (Tag #1)
- **Type:** Google Tag
- **Measurement ID:** `{{lu - GA4 ID (Bot Routing)}}`, which returns `{{lu - GA4 ID by Hostname}}` unless bot routing is on (that falls back to `{{cst - GA4 Measurement ID}}`)
- **Shared event settings:** `{{gtes - Shared Event Settings}}` (`gpu_bucket`, `gpu_renderer`)
- **Config settings:**
  - `content_group` = `{{lu - Content Group}}`
  - `send_page_view` = true
  - `debug_mode` = `{{url - debug}}` (add `?debug=true` to any URL to activate GA4 DebugView)
  - `user_id` = `{{dlv - user_id}}` (sent when present in data layer)
- **User properties:**
  - `user_type` = `{{dlv - user_type}}`
- **Fires on:** Initialization - All Pages (fires before event tags; consent defaults have already run on Consent Initialization)
- **Firing option:** Once per event

### Engagement

#### GA4 Event - Scroll Depth (Tag #2)
- **Event name:** `scroll`
- **Parameters:** `percent_scrolled` = `{{Scroll Depth Threshold}}`
- **Fires on:** Scroll Depth - 25/50/75/90
- **Notes:** Disable EM scroll tracking to avoid double-counting.

#### GA4 Event - Video Engagement (Tag #10)
- **Event name:** `video_{{Video Status}}` (dynamic: video_start, video_progress, video_complete)
- **Parameters:** `video_title`, `video_url`, `video_provider`, `video_percent`, `video_current_time`
- **Fires on:** YouTube Video - All Events
- **Notes:** Disable EM video tracking if using this. One tag handles all video states via dynamic event naming.

### Clicks

#### GA4 Event - Outbound Click (Tag #3)
- **Event name:** `outbound_click`
- **Parameters:** `link_url`, `link_text`, `outbound` (= "true")
- **Fires on:** Click - Outbound Links

#### GA4 Event - Phone Click (Tag #4)
- **Event name:** `phone_click`
- **Parameters:** `link_url`, `link_text`
- **Fires on:** Click - Phone Links (tel)

#### GA4 Event - Email Click (Tag #5)
- **Event name:** `email_click`
- **Parameters:** `link_url`, `link_text`
- **Fires on:** Click - Email Links (mailto)

#### GA4 Event - File Download (Tag #6)
- **Event name:** `file_download`
- **Parameters:** `link_url`, `link_text`, `file_extension`
- **Fires on:** Click - File Downloads

#### GA4 Event - CTA Click (Tag #7)
- **Event name:** `cta_click`
- **Parameters:** `link_url`, `link_text`, `link_classes`
- **Fires on:** Click - CTA Buttons

### Forms

#### GA4 Event - Form Submit (Tag #8)
- **Event name:** `generate_lead`
- **Parameters:** `form_id`, `form_classes`, `form_destination`
- **Fires on:** Form Submission - All Forms
- **Notes:** `generate_lead` is a GA4 recommended event. For AJAX forms, push a `generate_lead` event to the data layer instead; Tag #26 sends it.

#### GA4 Event - Form Submit (Data Layer) (Tag #26)
- **Event name:** `generate_lead`
- **Parameters:** `form_id`, `form_name`, `form_destination` (from the data layer push)
- **Fires on:** CE - generate_lead
- **Notes:** Use for AJAX forms. If a form fires both a native submit and the push, pause Tag #8 so the lead isn't counted twice.

#### GA4 Event - Sign Up (Tag #25)
- **Event name:** `sign_up`
- **Parameters:** `method` (= "website")
- **Fires on:** CE - sign_up
- **Notes:** `sign_up` is a GA4 recommended event. Customize the `method` parameter per implementation (e.g., "newsletter", "account", "form").

### Errors

#### GA4 Event - 404 Error (Tag #9)
- **Event name:** `page_not_found`
- **Parameters:** `page_location`, `page_referrer`
- **Fires on:** CE - page_not_found

### Search

#### GA4 Event - Site Search (Tag #11)
- **Event name:** `view_search_results`
- **Parameters:** `search_term`
- **Fires on:** CE - site_search

### Ecommerce

All ecommerce tags use `sendEcommerceData: true` with `getEcommerceDataFrom: dataLayer`. This means the `items`, `value`, `currency`, and `transaction_id` are read automatically from the data layer — no manual parameter mapping needed.

| Tag | Event Name | Trigger |
|-----|-----------|---------|
| #12 Add to Cart | `add_to_cart` | CE - add_to_cart |
| #13 Begin Checkout | `begin_checkout` | CE - begin_checkout |
| #14 Purchase | `purchase` | CE - purchase |
| #15 View Item | `view_item` | CE - view_item |
| #16 View Item List | `view_item_list` | CE - view_item_list |
| #19 Select Item | `select_item` | CE - select_item |
| #20 Remove from Cart | `remove_from_cart` | CE - remove_from_cart |
| #21 View Cart | `view_cart` | CE - view_cart |
| #22 Add Shipping Info | `add_shipping_info` | CE - add_shipping_info |
| #23 Add Payment Info | `add_payment_info` | CE - add_payment_info |
| #24 Refund | `refund` | CE - refund |

### Consent (Optional — paused by default)

#### Consent Mode - Default (Tag #17)
- **Type:** Custom HTML
- **Fires on:** Consent Initialization - All Pages (before Google Tag)
- **Status:** Paused
- **What it does:** Sets all consent categories to `denied` by default, with `wait_for_update: 500` to give the cookie banner time to load.

#### Consent Mode - Update (Tag #18)
- **Type:** Custom HTML
- **Fires on:** CE - consent_update
- **Status:** Paused
- **What it does:** Grants `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` when user accepts cookies.
- **Notes:** Customize granted categories per client's needs. Wire the `consent_update` data layer push to the cookie banner's "Accept" action.
