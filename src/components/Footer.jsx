import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-8 py-4">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-600">
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          <Link to="/privacy-policy" className="hover:text-blue-600">
            Privacy Policy
          </Link>
          <Link to="/refund-policy" className="hover:text-blue-600">
            Refund Policy
          </Link>
          <Link to="/terms" className="hover:text-blue-600">
            Terms of Service
          </Link>
          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>
        </div>
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} PayOneRupee. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
