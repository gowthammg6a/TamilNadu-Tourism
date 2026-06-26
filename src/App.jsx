import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import BackToTop from './components/BackToTop'
import WhatsAppButton from './components/WhatsAppButton'
import HomePage from './pages/HomePage'
import DestinationsPage from './pages/DestinationsPage'
import DestinationDetail from './pages/DestinationDetail'
import AboutPage from './pages/AboutPage'
import ExperiencesPage from './pages/ExperiencesPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import TravelPlannerPage from './pages/TravelPlannerPage'
import PackagesPage from './pages/PackagesPage'
import BlogPage from './pages/BlogPage'
import BookmarksPage from './pages/BookmarksPage'
import AdminPage from './pages/AdminPage'
import NotFoundPage from './pages/NotFoundPage'

function Layout() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'
  return (
    <>
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/destinations/:id" element={<DestinationDetail />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/planner" element={<TravelPlannerPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!isAdmin && <Footer />}
      {!isAdmin && <BackToTop />}
      {!isAdmin && <WhatsAppButton />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  )
}
