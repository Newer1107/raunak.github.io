import { ArrowLeft, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Finale from '@/components/Finale';
import CustomCursor from '@/components/CustomCursor';
import { Badge } from '@/components/ui/badge';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const ProjectDashboard = () => {
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
                Academic Project Dashboard
              </h1>
              <p className="font-mono text-sm opacity-60 uppercase tracking-widest">
                2025 • Project Lifecycle Platform
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
              A full-stack dashboard for academic project management and showcase publishing. 
              Supports core project monitoring for teachers and students, alongside a stringent showcase submission system for admin version tracking.
            </p>

            <h2 className="text-2xl mb-4 mt-12 bg-green-300 inline-block px-2">Key Pipelines</h2>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="border-2 border-black p-6 bg-gray-50">
                <h3 className="text-xl font-bold mb-2">🚦 Showcase Lifecycle</h3>
                <p>Status flow: Draft ➔ Submitted ➔ Under Review ➔ (Changes Requested / Approved) ➔ Published. Every resubmit creates an immutable version snapshot.</p>
              </div>
              <div className="border-2 border-black p-6 bg-yellow-50">
                <h3 className="text-xl font-bold mb-2">📦 Async Email Outbox</h3>
                <p>An enterprise-grade DB-outbox pattern processing bulk CSV assignment notifications securely in a dedicated cron queue without blocking the UI.</p>
              </div>
              <div className="border-2 border-black p-6 bg-red-50">
                <h3 className="text-xl font-bold mb-2">🔐 Auth Governance</h3>
                <p>OTP-based registration. Explicit allowed-email lists and institutional domain validation ensures strict RBAC access per domain constraints without leaks.</p>
              </div>
              <div className="border-2 border-black p-6 bg-blue-50">
                <h3 className="text-xl font-bold mb-2">🏗️ Core Monitoring</h3>
                <p>Teachers manage members, tasks, and milestones with full file uploads integrated into AWS S3 buckets linked to task-by-task evidence reviews.</p>
              </div>
            </div>

            <h2 className="text-2xl mb-4 mt-12 inline-block px-2 bg-purple-300">Tech Stack</h2>
            <div className="flex flex-wrap gap-3 mt-4">
              {['Next.js 15', 'TypeScript', 'Prisma', 'MySQL', 'NextAuth v5', 'Tailwind CSS', 'AWS S3', 'Nodemailer'].map(t => (
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

export default ProjectDashboard;
