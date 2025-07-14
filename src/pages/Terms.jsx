// src/pages/TermsAndConditions.jsx
import LegalLayout from '../components/LegalLayout';

const Terms = () => {
  return (
    <LegalLayout title="Terms and Conditions">
      <p className="mb-4">
        Welcome to our website. By accessing and using this website, you accept and agree to be bound 
        by the terms and provisions of this agreement.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">1. Use of the Service</h2>
      <p className="mb-4">
        You agree to use our service only for lawful purposes and in accordance with these Terms.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">2. User Accounts</h2>
      <p className="mb-4">
        When you create an account with us, you must provide accurate and complete information. 
        You are responsible for maintaining the confidentiality of your account and password.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">3. Intellectual Property</h2>
      <p className="mb-4">
        The Service and its original content, features, and functionality are owned by us and are 
        protected by international copyright, trademark, and other intellectual property laws.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">4. Termination</h2>
      <p className="mb-4">
        We may terminate or suspend your account immediately, without prior notice or liability, 
        for any reason whatsoever, including without limitation if you breach the Terms.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">5. Limitation of Liability</h2>
      <p className="mb-4">
        In no event shall we be liable for any indirect, incidental, special, consequential, or 
        punitive damages arising out of or related to your use of the Service.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">6. Governing Law</h2>
      <p className="mb-4">
        These Terms shall be governed by and construed in accordance with the laws of [Your Country/State], 
        without regard to its conflict of law provisions.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">7. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to modify these terms at any time. Your continued use of the Service 
        after any such changes constitutes your acceptance of the new Terms.
      </p>
    </LegalLayout>
  );
}

export default Terms;