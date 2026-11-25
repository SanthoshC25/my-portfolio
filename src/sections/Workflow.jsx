import { motion } from 'framer-motion';
import { Search, Palette, Code, Rocket } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const steps = [
  {
    num: '01',
    title: 'Discover',
    desc: 'Understand the business requirement and project goals.',
    icon: Search,
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Plan the user experience and interface.',
    icon: Palette,
  },
  {
    num: '03',
    title: 'Develop',
    desc: 'Build the application with maintainable code and suitable technologies.',
    icon: Code,
  },
  {
    num: '04',
    title: 'Deliver',
    desc: 'Test, optimize and prepare the application for deployment.',
    icon: Rocket,
  },
];

export default function Workflow() {
  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <SectionHeading title="From Idea to Execution" subtitle="Development Process" />

        <div className="workflow-steps" style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: 0,
          maxWidth: 1000,
          margin: '0 auto',
          flexWrap: 'wrap',
        }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{ display: 'flex', alignItems: 'flex-start' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                style={{
                  textAlign: 'center',
                  width: 200,
                  padding: 'var(--space-md)',
                }}
              >
                {/* Icon circle */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'var(--bg-card)',
                    border: '2px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto var(--space-md)',
                    position: 'relative',
                    transition: 'border-color 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(214,40,40,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <step.icon size={28} color="var(--accent-primary)" />
                </motion.div>

                {/* Step number */}
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  color: 'var(--accent-secondary)',
                  display: 'block',
                  marginBottom: 4,
                }}>
                  {step.num}
                </span>

                {/* Title */}
                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  {step.title}
                </h4>

                {/* Description */}
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {step.desc}
                </p>
              </motion.div>

              {/* Connector */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                  className="workflow-connector"
                  style={{
                    width: 60,
                    height: 2,
                    background: 'var(--accent-gradient)',
                    marginTop: 50,
                    borderRadius: 1,
                    transformOrigin: 'left',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
