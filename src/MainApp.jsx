import React from "react";
import confetti from "canvas-confetti";

export default function MainApp() {
  // 🎉 Trigger confetti on success
  const handlePayment = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Razorpay Key
      amount: 100, // ₹1 in paisa
      currency: "INR",
      name: "PayOneRupee",
      description: "Contribute ₹1",
      handler: function (response) {
        console.log("Payment Success:", response);
        confetti({
          particleCount: 200,
          spread: 120,
          origin: { y: 0.6 },
        });
      },
      theme: {
        color: "#4f46e5", // Indigo theme
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">PayOneRupee</h1>
        <span className="text-gray-500 text-sm">Make an impact with ₹1</span>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Support with just ₹1
          </h2>
          <p className="text-gray-600 mb-6">
            Small contributions create big changes.  
            Be part of this initiative with just one rupee.
          </p>

          <button
            onClick={handlePayment}
            className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition-all"
          >
            Pay ₹1 Now
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} PayOneRupee. All rights reserved.
      </footer>
    </div>
  );
}
