import { ArrowLeft, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Finale from '@/components/Finale';
import CustomCursor from '@/components/CustomCursor';
import { Badge } from '@/components/ui/badge';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const ProjectFlashcards = () => {
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
                Flashcard Quiz App
              </h1>
              <p className="font-mono text-sm opacity-60 uppercase tracking-widest">
                2024 • AI-Powered Learning Tool
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
              A full-stack, EJS-templated flashcard creation workflow and testing platform. The application allows users to verify emails, bulk-upload study data via CSV, and most notably, takes advantage of LLMs to grade complex open-ended quiz answers rather than relying strictly on exact string matching. 
            </p>

            <h2 className="text-2xl mb-4 mt-12 bg-yellow-400 inline-block px-2">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="border-2 border-black p-6 bg-slate-50">
                <h3 className="text-xl font-bold mb-2">🧠 Smart AI Evaluation</h3>
                <p>Google Gemini 1.5 Flash evaluates open-form answers for conceptual correctness instead of exact spelling, eliminating rigid grading frustration and mimicking a real tutor.</p>
              </div>
              <div className="border-2 border-black p-6 bg-slate-50">
                <h3 className="text-xl font-bold mb-2">📊 CSV Bulk Ingestion</h3>
                <p>Built-in parser allowing students to quickly ramp up decks with 100+ cards in seconds rather than entering them manually row-by-row.</p>
              </div>
              <div className="border-2 border-black p-6 bg-slate-50">
                <h3 className="text-xl font-bold mb-2">🛡️ Full Auth Implementation</h3>
                <p>Bcrypt password hashing with Express Session data tracking coupled directly to a Nodemailer email-verification token flow (24-hour expiry).</p>
              </div>
              <div className="border-2 border-black p-6 bg-slate-50">
                <h3 className="text-xl font-bold mb-2">⚙️ Admin Supervision</h3>
                <p>A complete root administration panel allowing privileged users to force-delete accounts, cascade delete flashcards, and inspect testing data logic securely.</p>
              </div>
            </div>

            <h2 className="text-2xl mb-4 mt-12 inline-block px-2 bg-pink-300">Tech Stack</h2>
            <div className="flex flex-wrap gap-3 mt-4">
              {['Node.js', 'Express.js', 'EJS Views', 'MySQL', 'Bcrypt', 'Gemini AI', 'Nodemailer'].map(t => (
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

export default ProjectFlashcards;
