import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const Footer = () => {
  // Sample services data - you might want to import this from your services data file
  const footerServices = [
    { id: 'market-research', title: 'Market Research & Digital Marketing' },
    { id: 'accounting-consulting', title: 'Accounting & Business Consulting' },
    { id: 'erp-implementation', title: 'ERP Support & Implementations' },
    { id: 'tax-advisory', title: 'Expert Tax Advisory' },
    { id: 'hr-outsourcing', title: 'HR Outsourcing & Capacity Development' }
  ];

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cooldown, setCooldown] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  // List of disposable email domains and test patterns
  const disposableDomains = [
    'yopmail.com', 'mailinator.com', 'temp-mail.org', 'guerrillamail.com',
    '10minutemail.com', 'tempmail.com', 'fakeinbox.com', 'trashmail.com',
    'throwawaymail.com', 'maildrop.cc', 'getnada.com', 'tempmailaddress.com'
  ];

  const testPatterns = [
    'test@test.com', 'example@example.com', 'demo@demo.com', 'user@user.com',
    'admin@admin.com', 'temp@temp.com', 'guest@guest.com', '123@123.com'
  ];

  // Check for existing cooldown on component mount
  useEffect(() => {
    const storedCooldown = localStorage.getItem('emailCooldown');
    const storedEmail = localStorage.getItem('lastSubmittedEmail');
    
    if (storedCooldown && storedEmail) {
      const cooldownEnd = parseInt(storedCooldown);
      const now = new Date().getTime();
      
      if (now < cooldownEnd) {
        setCooldown(cooldownEnd);
        setTimeLeft(Math.floor((cooldownEnd - now) / 1000));
      } else {
        localStorage.removeItem('emailCooldown');
        localStorage.removeItem('lastSubmittedEmail');
      }
    }
  }, []);

  // Update countdown timer
  useEffect(() => {
    let interval;
    if (cooldown) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const remaining = Math.floor((cooldown - now) / 1000);
        
        if (remaining <= 0) {
          clearInterval(interval);
          setCooldown(null);
          setTimeLeft(0);
          localStorage.removeItem('emailCooldown');
          localStorage.removeItem('lastSubmittedEmail');
        } else {
          setTimeLeft(remaining);
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [cooldown]);

  const validateEmail = (email) => {
    // Basic email format validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email address';
    }

    // Check for test patterns
    if (testPatterns.includes(email.toLowerCase())) {
      return 'Please use a valid email address';
    }

    // Extract domain from email
    const domain = email.split('@')[1].toLowerCase();

    // Check for disposable domains
    if (disposableDomains.includes(domain)) {
      return 'Disposable email addresses are not allowed';
    }

    // Check for suspicious patterns
    if (/^(test|temp|demo|example)/i.test(email.split('@')[0])) {
      return 'Please use a valid email address';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    // Check if this email was recently submitted
    const storedEmail = localStorage.getItem('lastSubmittedEmail');
    if (storedEmail === email) {
      setError('This email has already been submitted recently');
      return;
    }

    // Check if in cooldown period
    if (cooldown) {
      setError('Please wait before submitting another email');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbwtNSoDWuU6t7bpUp3VMeC4Tb0DnxEKB7Cg6tk7ohWDoZaGLK0lwa3bYNsFwa7tkj00/exec';
      
      // Create form data with the expected structure
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('timestamp', new Date().toISOString());

      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      
      if (result.result === 'success') {
        setIsSubscribed(true);
        setEmail('');
        
        // Set cooldown period for 24 hours
        const cooldownPeriod = 24*60*60*1000; // 24 hours in milliseconds
        const cooldownEnd = new Date().getTime() + cooldownPeriod;
        
        setCooldown(cooldownEnd);
        setTimeLeft(cooldownPeriod);
        
        // Store in localStorage
        localStorage.setItem('emailCooldown', cooldownEnd.toString());
        localStorage.setItem('lastSubmittedEmail', email);
      } else {
        throw new Error(result.error || 'Unknown error occurred');
      } 
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || 'Failed to subscribe. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400">Professional Edge Global</h3>
            <p className="text-gray-400">
              Empowering businesses with innovative solutions and exceptional service since 2020.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-blue-400 transition duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-blue-400 transition duration-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {footerServices.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="text-gray-400 hover:text-blue-400 transition duration-300 inline-flex items-center group"
                  >
                    {service.title}
                    <FiArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Subscribe to our Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Get the latest news and updates delivered to your inbox.
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    required
                  />
                </div>

                {error && (
                  <div className="p-2 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="ml-2 text-xs font-medium text-red-800">
                        {error}
                      </p>
                    </div>
                  </div>
                )}

                {timeLeft > 0 && (
                  <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-100">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <p className="ml-2 text-xs font-medium text-yellow-800">
                        Please wait {timeLeft} seconds before submitting another email.
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || timeLeft > 0}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center justify-center group ${
                    isLoading || timeLeft > 0 ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <FiArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="ml-2 text-sm font-medium text-green-800">
                    Thank you for subscribing! We'll notify you about our updates.
                  </p>
                </div>
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Professional Edge Global. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms-and-conditions" className="text-gray-400 hover:text-blue-400 text-sm transition duration-300">
              Terms of Service
            </Link>
            <Link to="/privacy-policy" className="text-gray-400 hover:text-blue-400 text-sm transition duration-300">
              Privacy Policy
            </Link>
            <Link to="/cookie-policy" className="text-gray-400 hover:text-blue-400 text-sm transition duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;