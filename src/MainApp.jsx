// src/MainApp.jsx
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const API = import.meta.env.VITE_API_URL;
const KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

export default function MainApp() {
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
        description: "Pay ₹1 rupee to unlock the counter",
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
            // 🎉 Confetti animation
            confetti({
              particleCount: 120,
              spread: 70,
              origin: { y: 0.6 },
            });
          } else {
            alert("Payment verification failed: " + (body.message || JSON.stringify(body)));
          }
        },
        theme: { color: "#2563eb" }, // blue-600
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
        if (res.status === 403) alert("Session expired. Please pay again.");
        return;
      }
      const data = await res.json();
      setCount(data.count);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="w-full bg-white shadow-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-bold text-blue-600">PayOneRupee</h1>
          <nav className="space-x-6 text-sm font-medium">
            <a href="/" className="hover:text-blue-600">Home</a>
            <a href="/about" className="hover:text-blue-600">About</a>
            <a href="/contact" className="hover:text-blue-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        {!token ? (
          <div className="max-w-md w-full text-center bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Unlock the Counter with Just ₹1</h2>
            <p className="text-gray-600 mb-6">
              A fun experiment to see how many people pay one rupee online.
            </p>
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Opening checkout…" : "Pay ₹1 Now"}
            </button>
            <p className="text-xs text-gray-400 mt-3">Powered by Razorpay</p>
          </div>
        ) : (
          <div className="max-w-md w-full text-center bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-2 text-green-600">You’ve unlocked 🎉</h2>
            <div className="text-5xl font-extrabold my-4 text-blue-700">
              {count === null ? "…" : count}
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={fetchCount} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
                Refresh
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("authToken");
                  setToken(null);
                  setCount(null);
                }}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-xs text-gray-500 py-4">
        <a href="/privacy-policy" className="hover:text-blue-600">Privacy</a> ·{" "}
        <a href="/refund-policy" className="hover:text-blue-600">Refunds</a> ·{" "}
        <a href="/terms" className="hover:text-blue-600">Terms</a> ·{" "}
        <a href="/about" className="hover:text-blue-600">About</a>
        <p className="mt-1">© {new Date().getFullYear()} PayOneRupee</p>
      </footer>
    </div>
  );
}
