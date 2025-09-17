import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import MainApp from "./MainApp";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import RefundPolicy from "./pages/RefundPolicy.jsx";
import Terms from "./pages/Terms.jsx";
import "./styles/custom.css";

export default function App() {
  return (
          <Navbar />
          <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
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
