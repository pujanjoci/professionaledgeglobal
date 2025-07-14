import { useState, useEffect } from 'react';

const CareersPage = () => {
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
    <div className="min-h-screen bg-gradient-to-b mt-10 from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            Build Your Career With Us
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Join a team that values innovation, collaboration, and professional growth.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Job Openings Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-8 sm:p-10">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="ml-4 text-2xl font-semibold text-gray-900">Current Opportunities</h2>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">No current openings</h3>
                    <p className="mt-2 text-gray-600">
                      We don't have any open positions right now, but we're always looking for talented individuals.
                    </p>
                    <p className="mt-2 text-gray-600">
                      Submit your email below to be the first to know about new opportunities.
                    </p>
                  </div>

                  {!isSubscribed ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          placeholder="your@email.com"
                        />
                      </div>

                      {error && (
                        <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <p className="ml-3 text-sm font-medium text-red-800">
                              {error}
                            </p>
                          </div>
                        </div>
                      )}

                      {timeLeft > 0 && (
                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <p className="ml-3 text-sm font-medium text-yellow-800">
                              Please wait {timeLeft} seconds before submitting another email.
                            </p>
                          </div>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading || timeLeft > 0}
                        className={`w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ${
                          isLoading || timeLeft > 0 ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </>
                        ) : 'Notify Me About New Positions'}
                      </button>
                    </form>
                  ) : (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="ml-3 text-sm font-medium text-green-800">
                          Thank you for subscribing! We'll notify you when new positions become available.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div>
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="p-8 sm:p-10">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-lg bg-blue-50">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h2 className="ml-4 text-2xl font-semibold text-gray-900">Why Join Us?</h2>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        name: 'Competitive Compensation',
                        description: 'We offer market-leading salaries and comprehensive benefits packages.',
                        icon: '💵',
                      },
                      {
                        name: 'Professional Growth',
                        description: 'Continuous learning opportunities and career development programs.',
                        icon: '📚',
                      },
                      {
                        name: 'Flexible Work',
                        description: 'Hybrid work models and flexible scheduling options.',
                        icon: '🏡',
                      },
                      {
                        name: 'Inclusive Culture',
                        description: 'Diverse team where everyone feels valued and respected.',
                        icon: '🌍',
                      },
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 bg-blue-50 rounded-lg p-3">
                          <span className="text-xl">{benefit.icon}</span>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{benefit.name}</h3>
                          <p className="mt-1 text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Company Values */}
              <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="p-8 sm:p-10">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-lg bg-blue-50">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="ml-4 text-2xl font-semibold text-gray-900">Our Values</h2>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-700">Innovation through collaboration</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-700">Customer-first approach</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-700">Data-driven decisions</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-700">Ethical business practices</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;