import { motion } from 'framer-motion';

const styles = {
  wrapper: {
    marginBottom: 'var(--space-3xl)',
  },
  center: { textAlign: 'center' },
  left: { textAlign: 'left' },
  subtitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--accent-primary)',
    marginBottom: 'var(--space-sm)',
    display: 'block',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
    color: 'var(--text-primary)',
    lineHeight: 1.2,
    marginBottom: 'var(--space-md)',
  },
  accent: {
    display: 'inline-block',
    marginTop: 'var(--space-sm)',
    width: '60px',
    height: '3px',
    borderRadius: '2px',
    background: 'var(--accent-gradient)',
  },
};

export default function SectionHeading({ title, subtitle, align = 'center' }) {
  return (
    <motion.div
      style={{ ...styles.wrapper, ...(align === 'center' ? styles.center : styles.left) }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {subtitle && <span style={styles.subtitle}>{subtitle}</span>}
      <h2 style={styles.title}>{title}</h2>
      <div style={styles.accent} />
    </motion.div>
  );
}
