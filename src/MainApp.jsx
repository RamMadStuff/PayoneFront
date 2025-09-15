// src/MainApp.jsx
import { useEffect, useState } from "react";

/**
 * MainApp - Product-style UI for PayOneRupee
 * Keeps your existing payment logic, just changes the UI to be product-like.
 *
 * Requirements:
 * - Tailwind must be installed and working.
 * - Razorpay checkout script added to index.html:
 *    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
 *
 * Environment:
 * - VITE_API_URL (backend API base)
 * - VITE_RAZORPAY_KEY_ID (razorpay key id)
 */

const API = import.meta.env.VITE_API_URL;
const KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

export default function MainApp() {
  const [count, setCount] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(false);
  const [justPaid, setJustPaid] = useState(false);

  useEffect(() => {
    if (token) fetchCount();
  }, [token]);

  // fetch current counter
  async function fetchCount() {
    try {
      const res = await fetch(`${API}/count`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
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

  async function createOrder() {
    const res = await fetch(`${API}/create-order`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to create order");
    return res.json();
  }

  // safe payment starter (checks Razorpay script)
  async function handlePayment() {
    if (!window.Razorpay) {
      alert("Payment library failed to load. Refresh and try again.");
      return;
    }

    try {
      setLoading(true);
      const order = await createOrder();

      const options = {
        key: KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "PayOneRupee",
        description: "Unlock the demo counter with a ₹1 micro-payment",
        handler: async function (response) {
          // verify on backend and update UI
          try {
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
              setJustPaid(true);
              window.setTimeout(() => setJustPaid(false), 2500);
            } else {
              alert("Payment verification failed: " + (body.message || JSON.stringify(body)));
            }
          } catch (err) {
            console.error(err);
            alert("Verification error: " + err.message);
          }
        },
        theme: { color: "#0EA5E9" }, // sky-500 color
        modal: {
          ondismiss: function () {
            // optional: do something on cancel
          }
        }
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="logo" className="w-10 h-10 rounded-full" />
          <div>
            <h1 className="text-xl font-bold">PayOneRupee</h1>
            <p className="text-xs text-slate-500">Micro-payments demo • ₹1 unlock</p>
          </div>
        </div>

        <nav className="flex items-center gap-4 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/privacy-policy" className="hover:underline">Privacy</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center py-10">
        <div>
          <h2 className="text-4xl font-extrabold leading-tight">
            Unlock the Demo Counter for just <span className="text-yellow-500">₹1</span>
          </h2>
          <p className="mt-4 text-slate-600">
            PayOneRupee is a product demo that shows how micro-payments work. Pay one rupee to instantly unlock access to the live global counter and get an on-screen celebratory badge.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handlePayment}
              disabled={loading}
              className="rounded-full bg-sky-500 text-white px-6 py-3 font-semibold shadow hover:brightness-95"
            >
              {loading ? "Opening checkout…" : "Pay ₹1 to Unlock"}
            </button>

            <button
              onClick={() => { fetchCount(); alert('Refreshing count...'); }}
              className="px-4 py-2 border rounded-md text-sm"
            >
              Refresh Count
            </button>
          </div>

          <div className="mt-6 text-sm text-slate-500">
            <strong>Note:</strong> Payments are processed securely by Razorpay.
          </div>
        </div>

        {/* Counter Card */}
        <div className="bg-white border rounded-2xl p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-slate-500">Global Unlocks</h3>
              <div className="flex items-baseline gap-3">
                <div className="text-6xl font-extrabold text-yellow-500">
                  {count === null ? "…" : count}
                </div>
                <div className="text-sm text-slate-400">Total people who unlocked</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-500">Your access</div>
              {token ? (
                <div className="mt-2 inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">Granted</div>
              ) : (
                <div className="mt-2 inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">Locked</div>
              )}
            </div>
          </div>

          {/* Confetti / celebration */}
          {justPaid && (
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 border rounded-lg text-center">
              <div className="text-lg font-semibold">🎉 Thanks — you unlocked it!</div>
              <div className="text-sm text-slate-600 mt-1">Your contribution was recorded.</div>
            </div>
          )}

          {/* Small info */}
          <div className="mt-6 text-xs text-slate-500">
            This demo demonstrates micro-payment flows. By paying ₹1 you see the live counter update.
          </div>
        </div>
      </section>

      {/* Features / Why */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-5 shadow-sm border">
            <h4 className="font-semibold mb-2">Secure Payments</h4>
            <p className="text-sm text-slate-500">Payments are processed via Razorpay (PCI compliant).</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm border">
            <h4 className="font-semibold mb-2">Instant Unlock</h4>
            <p className="text-sm text-slate-500">Pay ₹1 and see immediate confirmation and counter update.</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm border">
            <h4 className="font-semibold mb-2">Developer Friendly</h4>
            <p className="text-sm text-slate-500">Open codebase for testing micro-payments and analytics.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t py-8 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 text-sm text-slate-600">
          <div className="flex items-center justify-between">
            <div>© {new Date().getFullYear()} PayOneRupee</div>
            <div className="flex gap-4">
              <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
              <a href="/terms" className="hover:underline">Terms</a>
              <a href="/contact" className="hover:underline">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
