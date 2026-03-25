import { Award } from 'lucide-react';
import SectionBlock from './SectionBlock';

const certifications = [
  {
    title: 'Python 3.4.3 Training',
    issuer: 'Spoken Tutorial Project, IIT Bombay',
    detail: 'Score: 80% — 4 Credits',
    date: 'Mar. 2025',
    icon: '🏅',
  },
];

const CertificationsSection = () => (
  <SectionBlock id="certifications" title="Certifications">
    <div className="space-y-6">
      {certifications.map((cert) => (
        <div
          key={cert.title}
          className="group flex items-start gap-6 border-2 border-black p-6 bg-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 rounded-none"
        >
          <div className="p-3 border-2 border-black bg-black text-white group-hover:bg-white group-hover:text-black transition-colors rounded-none shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
              <h3 className="text-base font-black text-foreground">
                {cert.title}
              </h3>
              <span className="font-mono text-xs text-foreground/50 uppercase tracking-widest">
                {cert.date}
              </span>
            </div>
            <p className="font-medium text-sm text-foreground/80 mt-1">
              {cert.issuer}
            </p>
            <p className="font-mono text-xs text-foreground/50 mt-1">
              {cert.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  </SectionBlock>
);

export default CertificationsSection;
