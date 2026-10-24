/**
 * Kanik Beauty Parlour - Centralized Business Configuration
 * 
 * IMPORTANT RESTRICTION COMPLIANCE:
 * - Phone numbers, WhatsApp numbers, email addresses, and social links are NOT invented.
 * - Unknown values are left empty and safely handled via conditional rendering.
 * - All business facts adhere strictly to verified public data.
 */

export const businessConfig = {
  businessName: 'Kanik Beauty Parlour',
  alternateBusinessName: 'Kanik Unisex Saloon',
  tagline: 'Your Beauty, Your Signature.',
  shortDescription: 'Hair and beauty services in Ber Sarai, New Delhi, for everyday style and special occasions.',
  businessType: 'Unisex salon offering hair and makeup services',
  
  // Established year from public directory (flagged for owner verification before marketing use)
  establishedYearUnverified: 2014,

  address: {
    shop: 'Shop No. 77',
    landmark: 'Opposite JNU Campus',
    area: 'Ber Sarai',
    city: 'New Delhi',
    state: 'Delhi',
    postalCode: '110016',
    country: 'India',
    fullFormatted: 'Shop No. 77, opposite JNU Campus, Ber Sarai, New Delhi, Delhi 110016, India'
  },

  maps: {
    // Official Google Maps short link provided in project brief
    shortLink: 'https://share.google/hkTiOBxA9ujIZaG6a',
    // Standard Google Maps search fallback
    searchUrl: 'https://www.google.com/maps/search/?api=1&query=Kanik+Beauty+Parlour+Ber+Sarai+New+Delhi+110016',
    // Direct directions link
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Shop+No.+77+opposite+JNU+Campus+Ber+Sarai+New+Delhi+Delhi+110016',
    // Safe embed URL for Ber Sarai / JNU Campus opposite location
    embedUrl: 'https://maps.google.com/maps?q=Shop%20No.%2077%2C%20opposite%20JNU%20Campus%2C%20Ber%20Sarai%2C%20New%20Delhi%2C%20Delhi%20110016&t=&z=15&ie=UTF8&iwloc=&output=embed'
  },

  // Operating Hours (IST UTC+05:30)
  // Publicly listed hours - noted as requiring owner confirmation before treated as definitive
  openingHours: {
    requiresOwnerConfirmation: true,
    timezone: 'Asia/Kolkata',
    schedule: [
      {
        dayLabel: 'Monday – Saturday',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayIndices: [1, 2, 3, 4, 5, 6],
        time: '9:00 AM – 9:00 PM',
        openHour: 9,
        openMinute: 0,
        closeHour: 21,
        closeMinute: 0
      },
      {
        dayLabel: 'Sunday',
        days: ['Sunday'],
        dayIndices: [0],
        time: '9:00 AM – 6:00 PM',
        openHour: 9,
        openMinute: 0,
        closeHour: 18,
        closeMinute: 0
      }
    ],
    notice: 'Publicly listed hours. Please confirm before visiting.'
  },

  // Contact Information
  // PER BRIEF: The salon's actual phone, WhatsApp, email, and social accounts
  // have not been reliably established. Left empty until confirmed by the owner.
  contact: {
    phoneNumber: '', // e.g., '+919876543210' when verified
    phoneDisplay: '', // e.g., '+91 98765 43210'
    whatsappNumber: '', // International format without plus, e.g., '919876543210'
    emailAddress: '',
    instagramUrl: '',
    facebookUrl: ''
  },

  // Owner Handover Verification Checklist
  handoverChecklist: [
    { id: 'phone', label: 'Primary Contact Phone Number', status: 'Pending Owner Input' },
    { id: 'whatsapp', label: 'WhatsApp Number for Instant Enquiries', status: 'Pending Owner Input' },
    { id: 'hours', label: 'Confirmation of Daily Operating Hours', status: 'Public Listing (9 AM–9 PM / Sun 6 PM)' },
    { id: 'pricing', label: 'Service Price List & Bridal Package Details', status: 'Enquire for Pricing' },
    { id: 'portfolio', label: 'Authentic Salon Transformation Photos', status: 'Demo Pairs Displayed' },
    { id: 'socials', label: 'Social Media Profiles (Instagram / Facebook)', status: 'Hidden Until Configured' },
    { id: 'backend', label: 'Cloud Storage & Database Credentials for Owner Uploads', status: 'Ready for Setup' }
  ],

  // Demonstration flags
  showDemoGalleryContent: true,
  isDemoMode: true
};
