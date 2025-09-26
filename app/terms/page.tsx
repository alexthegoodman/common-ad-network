"use client";

export default function TermsOfService() {
  return (
    <div className="font-sans max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Terms of Service
        </h1>

        <p className="text-gray-600 mb-8">
          <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-700 mb-4">
          By accessing and using Common Ad Network ("we," "our," or "the
          Service"), you accept and agree to be bound by the terms and provision
          of this agreement.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          2. Description of Service
        </h2>
        <p className="text-gray-700 mb-4">
          Common Ad Network is an invite-only ad exchange platform designed for
          indie makers. Users earn karma by displaying ads and spend karma to
          promote their own projects through our network.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          3. Prohibited Content and Activities
        </h2>
        <p className="text-gray-700 mb-4">
          The following types of content and activities are strictly prohibited
          on our platform:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
          <li>
            <strong>Gambling and betting:</strong> Any content promoting
            gambling, casinos, betting, or games of chance
          </li>
          <li>
            <strong>Alcohol:</strong> Content promoting alcoholic beverages,
            bars, or alcohol-related services
          </li>
          <li>
            <strong>Pork and non-halal products:</strong> Content promoting pork
            products or non-halal food items
          </li>
          <li>
            <strong>Adult content:</strong> Sexually explicit material,
            pornography, or adult entertainment
          </li>
          <li>
            <strong>Illegal activities:</strong> Content promoting illegal
            drugs, weapons, or any unlawful activities
          </li>
          <li>
            <strong>Hate speech:</strong> Content that promotes discrimination,
            hatred, or violence against individuals or groups
          </li>
          <li>
            <strong>Misleading content:</strong> False advertising, scams, or
            deceptive practices
          </li>
          <li>
            <strong>Harmful products:</strong> Content promoting tobacco,
            vaping, or other harmful substances
          </li>
          <li>
            <strong>Violence:</strong> Content depicting or promoting violence,
            terrorism, or self-harm
          </li>
          <li>
            <strong>Copyright infringement:</strong> Unauthorized use of
            copyrighted material
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          4. User Responsibilities
        </h2>
        <p className="text-gray-700 mb-4">Users are responsible for:</p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
          <li>Ensuring all submitted content complies with these terms</li>
          <li>Maintaining accurate account information</li>
          <li>Not engaging in fraudulent clicks or karma manipulation</li>
          <li>Respecting intellectual property rights</li>
          <li>Following our karma system rules and guidelines</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          5. Account Termination
        </h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to suspend or terminate accounts that violate
          these terms, engage in prohibited activities, or submit inappropriate
          content. Terminated users forfeit any remaining karma balance.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          6. Karma System
        </h2>
        <p className="text-gray-700 mb-4">
          Our karma system operates on a click-through rate (CTR) basis. Users
          earn karma by displaying ads with genuine engagement and spend karma
          to promote their content. Fraudulent activity will result in karma
          forfeiture and account suspension.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          7. Privacy and Data Protection
        </h2>
        <p className="text-gray-700 mb-4">
          We collect and process user data as outlined in our Privacy Policy. By
          using our service, you consent to our data practices and agree to our
          fraud detection measures, including IP tracking for click validation.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          8. Limitation of Liability
        </h2>
        <p className="text-gray-700 mb-4">
          Common Ad Network shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages resulting from your use of
          the service.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          9. Changes to Terms
        </h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to modify these terms at any time. Users will be
          notified of significant changes, and continued use constitutes
          acceptance of the modified terms.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          10. Contact Information
        </h2>
        <p className="text-gray-700 mb-4">
          For questions about these Terms of Service, please contact us through
          our support channels.
        </p>
      </div>
    </div>
  );
}
