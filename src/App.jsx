// src/App.jsx
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const API = import.meta.env.VITE_API_URL;
const KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

export default function App() {
  const [count, setCount] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(false);

  // store history of counts for graph
  const [history, setHistory] = useState([]);

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
        description: "Pay ₹1 rupee to see how many are paid one rupee",
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

            // push to history for graph
            setHistory((prev) => [...prev, { time: new Date().toLocaleTimeString(), count: body.count }]);
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

      // add latest count to history
      setHistory((prev) => [...prev, { time: new Date().toLocaleTimeString(), count: data.count }]);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {!token ? (
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Pay ₹1 rupee to see how many are paid one rupee</h1>
          <p className="text-sm text-gray-600 mb-6">Only users who successfully pay can see the total.</p>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:brightness-90"
          >
            {loading ? "Opening checkout…" : "Pay ₹1 (UPI)"}
          </button>
          <p className="text-xs text-gray-500 mt-4">Using Razorpay (Test mode)</p>
        </div>
      ) : (
        <div className="max-w-2xl w-full text-center">
          <h2 className="text-xl font-semibold mb-2">You’ve paid — here’s the counter</h2>
          <div className="text-4xl font-extrabold my-4">{count === null ? "…" : count}</div>

          {/* Graph */}
          <div className="w-full h-64 bg-white shadow rounded-lg p-4 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex gap-2 justify-center">
            <button onClick={fetchCount} className="px-4 py-2 rounded bg-green-600 text-white">
              Refresh Count
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("authToken");
                setToken(null);
                setCount(null);
                setHistory([]);
              }}
              className="px-4 py-2 rounded border"
            >
              Logout (remove access)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
