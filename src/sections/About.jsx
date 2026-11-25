import { motion } from 'framer-motion';
import { Monitor, Server, Database, Cloud, Download, User } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const interests = [
  { icon: Monitor, label: 'Frontend Dev', desc: 'React & Modern UI' },
  { icon: Server, label: 'Backend Dev', desc: 'ASP.NET & APIs' },
  { icon: Database, label: 'Database', desc: 'MySQL & Data' },
  { icon: Cloud, label: 'Cloud', desc: 'AWS Services' },
];

export default function About() {
  return (
    <section id="about" className="section-padding" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      {/* Subtle background accent */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: 0,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(214,40,40,0.04) 0%, transparent 70%)',
        filter: 'blur(60px)',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <SectionHeading title="Behind The Code" subtitle="About Me" />

        <div className="two-col" style={{ alignItems: 'start' }}>
          {/* Profile Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{
              width: 280,
              height: 340,
              borderRadius: 'var(--radius-xl)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(214,40,40,0.05), rgba(201,164,92,0.05))',
              }} />
              {/* Border glow */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: 'var(--accent-gradient)',
              }} />
              <User size={80} color="var(--text-secondary)" strokeWidth={1} style={{ opacity: 0.3 }} />
              <p style={{
                position: 'absolute',
                bottom: 16,
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-secondary)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                opacity: 0.5,
              }}>
                Your Photo
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.9,
              marginBottom: 'var(--space-md)',
            }}>
              I'm <strong style={{ color: 'var(--text-primary)' }}>Santhosh Kumar</strong>, a Software Developer
              passionate about building modern web applications and meaningful digital experiences.
            </p>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.9,
              marginBottom: 'var(--space-md)',
            }}>
              My development interests cover frontend engineering, backend architecture,
              database integration and cloud technologies.
            </p>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.9,
              marginBottom: 'var(--space-2xl)',
            }}>
              I enjoy transforming ideas into practical software solutions through clean code,
              thoughtful design and continuous learning.
            </p>

            {/* Interest cards */}
            <div className="about-interests-grid">
              {interests.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  style={{
                    padding: 'var(--space-md)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                    transition: 'all 0.3s',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(214,40,40,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  <item.icon size={20} color="var(--accent-primary)" />
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)',
                      margin: 0,
                    }}>{item.label}</p>
                    <p style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                      margin: 0,
                    }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resume button */}
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ textDecoration: 'none' }}
            >
              <Download size={16} /> Download Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
