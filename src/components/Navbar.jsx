// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar bg-black text-white px-8 py-4 flex justify-between items-center">
      <div className="logo text-yellow-400 font-bold text-xl">
        💲 <Link to="/" className="hover:text-yellow-400">PayOneRupee</Link>
      </div>
      <nav className="flex gap-6">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
      </nav>
    </header>
  );
}
