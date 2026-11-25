import { motion } from 'framer-motion';
import {
  Code2, FileCode, Globe, Palette, Layout,
  Server, Database, Cloud, Boxes, Cpu, Layers, Monitor,
  Terminal, GitBranch
} from 'lucide-react';

const iconMap = {
  Code2, FileCode, Globe, Palette, Layout,
  Server, Database, Cloud, Boxes, Cpu, Layers, Monitor,
  Terminal, GitBranch
};

export default function SkillCard({ skill, index }) {
  const IconComponent = iconMap[skill.icon] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-xl)',
        cursor: 'default',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(214, 40, 40, 0.3)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(214, 40, 40, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Subtle gradient background on hover */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'var(--accent-gradient)',
        opacity: 0,
        transition: 'opacity 0.3s',
      }} />

      <div style={{
        width: 48,
        height: 48,
        borderRadius: 'var(--radius-md)',
        background: 'rgba(214, 40, 40, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 'var(--space-md)',
        transition: 'all 0.3s',
      }}>
        <IconComponent size={24} color="var(--accent-primary)" />
      </div>

      <h4 style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 700,
        fontSize: '1.1rem',
        marginBottom: 'var(--space-xs)',
        color: 'var(--text-primary)',
      }}>
        {skill.name}
      </h4>

      <p style={{
        fontSize: '0.875rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        margin: 0,
      }}>
        {skill.description}
      </p>
    </motion.div>
  );
}
