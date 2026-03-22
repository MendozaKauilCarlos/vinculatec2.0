import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sun, Moon, Palette, ArrowRight, ShieldCheck, FileText, X } from 'lucide-react';
import { physics } from '../theme/themeEngine';

export const LandingView = ({ onNavigate, themeState }: any) => {
  const { isDark, toggleDark, toggleColor } = themeState;
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, physics.interactive);
  const springY = useSpring(mouseY, physics.interactive);
  const blob1X = useTransform(springX, (val) => val * 1.5);
  const blob1Y = useTransform(springY, (val) => val * 1.5);
  const blob2X = useTransform(springX, (val) => val * -1);
  const blob2Y = useTransform(springY, (val) => val * -1);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleInteraction = (e: any) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      mouseX.set((clientX - window.innerWidth / 2) / 10);
      mouseY.set((clientY - window.innerHeight / 2) / 10);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('touchmove', handleInteraction);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchmove', handleInteraction);
    };
  }, [mouseX, mouseY]);

  const handleAccessClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onNavigate('auth');
    }, 2500); 
  };

  return (
    <div className="flex-1 flex flex-col relative min-h-screen">
      {/* FONDO SHAPE MORPHING */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div style={{ x: blob1X, y: blob1Y, backgroundColor: 'var(--blob1)' }} animate={{ scale: [1, 1.1, 0.95, 1], rotate: [0, 45, -20, 0], borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute -top-[10%] -left-[5%] w-[80vw] h-[80vw] md:w-[45vw] md:h-[45vw] blur-[80px] md:blur-[120px] opacity-50" />
        <motion.div style={{ x: blob2X, y: blob2Y, backgroundColor: 'var(--blob2)' }} animate={{ scale: [1, 0.85, 1.15, 1], rotate: [0, -60, 30, 0], borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 70% 70% 30% / 30% 30% 70% 70%", "60% 40% 30% 70% / 60% 30% 70% 40%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute bottom-[5%] right-[5%] w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] blur-[80px] md:blur-[120px] opacity-40" />
      </div>

      <motion.header animate={{ opacity: isTransitioning ? 0 : 1 }} className="relative z-20 w-full p-6 md:p-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-[14px] bg-[var(--primary)] text-[var(--on-primary)] flex items-center justify-center font-black text-xl md:text-2xl shadow-lg">V</div>
          <span className="font-bold text-sm md:text-lg tracking-widest uppercase">TecNM</span>
        </div>
        <div className="flex gap-2 md:gap-4">
           <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={toggleColor} className="p-3 md:p-4 rounded-full bg-[var(--surface-high)] shadow-sm"><Palette size={20} className="text-[var(--primary)]" /></motion.button>
           <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={toggleDark} className="p-3 md:p-4 rounded-full bg-[var(--surface-high)] shadow-sm">{isDark ? <Sun size={20} className="text-[var(--primary)]" /> : <Moon size={20} className="text-[var(--primary)]" />}</motion.button>
        </div>
      </motion.header>

      <motion.main animate={{ opacity: isTransitioning ? 0 : 1, scale: isTransitioning ? 0.95 : 1 }} className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-24 lg:px-32 max-w-7xl mx-auto w-full">
        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={physics.expressive} className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs md:text-sm bg-[var(--primary-container)] text-[var(--on-primary-container)] mb-4 md:mb-6 shadow-sm border border-[var(--primary)]/10">
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" /> Portal Oficial de Estudiantes
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ...physics.expressive }} className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter leading-[0.9] md:leading-[0.95] mb-4 md:mb-6">
            Bienvenido a <br/>Vincula<span className="text-[var(--primary)]">TEC.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ...physics.expressive }} className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-[var(--text-muted)] mb-8 md:mb-10 max-w-2xl leading-relaxed">
            Simplifica y gestiona tu expediente académico. Todo tu progreso profesional, centralizado y eficiente.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, ...physics.expressive }} className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            <motion.button onClick={handleAccessClick} whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto flex items-center justify-center gap-4 px-8 py-4 md:px-10 md:py-5 rounded-full bg-[var(--primary)] text-[var(--on-primary)] font-black text-lg md:text-xl shadow-xl group overflow-hidden relative">
              Acceder
              <motion.div className="bg-[var(--on-primary)]/20 p-2 rounded-full group-hover:translate-x-2 transition-transform"><ArrowRight size={20} /></motion.div>
            </motion.button>
          </motion.div>
        </div>
      </motion.main>

      <motion.footer animate={{ opacity: isTransitioning ? 0 : 1 }} className="relative z-10 w-full p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[var(--surface-high)] mt-auto backdrop-blur-sm bg-[var(--bg)]/50">
        <p className="text-xs md:text-sm font-bold text-[var(--text-muted)]">© 2026 Instituto Tecnológico de Cancún.</p>
        <button onClick={() => setIsPrivacyOpen(true)} className="flex items-center gap-2 text-xs md:text-sm font-bold text-[var(--primary)] hover:bg-[var(--surface-high)] px-4 py-2 rounded-full transition-colors"><ShieldCheck size={16} /> Aviso de Privacidad</button>
      </motion.footer>

      {/* MODAL DE PRIVACIDAD COMPLETO */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-md p-0 md:p-6" onClick={() => setIsPrivacyOpen(false)}>
            <motion.div 
              onClick={(e) => e.stopPropagation()} 
              initial={isMobile ? { y: "100%" } : { scale: 0.95, opacity: 0, y: 20 }}
              animate={isMobile ? { y: 0 } : { scale: 1, opacity: 1, y: 0 }}
              exit={isMobile ? { y: "100%" } : { scale: 0.95, opacity: 0, y: 20 }}
              transition={physics.sheet}
              className="w-full max-w-3xl bg-[var(--surface)] text-[var(--text)] rounded-t-[32px] md:rounded-[40px] flex flex-col max-h-[85vh] md:max-h-[80vh] shadow-2xl border border-white/5 transition-colors duration-500 overflow-hidden"
            >
              {isMobile && <div className="w-12 h-1.5 bg-[var(--text-muted)] opacity-30 rounded-full mx-auto mt-4 mb-2" />}

              <div className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-10 pb-4 border-b border-[var(--surface-high)]">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-[16px] bg-[var(--primary-container)] text-[var(--on-primary-container)] transition-colors duration-500">
                    <FileText size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight transition-colors duration-500">Aviso de Privacidad</h2>
                </div>
                <button onClick={() => setIsPrivacyOpen(false)} className="p-2 md:p-3 rounded-full hover:bg-[var(--surface-high)] transition-colors duration-300">
                  <X size={24} className="text-[var(--text)]" />
                </button>
              </div>

              <div className="p-6 md:p-10 overflow-y-auto scrollbar-hide text-sm md:text-base text-[var(--text-muted)] font-medium space-y-6 leading-relaxed">
                <p>En cumplimiento con las normativas vigentes del <strong className="text-[var(--text)]">Tecnológico Nacional de México, campus Cancún</strong>, VinculaTEC garantiza la estricta protección de tus datos personales.</p>
                <div className="p-6 rounded-[24px] bg-[var(--surface-high)] text-[var(--text)] transition-colors duration-500 shadow-inner">
                  <h3 className="font-bold text-lg mb-2 text-[var(--primary)] transition-colors duration-500">1. Uso de la Información</h3>
                  <p className="text-sm opacity-90">La información recopilada (matrícula, nombre, correo institucional, documentos y reportes) será utilizada única y exclusivamente para el seguimiento académico y administrativo de tus procesos de Servicio Social y Residencias Profesionales.</p>
                </div>
                <div className="p-6 rounded-[24px] bg-[var(--surface-high)] text-[var(--text)] transition-colors duration-500 shadow-inner">
                  <h3 className="font-bold text-lg mb-2 text-[var(--primary)] transition-colors duration-500">2. Resguardo Institucional</h3>
                  <p className="text-sm opacity-90">Ningún dato será compartido con terceros ajenos a la institución o a las dependencias asignadas sin el consentimiento expreso del estudiante.</p>
                </div>
                <p>Al acceder a la plataforma, confirmas que aceptas el manejo de tu expediente digital bajo los estándares de seguridad vigentes.</p>
              </div>

              <div className="p-6 md:p-10 pt-4 border-t border-[var(--surface-high)]">
                <button onClick={() => setIsPrivacyOpen(false)} className="w-full py-4 md:py-5 rounded-full bg-[var(--primary)] text-[var(--on-primary)] font-black text-lg shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all">
                  He leído y acepto
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TRANSICIÓN WARP SPEED (SALIDA) */}
      <AnimatePresence>
        {isTransitioning && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden">
            <motion.div 
              initial={{ scale: 0, borderRadius: "50%" }}
              animate={{ scale: [0, 1.5, 45], borderRadius: ["50%", "30% 70% 70% 30%", "0%"], rotate: [0, 90, 180] }}
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
              className="absolute bg-[var(--primary)] w-32 h-32 md:w-48 md:h-48 origin-center"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} 
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ delay: 0.6, duration: 0.8 }} 
              className="text-[var(--on-primary)] flex flex-col items-center relative z-[210] px-6 text-center"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-[4px] rounded-full border-[var(--on-primary)]/30 border-t-[var(--on-primary)] mb-8 shadow-2xl" />
              <h3 className="font-black text-3xl md:text-5xl tracking-tighter max-w-3xl leading-[1.1]">Conectándote a un <br/>mundo de oportunidades</h3>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
