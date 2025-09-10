import { Routes, Route, Link } from "react-router-dom";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Contact from "./pages/Contact";

// ... your existing App component

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

      {/* Footer with links */}
      <footer className="text-center text-sm py-4 border-t mt-8">
        <Link to="/privacy-policy" className="mx-2 text-blue-600">Privacy</Link>
        <Link to="/refund-policy" className="mx-2 text-blue-600">Refund</Link>
        <Link to="/terms" className="mx-2 text-blue-600">Terms</Link>
        <Link to="/about" className="mx-2 text-blue-600">About</Link>
        <Link to="/contact" className="mx-2 text-blue-600">Contact</Link>
      </footer>
    </div>
  );
}
