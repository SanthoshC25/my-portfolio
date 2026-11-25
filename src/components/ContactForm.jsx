import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import socialLinks from '../data/socialLinks';

const projectTypes = [
  'Web Application',
  'Landing Page',
  'API Development',
  'Consultation',
  'Other',
];

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  background: 'var(--bg-secondary)',
  border: '1px solid var(--border-color)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'border-color 0.3s, box-shadow 0.3s',
};

const labelStyle = {
  display: 'block',
  fontFamily: 'var(--font-heading)',
  fontWeight: 600,
  fontSize: '0.85rem',
  letterSpacing: '0.03em',
  color: 'var(--text-primary)',
  marginBottom: 'var(--space-xs)',
};

const errorStyle = {
  color: '#D62828',
  fontSize: '0.8rem',
  marginTop: '4px',
  fontFamily: 'var(--font-body)',
};

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    projectType: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email';
    }
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.projectType) errs.projectType = 'Please select a project type';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = 'var(--accent-primary)';
    e.target.style.boxShadow = '0 0 0 3px rgba(214, 40, 40, 0.15)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = 'var(--border-color)';
    e.target.style.boxShadow = 'none';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('sending');

    // Construct mailto link
    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProject Type: ${form.projectType}\n\n${form.message}`
    );
    const mailtoLink = `mailto:${socialLinks.email.address}?subject=${subject}&body=${body}`;

    // Open mailto
    window.location.href = mailtoLink;

    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', projectType: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-2xl)',
      }}
    >
      {/* Name & Email row */}
      <div className="contact-name-email-grid">
        <div>
          <label htmlFor="contact-name" style={labelStyle}>Full Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Your name"
            style={inputStyle}
            aria-required="true"
          />
          {errors.name && <p style={errorStyle}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" style={labelStyle}>Email Address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="you@example.com"
            style={inputStyle}
            aria-required="true"
          />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>
      </div>

      {/* Subject & Type row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
        <div>
          <label htmlFor="contact-subject" style={labelStyle}>Subject</label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Project inquiry"
            style={inputStyle}
            aria-required="true"
          />
          {errors.subject && <p style={errorStyle}>{errors.subject}</p>}
        </div>
        <div>
          <label htmlFor="contact-type" style={labelStyle}>Project Type</label>
          <select
            id="contact-type"
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
            aria-required="true"
          >
            <option value="">Select type</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.projectType && <p style={errorStyle}>{errors.projectType}</p>}
        </div>
      </div>

      {/* Message */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <label htmlFor="contact-message" style={labelStyle}>Message</label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Tell me about your project..."
          rows={5}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
          aria-required="true"
        />
        {errors.message && <p style={errorStyle}>{errors.message}</p>}
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        className="btn btn-primary"
        disabled={status === 'sending'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ width: '100%', justifyContent: 'center', fontSize: '0.95rem' }}
      >
        {status === 'sending' ? (
          'Sending...'
        ) : status === 'success' ? (
          <><CheckCircle size={18} /> Message Prepared</>
        ) : (
          <><Send size={18} /> Send Message</>
        )}
      </motion.button>

      {status === 'success' && (
        <p style={{
          marginTop: 'var(--space-md)',
          textAlign: 'center',
          color: '#4CAF50',
          fontSize: '0.85rem',
        }}>
          Your email client should have opened. If not, please email directly.
        </p>
      )}
    </motion.form>
  );
}
