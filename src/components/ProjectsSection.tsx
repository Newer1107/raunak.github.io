import { Github, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionBlock from './SectionBlock';
import { Badge } from './ui/badge';
import { playHover, playClick } from '@/hooks/useSoundEffects';

const projects = [
  {
    title: 'CivicResolve',
    isNew: true,
    description:
      'A cross-platform civic-issue system spanning a Flutter mobile app and Next.js 15 web app with a 6-state issue lifecycle, multi-org RBAC routing, Gemini AI auto-fill, proximity-based duplicate detection at 50m, and Redis-cached APIs with 5–30× latency gains.',
    tags: [
      'Next.js 15',
      'Flutter/Dart',
      'TypeScript',
      'MySQL',
      'Redis',
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
      'Production platform for 3 roles (Admin, Teacher, Student) with OTP-based registration, a 3-stage versioned Showcase pipeline, AWS S3 file storage, and a bulk CSV assignment system on an async DB-outbox email queue.',
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
      'Dual-module civic platform: FoodRescue (vendor surplus → NGO routing) and Donation Drive (UPI/item campaigns, admin approval pipeline, public donor wall, PDFKit receipts). Ran 3+ live drives, raised ₹7,000+, and won ₹5,000 Best Startup Award.',
    tags: [
      'Next.js 14',
      'TypeScript',
      'Tailwind CSS',
      'MySQL',
      'JWT RBAC',
      'AWS EC2',
    ],
    githubUrl: 'https://github.com/Newer1107',
    detailsUrl: '/project/annadaan',
    period: 'Jan. 2025 – Present',
  },
  {
    title: 'Flashcard Quiz App',
    isNew: false,
    description:
      'Full-stack flashcard app with email-verified registration (bcrypt + 24-hour expiry tokens), CRUD, bulk CSV import, admin panel, and an AI quiz mode via Gemini 1.5 Flash for open-ended answer evaluation with real-time feedback.',
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
          className="group relative border-4 border-black p-8 flex flex-col justify-between hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 bg-white min-w-[300px] w-full md:w-auto snap-start rounded-none"
        >
          {'isNew' in project && project.isNew && (
            <div className="absolute -top-3 -right-3 bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-tighter border-4 border-black z-10 rotate-12 group-hover:rotate-6 transition-transform rounded-none">
              LATEST WORK
            </div>
          )}
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-xl font-black text-foreground group-hover:underline decoration-4 underline-offset-4">
                {project.title}
              </h3>
            </div>
            <p className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest mb-3">
              {project.period}
            </p>
            <p className="body-text mt-2 text-sm font-normal leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
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
            <Link
              to={project.detailsUrl}
              onClick={playClick}
              className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-black bg-black text-[10px] font-black uppercase tracking-wider transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,204,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] text-white hover:bg-white hover:text-black hover:border-black rounded-none"
            >
              <FileText className="w-3.5 h-3.5" />
              View Details
            </Link>
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
