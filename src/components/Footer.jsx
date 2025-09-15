import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        
        {/* Left Side */}
        <p>© {new Date().getFullYear()} PayOneRupee</p>

        {/* Right Side Links */}
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link to="/privacy-policy" className="hover:text-blue-600">Privacy</Link>
          <Link to="/refund-policy" className="hover:text-blue-600">Refund</Link>
          <Link to="/terms" className="hover:text-blue-600">Terms</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
