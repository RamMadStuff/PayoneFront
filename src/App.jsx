// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import MainApp from "./MainApp.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import RefundPolicy from "./pages/RefundPolicy.jsx";
import Terms from "./pages/Terms.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import "./styles/custom.css";


export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* ✅ Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* ✅ Footer */}
      <footer className="bg-black text-gray-400 text-center text-sm py-4">
        <Link to="/privacy-policy" className="hover:text-yellow-400">Privacy Policy</Link> ·{" "}
        <Link to="/refund-policy" className="hover:text-yellow-400">Refund Policy</Link> ·{" "}
        <Link to="/terms" className="hover:text-yellow-400">Terms of Service</Link> ·{" "}
        <Link to="/about" className="hover:text-yellow-400">About</Link> ·{" "}
        <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
      </footer>
    </div>
  );
}
