import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ContactForm from '../components/ContactForm';
import socialLinks from '../data/socialLinks';

const socialIcons = { Github, Linkedin, Mail };

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(socialLinks.email.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = socialLinks.email.address;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="contact" className="section-padding" style={{
      background: 'var(--bg-primary)',
      position: 'relative',
    }}>
      {/* Background accents */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(214,40,40,0.04) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeading
          title="Let's Create Something Impactful."
          subtitle="Get In Touch"
        />

        <div className="two-col" style={{ alignItems: 'start' }}>
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.9,
              marginBottom: 'var(--space-2xl)',
            }}>
              Have an idea, a business requirement or an exciting opportunity?
              Let's connect and turn it into a working digital solution.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {/* GitHub */}
              <motion.a
                href={socialLinks.github.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  padding: 'var(--space-md) var(--space-lg)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(214,40,40,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(214,40,40,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Github size={20} color="var(--accent-primary)" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem', margin: 0, color: 'var(--text-primary)' }}>GitHub</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>View my repositories</p>
                </div>
                <ExternalLink size={16} color="var(--text-secondary)" />
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href={socialLinks.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  padding: 'var(--space-md) var(--space-lg)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(214,40,40,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(214,40,40,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Linkedin size={20} color="var(--accent-primary)" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem', margin: 0, color: 'var(--text-primary)' }}>LinkedIn</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Connect professionally</p>
                </div>
                <ExternalLink size={16} color="var(--text-secondary)" />
              </motion.a>

              {/* Email */}
              <motion.div
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  padding: 'var(--space-md) var(--space-lg)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(214,40,40,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(214,40,40,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Mail size={20} color="var(--accent-primary)" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem', margin: 0, color: 'var(--text-primary)' }}>Email</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>{socialLinks.email.address}</p>
                </div>
                <motion.button
                  onClick={copyEmail}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Copy email address"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: copied ? '#4CAF50' : 'var(--text-secondary)',
                    padding: 4,
                    display: 'flex',
                    transition: 'color 0.3s',
                  }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
