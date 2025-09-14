// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import MainApp from "./MainApp.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import RefundPolicy from "./pages/RefundPolicy.jsx";
import Terms from "./pages/Terms.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Global Footer */}
      <footer className="mt-12 text-xs text-gray-500 text-center">
        <Link to="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link> ·{" "}
        <Link to="/refund-policy" className="hover:text-blue-600">Refund Policy</Link> ·{" "}
        <Link to="/terms" className="hover:text-blue-600">Terms of Service</Link> ·{" "}
        <Link to="/about" className="hover:text-blue-600">About</Link> ·{" "}
        <Link to="/contact" className="hover:text-blue-600">Contact</Link>
      </footer>
    </div>
  );
}
