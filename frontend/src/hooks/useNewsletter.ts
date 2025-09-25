import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

export const useNewsletter = () => {
  const [newsletterData, setNewsletterData] = useState({
    email: '',
    source: 'portfolio-footer'
  });

  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const validateNewsletterEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleNewsletterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsletterData({
      ...newsletterData,
      email: e.target.value
    });
    // Clear status when user types
    if (newsletterStatus !== 'idle') {
      setNewsletterStatus('idle');
      setNewsletterMessage('');
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateNewsletterEmail(newsletterData.email)) {
      setNewsletterStatus('error');
      setNewsletterMessage('Please enter a valid email address');
      return;
    }

    setNewsletterStatus('loading');

    try {
      const templateParams = {
        subscriber_email: newsletterData.email,
        subscription_date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        source: newsletterData.source,
        to_name: 'Mohammad Iqbal',
        to_email: 'iqbalmaulana14042005@gmail.com'
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.NEWSLETTER_TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setNewsletterStatus('success');
      setNewsletterMessage('Thank you for subscribing! You\'ll receive updates about new projects.');
      setNewsletterData({ email: '', source: 'portfolio-footer' });

      setTimeout(() => {
        setNewsletterStatus('idle');
        setNewsletterMessage('');
      }, 8000);

    } catch (error: any) {
      console.error('Newsletter error details:', {
        error: error,
        message: error?.message,
        status: error?.status,
        text: error?.text
      });

      let errorMessage = 'Something went wrong. Please try again.';

      if (error?.status === 400) {
        errorMessage = 'Invalid email format. Please check and try again.';
      } else if (error?.status === 401) {
        errorMessage = 'Service authentication failed. Please try again later.';
      } else if (error?.status === 404) {
        errorMessage = 'Service temporarily unavailable.';
      }

      setNewsletterStatus('error');
      setNewsletterMessage(errorMessage);

      setTimeout(() => {
        setNewsletterStatus('idle');
        setNewsletterMessage('');
      }, 8000);
    }
  };

  return {
    newsletterData,
    newsletterStatus,
    newsletterMessage,
    handleNewsletterChange,
    handleNewsletterSubmit
  };
};
