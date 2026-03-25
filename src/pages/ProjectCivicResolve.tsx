import { ArrowLeft, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Finale from '@/components/Finale';
import CustomCursor from '@/components/CustomCursor';
import SectionBlock from '@/components/SectionBlock';
import { Badge } from '@/components/ui/badge';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const ProjectCivicResolve = () => {
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
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                CivicResolve
              </h1>
              <p className="font-mono text-sm opacity-60 uppercase tracking-widest">
                Jan 2025 - Present • Full-Stack Platform
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
              A comprehensive civic issue management platform that empowers citizens to report, track, and resolve community problems while providing administrators with powerful tools to manage municipal services efficiently. Built as a monorepo featuring a <strong>Flutter mobile app</strong> and a <strong>Next.js 15 enterprise web dashboard</strong>.
            </p>

            <h2 className="text-2xl mb-4 mt-12 bg-yellow-300 inline-block px-2">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="border-2 border-black p-6 bg-blue-50">
                <h3 className="text-xl font-bold mb-2">🤖 AI Category Auto-Fill & Analysis</h3>
                <p>Google Gemini 2.5 Flash Lite validates pictures, generates titles/descriptions, and auto-suggests categories. Includes a chat assistant with civic knowledge.</p>
              </div>
              <div className="border-2 border-black p-6 bg-red-50">
                <h3 className="text-xl font-bold mb-2">🔍 Duplicate Detection</h3>
                <p>Intelligent proximity-based and text-similarity matching algorithms. Defaults to 50m radius. Prevents duplicate tickets with admin review workflows.</p>
              </div>
              <div className="border-2 border-black p-6 bg-green-50">
                <h3 className="text-xl font-bold mb-2">👤 Anonymous Reporting</h3>
                <p>Privacy-first mode that masks identities in public views while safely logging hashed IPs in backend audit tables for security.</p>
              </div>
              <div className="border-2 border-black p-6 bg-purple-50">
                <h3 className="text-xl font-bold mb-2">⚡ Redis Caching System</h3>
                <p>Multi-level caching across endpoints delivering 5-30x faster response times, with intelligent cache invalidation on new assignments.</p>
              </div>
            </div>

            <h2 className="text-2xl mb-4 mt-12">The Workflow</h2>
            <div className="bg-black text-white p-6 font-mono text-sm md:text-base border-4 border-gray-400">
              User ➔ Upload Photo ➔ Gemini Analysis ➔ Location Map ➔ Duplicate Check ➔ Submit<br/><br/>
              Platform ➔ Category Matching ➔ Route to Org ➔ Email Assigned Worker ➔ Live Progress Updates
            </div>

            <h2 className="text-2xl mb-4 mt-12 inline-block px-2 bg-pink-300">Tech Stack</h2>
            <div className="flex flex-wrap gap-3 mt-4">
              {['Next.js 15', 'Flutter', 'TypeScript', 'MySQL 2', 'Redis', 'Google Gemini AI', 'Zod', 'Tailwind', 'JWT'].map(t => (
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

export default ProjectCivicResolve;
