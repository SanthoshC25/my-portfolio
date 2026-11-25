import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import socialLinks from '../data/socialLinks';

const footerLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const socialIcons = { Github, Linkedin, Mail };

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: 'var(--space-3xl) 0 var(--space-xl)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 var(--space-xl)' }}>
        {/* Top */}
        <div className="footer-content" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 'var(--space-2xl)',
          marginBottom: 'var(--space-2xl)',
        }}>
          {/* Brand */}
          <div>
            {/* Marvel-style red name box */}
            <div style={{
              background: 'var(--accent-primary)',
              padding: '5px 14px 4px',
              display: 'inline-block',
              marginBottom: 8,
              clipPath: 'polygon(0 0, 97% 0, 100% 100%, 3% 100%)',
            }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.3rem',
                fontWeight: 900,
                letterSpacing: '0.18em',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                display: 'block',
              }}>
                Santhosh
              </span>
            </div>
            {/* Subtitle */}
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              letterSpacing: '0.3em',
              color: 'var(--accent-secondary)',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-sm)',
              paddingLeft: 2,
            }}>
              Software Developer
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              fontStyle: 'italic',
            }}>
              Engineering Digital Experiences.
            </p>
          </div>

          {/* Nav Links */}
          <div style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap' }}>
            {footerLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            {Object.values(socialLinks).map((link) => {
              const Icon = socialIcons[link.iconName] || Mail;
              const href = link.address ? `mailto:${link.address}` : link.url;
              return (
                <motion.a
                  key={link.label}
                  href={href}
                  target={link.address ? undefined : '_blank'}
                  rel={link.address ? undefined : 'noopener noreferrer'}
                  whileHover={{ y: -3, scale: 1.1 }}
                  aria-label={link.label}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.color = 'var(--accent-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  <Icon size={18} />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, var(--border-color), transparent)',
          marginBottom: 'var(--space-lg)',
        }} />

        {/* Bottom */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-md)',
        }}>
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            margin: 0,
          }}>
            © {new Date().getFullYear()} Santhosh Kumar. All rights reserved.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
            style={{
              width: 40,
              height: 40,
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
            }}
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
