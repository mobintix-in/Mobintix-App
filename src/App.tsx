import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { initGA } from './lib/analytics';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CookieConsentBanner from './components/CookieConsentBanner';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const WebDevelopment = lazy(() => import('./pages/services/WebDevelopment'));
const MobileAppDevelopment = lazy(() => import('./pages/services/MobileAppDevelopment'));
const UiUxDesign = lazy(() => import('./pages/services/UiUxDesign'));
const CloudSolutions = lazy(() => import('./pages/services/CloudSolutions'));
const Ecommerce = lazy(() => import('./pages/services/Ecommerce'));
const EnterpriseSolutions = lazy(() => import('./pages/services/EnterpriseSolutions'));
const DatabaseDesign = lazy(() => import('./pages/services/DatabaseDesign'));
const Security = lazy(() => import('./pages/services/Security'));
const DigitalMarketing = lazy(() => import('./pages/services/DigitalMarketing'));
const AiMachineLearning = lazy(() => import('./pages/services/AiMachineLearning'));
const MaintenanceSupport = lazy(() => import('./pages/services/MaintenanceSupport'));
const BusinessIntelligence = lazy(() => import('./pages/services/BusinessIntelligence'));
const Consulting = lazy(() => import('./pages/services/Consulting'));
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
  </div>
);



const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/aryan');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdmin && <Footer />}
      <CookieConsentBanner />
    </div>
  );
};

import './i18n/config';
import { RegionProvider } from './context/RegionContext';

function App() {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <HelmetProvider>
      <RegionProvider>
        <Router>
          <ScrollToTop />
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/web-development" element={<WebDevelopment />} />
                <Route path="/services/mobile-apps" element={<MobileAppDevelopment />} />
                <Route path="/services/ui-ux-design" element={<UiUxDesign />} />
                <Route path="/services/cloud-solutions" element={<CloudSolutions />} />
                <Route path="/services/ecommerce" element={<Ecommerce />} />
                <Route path="/services/enterprise-solutions" element={<EnterpriseSolutions />} />
                <Route path="/services/database-design" element={<DatabaseDesign />} />
                <Route path="/services/security" element={<Security />} />
                <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
                <Route path="/services/digital-strategy" element={<DigitalMarketing />} />
                <Route path="/services/ai-ml" element={<AiMachineLearning />} />
                <Route path="/services/maintenance-support" element={<MaintenanceSupport />} />
                <Route path="/services/business-intelligence" element={<BusinessIntelligence />} />
                <Route path="/services/consulting" element={<Consulting />} />

                <Route path="/projects" element={<Projects />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/aryan" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <WhatsAppButton />
            </Suspense>
          </Layout>
        </Router>
      </RegionProvider>
    </HelmetProvider>
  );
}

export default App;
