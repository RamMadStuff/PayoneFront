// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 text-center py-6 mt-12">
      <div className="space-x-4 text-sm">
        <Link to="/privacy-policy" className="hover:text-white">Privacy</Link>
        <Link to="/refund-policy" className="hover:text-white">Refund</Link>
        <Link to="/terms" className="hover:text-white">Terms</Link>
        <Link to="/about" className="hover:text-white">About</Link>
        <Link to="/contact" className="hover:text-white">Contact</Link>
      </div>
      <p className="mt-4 text-xs">&copy; {new Date().getFullYear()} PayOneRupee</p>
    </footer>
  );
}
