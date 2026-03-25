import SectionBlock from './SectionBlock';

const education = [
  {
    degree: 'B.E. in Computer Engineering',
    school: 'Thakur College of Engineering & Technology',
    university: 'Mumbai University',
    year: '2024 – 2028',
    location: 'Mumbai, India',
  },
  {
    degree: 'HSC — Science (PCM + Computers)',
    school: "St. Rocks College",
    university: '',
    year: '2023 – 2024',
    location: 'Mumbai, India',
  },
  {
    degree: 'Diploma in Software Development — Grade: A',
    school: 'TIIT Computer Education',
    university: '',
    year: 'Oct. 2022',
    location: 'Mumbai, India',
  },
];

const EducationSection = () => (
  <SectionBlock id="education" title="Education">
    <div className="space-y-10">
      {education.map((item) => (
        <div
          key={item.degree}
          className="border-l-2 border-black/10 pl-6 py-2 hover:border-black transition-colors duration-300"
        >
          <h3 className="text-base md:text-lg font-bold text-foreground">
            {item.degree}
          </h3>
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mt-2">
            <span className="text-sm font-medium text-foreground">
              {item.school}
            </span>
            {item.university && (
              <>
                <span className="hidden md:inline text-foreground/20">•</span>
                <span className="text-sm text-foreground/60">{item.university}</span>
              </>
            )}
            <span className="hidden md:inline text-foreground/20">•</span>
            <span className="font-mono text-xs text-foreground/60">
              {item.year}
            </span>
            <span className="hidden md:inline text-foreground/20">•</span>
            <span className="font-mono text-xs text-foreground/50">
              {item.location}
            </span>
          </div>
        </div>
      ))}
    </div>
  </SectionBlock>
);

export default EducationSection;
