import SectionBlock from './SectionBlock';
import AnimatedAvatar from './AnimatedAvatar';

const AboutSection = () => (
  <SectionBlock id="about" title="About me">
    <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
      <AnimatedAvatar />
      <div className="flex-1">
        <p className="body-text max-w-2xl">
          I'm Raunak Singh — a B.E. Computer Engineering student at Thakur
          College of Engineering & Technology, Mumbai, and a passionate
          full-stack developer who builds real, production-grade systems from
          the ground up.
        </p>
        <p className="body-text max-w-2xl mt-6">
          From architecting a civic-impact platform serving NGOs and donors, to
          engineering a cross-platform municipality issue-tracker with AI
          features, I thrive at the intersection of purpose-driven design and
          scalable backend architecture.
        </p>
        <p className="body-text max-w-2xl mt-6 mb-8">
          My stack runs deep — <strong>Next.js, TypeScript, Flutter, MySQL,
          Redis, AWS, and Google Gemini AI</strong> — and I'm always looking for
          the next hard problem worth solving. I believe clean code, thoughtful
          architecture, and measurable impact are not mutually exclusive.
        </p>
        <a
          href="https://github.com/Newer1107"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 px-6 py-3 border-2 border-black bg-white text-black text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-black hover:text-white rounded-none"
        >
          <span>View My GitHub</span>
        </a>
      </div>
    </div>
  </SectionBlock>
);

export default AboutSection;
