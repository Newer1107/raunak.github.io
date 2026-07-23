import { ArrowLeft, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Finale from '@/components/Finale';
import CustomCursor from '@/components/CustomCursor';
import { Badge } from '@/components/ui/badge';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const ProjectCoEPortal = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Navbar />

      <main className="pt-32 pb-16 px-6 md:px-12 max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 text-sm font-bold uppercase tracking-widest border-b-2 border-transparent hover:border-black transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white mb-16 rounded-none">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start border-b-4 border-black pb-8 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                TCET Centre of Excellence Portal
              </h1>
              <p className="font-mono text-sm opacity-60 uppercase tracking-widest">
                2025 • Institutional Platform
              </p>
            </div>
            <a
              href="https://github.com/Newer1107"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-4 border-black bg-black text-white font-black uppercase flex items-center gap-2 shadow-[6px_6px_0px_0px_rgba(255,204,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-none"
            >
              <Github className="w-5 h-5" /> View Source
            </a>
          </div>

          <div className="prose prose-lg max-w-none prose-h2:font-black prose-h2:uppercase prose-h2:tracking-tighter prose-h3:font-bold prose-h3:uppercase">
            <h2 className="text-2xl mb-4">Overview</h2>
            <p className="text-lg leading-relaxed mb-8">
              A production-scale institutional platform serving 900+ students and 150+ faculty, unifying innovation programs, facility bookings, hackathons, internships, and content management under a single modular architecture. Built as a monorepo using <strong>Next.js 16</strong> and <strong>React 19</strong> with a service-layer architecture for maintainability and scale.
            </p>

            <h2 className="text-2xl mb-4 mt-12 bg-yellow-300 inline-block px-2">Key Modules</h2>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="border-2 border-black p-6 bg-blue-50">
                <h3 className="text-xl font-bold mb-2">🔐 Multi-Role Auth & RBAC</h3>
                <p>Secure authentication system supporting distinct roles — students, faculty, and administrators — with granular permission controls across all platform modules.</p>
              </div>
              <div className="border-2 border-black p-6 bg-green-50">
                <h3 className="text-xl font-bold mb-2">🏆 Hackathon Evaluation Pipeline</h3>
                <p>Staged evaluation workflows enabling faculty to review, score, and provide feedback on student submissions with configurable rubrics and progress tracking.</p>
              </div>
              <div className="border-2 border-black p-6 bg-purple-50">
                <h3 className="text-xl font-bold mb-2">🤝 Internship Workspaces</h3>
                <p>Collaborative workspaces where students and industry mentors manage tasks, share resources, and track internship milestones within the platform.</p>
              </div>
              <div className="border-2 border-black p-6 bg-red-50">
                <h3 className="text-xl font-bold mb-2">📬 Async Email Queue</h3>
                <p>Asynchronous email processing pipeline for notifications, approvals, and alerts — ensuring reliable delivery without blocking user-facing requests.</p>
              </div>
              <div className="border-2 border-black p-6 bg-orange-50">
                <h3 className="text-xl font-bold mb-2">📦 MinIO Object Storage</h3>
                <p>S3-compatible object storage for file uploads across modules — facility documents, hackathon submissions, internship reports — with secure access controls.</p>
              </div>
              <div className="border-2 border-black p-6 bg-indigo-50">
                <h3 className="text-xl font-bold mb-2">📊 Google Analytics Integration</h3>
                <p>Instrumented analytics across the platform providing insights into user engagement, feature adoption, and content performance for data-driven improvements.</p>
              </div>
            </div>

            <h2 className="text-2xl mb-4 mt-12 inline-block px-2 bg-pink-300">Tech Stack</h2>
            <div className="flex flex-wrap gap-3 mt-4">
              {['Next.js 16', 'React 19', 'TypeScript', 'Prisma', 'MySQL', 'MinIO', 'Google Analytics'].map(t => (
                <Badge key={t} className="text-sm font-bold px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white rounded-none">
                  {t}
                </Badge>
              ))}
            </div>

          </div>
        </div>
      </main>

      <Finale />
    </div>
  );
};

export default ProjectCoEPortal;
