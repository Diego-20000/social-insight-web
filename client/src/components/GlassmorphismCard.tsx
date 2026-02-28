import React from 'react';
import { motion } from 'framer-motion';

/**
 * GlassmorphismCard Component
 * 
 * Tarjeta con efecto de vidrio esmerilado (glassmorphism) con contenido interactivo.
 * Características:
 * - Fondo semi-transparente con blur
 * - Bordes sutiles con gradiente
 * - Sombras suaves y realistas
 * - Efecto hover con cambio de opacidad
 * - Contenido responsivo
 * - Animación de entrada suave
 */

interface GlassmorphismCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  title,
  description,
  icon,
  onClick,
  className = '',
  children,
}) => {
  return (
    <motion.div
      className={`relative group cursor-pointer ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Fondo glassmorphism */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl" />

      {/* Gradiente de borde */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Contenido */}
      <div className="relative p-6 z-10">
        {/* Icono */}
        {icon && (
          <motion.div
            className="mb-4 text-4xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {icon}
          </motion.div>
        )}

        {/* Título */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
          {title}
        </h3>

        {/* Descripción */}
        <p className="text-gray-200 text-sm mb-4 group-hover:text-gray-100 transition-colors">
          {description}
        </p>

        {/* Contenido adicional */}
        {children && <div className="text-gray-300 text-sm">{children}</div>}

        {/* Efecto de luz */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-2xl blur-xl" />
        </motion.div>
      </div>
    </motion.div>
  );
};

/**
 * GlassmorphismCardGrid Component
 * 
 * Grid responsivo de tarjetas glassmorphism.
 */

interface GlassmorphismCardGridProps {
  cards: Array<{
    id: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    children?: React.ReactNode;
  }>;
  columns?: number;
}

export const GlassmorphismCardGrid: React.FC<GlassmorphismCardGridProps> = ({
  cards,
  columns = 3,
}) => {
  return (
    <div
      className="grid gap-6 w-full"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${100 / columns}%, 1fr))`,
      }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <GlassmorphismCard
            title={card.title}
            description={card.description}
            icon={card.icon}
            onClick={card.onClick}
            className="h-full"
          >
            {card.children}
          </GlassmorphismCard>
        </motion.div>
      ))}
    </div>
  );
};

export default GlassmorphismCard;
