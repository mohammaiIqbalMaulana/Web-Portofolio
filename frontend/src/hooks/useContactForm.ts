import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    location: '',
    expertise: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.expertise.trim()) {
      errors.expertise = 'Please select an expertise area';
    }

    if (!formData.message.trim()) {
      errors.message = 'Project details are required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Project details must be at least 10 characters long';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        service_type: formData.expertise || 'General Inquiry',
        client_phone: formData.whatsapp || 'Not provided',
        client_location: formData.location || 'Not specified',
        project_details: formData.message,
        to_name: 'Mohammad Iqbal',
        to_email: 'iqbalmaulana14042005@gmail.com',
        reply_to: formData.email,
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        whatsapp: '',
        location: '',
        expertise: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitStatus(null);
      }, 10000);
    } catch (error: any) {
      console.error('❌ EmailJS Error Details:', {
        error: error,
        message: error?.message,
        status: error?.status,
        text: error?.text,
        name: error?.name
      });

      setTimeout(() => {
        setSubmitStatus(null);
      }, 10000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    formErrors,
    isSubmitting,
    submitStatus,
    handleInputChange,
    handleSubmit
  };
};
