import { useState, useEffect, useCallback } from 'react';
import { playSuccess } from '@/hooks/useSoundEffects';
import { Stars, Sparkles } from 'lucide-react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const EasterEgg = () => {
  const [input, setInput] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);

  const triggerEgg = useCallback(() => {
    setIsActive(true);
    playSuccess();

    // Inject Gold Theme to Body
    document.body.classList.add('easter-egg-gold');

    setTimeout(() => {
      setIsActive(false);
      document.body.classList.remove('easter-egg-gold');
      setInput([]);
    }, 10000); // Mode lasts for 10 seconds
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = [...input, e.key].slice(-10);
      setInput(newInput);

      if (newInput.join(',') === KONAMI_CODE.join(',')) {
        triggerEgg();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, triggerEgg]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none flex flex-col items-center justify-center bg-yellow-400 select-none animate-in fade-in zoom-in duration-500">
      <div className="bg-black text-white p-12 border-4 border-white shadow-[20px_20px_0px_0px_rgba(255,255,255,1)] text-center scale-150">
        <div className="flex justify-center gap-4 mb-6">
          <Stars className="w-8 h-8 animate-spin" />
          <Sparkles className="w-8 h-8 animate-bounce" />
          <Stars className="w-8 h-8 animate-spin" />
        </div>
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 italic">
          vibe mode activated
        </h2>
        <p className="font-mono text-sm uppercase tracking-widest opacity-70">
          congratulations, seeker.
        </p>
      </div>

      {/* Decorative floating bits */}
      <div className="absolute top-20 left-20 w-32 h-32 border-8 border-black animate-bounce" />
      <div
        className="absolute bottom-20 right-20 w-32 h-32 border-8 border-black animate-bounce"
        style={{ animationDelay: '0.2s' }}
      />
    </div>
  );
};

export default EasterEgg;
