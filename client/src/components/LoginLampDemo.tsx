import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * LoginLampDemo Component
 * 
 * Formulario de login interactivo con una lámpara que se enciende al tirar de una cuerda.
 * Características:
 * - Fondo completamente negro cuando la lámpara está apagada
 * - Panel de login invisible hasta que se encienda la lámpara
 * - Animación de cuerda con Framer Motion
 * - Efecto de iluminación gradual
 * - Sombras realistas de luz
 * - Formulario de login funcional
 * - Validación de entrada
 */

interface LoginLampDemoProps {
  onSubmit?: (email: string, password: string) => void;
}

export const LoginLampDemo: React.FC<LoginLampDemoProps> = ({ onSubmit }) => {
  const [isLampOn, setIsLampOn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ropeY, setRopeY] = useState(0);

  const handleRopeClick = () => {
    setIsLampOn(!isLampOn);
    setRopeY(isLampOn ? 0 : 20);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email, password);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Efecto de luz de fondo */}
      {isLampOn && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-yellow-400/20 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Lámpara */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-10">
        {/* Cuerda */}
        <motion.div
          className="w-1 h-20 bg-gray-600 mx-auto cursor-pointer"
          animate={{ y: ropeY }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={handleRopeClick}
        />

        {/* Bombilla */}
        <motion.div
          className="relative w-16 h-20 mx-auto"
          animate={{
            boxShadow: isLampOn
              ? '0 0 40px 20px rgba(255, 200, 0, 0.4), 0 0 80px 40px rgba(255, 200, 0, 0.2)'
              : 'none',
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-full relative">
            {isLampOn && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-white to-transparent rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-gray-700 rounded-b" />
        </motion.div>
      </div>

      {/* Panel de login */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLampOn ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        pointerEvents={isLampOn ? 'auto' : 'none'}
      >
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-700 shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: isLampOn ? 1 : 0.8, opacity: isLampOn ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Iniciar Sesión</h1>

          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-semibold mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition"
          >
            Entrar
          </button>

          <p className="text-gray-400 text-sm text-center mt-4">
            Tira de la cuerda para encender la lámpara
          </p>
        </motion.form>
      </motion.div>

      {/* Instrucciones */}
      {!isLampOn && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm">Haz clic en la cuerda para iluminar</p>
        </motion.div>
      )}
    </div>
  );
};

export default LoginLampDemo;
