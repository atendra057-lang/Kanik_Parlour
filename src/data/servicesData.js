/**
 * Services Data Catalog for Kanik Beauty Parlour
 * 
 * Strict compliance with brief:
 * - Only services confirmed in public listings are featured.
 * - No fabricated prices, discounts, or durations.
 * - Centralized and easily expandable by owner.
 */

export const servicesData = [
  {
    id: 'haircuts',
    name: 'Haircuts',
    category: 'Hair Services',
    categoryId: 'hair',
    shortDescription: 'Explore a fresh cut that complements your preferred style and everyday routine.',
    detailedDescription: 'Whether you desire a subtle trim, textured face-framing layers, or a complete modern restyle, our haircut services are tailored to complement your face shape, natural hair texture, and styling preferences.',
    priceDisplay: 'Enquire for pricing',
    image: '/images/service-haircuts.jpg',
    imageAlt: 'Layered chic haircut styling at Kanik Beauty Parlour',
    displayOrder: 1,
    isPublished: true,
    enquiryCategory: 'Haircut & Restyling'
  },
  {
    id: 'hair-styling',
    name: 'Hair Styling',
    category: 'Hair Services',
    categoryId: 'hair',
    shortDescription: 'From polished everyday looks to styling for special occasions, find a look that feels right for you.',
    detailedDescription: 'From high-volume blowouts and bouncy waves to refined updos and party styling, experience hair care designed to hold its finish beautifully throughout your day or evening celebration.',
    priceDisplay: 'Enquire for pricing',
    image: '/images/service-hairstyling.jpg',
    imageAlt: 'Professional voluminous blowout and hair styling',
    displayOrder: 2,
    isPublished: true,
    enquiryCategory: 'Hair Styling & Blowout'
  },
  {
    id: 'hair-colour',
    name: 'Hair Colour',
    category: 'Hair Services',
    categoryId: 'hair',
    shortDescription: 'Discover colour possibilities suited to your preferred look and hair goals.',
    detailedDescription: 'Explore tailored hair colouring options from root touch-ups and full global coverage to subtle sun-kissed balayage and multi-tonal highlights that add dimension and warmth.',
    priceDisplay: 'Enquire for pricing',
    image: '/images/service-haircolour.jpg',
    imageAlt: 'Rich hair colouring and highlights consultation',
    displayOrder: 3,
    isPublished: true,
    enquiryCategory: 'Hair Colouring & Highlights'
  },
  {
    id: 'hair-rebonding',
    name: 'Hair Rebonding',
    category: 'Hair Services',
    categoryId: 'hair',
    shortDescription: 'Enquire about hair rebonding and discuss whether the service suits your hair and desired finish.',
    detailedDescription: 'A professional restructuring service engineered to transform unruly, resistant texture into sleek, pin-straight, glossy hair. Consult with our stylists to understand suitability for your hair history.',
    priceDisplay: 'Enquire for pricing',
    image: '/images/service-hairrebonding.jpg',
    imageAlt: 'Silky smooth rebonded hair treatment consultation',
    displayOrder: 4,
    isPublished: true,
    enquiryCategory: 'Hair Rebonding'
  },
  {
    id: 'hair-straightening',
    name: 'Hair Straightening',
    category: 'Hair Services',
    categoryId: 'hair',
    shortDescription: 'Explore hair straightening options and enquire about the approach most appropriate for your hair.',
    detailedDescription: 'Designed to eliminate frizz, tame volume, and impart smooth manageability and mirror-shine. Enquire to discuss the specific straightening or smoothing treatment best suited for your hair type.',
    priceDisplay: 'Enquire for pricing',
    image: '/images/service-hairstraightening.jpg',
    imageAlt: 'Polished sleek hair straightening styling',
    displayOrder: 5,
    isPublished: true,
    enquiryCategory: 'Hair Straightening'
  },
  {
    id: 'makeup-bridal',
    name: 'Makeup & Bridal Makeup',
    category: 'Makeup Services',
    categoryId: 'makeup',
    shortDescription: 'Make enquiries about basic makeup, bridal makeup, and makeup packages for special occasions.',
    detailedDescription: 'From luminous, fresh-faced basic makeup for daytime functions to opulent bridal makeup and comprehensive wedding packages. Every look is customized to harmonize with your attire, jewelry, and personal aesthetic.',
    priceDisplay: 'Enquire for pricing',
    image: '/images/service-bridalmakeup.jpg',
    imageAlt: 'Refined Indian bridal makeup consultation and styling',
    displayOrder: 6,
    isPublished: true,
    enquiryCategory: 'Bridal & Occasion Makeup'
  }
];

export const serviceCategories = [
  { id: 'all', label: 'All Services' },
  { id: 'hair', label: 'Hair Care & Styling' },
  { id: 'makeup', label: 'Makeup & Bridal' }
];
