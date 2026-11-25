import { motion } from 'framer-motion';
import { Monitor, Server, Layers, Layout, Database, Cloud } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import servicesData from '../data/services';

const iconMap = { Monitor, Server, Layers, Layout, Database, Cloud };

export default function Capabilities() {
  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <SectionHeading title="What I Build" subtitle="Development Capabilities" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: 'var(--space-xl)',
        }}>
          {servicesData.map((service, i) => {
            const Icon = iconMap[service.iconName] || Monitor;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                style={{
                  padding: 'var(--space-2xl)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-xl)',
                  cursor: 'default',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(214,40,40,0.25)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(214,40,40,0.08)';
                  e.currentTarget.querySelector('.cap-icon').style.background = 'rgba(214,40,40,0.15)';
                  e.currentTarget.querySelector('.cap-icon').style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.querySelector('.cap-icon').style.background = 'rgba(214,40,40,0.08)';
                  e.currentTarget.querySelector('.cap-icon').style.transform = 'scale(1)';
                }}
              >
                {/* Top gradient bar */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: 'var(--accent-gradient)',
                  opacity: 0.5,
                }} />

                <div
                  className="cap-icon"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 'var(--radius-lg)',
                    background: 'rgba(214,40,40,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 'var(--space-lg)',
                    transition: 'all 0.3s',
                  }}
                >
                  <Icon size={26} color="var(--accent-primary)" />
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  marginBottom: 'var(--space-sm)',
                  color: 'var(--text-primary)',
                }}>
                  {service.title}
                </h3>

                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
