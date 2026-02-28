import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, X } from 'lucide-react';

/**
 * CodeViewer Component
 * 
 * Visor de código con syntax highlighting y funcionalidades avanzadas.
 * Características:
 * - Tabs para HTML, CSS, JavaScript
 * - Syntax highlighting con colores profesionales
 * - Números de línea
 * - Scroll independiente
 * - Botón "Copiar Todo"
 * - Botón "Cerrar"
 * - Animación de entrada suave (fade + scale)
 */

interface CodeViewerProps {
  code: {
    html?: string;
    css?: string;
    javascript?: string;
  };
  onClose?: () => void;
}

type CodeLanguage = 'html' | 'css' | 'javascript';

export const CodeViewer: React.FC<CodeViewerProps> = ({ code, onClose }) => {
  const [activeTab, setActiveTab] = useState<CodeLanguage>('html');
  const [copied, setCopied] = useState(false);

  const tabs: Array<{ key: CodeLanguage; label: string; color: string }> = [
    { key: 'html', label: 'HTML', color: 'text-orange-400' },
    { key: 'css', label: 'CSS', color: 'text-blue-400' },
    { key: 'javascript', label: 'JavaScript', color: 'text-yellow-400' },
  ];

  const currentCode = code[activeTab] || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightCode = (code: string, language: CodeLanguage): string => {
    // Implementación simplificada de syntax highlighting
    // En producción, usar Prism.js o similar
    let highlighted = code;

    if (language === 'html') {
      highlighted = highlighted
        .replace(/(&lt;[^&]*&gt;)/g, '<span class="text-red-400">$1</span>')
        .replace(/(".*?")/g, '<span class="text-green-400">$1</span>');
    } else if (language === 'css') {
      highlighted = highlighted
        .replace(/([a-z-]+):/g, '<span class="text-blue-400">$1:</span>')
        .replace(/(#[0-9a-f]{6}|rgb[a]?\([^)]*\))/gi, '<span class="text-purple-400">$1</span>');
    } else if (language === 'javascript') {
      highlighted = highlighted
        .replace(/(const|let|var|function|return|if|else|for|while)/g, '<span class="text-pink-400">$1</span>')
        .replace(/(".*?"|'.*?')/g, '<span class="text-green-400">$1</span>')
        .replace(/(\d+)/g, '<span class="text-yellow-400">$1</span>');
    }

    return highlighted;
  };

  const lines = currentCode.split('\n');

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-900 rounded-lg border border-gray-700 shadow-2xl w-full max-w-4xl max-h-96 flex flex-col overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                code[tab.key] && (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-3 py-1 rounded text-sm font-semibold transition ${
                      activeTab === tab.key
                        ? `${tab.color} bg-gray-700`
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              ))}
            </div>

            <div className="flex gap-2">
              <motion.button
                onClick={handleCopy}
                className="p-2 hover:bg-gray-700 rounded transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Copiar todo"
              >
                <Copy size={18} className={copied ? 'text-green-400' : 'text-gray-400'} />
              </motion.button>

              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-gray-700 rounded transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Cerrar"
              >
                <X size={18} className="text-gray-400" />
              </motion.button>
            </div>
          </div>

          {/* Código */}
          <div className="flex-1 overflow-auto bg-gray-950">
            <div className="flex">
              {/* Números de línea */}
              <div className="bg-gray-800 text-gray-600 px-4 py-3 text-right text-sm font-mono select-none border-r border-gray-700">
                {lines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Código */}
              <pre className="flex-1 p-4 text-sm font-mono text-gray-100 overflow-x-auto">
                <code
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(currentCode, activeTab),
                  }}
                />
              </pre>
            </div>
          </div>

          {/* Footer */}
          {copied && (
            <motion.div
              className="bg-green-900/50 text-green-300 px-4 py-2 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              ✓ Código copiado al portapapeles
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CodeViewer;
