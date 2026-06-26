import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()
const LangContext = createContext()
const BookmarkContext = createContext()

// ── Theme — Light Mode Only ──
export function ThemeProvider({ children }) {
  const dark = false // always light
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    localStorage.removeItem('tnt_dark')
  }, [])
  return <ThemeContext.Provider value={{ dark, toggle: () => {} }}>{children}</ThemeContext.Provider>
}
export const useTheme = () => useContext(ThemeContext)

// ── Language ──
// RULE: Only h1/h2/h3 headings + nav labels use t(). Body content stays in English always.
const translations = {
  en: {
    // Navbar
    home: 'Home', destinations: 'Destinations', experiences: 'Experiences',
    planner: 'Planner', gallery: 'Gallery', about: 'About',
    planTrip: 'Plan Trip',
    // Hero headings only
    heroTag: "Discover India's Cultural Gem",
    heroTitle: 'Explore Tamil Nadu',
    exploreBtn: 'Explore Destinations', learnMore: 'Learn More',
    // Home - section headings only
    featuredDest: 'Featured Destinations', viewAll: 'View All',
    whyTitle: 'Why Visit Tamil Nadu?',
    expTitle: 'Travel Experiences', viewExperiences: 'View All Experiences',
    ctaTitle: 'Ready to Explore Tamil Nadu?',
    planTripBtn: 'Plan My Trip', contactUs: 'Contact Us', viewGallery: 'View Gallery',
    // Destinations page - headings only
    destPageTag: 'Explore the State', destPageTitle: 'All Destinations',
    // Destination detail - headings only
    aboutDest: 'About', topSpots: 'Top Spots to Visit',
    travelTips: 'Insider Travel Tips', nearbyAttr: 'Nearby Attractions',
    planVisit: 'Plan Your Visit', locationMap: 'Location Map', reviews: 'Traveller Reviews',
    // Experiences - headings only
    expPageTag: 'What To Do', expPageTitle: 'Travel Experiences', expCta: 'Ready to Experience Tamil Nadu?',
    // Gallery - headings only
    galPageTag: 'Visual Journey', galPageTitle: 'Picture Tamil Nadu',
    // About - headings only
    aboutPageTag: 'Our Story', aboutPageTitle: 'About Tamil Nadu',
    aboutSection1: 'A Civilization That Never Forgot Its Roots',
    aboutTimeline: 'A Journey Through Time', aboutCta: 'Experience This Living Heritage',
    // Contact - headings only
    contactPageTag: 'Get In Touch', contactPageTitle: 'Plan Your Trip',
    contactForm: 'Send Us a Message', faqTitle: 'Frequently Asked Questions',
    // Planner - headings only
    plannerTag: 'Plan Your Visit', plannerTitle: 'Month-wise Travel Planner',
    plannerBest: 'Best Destinations This Month', plannerAll: 'All 12 Months', plannerCta: 'Ready to Plan Your Trip?',
    // Packages - headings only
    packagesTag: 'Tour Packages', packagesTitle: 'Choose Your Adventure', customPkg: 'Build Your Own Package',
    // Blog - headings only
    blogTag: 'Travel Stories', blogTitle: 'Tamil Nadu Travel Blog', blogNewsletter: 'Get Travel Stories in Your Inbox',
    // Bookmarks - headings only
    bookmarksTag: 'Saved Destinations', bookmarksTitle: 'My Favourites',
  },
  ta: {
    // Navbar
    home: 'முகப்பு', destinations: 'இடங்கள்', experiences: 'அனுபவங்கள்',
    planner: 'திட்டமிடல்', gallery: 'படங்கள்', about: 'பற்றி',
    planTrip: 'பயணம் திட்டமிடு',
    // Hero headings only
    heroTag: 'இந்தியாவின் கலாச்சார மாணிக்கம்',
    heroTitle: 'தமிழ்நாட்டை ஆராயுங்கள்',
    exploreBtn: 'இடங்களை காணுங்கள்', learnMore: 'மேலும் அறிய',
    // Home - section headings only
    featuredDest: 'சிறந்த இடங்கள்', viewAll: 'அனைத்தும் காண',
    whyTitle: 'ஏன் தமிழ்நாடு?',
    expTitle: 'பயண அனுபவங்கள்', viewExperiences: 'அனைத்து அனுபவங்களும்',
    ctaTitle: 'தமிழ்நாட்டை ஆராய தயாரா?',
    planTripBtn: 'பயணம் திட்டமிடு', contactUs: 'தொடர்பு கொள்ளுங்கள்', viewGallery: 'படங்கள் காண',
    // Destinations page - headings only
    destPageTag: 'மாநிலத்தை ஆராயுங்கள்', destPageTitle: 'அனைத்து இடங்கள்',
    // Destination detail - headings only
    aboutDest: 'பற்றி', topSpots: 'சிறந்த இடங்கள்',
    travelTips: 'பயண குறிப்புகள்', nearbyAttr: 'அருகிலுள்ள இடங்கள்',
    planVisit: 'பயணம் திட்டமிடுங்கள்', locationMap: 'இருப்பிட வரைபடம்', reviews: 'பயணிகள் கருத்துகள்',
    // Experiences - headings only
    expPageTag: 'என்ன செய்யலாம்', expPageTitle: 'பயண அனுபவங்கள்', expCta: 'தமிழ்நாட்டை அனுபவிக்க தயாரா?',
    // Gallery - headings only
    galPageTag: 'காட்சி பயணம்', galPageTitle: 'தமிழ்நாட்டின் படங்கள்',
    // About - headings only
    aboutPageTag: 'எங்கள் கதை', aboutPageTitle: 'தமிழ்நாடு பற்றி',
    aboutSection1: 'வேர்களை மறவாத நாகரிகம்',
    aboutTimeline: 'வரலாற்றின் பயணம்', aboutCta: 'இந்த பாரம்பரியத்தை அனுபவியுங்கள்',
    // Contact - headings only
    contactPageTag: 'தொடர்பு கொள்ளுங்கள்', contactPageTitle: 'பயணம் திட்டமிடுங்கள்',
    contactForm: 'செய்தி அனுப்புங்கள்', faqTitle: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    // Planner - headings only
    plannerTag: 'பயணம் திட்டமிடுங்கள்', plannerTitle: 'மாத வாரியான பயண திட்டம்',
    plannerBest: 'இந்த மாதம் சிறந்த இடங்கள்', plannerAll: 'அனைத்து 12 மாதங்கள்', plannerCta: 'பயணம் திட்டமிட தயாரா?',
    // Packages - headings only
    packagesTag: 'சுற்றுலா தொகுப்புகள்', packagesTitle: 'உங்கள் சாகசத்தை தேர்ந்தெடுங்கள்', customPkg: 'உங்கள் சொந்த தொகுப்பை',
    // Blog - headings only
    blogTag: 'பயண கதைகள்', blogTitle: 'தமிழ்நாடு பயண வலைப்பதிவு', blogNewsletter: 'பயண கதைகள் inbox-ல்',
    // Bookmarks - headings only
    bookmarksTag: 'சேமித்த இடங்கள்', bookmarksTitle: 'என் விருப்பங்கள்',
  }
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('tnt_lang') || 'en')
  const toggle = () => setLang(l => {
    const next = l === 'en' ? 'ta' : 'en'
    localStorage.setItem('tnt_lang', next)
    return next
  })
  const t = key => translations[lang][key] || translations.en[key] || key
  return <LangContext.Provider value={{ lang, toggle, t }}>{children}</LangContext.Provider>
}
export const useLang = () => useContext(LangContext)

// ── Bookmarks ──
export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tnt_bookmarks') || '[]') } catch { return [] }
  })
  const toggle = (id) => {
    setBookmarks(prev => {
      const next = prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
      localStorage.setItem('tnt_bookmarks', JSON.stringify(next))
      return next
    })
  }
  const isBookmarked = (id) => bookmarks.includes(id)
  return <BookmarkContext.Provider value={{ bookmarks, toggle, isBookmarked }}>{children}</BookmarkContext.Provider>
}
export const useBookmarks = () => useContext(BookmarkContext)
