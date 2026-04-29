import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Globe, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../utils/axios'

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setError
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setError('')
    
    // Handle frontend-only deployment
    if (import.meta.env.MODE === 'production' && !import.meta.env.VITE_API_URL) {
      toast.success('Thank you for your message! Please contact me directly via email.')
      reset()
      setIsSubmitting(false)
      return
    }
    
    console.log('Form submitted with data:', data)
    console.log('Current form state:', { name: watch('name'), email: watch('email'), subject: watch('subject'), message: watch('message') })
    
    try {
      const response = await api.post('/api/contact', data)
      
      if (response.data.message) {
        toast.success('Message sent successfully! I\'ll get back to you soon.')
        reset()
      }
    } catch (error) {
      console.error('Contact form error:', error)
      
      if (error.message === 'API not available') {
        toast.success('Thank you for your message! Please contact me directly via email.')
        reset()
        return
      }
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else if (error.response?.data?.errors) {
        error.response.data.errors.forEach(err => {
          toast.error(err)
        })
      } else {
        toast.error('Failed to send message. Please try again later.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="text-primary" size={24} />,
      title: "Email",
      content: "umulisaalicepascaline@gmail.com",
      action: "mailto:umulisaalicepascaline@gmail.com"
    },
    {
      icon: <Phone className="text-primary" size={24} />,
      title: "Phone",
      content: "+250 798672283",
      action: "tel:+250 798672283"
    },
    {
      icon: <MapPin className="text-primary" size={24} />,
      title: "Location",
      content: "Kigali City, Rwanda",
      action: null
    }
  ]

  const socialPlatforms = [
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} />,
      url: "https://linkedin.com/in/pascaline alice",
      dmUrl: "https://linkedin.com/messaging/thread/new-with/pascaline alice",
      color: "hover:bg-blue-600"
    },
    {
      name: "Twitter",
      icon: <Twitter size={20} />,
      url: "https://twitter.com/pascaline alice",
      dmUrl: "https://twitter.com/messages/compose?recipient_id=pascaline alice",
      color: "hover:bg-sky-500"
    },
    {
      name: "GitHub",
      icon: <Github size={20} />,
      url: "https://github.com/pascaline alice",
      color: "hover:bg-gray-900"
    },
    {
      name: "Portfolio",
      icon: <Globe size={20} />,
      url: "https://umulisaalicepascaline.com",
      color: "hover:bg-primary-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-background pt-16 md:pt-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-dark-background dark:to-dark-card section-padding">
        <div className="container-max">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text mb-6">
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              I'm always interested in hearing about new projects, opportunities, or collaborations. 
              Feel free to reach out through the contact form or directly via the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white dark:bg-dark-card">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-6">Send Me a Message</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                      maxLength: { value: 100, message: 'Name cannot exceed 100 characters' }
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-white dark:bg-dark-background text-gray-900 dark:text-dark-text ${
                      errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-white dark:bg-dark-background text-gray-900 dark:text-dark-text ${
                      errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register('subject', {
                      required: 'Subject is required',
                      minLength: { value: 5, message: 'Subject must be at least 5 characters' },
                      maxLength: { value: 200, message: 'Subject cannot exceed 200 characters' }
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-white dark:bg-dark-background text-gray-900 dark:text-dark-text ${
                      errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Project Discussion, Job Opportunity, etc."
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message must be at least 10 characters' },
                      maxLength: { value: 2000, message: 'Message cannot exceed 2000 characters' }
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none bg-white dark:bg-dark-background text-gray-900 dark:text-dark-text ${
                      errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Tell me about your project, opportunity, or just say hello..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {2000 - (watch('message')?.length || 0)} characters remaining
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Direct Contact */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-6">Direct Contact</h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-dark-background rounded-lg">
                      <div className="flex-shrink-0">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-dark-text">{info.title}</h3>
                        {info.action ? (
                          <a
                            href={info.action}
                            className="text-primary hover:text-secondary transition-colors"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-gray-700 dark:text-gray-300">{info.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Platforms */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-6">Connect With Me</h2>
                <div className="space-y-4">
                  {socialPlatforms.map((platform, index) => (
                    <div key={index} className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg p-4 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg text-white ${platform.color}`}>
                            {platform.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-dark-text">{platform.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Connect with me on {platform.name}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <a
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
                          >
                            View Profile
                          </a>
                          {platform.dmUrl && (
                            <a
                              href={platform.dmUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 bg-primary hover:bg-secondary text-white rounded-lg text-sm font-medium transition-colors flex items-center"
                            >
                              <MessageCircle size={14} className="mr-1" />
                              Message
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mb-3">Response Time</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  I typically respond to messages within 24-48 hours. For urgent matters, 
                  please mention it in your message subject.
                </p>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Available for freelance projects
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Open to full-time opportunities
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Happy to collaborate on open-source
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
