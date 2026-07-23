import { Github, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionBlock from './SectionBlock';
import { Badge } from './ui/badge';
import { playHover, playClick } from '@/hooks/useSoundEffects';

const projects = [
  {
    title: 'TCET Centre of Excellence Portal',
    isNew: true,
    description:
      'Engineered a production-scale institutional platform powering innovation programs, facility booking, hackathons, internships, and content management for 900+ students and 150+ faculty. Built secure multi-role authentication, staged hackathon evaluation workflows, internship collaboration workspaces, asynchronous email processing, MinIO object storage, and Google Analytics instrumentation using a modular service-layer architecture.',
    tags: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Prisma',
      'MySQL',
      'MinIO',
    ],
    githubUrl: 'https://github.com/Newer1107',
    detailsUrl: '/project/coe-portal',
    period: 'Jan. 2025 – Present',
  },
  {
    title: 'CivicResolve',
    isNew: false,
    description:
      'Engineered a cross-platform civic grievance management platform using Next.js 15 and Flutter, enabling organizations to manage public issues through a complete 6-stage workflow. Implemented organization-based RBAC, AI-powered photo-to-report generation with Gemini, geospatial duplicate detection within 50m, Redis-backed API caching delivering up to 30× faster response times, and real-time analytics dashboards.',
    tags: [
      'Next.js 15',
      'Flutter/Dart',
      'TypeScript',
      'Redis',
      'MySQL',
      'Google Gemini AI',
    ],
    githubUrl: 'https://github.com/Newer1107',
    detailsUrl: '/project/civicresolve',
    period: 'Jan. 2025 – Present',
  },
  {
    title: 'Academic Project Dashboard',
    isNew: false,
    description:
      'Built an enterprise-scale academic project management platform supporting Admin, Faculty, and Student workflows with secure authentication, immutable project versioning, mentor review pipelines, AWS S3-backed file storage, bulk CSV onboarding, and asynchronous notifications using the Database Outbox Pattern.',
    tags: [
      'Next.js 15',
      'TypeScript',
      'Prisma',
      'MySQL',
      'AWS S3',
      'NextAuth',
    ],
    githubUrl: 'https://github.com/Newer1107',
    detailsUrl: '/project/dashboard',
    period: 'Jan. 2025 – Present',
  },
  {
    title: 'Annadaan Platform',
    isNew: false,
    description:
      'Founded and independently developed a social-impact platform featuring FoodRescue for location-aware surplus food redistribution and Donation Drive for fundraising campaigns. Built approval workflows, RBAC, UPI donations, PDF receipt generation, and public donor recognition. Successfully powered 3+ donation drives, raised ₹7,000+, and won the ₹5,000 Best Startup Award.',
    tags: [
      'Next.js 14',
      'TypeScript',
      'MySQL',
      'JWT RBAC',
      'AWS EC2',
      'Tailwind CSS',
    ],
    githubUrl: 'https://github.com/Newer1107',
    detailsUrl: '/project/annadaan',
    period: 'Jan. 2025 – Present',
  },
  {
    title: 'Flashcard Quiz App',
    isNew: false,
    description:
      'Developed a full-stack AI-powered learning platform with secure email authentication, flashcard management, bulk CSV import, and real-time answer evaluation using Gemini 1.5 Flash. Implemented bcrypt authentication, expiring verification tokens, admin management, and automated quiz feedback.',
    tags: [
      'Node.js',
      'Express.js',
      'MySQL',
      'Google Gemini AI',
      'Nodemailer',
    ],
    githubUrl: 'https://github.com/Newer1107',
    detailsUrl: '/project/flashcards',
    period: 'Aug. 2024',
  },
];

const ProjectsSection = () => (
  <SectionBlock id="projects" title="Projects">
    <div className="flex md:grid md:grid-cols-2 lg:grid-cols-2 gap-8 overflow-x-auto md:overflow-x-visible pt-6 pb-12 md:py-0 snap-x snap-mandatory scrollbar-hide px-4 md:px-0 -mx-4 md:mx-0">
      {projects.map((project) => (
        <div
          key={project.title}
          onMouseEnter={playHover}
          className="group relative border-4 border-black p-8 flex flex-col hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 bg-white min-w-[300px] w-full md:w-auto snap-start rounded-none"
        >
          {project.isNew && (
            <div className="absolute -top-3 -right-3 bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-tighter border-4 border-black z-10 rotate-12 group-hover:rotate-6 transition-transform rounded-none">
              LATEST WORK
            </div>
          )}
          <div className="flex flex-col flex-1">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-xl font-black text-foreground group-hover:underline decoration-4 underline-offset-4">
                {project.title}
              </h3>
            </div>
            <p className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest mb-3">
              {project.period}
            </p>
            <p className="body-text text-sm font-normal leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto pt-4">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="font-mono text-[10px] font-bold border border-black/10 px-1.5 py-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-black/10">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-black bg-white text-[10px] font-black uppercase tracking-wider transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-black hover:text-white rounded-none"
            >
              <Github className="w-3.5 h-3.5" />
              Source
            </a>
            {project.detailsUrl.startsWith('/') ? (
              <Link
                to={project.detailsUrl}
                onClick={playClick}
                className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-black bg-black text-[10px] font-black uppercase tracking-wider transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,204,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] text-white hover:bg-white hover:text-black hover:border-black rounded-none"
              >
                <FileText className="w-3.5 h-3.5" />
                View Details
              </Link>
            ) : (
              <a
                href={project.detailsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-black bg-black text-[10px] font-black uppercase tracking-wider transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,204,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] text-white hover:bg-white hover:text-black hover:border-black rounded-none"
              >
                <FileText className="w-3.5 h-3.5" />
                View Details
              </a>
            )}
          </div>
        </div>
      ))}
    </div>

    <div className="mt-12 flex justify-center md:justify-start">
      <a
        href="https://github.com/Newer1107"
        target="_blank"
        rel="noopener noreferrer"
        onClick={playClick}
        className="group flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1 hover:gap-4 transition-all"
      >
        <Github className="w-4 h-4" />
        View All Projects
      </a>
    </div>
  </SectionBlock>
);

export default ProjectsSection;
