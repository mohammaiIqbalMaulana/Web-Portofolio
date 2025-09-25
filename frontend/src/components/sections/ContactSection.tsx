import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useContactForm } from '../../hooks/useContactForm';

export const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const {
    formData,
    formErrors,
    isSubmitting,
    submitStatus,
    handleInputChange,
    handleSubmit
  } = useContactForm();

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.emailTitle'),
      value: 'iqbalmaulana14042005@gmail.com',
    },
    {
      icon: Phone,
      title: t('contact.phoneTitle'),
      value: '+62 881-6564-510',
    },
    {
      icon: MapPin,
      title: t('contact.locationTitle'),
      value: 'Semarang, Indonesia',
      href: '#'
    }
  ];

  const serviceOptions = t('contact.serviceOptions', { returnObjects: true }) as { value: string; label: string }[];

  return (
    <section id="contact" className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-rose-50 via-pink-50/20 to-red-50/30 dark:from-secondary-900 dark:via-rose-900/5 dark:to-red-900/10 relative overflow-hidden" style={{ transition: 'none' }}>
      {/* Enhanced Background Effects - Pink Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/40 via-transparent to-red-50/30 dark:from-rose-900/15 dark:via-transparent dark:to-red-900/10"></div>
      <div className="absolute top-16 right-16 w-80 h-80 bg-rose-400/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-24 left-20 w-64 h-64 bg-pink-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-red-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-rose-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-2/3 left-1/3 w-56 h-56 bg-pink-300/12 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-secondary-800 rounded-lg shadow-lg p-6 sm:p-8 border border-secondary-200 dark:border-secondary-700"
          >
            <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
              {t('contact.formTitle')}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('contact.namePlaceholder')}
                  label={t('contact.nameLabel')}
                  required
                  error={formErrors.name}
                />

                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('contact.emailPlaceholder')}
                  label={t('contact.emailLabel')}
                  required
                  error={formErrors.email}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder={t('contact.whatsappPlaceholder')}
                  label={t('contact.whatsappLabel')}
                />

                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder={t('contact.locationPlaceholder')}
                  label={t('contact.locationLabel')}
                />
              </div>

              <Select
                name="expertise"
                value={formData.expertise}
                onChange={handleInputChange}
                label={t('contact.serviceLabel')}
                required
                options={serviceOptions}
                error={formErrors.expertise}
              />

              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={t('contact.messagePlaceholder')}
                label={t('contact.messageLabel')}
                required
                rows={5}
                error={formErrors.message}
              />

              <Button
                type="submit"
                variant="outlinered"
                disabled={isSubmitting}
                className="w-full min-w-[180px]"
              >
                {isSubmitting ? t('contact.sending') : t('contact.sendButton')}
              </Button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 dark:text-green-400 text-center font-medium"
                >
                  {t('contact.successMessage')}
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 dark:text-red-400 text-center font-medium"
                >
                  {t('contact.errorMessage')}
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
                {t('contact.contactInfoTitle')}
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 mb-8">
                {t('contact.contactInfoDescription')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-white dark:bg-secondary-800 rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-secondary-200 dark:border-secondary-700 group ${info.title === 'Email' ? 'sm:col-span-2' : ''}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-1">
                        {info.title}
                      </h4>
                      {info.href !== '#' ? (
                        <a
                          href={info.href}
                          className="text-secondary-600 dark:text-secondary-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors break-words"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-secondary-600 dark:text-secondary-400 break-words">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-rose-200 dark:border-rose-800"
            >
              <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                {t('contact.additionalTitle')}
              </h4>
              <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                {t('contact.additionalDescription')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
