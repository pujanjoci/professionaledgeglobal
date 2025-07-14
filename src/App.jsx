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
import ScrollToTop from "./components/ScrollToTop"; // Add this import
import "./index.css";

function App() {
  return (
    <BrowserRouter basename="/professionaledgeglobal">
      <div className="App">
        <ScrollToTop /> {/* Add this component */}
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