// src/pages/ContactPage.tsx

import React, { useState, FormEvent } from 'react';
import { TwitterIcon, LinkedInIcon } from '../components/Icons';

/**
 * The Contact page, featuring a contact form and contact information.
 */
const ContactPage: React.FC = () => {
  // State to track if the form has been successfully submitted.
  const [submitted, setSubmitted] = useState(false);
  // State to manage the form's input field values.
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  /**
   * Handles changes in the form's input and textarea fields,
   * updating the formData state dynamically.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Handles the form submission event.
   * It prevents the default form action and logs the data to the console.
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend server.
    console.log('Form data submitted:', formData);
    // Update the state to show the success message.
    setSubmitted(true);
  };

  // If the form has been submitted, display a confirmation message.
  if (submitted) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <div className="max-w-2xl mx-auto glass-card p-10 rounded-lg">
          <h1 className="text-4xl sm:text-5xl font-black font-display text-text-primary mb-4">
            Transmission Received
          </h1>
          <p className="text-lg text-text-secondary">
            Thank you for your message. We'll get back to you as soon as possible.
          </p>
        </div>
      </div>
    );
  }

  // If the form has not been submitted, display the contact page with the form.
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-7xl font-black font-display text-text-primary mb-4">
              Get In Touch
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-text-secondary">
              Have a question, suggestion, or partnership inquiry? We'd love to hear from you.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="glass-card p-8 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-bg-primary border border-border-color rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-glow-cyan/50 focus:border-glow-cyan" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-bg-primary border border-border-color rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-glow-cyan/50 focus:border-glow-cyan" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1">Message</label>
                  <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-bg-primary border border-border-color rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-glow-cyan/50 focus:border-glow-cyan"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-glow-cyan bg-glow-cyan/10 border border-glow-cyan hover:bg-glow-cyan/20 transition-colors">
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="glass-card p-8 rounded-lg">
                <h3 className="text-2xl font-bold font-display text-text-primary mb-4">Contact Information</h3>
                <div className="space-y-4 text-text-secondary">
                    <p>
                        <strong>Email:</strong> <a href="mailto:contact@devblogs.com" className="text-glow-cyan hover:underline">contact@devblogs.com</a>
                    </p>
                    <p>
                        We typically respond within 1-2 business days. For urgent matters, please mention "Urgent" in your subject line.
                    </p>
                    <div className="flex space-x-4 pt-2">
                        <a href="#" className="text-text-secondary hover:text-glow-cyan"><TwitterIcon className="w-6 h-6" /></a>
                        <a href="#" className="text-text-secondary hover:text-glow-cyan"><LinkedInIcon className="w-6 h-6" /></a>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
