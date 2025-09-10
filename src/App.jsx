import { Routes, Route, Link } from "react-router-dom";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useEffect, useState } from "react";



// ... your existing App component

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={

// src/App.jsx
const API = import.meta.env.VITE_API_URL;
const KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

export default function App() {
  const [count, setCount] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) fetchCount();
  }, [token]);

  async function createOrder() {
    const res = await fetch(`${API}/create-order`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to create order");
    return res.json();
  }

  async function handlePayment() {
    try {
      setLoading(true);
      const order = await createOrder();
      const options = {
        key: KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "PayOneRupee",
        description: "Unlock access with a ₹1 micro-payment",
        handler: async function (response) {
          const verifyRes = await fetch(`${API}/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const body = await verifyRes.json();
          if (verifyRes.ok && body.success) {
            localStorage.setItem("authToken", body.token);
            setToken(body.token);
            setCount(body.count);
          } else {
            alert("Payment verification failed: " + (body.message || JSON.stringify(body)));
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment start failed: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  async function fetchCount() {
    try {
      const res = await fetch(`${API}/count`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        localStorage.removeItem("authToken");
        setToken(null);
        setCount(null);
        if (res.status === 403) alert("Session expired or unauthorized. Please pay again.");
        return;
      }
      const data = await res.json();
      setCount(data.count);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {!token ? (
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Unlock the Demo Counter 🔓</h1>
          <p className="text-sm text-gray-600 mb-6">
            Experience how micro-payments work. Pay just ₹1 to instantly unlock the live counter.
          </p>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:brightness-90"
          >
            {loading ? "Opening checkout…" : "Pay ₹1 to Unlock"}
          </button>
          <p className="text-xs text-gray-500 mt-4">Powered by Razorpay (Test mode)</p>
        </div>
      ) : (
        <div className="max-w-md w-full text-center">
          <h2 className="text-xl font-semibold mb-2">Access Granted ✅</h2>
          <p className="text-gray-500 mb-4">
            This counter increases with every successful micro-payment.
          </p>
          <div className="text-4xl font-extrabold my-4">{count === null ? "…" : count}</div>
          <div className="flex gap-2 justify-center">
            <button onClick={fetchCount} className="px-4 py-2 rounded bg-green-600 text-white">
              Refresh Count
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("authToken");
                setToken(null);
                setCount(null);
              }}
              className="px-4 py-2 rounded border"
            >
              Logout
            </button>
          </div>
        </div>
      )}

        );
}


} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Footer with links */}
      <footer className="text-center text-sm py-4 border-t mt-8">
        <Link to="/privacy-policy" className="mx-2 text-blue-600">Privacy</Link>
        <Link to="/refund-policy" className="mx-2 text-blue-600">Refund</Link>
        <Link to="/terms" className="mx-2 text-blue-600">Terms</Link>
        <Link to="/about" className="mx-2 text-blue-600">About</Link>
        <Link to="/contact" className="mx-2 text-blue-600">Contact</Link>
      </footer>
    </div>
  );
}
