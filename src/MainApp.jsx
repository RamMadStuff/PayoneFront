import { useState } from "react";

const API = import.meta.env.VITE_API_URL;
const KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

export default function MainApp() {
  const [count, setCount] = useState("??????");
  const [loading, setLoading] = useState(false);

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
        description: "One Rupee Payment",
        handler: async function (response) {
          const verifyRes = await fetch(`${API}/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const result = await verifyRes.json();
          if (result.success) {
            setCount(result.count);
            document.getElementById("counter").classList.add("reveal");
            setTimeout(() => {
              document.getElementById("counter").classList.remove("reveal");
            }, 1200);
          } else {
            alert("❌ Payment verification failed!");
          }
        },
        theme: { color: "#ffcc00" },
      };
      new window.Razorpay(options).open();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>
        PAY ONE RUPEE TO SEE HOW <br /> MANY PEOPLE PAID ONE RUPEE!
      </h1>

      <div id="counter">{count}</div>

      <h2>Find out now!</h2>
      <ul className="steps">
        <li>Click the button.</li>
        <li>Pay one Rupee.</li>
        <li>See the counter.</li>
        <li>Tell your friends.</li>
      </ul>

      <button
        id="payBtn"
        className="pay-btn"
        onClick={handlePayment}
        disabled={loading}
      >
        💲 {loading ? "Opening…" : "Pay with Razorpay"}
      </button>
    </div>
  );
}
