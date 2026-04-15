# Toronto Dispensary Website Requirements

This checklist captures practical website requirements for Ontario/Toronto cannabis retail operations.

## Core compliance requirements

1. **Reasonable 19+ access controls online**
   - AGCO Standard 5.2 requires reasonable measures to ensure online users are at least 19.
2. **Prominent retail seal and CRSA details**
   - Ontario operating rules require the official cannabis retail seal and CRSA info on store websites.
3. **No youth-targeting or misleading promotion**
   - Advertising cannot appeal to under-19 users or be false/misleading.
4. **Avoid testimonials and lifestyle promotion**
   - Federal and provincial rules prohibit testimonial-style promotion and certain lifestyle associations.
5. **Responsible-use information**
   - Make responsible-use information available to patrons.

## Recommended product feed architecture

1. Pull product data from a dispensary/POS source (Dutchie, Weedmaps-connected stack, Jane integrations).
2. Normalize into a stable schema:
   - `name`, `brand`, `category`, `thc`, `price`, `image`, `description`, `featured`
3. Include image URLs for all products.
4. Cache/sync at intervals for performance and reliability.
5. Keep a local fallback feed for graceful degradation.

## Source links

- [AGCO Standard 5.0 Minors and Prohibited Individuals](https://www.agco.ca/en/cannabis/registrars-standards-cannabis-retail-stores/50-minors-and-prohibited-individuals)
- [AGCO Standard 6.0 Advertising and Promotions](https://www.agco.ca/en/cannabis/registrars-standards-cannabis-retail-stores/60-advertising-and-promotions)
- [AGCO Operating a Store (seal + CRSA website info)](https://www.agco.ca/en/cannabis/overview-cannabis-legislation-ontario/operating-store)
- [Canada: Promotion prohibitions and permissions](https://www.canada.ca/en/health-canada/services/drugs-medication/cannabis/laws-regulations/promotion-prohibitions.html)
- [Cannabis Act section 17](https://laws-lois.justice.gc.ca/eng/acts/C-24.5/section-17.html)
- [Cannabis Act section 26](https://laws-lois.justice.gc.ca/eng/acts/C-24.5/section-26.html)
- [Dutchie POS API overview](https://api.pos.dutchie.com/pages/overview.html)
- [Weedmaps developer overview](https://developer.weedmaps.com/docs/overview)
- [Jane integrations](https://www.iheartjane.com/business/integrations)
