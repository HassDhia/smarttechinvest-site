import React, { useState } from 'react';
import './NewsletterForm.css';
export default function NewsletterForm({ 
  title = "Stay Updated", 
  description = "Subscribe to our newsletter" 
}) {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="newsletter-container">
      <h3>{title}</h3>
      <p>{description}</p>
      
      {status === 'success' ? (
        <div className="success-message">
          Thank you for subscribing!
        </div>
      ) : (
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="form-fields">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="name-input"
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Your email" 
              required
              className="email-input"
            />
          </div>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending...' : 'Subscribe'}
          </button>
          {status === 'error' && (
            <div className="error-message">
              Something went wrong. Please try again.
            </div>
          )}
        </form>
      )}
    </div>
  );
}
