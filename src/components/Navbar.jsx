export default function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">💲 PayOneRupee</div>
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>
    </header>
  );
}
