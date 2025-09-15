import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        
        {/* Left side: Links */}
        <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
          <Link to="/privacy-policy" className="hover:text-blue-600">Privacy</Link>
          <Link to="/refund-policy" className="hover:text-blue-600">Refunds</Link>
          <Link to="/terms" className="hover:text-blue-600">Terms</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
        </div>

        {/* Right side: Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} PayOneRupee. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
