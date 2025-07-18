import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import CareersPage from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms.jsx";
import CookiePolicy from "./pages/CookiePolicy.jsx";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";

// Flag to ensure console.log only happens once
let hasLogged = false;

function App() {
  // Hidden console message (only visible when dev tools are open)
  if (typeof window !== 'undefined' && !hasLogged) {
    console.log(
      `%cHello, Hi there.. 👋\n` +
      `%cIf you're seeing this, you're probably inspecting the code. It is our curiosity so\n` +
      `Check out how this site was built on GitHub:\n` +
      `https://github.com/pujanjoci\n\n` +
      `%cYou can always check the code and make changes according to your will. But after you star the repo.`,
      'color: #4CAF50; font-size: 14px; font-weight: bold;',
      'color: #2196F3; font-size: 13px;',
      'color: #F44336; font-size: 12px; font-style: italic;'
    );
    hasLogged = true;
  }

  return (
    <BrowserRouter basename="/professionaledgeglobal">
      <div className="App">
        {/* Hidden HTML element (invisible but appears in Elements tab) */}
        <div 
          style={{ display: 'none' }}
          aria-hidden="true"
          data-dev-message="This website was built by Pujan Joci. GitHub: github.com/pujanjoci - Please don't copy without permission."
        />
        
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/:id?" element={<Services />} />
          <Route path="/career" element={<CareersPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;