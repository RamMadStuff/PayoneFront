// src/pages/PolicyPages.jsx

function PageWrapper({ title, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-2xl font-bold mb-4 text-blue-600">{title}</h1>
          <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>
        </div>
      </main>
    </div>
  );
}

export function PrivacyPolicy() {
  return (
    <PageWrapper title="Privacy Policy">
      <p>We value your privacy. No sensitive data is stored beyond payment verification.</p>
      <p>Your email or payment details are never shared with third parties.</p>
    </PageWrapper>
  );
}

export function RefundPolicy() {
  return (
    <PageWrapper title="Refund Policy">
      <p>₹1 demo payments are non-refundable as this is for demonstration purposes only.</p>
      <p>If you face issues, you can contact support for assistance.</p>
    </PageWrapper>
  );
}

export function Terms() {
  return (
    <PageWrapper title="Terms of Service">
      <p>Use this service only for testing micro-payments and integrations.</p>
      <p>We are not responsible for misuse or incorrect transactions.</p>
    </PageWrapper>
  );
}

export function About() {
  return (
    <PageWrapper title="About PayOneRupee">
      <p>
        PayOneRupee is a fun demo project to showcase digital micro-payments using Razorpay. 
        It is built as an open experiment to see how many people will pay one rupee online.
      </p>
      <p>
        The project demonstrates secure payments, verification, and counters with a clean UI.
      </p>
    </PageWrapper>
  );
}

export function Contact() {
  return (
    <PageWrapper title="Contact Us">
      <p>Email us at <a href="mailto:support@payonerupee.online" className="text-blue-600 underline">support@payonerupee.online</a></p>
      <p>We usually respond within 24 hours.</p>
    </PageWrapper>
  );
}
