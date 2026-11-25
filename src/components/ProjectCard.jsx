import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Folder } from 'lucide-react';

export default function ProjectCard({ project }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(214, 40, 40, 0.3)';
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(214, 40, 40, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div style={{
        width: '100%',
        height: 220,
        background: project.image
          ? `url(${project.image}) center/cover no-repeat`
          : 'linear-gradient(135deg, var(--bg-secondary), var(--bg-card))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        {!project.image && (
          <Folder size={48} color="rgba(214,40,40,0.3)" />
        )}
        {project.category && (
          <span style={{
            position: 'absolute',
            top: 12,
            right: 12,
            padding: '4px 12px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(214, 40, 40, 0.9)',
            color: '#fff',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            {project.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: 'var(--space-xl)' }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.3rem',
          fontWeight: 700,
          marginBottom: 'var(--space-sm)',
          color: 'var(--text-primary)',
        }}>
          {project.title}
        </h3>

        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          marginBottom: 'var(--space-md)',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {project.description}
        </p>

        {/* Tech tags */}
        {project.technologies && project.technologies.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-xs)',
            marginBottom: 'var(--space-lg)',
          }}>
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                style={{
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(214, 40, 40, 0.1)',
                  color: 'var(--accent-primary)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.8rem' }}
            >
              <ExternalLink size={14} /> GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.8rem' }}
            >
              <ArrowUpRight size={14} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* Empty state component */
export function ProjectsEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      style={{
        textAlign: 'center',
        padding: 'var(--space-4xl) var(--space-xl)',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-xl)',
        maxWidth: 500,
        margin: '0 auto',
      }}
    >
      <div style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: 'rgba(214, 40, 40, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto var(--space-xl)',
      }}>
        <Folder size={36} color="var(--accent-primary)" />
      </div>
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.3rem',
        fontWeight: 700,
        marginBottom: 'var(--space-sm)',
        color: 'var(--text-primary)',
      }}>
        Coming Soon
      </h3>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        margin: 0,
      }}>
        New projects are currently being prepared. Stay tuned for upcoming work.
      </p>
    </motion.div>
  );
}
