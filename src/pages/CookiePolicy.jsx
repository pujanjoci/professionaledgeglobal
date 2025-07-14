// src/pages/CookiePolicy.jsx
import LegalLayout from '../components/LegalLayout';

const CookiePolicy = () => {
  return (
    <LegalLayout title="Cookie Policy">
      <p className="mb-4">
        This Cookie Policy explains how we use cookies and similar technologies on our website.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">1. What Are Cookies</h2>
      <p className="mb-4">
        Cookies are small text files stored on your device when you visit a website. They help the 
        website remember information about your visit, which can make it easier to visit again.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">2. How We Use Cookies</h2>
      <p className="mb-4">
        We use cookies for several purposes:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
        <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our site</li>
        <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
        <li><strong>Targeting Cookies:</strong> Used to deliver relevant ads to you</li>
      </ul>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">3. Third-Party Cookies</h2>
      <p className="mb-4">
        We may also use various third-party cookies for analytics, advertising, and other services.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">4. Managing Cookies</h2>
      <p className="mb-4">
        You can control and/or delete cookies as you wish. You can delete all cookies that are already 
        on your computer and set most browsers to prevent them from being placed.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">5. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Cookie Policy from time to time. We will notify you of any changes by 
        posting the new policy on this page.
      </p>
    </LegalLayout>
  );
}

export default CookiePolicy;