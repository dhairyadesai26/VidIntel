import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage   from './pages/LandingPage';
import AppPage       from './pages/AppPage';
import FeaturesPage  from './pages/FeaturesPage';
import HowToUsePage  from './pages/HowToUsePage';
import FaqPage       from './pages/FaqPage';
import AboutPage     from './pages/AboutPage';
import HistoryPage   from './pages/HistoryPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/"           element={<LandingPage />}  />
        <Route path="/app"        element={<AppPage />}      />
        <Route path="/features"   element={<FeaturesPage />} />
        <Route path="/how-to-use" element={<HowToUsePage />} />
        <Route path="/faq"        element={<FaqPage />}      />
        <Route path="/about"      element={<AboutPage />}    />
        <Route path="/history"    element={<HistoryPage />}  />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
