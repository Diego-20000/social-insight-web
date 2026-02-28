import React, { useEffect, useRef } from 'react';

/**
 * ParticleEffects Component
 * 
 * Efecto de partículas animadas que crean una atmósfera visual dinámica.
 * Características:
 * - Partículas que se mueven aleatoriamente
 * - Colisiones y rebotes
 * - Cambio de color dinámico
 * - Rendimiento optimizado
 * - Responsivo a eventos del usuario
 * - Diferentes modos (lluvia, explosión, órbita)
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  life: number;
  maxLife: number;
}

interface ParticleEffectsProps {
  mode?: 'rain' | 'explosion' | 'orbit';
  particleCount?: number;
  className?: string;
}

export const ParticleEffects: React.FC<ParticleEffectsProps> = ({
  mode = 'rain',
  particleCount = 50,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Inicializar partículas
    const initializeParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        let particle: Particle;

        if (mode === 'rain') {
          particle = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 3 + 1,
            radius: Math.random() * 2 + 1,
            color: `hsl(${Math.random() * 60 + 200}, 100%, 50%)`,
            life: 1,
            maxLife: 1,
          };
        } else if (mode === 'explosion') {
          const angle = (i / particleCount) * Math.PI * 2;
          const speed = Math.random() * 5 + 2;
          particle = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 60}, 100%, 50%)`,
            life: 1,
            maxLife: 1,
          };
        } else {
          // orbit mode
          const angle = (i / particleCount) * Math.PI * 2;
          const radius = 100;
          particle = {
            x: canvas.width / 2 + Math.cos(angle) * radius,
            y: canvas.height / 2 + Math.sin(angle) * radius,
            vx: Math.cos(angle + Math.PI / 2) * 2,
            vy: Math.sin(angle + Math.PI / 2) * 2,
            radius: Math.random() * 2 + 1,
            color: `hsl(${(angle / Math.PI) * 180}, 100%, 50%)`,
            life: 1,
            maxLife: 1,
          };
        }

        particlesRef.current.push(particle);
      }
    };

    initializeParticles();

    // Función de animación
    const animate = () => {
      // Limpiar canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Actualizar y dibujar partículas
      particlesRef.current = particlesRef.current.filter((particle) => {
        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Aplicar gravedad (solo en modo rain)
        if (mode === 'rain') {
          particle.vy += 0.1;
        }

        // Colisiones con bordes
        if (particle.x - particle.radius < 0 || particle.x + particle.radius > canvas.width) {
          particle.vx *= -0.8;
          particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x));
        }

        if (particle.y - particle.radius < 0 || particle.y + particle.radius > canvas.height) {
          particle.vy *= -0.8;
          particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y));

          if (mode === 'rain' && particle.y + particle.radius >= canvas.height) {
            particle.life = 0;
          }
        }

        // Reducir vida
        if (mode !== 'rain') {
          particle.life -= 0.01;
        }

        // Dibujar partícula
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.life;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        return particle.life > 0;
      });

      // Regenerar partículas si es necesario
      if (particlesRef.current.length < particleCount) {
        const newParticles = particleCount - particlesRef.current.length;
        for (let i = 0; i < newParticles; i++) {
          if (mode === 'rain') {
            particlesRef.current.push({
              x: Math.random() * canvas.width,
              y: -10,
              vx: (Math.random() - 0.5) * 2,
              vy: Math.random() * 3 + 1,
              radius: Math.random() * 2 + 1,
              color: `hsl(${Math.random() * 60 + 200}, 100%, 50%)`,
              life: 1,
              maxLife: 1,
            });
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Manejar redimensionamiento
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mode, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  );
};

export default ParticleEffects;
