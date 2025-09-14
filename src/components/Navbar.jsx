// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo / Home */}
        <Link to="/" className="text-lg font-bold hover:text-gray-200">
          PayOneRupee
        </Link>

        {/* Menu Links */}
        <div className="flex gap-6 text-sm">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/about" className="hover:text-gray-200">About</Link>
          <Link to="/privacy-policy" className="hover:text-gray-200">Privacy</Link>
          <Link to="/refund-policy" className="hover:text-gray-200">Refund</Link>
          <Link to="/terms" className="hover:text-gray-200">Terms</Link>
          <Link to="/contact" className="hover:text-gray-200">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
