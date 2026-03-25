import { ArrowLeft, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Finale from '@/components/Finale';
import CustomCursor from '@/components/CustomCursor';
import { Badge } from '@/components/ui/badge';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const ProjectAnnadaan = () => {
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
                Annadaan Platform
              </h1>
              <p className="font-mono text-sm opacity-60 uppercase tracking-widest">
                2025 • Dual-Module Civic Extranet
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
              Annadaan is a dual-purpose social impact platform combining "FoodRescue" (a B2B food surplus redistributor for vendors and NGOs) and a "Donation Drive" (direct D2C contribution module with UPI support).
              Built securely from scratch for an intra-city startup competition—<strong>Winner of the Best Startup Award</strong>.
            </p>

            <h2 className="text-2xl mb-4 mt-12 bg-orange-300 inline-block px-2">Key Modules</h2>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="border-2 border-black p-6 bg-teal-50">
                <h3 className="text-xl font-bold mb-2">🍛 FoodRescue System</h3>
                <p>Vendors post surplus food listings. Authenticated NGOs generate pickup requests. Both parties approve exchanges in a verified dual-consent loop.</p>
              </div>
              <div className="border-2 border-black p-6 bg-indigo-50">
                <h3 className="text-xl font-bold mb-2">💸 Custom UPI Engine</h3>
                <p>Dynamic QR code generator that parses fixed/flexible amount campaigns with callback reconciliation through an admin screenshot verification panel.</p>
              </div>
              <div className="border-2 border-black p-6 bg-pink-50">
                <h3 className="text-xl font-bold mb-2">📄 Automated Tax Receipts</h3>
                <p>A background worker generates on-the-fly PDF certificates directly via node streams using PDFKit upon admin approval mapping.</p>
              </div>
              <div className="border-2 border-black p-6 bg-yellow-50">
                <h3 className="text-xl font-bold mb-2">⚖️ Entity Verification</h3>
                <p>Strict "Trust-and-Verify" dashboard where NGOs upload 12A/80G certificates. Users remain in 'pending' status until manual organizational vetting completes.</p>
              </div>
            </div>

            <h2 className="text-2xl mb-4 mt-12 inline-block px-2 bg-blue-300">Tech Stack</h2>
            <div className="flex flex-wrap gap-3 mt-4">
              {['Next.js 14 App Router', 'TypeScript', 'Tailwind', 'Custom JWT Middlewares', 'MySQL InnoDB', 'Nodemailer', 'PDFKit'].map(t => (
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

export default ProjectAnnadaan;
