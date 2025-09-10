// src/App.jsx
import { useEffect, useState } from "react";

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

      {/* Footer for compliance */}
      <footer className="mt-12 text-xs text-gray-500 text-center">
        <a href="/privacy-policy" className="hover:text-blue-600">Privacy Policy</a> ·{" "}
        <a href="/refund-policy" className="hover:text-blue-600">Refund Policy</a> ·{" "}
        <a href="/terms" className="hover:text-blue-600">Terms of Service</a> ·{" "}
        <a href="/about" className="hover:text-blue-600">About</a> ·{" "}
        <a href="/contact" className="hover:text-blue-600">Contact</a>
      </footer>
    </div>
  );
}
