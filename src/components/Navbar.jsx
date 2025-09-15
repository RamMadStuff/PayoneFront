import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand/Logo */}
        <Link to="/" className="text-lg font-bold">
          PayOneRupee
        </Link>

        {/* Nav Links */}
        <nav className="flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/about" className="hover:text-gray-200">About</Link>
          <Link to="/contact" className="hover:text-gray-200">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
