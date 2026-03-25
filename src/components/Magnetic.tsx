import { useRef, useState, ReactNode, MouseEvent } from 'react';

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

const Magnetic = ({
  children,
  strength = 0.5,
  className = '',
}: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      ref.current?.getBoundingClientRect() || {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      };

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const x = (clientX - centerX) * strength;
    const y = (clientY - centerY) * strength;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {children}
    </div>
  );
};

export default Magnetic;
