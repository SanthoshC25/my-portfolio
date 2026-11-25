/**
 * Skills Data
 * Edit this file to update your technical skills.
 * Each category contains an array of skills with name, icon, and description.
 * Icon names map to Lucide React icons.
 */

const skills = [
  {
    id: 'frontend',
    category: 'Frontend',
    skills: [
      {
        name: 'React.js',
        icon: 'Boxes',
        description: 'Building dynamic, component-driven user interfaces'
      },
      {
        name: 'JavaScript',
        icon: 'FileCode',
        description: 'Modern ES6+ development and DOM manipulation'
      },
      {
        name: 'HTML5',
        icon: 'Globe',
        description: 'Semantic markup and accessible web structures'
      },
      {
        name: 'CSS3',
        icon: 'Palette',
        description: 'Responsive layouts, animations, and modern styling'
      },
      {
        name: 'Bootstrap',
        icon: 'Layout',
        description: 'Rapid UI development with responsive grid systems'
      }
    ]
  },
  {
    id: 'backend',
    category: 'Backend',
    skills: [
      {
        name: 'ASP.NET',
        icon: 'Server',
        description: 'Enterprise-grade web application framework'
      },
      {
        name: '.NET Core',
        icon: 'Cpu',
        description: 'Cross-platform backend development'
      },
      {
        name: 'REST API',
        icon: 'Layers',
        description: 'RESTful service design and integration'
      }
    ]
  },
  {
    id: 'database',
    category: 'Database',
    skills: [
      {
        name: 'MySQL',
        icon: 'Database',
        description: 'Relational database design and query optimization'
      },
      {
        name: 'MSSQL',
        icon: 'Database',
        description: 'Microsoft SQL Server enterprise data management & T-SQL'
      }
    ]
  },
  {
    id: 'devops',
    category: 'Cloud & DevOps',
    skills: [
      {
        name: 'AWS Cloud',
        icon: 'Cloud',
        description: 'Cloud infrastructure and deployment services'
      },
      {
        name: 'Linux',
        icon: 'Terminal',
        description: 'Shell scripting, server administration, and CLI workflows'
      },
      {
        name: 'GitHub',
        icon: 'GitBranch',
        description: 'Version control, code collaboration, and CI/CD pipelines'
      }
    ]
  }
];

export default skills;
