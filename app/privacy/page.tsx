"use client";

export default function PrivacyPolicy() {
  return (
    <div className="font-sans max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-8">
          <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          1. Introduction
        </h2>
        <p className="text-gray-700 mb-4">
          Common Ad Network ("we," "our," or "us") respects your privacy and is
          committed to protecting your personal data. This privacy policy
          explains how we collect, use, and safeguard your information when you
          use our ad exchange platform.
        </p>

        <h2 className="text-2xl font-semibent text-gray-900 mt-8 mb-4">
          2. Information We Collect
        </h2>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          2.1 Account Information
        </h3>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>Email address and profile information</li>
          <li>Company website and profile picture</li>
          <li>Authentication tokens and session data</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          2.2 Usage Data
        </h3>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>Ad performance metrics and analytics</li>
          <li>Click-through rates and engagement data</li>
          <li>Karma earning and spending history</li>
          <li>Social feed posts and interactions</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          2.3 Technical Data
        </h3>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>IP addresses for fraud detection and geolocation</li>
          <li>Browser type, device information, and user agent</li>
          <li>Cookies and similar tracking technologies</li>
          <li>Server logs and error reporting data</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          3. How We Use Your Information
        </h2>
        <p className="text-gray-700 mb-4">We use your information to:</p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>Provide and maintain our ad exchange services</li>
          <li>Process karma transactions and manage user accounts</li>
          <li>Detect and prevent fraudulent clicks and abuse</li>
          <li>Generate analytics and performance reports</li>
          <li>Facilitate social interactions within the platform</li>
          <li>Comply with legal obligations and enforce our terms</li>
          <li>Improve our services and user experience</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          4. Fraud Detection and Security
        </h2>
        <p className="text-gray-700 mb-4">
          To maintain the integrity of our karma system and prevent fraudulent
          activity, we:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>Track IP addresses to limit one valid click per ad/IP per day</li>
          <li>Use geolocation services to verify click authenticity</li>
          <li>Monitor user behavior patterns for suspicious activity</li>
          <li>Implement automated fraud detection algorithms</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          5. Data Sharing and Disclosure
        </h2>
        <p className="text-gray-700 mb-4">
          We do not sell your personal information. We may share your data:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>With service providers who assist in operating our platform</li>
          <li>When required by law or to protect our legal rights</li>
          <li>In anonymized, aggregated form for analytics purposes</li>
          <li>With your consent or at your direction</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          6. Data Retention
        </h2>
        <p className="text-gray-700 mb-4">
          We retain your personal information only as long as necessary to
          provide our services, comply with legal obligations, or resolve
          disputes. Account data is deleted upon account termination, though
          some anonymized data may be retained for analytics.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          7. Your Rights
        </h2>
        <p className="text-gray-700 mb-4">You have the right to:</p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>Access and review your personal information</li>
          <li>Request correction of inaccurate data</li>
          <li>Delete your account and associated data</li>
          <li>Object to certain processing of your information</li>
          <li>Withdraw consent where processing is based on consent</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          8. Cookies and Tracking
        </h2>
        <p className="text-gray-700 mb-4">
          We use cookies and similar technologies to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>Maintain user sessions and authentication</li>
          <li>Track ad performance and user interactions</li>
          <li>Prevent fraud and improve security</li>
          <li>Analyze platform usage and optimize performance</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          9. International Data Transfers
        </h2>
        <p className="text-gray-700 mb-4">
          Your data may be processed in countries other than your own. We ensure
          appropriate safeguards are in place to protect your personal
          information in accordance with applicable data protection laws.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          10. Changes to This Policy
        </h2>
        <p className="text-gray-700 mb-4">
          We may update this privacy policy periodically. We will notify users
          of significant changes and post the updated policy with a new
          effective date.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          11. Contact Us
        </h2>
        <p className="text-gray-700 mb-4">
          For questions about this privacy policy or how we handle your data,
          please contact us through our support channels.
        </p>
      </div>
    </div>
  );
}
