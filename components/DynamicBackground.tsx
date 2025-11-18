import React, { useEffect, useRef } from 'react';

const DynamicBackground: React.FC = () => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const node = backdropRef.current;
    if (!node) return undefined;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      node.style.setProperty('--cursor-x', `${x}%`);
      node.style.setProperty('--cursor-y', `${y}%`);
    };

    const animate = () => {
      const now = Date.now();
      const wave = Math.sin(now / 900) * 6;
      const ripple = Math.cos(now / 1200) * 8;
      node.style.setProperty('--scan-offset', `${wave}px`);
      node.style.setProperty('--ripple', `${ripple}px`);
      animationRef.current = requestAnimationFrame(animate);
    };

    node.addEventListener('pointermove', handlePointerMove);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      node.removeEventListener('pointermove', handlePointerMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div
      ref={backdropRef}
      aria-hidden="true"
      className="absolute inset-0 blur-sm sm:blur-0 opacity-70 sm:opacity-100 pointer-events-none"
      style={{
        backgroundImage:
          'radial-gradient(circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(45, 255, 196, 0.18), transparent 35%),\n' +
          'conic-gradient(from 90deg at 50% calc(50% + var(--scan-offset, 0px)), rgba(0, 255, 170, 0.12), rgba(0, 153, 255, 0.04), rgba(0, 255, 170, 0.12)),\n' +
          'linear-gradient(115deg, rgba(0, 195, 255, 0.08) 0%, rgba(10, 255, 214, 0.07) 50%, rgba(0, 195, 255, 0.08) 100%),\n' +
          'linear-gradient(90deg, rgba(0, 255, 170, 0.08), rgba(0, 170, 255, 0.02)),\n' +
          'radial-gradient(circle at 20% 20%, rgba(0, 255, 204, 0.1), transparent 30%),\n' +
          'radial-gradient(circle at 80% 70%, rgba(0, 166, 255, 0.12), transparent 25%)',
        backgroundBlendMode: 'screen',
        maskImage:
          'linear-gradient(to top, transparent 0%, rgba(255,255,255,0.25) 20%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.35) 60%, transparent 100%)',
        transform: 'translateZ(0)',
      }}
    >
      <div
        className="absolute inset-0 bg-[length:180px_180px]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 255, 170, 0.08), rgba(0, 255, 170, 0.08)), linear-gradient(90deg, rgba(0, 255, 170, 0.08), rgba(0, 255, 170, 0.08))',
          backgroundSize: '180px 180px, 180px 180px',
          backgroundPosition: 'calc(var(--ripple, 0px)) calc(var(--ripple, 0px))',
          mixBlendMode: 'screen',
        }}
      />
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 animate-pulse opacity-30 bg-[radial-gradient(circle_at_center,rgba(0,255,170,0.1),transparent_60%)]" />
    </div>
  );
};

export default DynamicBackground;
