import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '../components/ProjectCard';
import { GlassmorphismCard } from '../components/GlassmorphismCard';\nimport { Navigation } from '../components/Navigation';
import { ParticleEffects } from '../components/ParticleEffects';

/**\n * Home Page\n * \n * Página principal con catálogo de componentes.\n */

const mockProjects = [
  {
    id: 1,
    name: 'Login Lamp Animation',
    description: 'Formulario de login interactivo con una lámpara que se enciende al tirar de una cuerda.',
    category: 'Formularios',
    emoji: '💡',
    difficulty: 'beginner' as const,
  },
  {
    id: 2,
    name: 'Particle Effects',
    description: 'Efecto de partículas animadas que crean una atmósfera visual dinámica.',
    category: 'Efectos',
    emoji: '✨',
    difficulty: 'intermediate' as const,
  },
  {
    id: 3,
    name: 'Glassmorphism Card',
    description: 'Tarjeta con efecto de vidrio esmerilado con contenido interactivo.',
    category: 'Tarjetas',
    emoji: '🔮',
    difficulty: 'beginner' as const,
  },
];

export const Home: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handleViewDemo = (projectId: number) => {
    setSelectedProject(projectId);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Fondo de partículas */}
      <div className="fixed inset-0 z-0">
        <ParticleEffects mode="rain" particleCount={30} />
      </div>

      {/* Navegación */}
      <Navigation onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

      {/* Contenido */}
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            className="text-center max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Diseños que Brillan
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Catálogo interactivo de componentes frontend premium con animaciones y efectos visuales de alta calidad.
            </motion.p>

            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg text-lg hover:from-purple-500 hover:to-pink-500 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explorar Ahora
            </motion.button>
          </motion.div>
        </section>

        {/* Componentes Section */}
        <section id="components" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Componentes Disponibles
            </motion.h2>

            <motion.p
              className="text-center text-gray-400 mb-12 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explora nuestra colección de componentes premium listos para usar
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <ProjectCard
                    {...project}
                    onViewDemo={() => handleViewDemo(project.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Beneficios Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              ¿Por qué ArtPrograms?
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Código Premium', description: 'Componentes de alta calidad y bien documentados', icon: '⭐' },
                { title: '100% Gratuito', description: 'Acceso completo a todo el código fuente', icon: '🎁' },
                { title: 'Fácil de Usar', description: 'Copia y pega en tus proyectos', icon: '⚡' },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <GlassmorphismCard
                    title={benefit.title}
                    description={benefit.description}
                    icon={benefit.icon}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-gray-800 text-center text-gray-400">
          <p>© 2026 ArtPrograms Studio. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
