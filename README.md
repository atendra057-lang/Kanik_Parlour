# Kanik Beauty Parlour — Premium Website

A bespoke, editorial, production-quality digital presence created for **Kanik Beauty Parlour**, located at Shop No. 77, opposite JNU Campus, Ber Sarai, New Delhi, India.

---

## 🌸 Overview & Brand Vision

This website is designed with a warm, editorial, luxury beauty aesthetic tailored specifically for a neighborhood beauty studio. It moves away from generic templates and excessive neon pinks, employing a sophisticated, harmonious color palette, refined serif typography, and deliberate asymmetric editorial compositions:

- **Primary Background:** Warm Ivory (`#FAF6F1`)
- **Secondary Background:** Soft Blush (`#F0E2DE`)
- **Primary Accent:** Muted Rose (`#B77980`)
- **Deep Accent:** Rosewood (`#864D57`)
- **Luxury Accent:** Champagne (`#C6A36A`)
- **Primary Text:** Deep Espresso (`#302625`)
- **Card Background:** Warm Off-White (`#FFFDFB`)

---

## 💎 Features & Structure

1. **Local Announcement Strip:** Highlights the Ber Sarai location with a real-time IST opening status badge (*"Open Now · Until 9:00 PM"* or *"Closed · Opens 9:00 AM"*), plus a direct trigger for the owner's verification checklist.
2. **Refined Navigation:** Custom typographic wordmark (`Kanik BEAUTY PARLOUR`), desktop links, smooth in-page scrolling, and an accessible mobile slide-over drawer with keyboard trap & escape key support.
3. **Editorial Hero Section:** Asymmetric 2-column composition with high-resolution photography, value propositions, and primary actions (*"Explore Our Services"* & *"Find Us"*).
4. **Philosophy & Service Highlights:** Concise brand narrative (*"A Moment for You."*) with three boutique pillars.
5. **Interactive Services Showcase:** Category filtering (*All, Hair Care & Styling, Makeup & Bridal*) displaying the 6 core services (Haircuts, Styling, Colour, Rebonding, Straightening, Bridal & Basic Makeup) with enquiry triggers that pre-fill the booking modal.
6. **Consultation Experience Section:** Visual break highlighting personalized beauty consultations.
7. **Interactive Before & After Transformation Gallery:** Fully interactive dual-image comparison slider supporting touch gestures, pointer drag, and accessible keyboard navigation (Arrow keys, Home, End). Includes clear demo-content disclosure tags.
8. **Appointment Enquiry System:** Modal dialog with input validation, past-date prevention, accessible focus restoration, and prepared WhatsApp message generator. Safely handles missing business numbers without generating broken links or false confirmations.
9. **Location & Operating Hours:** Dedicated address card, verified Google Maps directions link, embed map, and weekly timetable with the current day dynamically highlighted.
10. **Frequently Asked Questions:** Semantic, keyboard-navigable FAQ accordion answering common customer inquiries with exact, unembellished answers.
11. **Refined Footer:** Wordmark, summary, navigation links, copyright, and conditional social media links (only renders when real links are configured).
12. **Owner Management Tools:**
    - **Launch Verification Checklist Modal:** Built-in review of 7 essential items needing the owner's confirmation.
    - **Transformation Upload & Firebase Setup Guide:** Interactive modal outlining the Firebase/Firestore integration architecture for authenticated before-and-after photo uploads.

---

## 📋 Central Source of Truth: Business Configuration

All editable salon details are maintained in a single configuration file:
👉 **[`src/config/businessConfig.js`](file:///c:/Users/atend/Documents/ChatGPT/Kanik_Beauty_Saloon/src/config/businessConfig.js)**

### Data Integrity Rules Enforced:
- **No fabricated telephone numbers, WhatsApp numbers, or emails:** Left empty by default; conditional rendering safely hides action buttons or displays informational notices until configured.
- **No imaginary prices:** Services display *"Enquire for pricing"* rather than invented figures.
- **No manufactured ratings or fake reviews:** The unverified 3.5 directory rating is omitted from marketing claims.
- **Unverified operating hours flag:** Operating hours reflect public listings but are explicitly flagged as requiring owner confirmation.

### Handover Checklist for Salon Owner:
To take this website live for real customer bookings, update `src/config/businessConfig.js` with:
1. **Business Phone Number:** (e.g., `+91 98765 43210`)
2. **WhatsApp Number:** (e.g., `919876543210` without `+` or spaces for wa.me links)
3. **Official Email Address:** (e.g., `contact@kanikbeautysalon.com`)
4. **Social Media Profiles:** (Instagram, Facebook URLs)
5. **Verified Operating Hours:** Confirm Sunday closing (currently listed as 6:00 PM) and public holiday schedules.
6. **Service Pricing Guide:** Provide exact pricing or starting ranges if desired.
7. **Authentic Client Photos:** Replace demo pairs in `src/data/transformationsData.js` with real salon work.

---

## 🛠️ Technology Stack & Project Structure

- **Framework:** React 19 + Vite 6
- **Styling:** Vanilla CSS Custom Properties (Tokens) for fluid typography, responsive layout, and dark/light contrast
- **Icons:** `lucide-react`
- **SEO & Structured Data:** Semantic HTML5, Schema.org `BeautySalon` JSON-LD, Open Graph meta tags, responsive viewport optimizations.

```
Kanik_Beauty_Saloon/
├── public/
│   ├── favicon.svg             # Luxury monogram "K" favicon
│   ├── og-image.jpg            # Social media card preview image
│   └── images/                 # High-resolution editorial photography
│       ├── hero-editorial.jpg
│       ├── service-haircuts.jpg
│       ├── service-hairstyling.jpg
│       ├── service-haircolour.jpg
│       ├── service-hairrebonding.jpg
│       ├── service-hairstraightening.jpg
│       ├── service-bridalmakeup.jpg
│       ├── consultation-experience.jpg
│       ├── trans-hair-before.jpg
│       ├── trans-hair-after.jpg
│       ├── trans-makeup-before.jpg
│       └── trans-makeup-after.jpg
├── src/
│   ├── config/
│   │   └── businessConfig.js   # Central business details & handover checklist
│   ├── data/
│   │   ├── servicesData.js     # 6 core services catalogue
│   │   ├── transformationsData.js # Before/After image records
│   │   └── faqData.js          # Accordion questions & answers
│   ├── utils/
│   │   └── timeUtils.js        # Asia/Kolkata live opening hours evaluator
│   ├── components/
│   │   ├── AnnouncementStrip.jsx
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── IntroductionSection.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── ConsultationSection.jsx
│   │   ├── TransformationGallery.jsx
│   │   ├── AppointmentModal.jsx
│   │   ├── LocationHoursSection.jsx
│   │   ├── FaqSection.jsx
│   │   ├── Footer.jsx
│   │   ├── OwnerTransformationModal.jsx
│   │   └── OwnerChecklistModal.jsx
│   ├── App.jsx                 # Assembled single-page application
│   ├── App.css                 # Modular styling & design tokens
│   ├── index.css               # Global CSS resets & root variables
│   └── main.jsx
├── eslint.config.js            # ESLint 9 configuration
├── index.html                  # HTML entry with SEO metadata & JSON-LD
└── package.json
```

---

## 🚀 Running the Project

### Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```
Generates an optimized bundle in the `dist/` directory ready for deployment on Vercel, Netlify, or Firebase Hosting.

### Linting
```bash
npm run lint
```
Runs ESLint across all components and scripts.
