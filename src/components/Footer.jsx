import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-6 text-center text-gray-500 text-xs border-t">
      <div className="space-x-4">
        <Link to="/privacy-policy" className="hover:text-blue-600">Privacy</Link>
        <Link to="/refund-policy" className="hover:text-blue-600">Refunds</Link>
        <Link to="/terms" className="hover:text-blue-600">Terms</Link>
      </div>
      <p className="mt-2">© {new Date().getFullYear()} PayOneRupee. All rights reserved.</p>
    </footer>
  );
}
