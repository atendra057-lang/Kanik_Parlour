/**
 * Transformations Data Catalog for Kanik Beauty Parlour
 * 
 * AUTHENTICITY NOTE (strictly compliant with brief):
 * These records represent interactive demonstration pairs to showcase the visual
 * comparison slider to the business owner. They are explicitly flagged with isDemo: true
 * so visitors and clients understand that genuine salon client transformations
 * will be uploaded by the owner via the management portal.
 */

export const initialTransformationsData = [
  {
    id: 'trans-1',
    title: 'Hair Smoothing & Rebonding Transformation',
    category: 'Hair Rebonding',
    categoryId: 'hair',
    beforeImage: '/images/trans-hair-before.jpg',
    afterImage: '/images/trans-hair-after.jpg',
    beforeLabel: 'Natural Texture Before',
    afterLabel: 'After Rebonding & Gloss',
    shortDescription: 'Demonstration of texture restructuring from natural uneven waves and frizz to a silky, mirror-straight finish.',
    imageAlt: 'Before and after hair smoothing and rebonding comparison',
    displayOrder: 1,
    isPublished: true,
    isDemo: true,
    treatmentCategory: 'Hair Care'
  },
  {
    id: 'trans-2',
    title: 'Special Occasion Makeup & Glow Finish',
    category: 'Bridal & Occasion Makeup',
    categoryId: 'makeup',
    beforeImage: '/images/trans-makeup-before.jpg',
    afterImage: '/images/trans-makeup-after.jpg',
    beforeLabel: 'Fresh Bare Face',
    afterLabel: 'Occasion Glam Finish',
    shortDescription: 'Demonstration of glowing skin, soft-focus contouring, refined eye definition, and harmonious muted rose lip tones.',
    imageAlt: 'Before and after occasion makeup transformation comparison',
    displayOrder: 2,
    isPublished: true,
    isDemo: true,
    treatmentCategory: 'Makeup'
  }
];
