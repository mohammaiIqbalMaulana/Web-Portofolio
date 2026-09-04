import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
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
      href: 'mailto:iqbalmaulana14042005@gmail.com',
    },
    {
      icon: Phone,
      title: t('contact.phoneTitle'),
      value: '+62 881-6564-510',
      href: 'tel:+628816564510',
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
    <section id="contact" className="relative overflow-hidden bg-[radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.12),transparent_28%),linear-gradient(180deg,rgba(250,250,250,0.94),rgba(244,244,245,1))] px-4 py-24 sm:px-6 lg:px-8 dark:bg-[radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.08),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(15,23,42,1))]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-35 dark:opacity-15" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-600 dark:text-rose-300">
            {t('contact.kicker', { defaultValue: 'Let’s talk' })}
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-secondary-950 sm:text-4xl lg:text-5xl dark:text-white">
            {t('contact.title')}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary-600 dark:text-secondary-300 sm:text-lg">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-secondary-200/80 bg-white/85 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-rose-600 p-3 text-white shadow-lg">
                <MessageSquare size={22} />
              </div>
              <div>
                <h3 className="text-xl font-black text-secondary-950 dark:text-white">{t('contact.formTitle')}</h3>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">{t('contact.formHint', { defaultValue: 'Share a brief about your idea, timeline, or the role you need.' })}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                placeholder={t('contact.servicePlaceholder')}
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
                rows={6}
                error={formErrors.message}
              />

              <Button
                type="submit"
                variant="outlinered"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? t('contact.sending') : t('contact.sendButton')}
              </Button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-300"
                >
                  {t('contact.successMessage')}
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-center font-medium text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-300"
                >
                  {t('contact.errorMessage')}
                </motion.div>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="rounded-[2rem] border border-secondary-200/80 bg-white/85 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-8">
              <h3 className="text-xl font-black text-secondary-950 dark:text-white">{t('contact.contactInfoTitle')}</h3>
              <p className="mt-3 text-secondary-600 dark:text-secondary-300">
                {t('contact.contactInfoDescription')}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className={`rounded-2xl border border-secondary-200 bg-secondary-50 p-4 shadow-sm dark:border-white/10 dark:bg-white/5 ${index === 0 ? 'sm:col-span-2' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg-rose-600 p-2.5 text-white shadow-sm">
                        <info.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-secondary-950 dark:text-white">{info.title}</h4>
                        {info.href !== '#' ? (
                          <a
                            href={info.href}
                            className="mt-1 block break-words text-sm text-secondary-600 transition-colors hover:text-rose-600 dark:text-secondary-300 dark:hover:text-rose-300"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="mt-1 break-words text-sm text-secondary-600 dark:text-secondary-300">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-rose-200/70 bg-gradient-to-br from-rose-50 to-pink-50 p-6 shadow-sm dark:border-rose-900/40 dark:from-rose-950/20 dark:to-pink-950/20 sm:p-8"
            >
              <h4 className="text-lg font-black text-secondary-950 dark:text-white">
                {t('contact.additionalTitle')}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-secondary-600 dark:text-secondary-300">
                {t('contact.additionalDescription')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
