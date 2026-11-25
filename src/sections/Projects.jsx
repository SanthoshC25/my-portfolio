import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import ProjectCard, { ProjectsEmptyState } from '../components/ProjectCard';
import projects from '../data/projects';

export default function Projects() {
  return (
    <section id="projects" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <SectionHeading title="Selected Projects" subtitle="Featured Work" />

        {projects.length === 0 ? (
          <ProjectsEmptyState />
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
