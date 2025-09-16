// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-10 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        
        {/* Left side */}
        <p className="mb-4 sm:mb-0">© {new Date().getFullYear()} PayOneRupee</p>

        {/* Links */}
        <div className="flex flex-wrap justify-center sm:justify-end space-x-6"> 
          <Link to="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link>
          <Link to="/refund-policy" className="hover:text-blue-600">Refund Policy</Link>
          <Link to="/terms" className="hover:text-blue-600">Terms of Service</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
