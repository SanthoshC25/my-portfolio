import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import SkillCard from '../components/SkillCard';
import skillsData from '../data/skills';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillsData[0]?.id || 'frontend');

  const activeSkills = skillsData.find((c) => c.id === activeCategory)?.skills || [];

  return (
    <section id="skills" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <SectionHeading title="My Technical Arsenal" subtitle="Skills & Technologies" />

        {/* Category pills */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-sm)',
          marginBottom: 'var(--space-2xl)',
        }}>
          {skillsData.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '10px 24px',
                borderRadius: 'var(--radius-2xl)',
                border: '1px solid',
                borderColor: activeCategory === cat.id ? 'var(--accent-primary)' : 'var(--border-color)',
                background: activeCategory === cat.id ? 'rgba(214,40,40,0.1)' : 'var(--glass-bg)',
                backdropFilter: 'var(--glass-blur)',
                color: activeCategory === cat.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '0.85rem',
                letterSpacing: '0.03em',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {cat.category}
            </motion.button>
          ))}
        </div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))',
              gap: 'var(--space-xl)',
              maxWidth: 900,
              margin: '0 auto',
            }}
          >
            {activeSkills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
