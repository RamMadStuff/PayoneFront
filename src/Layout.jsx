import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
