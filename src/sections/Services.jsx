import { motion } from 'framer-motion';
import {
  Globe, Layout, Smartphone, Code2, Monitor, Server, ArrowRight
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const offerings = [
  { icon: Globe, title: 'Business Websites', desc: 'Professional websites that represent your brand online.' },
  { icon: Layout, title: 'Landing Pages', desc: 'High-converting landing pages with stunning design.' },
  { icon: Smartphone, title: 'Responsive Web Apps', desc: 'Web applications that work beautifully on any device.' },
  { icon: Code2, title: 'API Integration', desc: 'Seamless integration of third-party services and APIs.' },
  { icon: Monitor, title: 'Frontend Development', desc: 'Modern, interactive user interfaces with React.' },
  { icon: Server, title: 'Backend Development', desc: 'Robust server-side logic and database solutions.' },
];

export default function Services() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="section-padding" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 400,
        background: 'linear-gradient(180deg, var(--bg-secondary), transparent)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeading title="Let's Build Something Great" subtitle="Services" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: 'var(--space-lg)',
          marginBottom: 'var(--space-4xl)',
        }}>
          {offerings.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              style={{
                padding: 'var(--space-xl)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-md)',
                cursor: 'default',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(214,40,40,0.2)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                background: 'rgba(214,40,40,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <item.icon size={22} color="var(--accent-primary)" />
              </div>
              <div>
                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  marginBottom: 4,
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            padding: 'var(--space-3xl) var(--space-xl)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Gradient bg */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(214,40,40,0.03), rgba(201,164,92,0.03))',
            pointerEvents: 'none',
          }} />

          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.3rem, 3vw, 2rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-lg)',
            position: 'relative',
          }}>
            Have a Project in Mind?
          </h3>
          <motion.button
            className="btn btn-primary"
            onClick={() => scrollTo('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ position: 'relative' }}
          >
            Start a Project <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
