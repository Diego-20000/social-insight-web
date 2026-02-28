import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * ProjectCard Component
 * 
 * Tarjeta de proyecto para el catálogo.
 * Características:
 * - Emoji o icono del componente
 * - Nombre del proyecto
 * - Descripción breve
 * - Etiqueta de categoría
 * - Efecto hover: elevación, cambio de color, sombra dinámica
 * - Botón "Ver Demo"
 */

interface ProjectCardProps {
  id: number;
  name: string;
  description: string;
  category: string;
  emoji: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  onViewDemo?: () => void;
}

const difficultyColors = {
  beginner: 'bg-green-500/20 text-green-300 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  advanced: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const difficultyLabels = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  description,
  category,
  emoji,
  difficulty,
  onViewDemo,
}) => {
  return (
    <motion.div
      className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-6 cursor-pointer overflow-hidden"
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Fondo gradiente animado */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-pink-600/0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        initial={false}
      />

      {/* Contenido */}
      <div className="relative z-10">
        {/* Emoji */}
        <motion.div
          className="text-4xl mb-4"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.2, rotate: 10 }}
        >
          {emoji}
        </motion.div>

        {/* Nombre */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
          {name}
        </h3>

        {/* Descripción */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors">
          {description}
        </p>

        {/* Categoría y Dificultad */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700">
            {category}
          </span>
          <span
            className={`px-3 py-1 text-xs rounded-full border ${difficultyColors[difficulty]}`}
          >
            {difficultyLabels[difficulty]}
          </span>
        </div>

        {/* Botón Ver Demo */}
        <motion.button
          onClick={onViewDemo}
          className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 group-hover:from-purple-500 group-hover:to-pink-500 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Ver Demo
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight size={16} />
          </motion.div>
        </motion.button>
      </div>

      {/* Efecto de luz en hover */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 blur-xl" />
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
