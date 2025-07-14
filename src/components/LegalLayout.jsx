// src/components/LegalLayout.jsx
import { Link } from 'react-router-dom';

const LegalLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-gray-50 mt-18">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <div className="flex space-x-4 text-sm text-gray-600">
            <Link to="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-blue-600">Terms & Conditions</Link>
            <Link to="/cookie-policy" className="hover:text-blue-600">Cookie Policy</Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm prose max-w-none">
          {children}
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default LegalLayout;
