"use client"

import { useState, useEffect } from "react"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null)
  const [timerActive, setTimerActive] = useState(false)

  // List of disposable email domains and blocked keywords
  const DISPOSABLE_EMAIL_DOMAINS = [
    'yopmail.com', 'mailinator.com', 'tempmail.com', 'guerrillamail.com',
    '10minutemail.com', 'trashmail.com', 'fakeinbox.com', 'temp-mail.org', 'test.com', 'admin.com',
    'example.com', 'demo.com', 'fakemail.com', 'maildrop.cc', 'getnada.com', 'throwawaymail.com',
    'mytemp.email', 'mailnesia.com', 'spambox.us', 'spamgourmet.com', 'spambog.com', 'spambox.me', 'mailcatch.com', 'temp-mail.io', 'mail-temp.com',
    'mail-temporaire.com', 'mail-temporaire.fr', 'mail-temporaire.net', 'mail-temporaire.org', 'mail-temporaire.info', 'mail-temporaire.cc', 'mail-temporaire.co.uk', 'mail-temporaire.us', 'mail-temporaire.biz', 'mail-temporaire.online',
    'mail-temporaire.xyz', 'mail-temporaire.pro', 'mail-temporaire.store', 'mail-temporaire.shop', 'mail-temporaire.tech', 'mail-temporaire.app', 'mail-temporaire.dev', 'mail-temporaire.cloud', 'mail-temporaire.site', 'mail-temporaire.website',
    'mail-temporaire.space', 'mail-temporaire.fun', 'mail-temporaire.live', 'mail-temporaire.world', 'mail-temporaire.today', 'mail-temporaire.cc', 'mail-temporaire.info', 'mail-temporaire.biz', 'mail-temporaire.pro', 'mail-temporaire.store',
    'mail-temporaire.shop', 'mail-temporaire.tech', 'mail-temporaire.app', 'mail-temporaire.dev', 'mail-temporaire.cloud', 'mail-temporaire.site', 'mail-temporaire.website', 'mail-temporaire.space', 'mail-temporaire.fun',
    'mail-temporaire.live', 'mail-temporaire.world', 'mail-temporaire.today', 'mail-temporaire.cc', 'mail-temporaire.info', 'mail-temporaire.biz', 'mail-temporaire.pro', 'mail-temporaire.store', 'mail-temporaire.shop', 'mail-temporaire.tech',
    'mail-temporaire.app', 'mail-temporaire.dev', 'mail-temporaire.cloud', 'mail-temporaire.site', 'mail-temporaire.website', 'mail-temporaire.space', 'mail-temporaire.fun', 'mail-temporaire.live', 'mail-temporaire.world', 'mail-temporaire.today'
  ]
  
  const BLOCKED_KEYWORDS = ['test', 'admin', 'temp', 'example', 'demo', 'fake']

  // Check for existing timer on component mount
  useEffect(() => {
    const storedTimer = localStorage.getItem('contactFormTimer')
    if (storedTimer) {
      const remainingTime = calculateRemainingTime(storedTimer)
      if (remainingTime > 0) {
        setTimerActive(true)
        setTimeLeft(remainingTime)
        startCountdown(remainingTime)
      } else {
        localStorage.removeItem('contactFormTimer')
      }
    }
  }, [])

  const calculateRemainingTime = (storedTime) => {
    const now = new Date().getTime()
    const endTime = parseInt(storedTime, 10)
    return Math.max(0, Math.floor((endTime - now) / 1000))
  }

  const startCountdown = (initialTime) => {
    let time = initialTime
    const timer = setInterval(() => {
      time -= 1
      setTimeLeft(time)
      
      if (time <= 0) {
        clearInterval(timer)
        setTimerActive(false)
        localStorage.removeItem('contactFormTimer')
      }
    }, 1000)
    
    return () => clearInterval(timer)
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const validateForm = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    } else {
      const domain = formData.email.split('@')[1].toLowerCase()
      if (DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
        newErrors.email = 'Disposable email addresses are not allowed'
      }
    }
    
    // Company validation
    if (formData.company.trim()) {
      const companyLower = formData.company.toLowerCase()
      if (BLOCKED_KEYWORDS.some(keyword => companyLower.includes(keyword))) {
        newErrors.company = 'Please provide a valid company name'
      }
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    // Timer validation
    if (timerActive) {
      newErrors.form = `Please wait ${formatTime(timeLeft)} before submitting another message.`
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitSuccess(false)

    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbxQ9GmhjzfMd_9CUw97WOoZp9oALbb_WupAPq-_Lh6z5RiDf6HcuvQGAt_ojgivlCjV/exec'
      
      const formDataEncoded = new URLSearchParams()
      for (const key in formData) {
        formDataEncoded.append(key, formData[key])
      }

      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formDataEncoded,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      const result = await response.json()

      if (result.result === 'success') {
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", company: "", message: "" })
        
        // Set timer in localStorage for 1 hour
        const now = new Date()
        const oneHourLater = now.getTime() + 60 * 60 * 1000 // 1 hour in milliseconds
        localStorage.setItem('contactFormTimer', oneHourLater.toString())
        setTimerActive(true)
        setTimeLeft(3600) // 1 hour in seconds
        startCountdown(3600)
      } else {
        throw new Error(result.error || "Failed to send message")
      }
    } catch (error) {
      console.error('Submission error:', error)
      setErrors(prev => ({
        ...prev,
        form: `Error: ${error.message}. Please try again or contact us directly.`
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-white text-gray-800 mt-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Let's Connect</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Have a question or want to work with us? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold">Contact Information</h3>

            <div className="flex items-start gap-4">
              <div className="bg-gray-100 p-3 rounded-lg text-indigo-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-500">professionaledgeglobal@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gray-100 p-3 rounded-lg text-indigo-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-500">+977 (98) 61171768</p>
                <p className="text-gray-500">+977 (98) 51135421</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gray-100 p-3 rounded-lg text-indigo-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-500">
                  Tinkune, Kathmandu <br />
                  Nepal
                </p>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitSuccess && (
              <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                Thank you for your message! We'll get back to you soon.
                {timerActive && (
                  <div className="mt-2 text-sm">
                    You can submit another message in: {formatTime(timeLeft)}
                  </div>
                )}
              </div>
            )}
            
            {errors.form && (
              <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                {errors.form}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.company ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || timerActive}
              className={`w-full bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 ${
                isSubmitting || timerActive ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : timerActive ? (
                `Wait ${formatTime(timeLeft)}`
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact