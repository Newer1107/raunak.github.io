import SectionBlock from './SectionBlock';

const experiences = [
  {
    role: 'Sole Developer',
    company: 'Annadaan — Social Impact Startup',
    period: '[JAN 2025 – PRESENT]',
    location: 'Mumbai, India',
    bullets: [
      'Founded and solo-engineered a dual-module civic platform: FoodRescue (vendor surplus → NGO routing) and Donation Drive (UPI/item campaigns, admin approval pipeline, public donor wall, PDFKit receipt generation) using Next.js 14, TypeScript, Tailwind CSS, MySQL, and JWT RBAC.',
      'Deployed on Cloud EC2; ran 3+ live donation drives and raised ₹7,000+ in total donations.',
      'Won ₹5,000 Best Startup Award at the college E-Summit for innovation in social-impact technology.',
    ],
  },
];

const ExperienceSection = () => (
  <SectionBlock id="experience" title="Experience">
    <div className="space-y-12">
      {experiences.map((exp) => (
        <div
          key={exp.role}
          className="relative pl-8 md:pl-0 border-l md:border-l-0 border-black/20 md:grid md:grid-cols-[1fr_2fr] md:gap-8 pb-12 last:pb-0"
        >
          <div className="md:text-right md:pr-8 md:border-r border-black/20 relative">
            <div className="hidden md:block absolute top-1 -right-[5px] w-[9px] h-[9px] rounded-none bg-black"></div>
            <div className="md:hidden absolute top-1 -left-[5px] w-[9px] h-[9px] rounded-none bg-black"></div>

            <h4 className="font-mono text-xs tracking-widest text-foreground/60 uppercase mb-1">
              {exp.period}
            </h4>
            <h3 className="font-bold text-base md:text-lg">{exp.company}</h3>
            <p className="font-mono text-xs text-foreground/50 mt-1">{exp.location}</p>
          </div>

          <div className="mt-2 md:mt-0">
            <h3 className="text-base font-bold text-foreground md:hidden mb-2">
              {exp.role}
            </h3>
            <h3 className="text-lg font-bold text-foreground hidden md:block mb-3">
              {exp.role}
            </h3>
            <ul className="space-y-2">
              {exp.bullets.map((bullet, i) => (
                <li key={i} className="body-text text-sm flex gap-2">
                  <span className="mt-1 shrink-0 w-1.5 h-1.5 bg-black rounded-none translate-y-[6px]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </SectionBlock>
);

export default ExperienceSection;
