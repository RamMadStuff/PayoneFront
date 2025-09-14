// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import MainApp from "./MainApp.jsx";

// Simple static pages
function PrivacyPolicy() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Privacy Policy</h1>
      <p>We value your privacy. No sensitive data is stored beyond payment verification.</p>
    </div>
  );
}

function RefundPolicy() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Refund Policy</h1>
      <p>₹1 demo payments are non-refundable as this is for demonstration purposes only.</p>
    </div>
  );
}

function Terms() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Terms of Service</h1>
      <p>Use this service only for testing micro-payments and integrations.</p>
    </div>
  );
}

function About() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">About</h1>
      <p>PayOneRupee is a demo micro-payment counter built to showcase digital payments.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Contact</h1>
      <p>Email us at <a href="mailto:support@payonerupee.online" className="text-blue-600">support@payonerupee.online</a></p>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      {/* Global footer stays at the bottom */}
      <footer className="py-6 text-xs text-gray-500 text-center border-t">
        <Link to="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link> ·{" "}
        <Link to="/refund-policy" className="hover:text-blue-600">Refund Policy</Link> ·{" "}
        <Link to="/terms" className="hover:text-blue-600">Terms of Service</Link> ·{" "}
        <Link to="/about" className="hover:text-blue-600">About</Link> ·{" "}
        <Link to="/contact" className="hover:text-blue-600">Contact</Link>
      </footer>
    </div>
  );
}
