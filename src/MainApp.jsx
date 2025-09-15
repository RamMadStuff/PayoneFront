// src/MainApp.jsx
import { useEffect, useState } from "react";

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
        description: "Unlock the global counter with just ₹1",
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

            // 🎉 Confetti effect
            window.confetti();
          } else {
            alert("Payment verification failed");
          }
        },
        theme: { color: "#2563eb" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed: " + err.message);
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
        return;
      }
      const data = await res.json();
      setCount(data.count);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="mt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 text-center py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Unlock the Counter with Just ₹1
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A fun demo to see how many people paid one rupee worldwide.
        </p>
        {!token && (
          <button
            onClick={handlePayment}
            disabled={loading}
            className="px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            {loading ? "Opening checkout…" : "Pay ₹1 Now"}
          </button>
        )}
      </section>

      {/* Counter Section */}
      {token && (
        <section className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">You’ve Unlocked the Counter 🎉</h2>
          <div className="text-6xl font-extrabold text-blue-600 mb-6">
            {count === null ? "…" : count}
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={fetchCount}
              className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Refresh
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("authToken");
                setToken(null);
                setCount(null);
              }}
              className="px-6 py-2 rounded border hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md">
            <h3 className="font-bold text-lg mb-2">💳 Secure Payments</h3>
            <p className="text-gray-600 text-sm">Powered by Razorpay test checkout.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md">
            <h3 className="font-bold text-lg mb-2">⚡ Instant Access</h3>
            <p className="text-gray-600 text-sm">Unlock the counter instantly after ₹1 payment.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md">
            <h3 className="font-bold text-lg mb-2">🎯 Demo Project</h3>
            <p className="text-gray-600 text-sm">Made for showcasing micro-payments.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
