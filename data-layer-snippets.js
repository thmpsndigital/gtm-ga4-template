/**
 * Data Layer Push Snippets for GTM + GA4 Template
 *
 * Copy-paste these into your site where needed.
 * Each snippet pushes an event to the GTM data layer that
 * triggers the corresponding tag in the container.
 *
 * IMPORTANT: Always push { ecommerce: null } before ecommerce
 * events to clear stale data from the data layer.
 */


// =============================================================
// USER IDENTITY
// Push on every page load where user is logged in.
// Add to the <head> BEFORE the GTM snippet.
// =============================================================

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  user_id: 'USER-123',        // Your CRM/auth system ID
  user_type: 'customer'       // e.g., prospect, customer, subscriber, admin
});

// WordPress PHP version (add to wp_head hook, priority 1):
// <script>
// window.dataLayer = window.dataLayer || [];
// <?php if (is_user_logged_in()) : $user = wp_get_current_user(); ?>
// window.dataLayer.push({
//   user_id: '<?php echo esc_js($user->ID); ?>',
//   user_type: '<?php echo esc_js($user->roles[0] ?? "subscriber"); ?>'
// });
// <?php endif; ?>
// </script>


// =============================================================
// 404 ERROR TRACKING
// Add this to the client's 404 template (WordPress: 404.php)
// =============================================================

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'page_not_found',
  page_location: window.location.href,
  page_referrer: document.referrer
});

// WordPress PHP version (add to 404.php or via wp_footer hook):
// <script>
// window.dataLayer = window.dataLayer || [];
// window.dataLayer.push({
//   event: 'page_not_found',
//   page_location: window.location.href,
//   page_referrer: document.referrer
// });
// </script>


// =============================================================
// SITE SEARCH
// Fire when search results load (WordPress: search.php)
// =============================================================

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'site_search',
  search_term: 'THE_SEARCH_QUERY'  // Replace with dynamic value
});

// WordPress PHP version:
// <script>
// window.dataLayer = window.dataLayer || [];
// window.dataLayer.push({
//   event: 'site_search',
//   search_term: '<?php echo esc_js(get_search_query()); ?>'
// });
// </script>


// =============================================================
// AJAX FORM SUBMISSION (Gravity Forms, CF7, WPForms, etc.)
// Use when native form submission trigger doesn't fire.
// Tag "GA4 Event - Form Submit (Data Layer)" sends this to GA4.
// =============================================================

// Generic — call after successful AJAX form submit
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'generate_lead',
  form_id: 'contact-form',       // Unique form identifier
  form_name: 'Contact Form',     // Human-readable name
  form_destination: '/thank-you'  // Where user goes next (if applicable)
});

// Gravity Forms (add via gform_confirmation_loaded hook):
// jQuery(document).on('gform_confirmation_loaded', function(event, formId) {
//   window.dataLayer = window.dataLayer || [];
//   window.dataLayer.push({
//     event: 'generate_lead',
//     form_id: 'gf-' + formId,
//     form_name: 'Gravity Form ' + formId
//   });
// });

// Contact Form 7:
// document.addEventListener('wpcf7mailsent', function(event) {
//   window.dataLayer = window.dataLayer || [];
//   window.dataLayer.push({
//     event: 'generate_lead',
//     form_id: 'cf7-' + event.detail.contactFormId,
//     form_name: event.detail.inputs.find(i => i.name === '_wpcf7_container_post')?.value || ''
//   });
// });


// =============================================================
// SIGN UP (newsletter, account creation)
// =============================================================

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'sign_up',
  method: 'newsletter'  // or 'account', 'form', etc.
});


// =============================================================
// CONSENT MODE UPDATE
// Fire from the cookie consent banner's "Accept" button
// =============================================================

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'consent_update'
});


// =============================================================
// ECOMMERCE — VIEW ITEM LIST
// Fire on category/collection/shop pages
// =============================================================

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ ecommerce: null });
window.dataLayer.push({
  event: 'view_item_list',
  ecommerce: {
    item_list_id: 'category-page',
    item_list_name: 'Category Page',
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Product Name',
        item_category: 'Category',
        price: 29.99,
        index: 1
      },
      {
        item_id: 'SKU-002',
        item_name: 'Another Product',
        item_category: 'Category',
        price: 49.99,
        index: 2
      }
    ]
  }
});


// =============================================================
// ECOMMERCE — SELECT ITEM
// Fire when user clicks a product from a list
// =============================================================

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ ecommerce: null });
window.dataLayer.push({
  event: 'select_item',
  ecommerce: {
    item_list_id: 'category-page',
    item_list_name: 'Category Page',
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Product Name',
        item_category: 'Category',
        price: 29.99,
        index: 1
      }
    ]
  }
});


// =============================================================
// ECOMMERCE — VIEW ITEM
// Fire on product detail pages
// =============================================================

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ ecommerce: null });
window.dataLayer.push({
  event: 'view_item',
  ecommerce: {
    currency: 'USD',
    value: 29.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Product Name',
        item_category: 'Category',
        price: 29.99,
        quantity: 1
      }
    ]
  }
});


// =============================================================
// ECOMMERCE — ADD TO CART
// =============================================================

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ ecommerce: null });
window.dataLayer.push({
  event: 'add_to_cart',
  ecommerce: {
    currency: 'USD',
    value: 29.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Product Name',
        item_category: 'Category',
        price: 29.99,
        quantity: 1
      }
    ]
  }
});


// =============================================================
// ECOMMERCE — REMOVE FROM CART
// =============================================================

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ ecommerce: null });
window.dataLayer.push({
  event: 'remove_from_cart',
  ecommerce: {
    currency: 'USD',
    value: 29.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Product Name',
        item_category: 'Category',
        price: 29.99,
        quantity: 1
      }
    ]
  }
});


// =============================================================
// ECOMMERCE — VIEW CART
// Fire when the cart page loads
// =============================================================

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ ecommerce: null });
window.dataLayer.push({
  event: 'view_cart',
  ecommerce: {
    currency: 'USD',
    value: 79.98,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Product Name',
        item_category: 'Category',
        price: 29.99,
        quantity: 1
      },
      {
        item_id: 'SKU-002',
        item_name: 'Another Product',
        item_category: 'Category',
        price: 49.99,
        quantity: 1
      }
    ]
  }
});


// =============================================================
// ECOMMERCE — BEGIN CHECKOUT
// =============================================================

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ ecommerce: null });
window.dataLayer.push({
  event: 'begin_checkout',
  ecommerce: {
    currency: 'USD',
    value: 79.98,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Product Name',
        item_category: 'Category',
        price: 29.99,
        quantity: 1
      },
      {
        item_id: 'SKU-002',
        item_name: 'Another Product',
        item_category: 'Category',
        price: 49.99,
        quantity: 1
      }
    ]
  }
});


// =============================================================
// ECOMMERCE — ADD SHIPPING INFO
// Fire when user completes the shipping step
// =============================================================

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ ecommerce: null });
window.dataLayer.push({
  event: 'add_shipping_info',
  ecommerce: {
    currency: 'USD',
    value: 79.98,
    shipping_tier: 'Ground',  // e.g., Ground, Express, Next Day
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Product Name',
        item_category: 'Category',
        price: 29.99,
        quantity: 1
      }
    ]
  }
});


// =============================================================
// ECOMMERCE — ADD PAYMENT INFO
// Fire when user completes the payment step
// =============================================================

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ ecommerce: null });
window.dataLayer.push({
  event: 'add_payment_info',
  ecommerce: {
    currency: 'USD',
    value: 79.98,
    payment_type: 'Credit Card',  // e.g., Credit Card, PayPal, Apple Pay
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Product Name',
        item_category: 'Category',
        price: 29.99,
        quantity: 1
      }
    ]
  }
});


// =============================================================
// ECOMMERCE — PURCHASE
// Fire on the order confirmation / thank-you page
// =============================================================

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ ecommerce: null });
window.dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: 'ORDER-12345',  // REQUIRED — unique order ID
    value: 85.97,                   // REQUIRED — total order value
    currency: 'USD',                // REQUIRED — ISO 4217
    tax: 6.40,
    shipping: 5.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Product Name',
        item_category: 'Category',
        price: 29.99,
        quantity: 1
      },
      {
        item_id: 'SKU-002',
        item_name: 'Another Product',
        item_category: 'Category',
        price: 49.99,
        quantity: 1
      }
    ]
  }
});


// =============================================================
// ECOMMERCE — REFUND
// Fire when an order is fully or partially refunded
// =============================================================

// Full refund (just transaction_id, no items needed):
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ ecommerce: null });
window.dataLayer.push({
  event: 'refund',
  ecommerce: {
    transaction_id: 'ORDER-12345'
  }
});

// Partial refund (include only the refunded items):
// window.dataLayer = window.dataLayer || [];
// window.dataLayer.push({ ecommerce: null });
// window.dataLayer.push({
//   event: 'refund',
//   ecommerce: {
//     transaction_id: 'ORDER-12345',
//     value: 29.99,
//     currency: 'USD',
//     items: [
//       {
//         item_id: 'SKU-001',
//         item_name: 'Product Name',
//         price: 29.99,
//         quantity: 1
//       }
//     ]
//   }
// });
