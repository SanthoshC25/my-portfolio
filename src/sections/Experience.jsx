import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import experience from '../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <SectionHeading title="My Journey" subtitle="Experience" />

        <div style={{
          position: 'relative',
          maxWidth: 800,
          margin: '0 auto',
          paddingLeft: 40,
        }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute',
            left: 15,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'linear-gradient(180deg, var(--accent-primary), var(--accent-secondary), transparent)',
            borderRadius: 1,
          }} />

          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              style={{
                position: 'relative',
                marginBottom: i < experience.length - 1 ? 'var(--space-2xl)' : 0,
                paddingLeft: 'var(--space-2xl)',
              }}
            >
              {/* Timeline dot */}
              <div style={{
                position: 'absolute',
                left: -26,
                top: 24,
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                border: '3px solid var(--accent-primary)',
                boxShadow: '0 0 12px rgba(214,40,40,0.3)',
                zIndex: 2,
              }} />

              {/* Card */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-xl)',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(214,40,40,0.2)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                {/* Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 'var(--space-sm)',
                  marginBottom: 'var(--space-sm)',
                }}>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: 4,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                      <Briefcase size={18} color="var(--accent-primary)" />
                      {exp.company}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--accent-primary)',
                      margin: '2px 0 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      flexWrap: 'wrap',
                    }}>
                      <span>{exp.role}</span>
                      {exp.domain && (
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 500,
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--accent-secondary)',
                          background: 'rgba(201, 164, 92, 0.1)',
                          border: '1px solid rgba(201, 164, 92, 0.25)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-sm)',
                        }}>
                          Domain: {exp.domain}
                        </span>
                      )}
                    </p>
                  </div>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(214,40,40,0.08)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--accent-secondary)',
                    letterSpacing: '0.03em',
                    whiteSpace: 'nowrap',
                  }}>
                    {exp.period}
                  </span>
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  marginBottom: 'var(--space-md)',
                }}>
                  {exp.description}
                </p>

                {/* Technologies */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(214,40,40,0.06)',
                        border: '1px solid rgba(214,40,40,0.1)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
