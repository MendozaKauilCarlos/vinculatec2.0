import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Palette, ArrowRight, Lock, Mail, ChevronLeft, Check, Search, Building2, MapPin, UserCircle, Users, X } from 'lucide-react';
import { ExpressiveInput } from '../components/SharedComponents';
import { physics } from '../theme/themeEngine';
import { mockInstitutions } from '../data/mockData';

export const AuthCatalogView = ({ onNavigate, themeState }: any) => {
  const { isDark, toggleDark, toggleColor } = themeState;
  const [transitionPhase, setTransitionPhase] = useState('idle'); 
  const [checkStep, setCheckStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false); 
  const [selectedInst, setSelectedInst] = useState<any>(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSectorFilter, setActiveSectorFilter] = useState('Todos');

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (e: any) => {
    e.preventDefault();
    setTransitionPhase('loading');
    setTimeout(() => setCheckStep(1), 1000); 
    setTimeout(() => setCheckStep(2), 2200); 
    setTimeout(() => setCheckStep(3), 3200); 
    setTimeout(() => setTransitionPhase('expanding'), 4000);
  };

  const handleSelectInstitution = () => {
    onNavigate('dashboard');
  };

  const sectors = useMemo(() => ['Todos', ...new Set(mockInstitutions.map(inst => inst.sector))], []);
  const filteredInstitutions = useMemo(() => {
    return mockInstitutions.filter(inst => {
      const matchesSector = activeSectorFilter === 'Todos' || inst.sector === activeSectorFilter;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = inst.name.toLowerCase().includes(searchLower) || inst.acronym.toLowerCase().includes(searchLower) || inst.description.toLowerCase().includes(searchLower);
      return matchesSector && matchesSearch;
    });
  }, [searchQuery, activeSectorFilter]);

  const isExpanding = transitionPhase === 'expanding';

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative w-full min-h-screen">
      
      {/* BOTONES GLOBALES DE TEMA FIJADOS ARRIBA */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 flex gap-2 z-[60]">
        <button onClick={toggleColor} className="p-3 rounded-full bg-[var(--surface-high)] shadow-sm hover:scale-105 transition-all border border-[var(--primary)]/10"><Palette size={18} className="text-[var(--primary)]" /></button>
        <button onClick={toggleDark} className="p-3 rounded-full bg-[var(--surface-high)] shadow-sm hover:scale-105 transition-all border border-[var(--primary)]/10">{isDark ? <Sun size={18} className="text-[var(--primary)]" /> : <Moon size={18} className="text-[var(--primary)]" />}</button>
      </div>

      {/* PUENTE VISUAL DE ENTRADA (La burbuja de la Landing que se encoge) */}
      <motion.div initial={{ scale: 45, opacity: 1 }} animate={{ scale: 0, opacity: 1 }} transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }} className="fixed inset-0 m-auto w-32 h-32 md:w-48 md:h-48 bg-[var(--primary)] rounded-full z-[200] pointer-events-none" />

      <motion.header animate={{ opacity: isExpanding ? 0 : 1 }} className="absolute top-0 left-0 w-full p-4 md:p-8 flex items-center z-50 pointer-events-none">
        <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 font-black text-sm md:text-base text-[var(--text-muted)] hover:text-[var(--primary)] pointer-events-auto">
          <ChevronLeft size={20} /> Volver
        </button>
      </motion.header>

      {/* CONTENEDOR LOGIN */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, borderRadius: "64px" }}
        animate={{ scale: transitionPhase !== 'idle' ? 0.95 : 1, opacity: transitionPhase !== 'idle' ? 0 : 1, borderRadius: isMobile ? "32px" : "48px" }}
        transition={physics.morph}
        className="relative z-10 w-[92%] sm:w-[85%] max-w-[400px] p-6 md:p-10 bg-[var(--surface)] shadow-2xl border border-[var(--surface-high)] overflow-hidden mt-8 md:mt-0"
      >
        <div className="absolute inset-0 bg-[var(--tint)] pointer-events-none" />
        <div className="relative z-10">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-col items-center mb-6 md:mb-10">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-[14px] md:rounded-[20px] bg-[var(--primary)] text-[var(--on-primary)] flex items-center justify-center font-black text-xl md:text-3xl mb-4 md:mb-6">V</div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-center leading-[1.1]">Bienvenido <br/><span className="text-[var(--primary)]">de nuevo.</span></h1>
          </motion.div>
          <form onSubmit={handleLogin} className="space-y-4">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }}><ExpressiveInput label="Correo Institucional" icon={Mail} /></motion.div>
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }}><ExpressiveInput label="Contraseña" type="password" icon={Lock} /></motion.div>
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }} className="flex justify-end pt-1"><button type="button" className="text-xs sm:text-sm font-bold text-[var(--primary)] hover:underline transition-colors">¿Olvidaste tu contraseña?</button></motion.div>
            <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full mt-4 md:mt-8 py-3.5 md:py-5 rounded-full bg-[var(--primary)] text-[var(--on-primary)] font-black text-lg md:text-xl shadow-xl shadow-[var(--primary)]/20 flex items-center justify-center gap-3 group overflow-hidden">
              Entrar<ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* MODAL DE CARGA -> TRANSICIÓN A CATÁLOGO */}
      <AnimatePresence>
        {transitionPhase !== 'idle' && (
          <motion.div 
            animate={{ backgroundColor: isExpanding ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.6)', padding: isExpanding ? "0px" : (isMobile ? "0px" : "24px") }}
            transition={physics.expand}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
          >
            <motion.div 
              initial={isMobile ? { y: "100%" } : { scale: 0.9, opacity: 0 }}
              animate={{ 
                y: 0, scale: 1, opacity: 1,
                width: isExpanding ? "100vw" : "100%", maxWidth: isExpanding ? "100vw" : "28rem",
                height: isExpanding ? "100vh" : "auto",
                borderRadius: isExpanding ? "0px" : (isMobile ? "40px 40px 0px 0px" : "48px"),
                backgroundColor: isExpanding ? "var(--bg)" : "var(--surface)"
              }}
              transition={physics.expand}
              className="relative shadow-2xl overflow-hidden flex flex-col transition-colors duration-500"
            >
              {/* CHECKLIST DE CARGA */}
              <AnimatePresence>
                {!isExpanding && (
                  <motion.div exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }} transition={{ duration: 0.3 }} className="p-8 md:p-12 w-full relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-8 text-[var(--text)]">Iniciando sesión<span className="text-[var(--primary)] animate-pulse">...</span></h2>
                    <div className="space-y-5">
                      {["Verificando identidad", "Desencriptando expediente", "Conectando al catálogo"].map((step, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: checkStep < idx ? 0.4 : 1, x: 0 }} className="flex items-center gap-4">
                          <motion.div animate={{ backgroundColor: checkStep > idx ? 'var(--success)' : checkStep === idx ? 'var(--primary)' : 'var(--surface-high)', scale: checkStep === idx ? 1.1 : 1 }} className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center">
                            {checkStep > idx ? <Check size={16} className="text-white" strokeWidth={3} /> : checkStep === idx ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <div className="w-2 h-2 rounded-full bg-[var(--text-muted)] opacity-30" />}
                          </motion.div>
                          <span className="text-sm md:text-lg font-bold">{step}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* VISTA DEL CATÁLOGO REAL */}
              {isExpanding && (
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="absolute inset-0 p-4 md:p-10 lg:p-16 flex flex-col overflow-y-auto scrollbar-hide pt-20 md:pt-8">
                  <header className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-6 gap-4 w-full">
                    <div>
                      <motion.h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-1">Catálogo.</motion.h1>
                      <motion.p className="text-[var(--text-muted)] font-bold text-sm md:text-base flex items-center gap-2"><Building2 size={16} className="text-[var(--primary)]" /> {filteredInstitutions.length} Dependencias disponibles</motion.p>
                    </div>
                    <div className="flex-1 lg:flex-none flex items-center gap-3 bg-[var(--surface-high)] px-4 py-3 rounded-full">
                       <Search size={18} className="text-[var(--text-muted)] shrink-0" />
                       <input type="text" placeholder="Buscar dependencia..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-sm font-bold text-[var(--text)] w-full lg:w-64" />
                       {searchQuery && <button onClick={() => setSearchQuery('')} className="text-[var(--text-muted)] hover:text-[var(--text)]"><X size={16} /></button>}
                    </div>
                  </header>

                  {/* PÍLDORAS */}
                  <motion.div className="flex flex-wrap gap-2 md:gap-3 mb-6 w-full">
                    {sectors.map(sector => (
                      <button key={sector} onClick={() => setActiveSectorFilter(sector)} className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${activeSectorFilter === sector ? 'bg-[var(--primary)] text-[var(--on-primary)] scale-[1.02]' : 'bg-[var(--surface-high)] text-[var(--text-muted)] hover:scale-[1.02]'}`}>
                        {activeSectorFilter === sector && <Check size={14} strokeWidth={4} />} {sector}
                      </button>
                    ))}
                  </motion.div>

                  {/* GRID */}
                  <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 pb-20 min-h-[50vh]">
                    <AnimatePresence>
                      {filteredInstitutions.map((inst, i) => (
                        <motion.div 
                          key={inst.id} layoutId={`inst-card-${inst.id}`} onClick={() => setSelectedInst(inst)}
                          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ opacity: { delay: i * 0.05 }, scale: { delay: i * 0.05, ...physics.expressive }, layout: physics.layout }}
                          className="cursor-pointer rounded-[24px] bg-[var(--surface)] border border-[var(--surface-high)] p-6 flex flex-col min-h-[220px] hover:shadow-xl transition-shadow relative overflow-hidden group"
                        >
                           <div className="absolute inset-0 bg-[var(--tint)] opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none" />
                           <div className="relative z-10 flex flex-col h-full pointer-events-none">
                             <div className="flex justify-between items-start mb-4">
                               <div className="w-12 h-12 rounded-full bg-[var(--primary-container)] text-[var(--on-primary-container)] flex items-center justify-center font-black text-lg">{inst.acronym.substring(0,2)}</div>
                               <div className="px-3 py-1 rounded-full bg-[var(--surface-high)] text-[10px] font-bold uppercase">{inst.sector}</div>
                             </div>
                             <h3 className="text-xl font-black leading-tight mb-2 line-clamp-2">{inst.name}</h3>
                             <p className="text-[var(--text-muted)] text-sm font-medium mb-4 line-clamp-2">{inst.description}</p>
                             <div className="flex items-center gap-2 pt-4 border-t border-[var(--surface-high)] mt-auto">
                               <Users size={16} className="text-[var(--primary)]" />
                               <span className="text-sm font-bold text-[var(--primary)]">{inst.availableSpots} vacantes disponibles</span>
                             </div>
                           </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETALLE EXPANDIDO */}
      <AnimatePresence>
        {selectedInst && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6" onClick={() => setSelectedInst(null)}>
            <motion.div layoutId={`inst-card-${selectedInst.id}`} onClick={(e) => e.stopPropagation()} transition={physics.layout} className="w-full max-w-3xl bg-[var(--surface)] rounded-t-[32px] md:rounded-[48px] flex flex-col h-[90vh] md:h-auto md:max-h-[85vh] overflow-hidden">
              <div className="w-full h-32 md:h-40 bg-[var(--primary-container)] relative flex items-end p-6 shrink-0">
                {isMobile && <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-black/20 rounded-full" />}
                <button onClick={() => setSelectedInst(null)} className="absolute top-4 right-4 p-2 rounded-full bg-black/10 text-[var(--on-primary-container)] z-50"><X size={20} /></button>
                <div className="absolute -bottom-8 left-6 w-20 h-20 rounded-[20px] bg-[var(--surface)] shadow-xl flex items-center justify-center font-black text-3xl text-[var(--primary)] border-[4px] border-[var(--surface)]">{selectedInst.acronym.substring(0,2)}</div>
              </div>
              <div className="p-6 pt-12 overflow-y-auto flex-1">
                <h2 className="text-3xl font-black mb-3">{selectedInst.name}</h2>
                <div className="flex items-center gap-2 bg-[var(--primary)]/10 text-[var(--primary)] px-4 py-2 rounded-2xl w-fit mb-6">
                  <Users size={18} /> <span className="font-black text-lg">{selectedInst.availableSpots} <span className="text-sm font-medium">lugares</span></span>
                </div>
                <p className="text-[var(--text-muted)] font-medium leading-relaxed mb-6">{selectedInst.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-[24px] bg-[var(--surface-high)] flex items-start gap-4">
                    <MapPin size={24} className="text-[var(--primary)] shrink-0" />
                    <div><p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-1">Ubicación</p><p className="font-bold text-sm">{selectedInst.location}</p></div>
                  </div>
                  <div className="p-5 rounded-[24px] bg-[var(--surface-high)] flex items-start gap-4">
                    <UserCircle size={24} className="text-[var(--primary)] shrink-0" />
                    <div><p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-1">Contacto</p><p className="font-bold text-sm">{selectedInst.manager}</p></div>
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-8 bg-[var(--surface)] shrink-0 border-t border-[var(--surface-high)]">
                {/* ESTE BOTÓN AHORA NOS LLEVA AL DASHBOARD */}
                <button onClick={handleSelectInstitution} className="w-full py-4 rounded-[20px] bg-[var(--primary)] text-[var(--on-primary)] font-black text-lg flex justify-center items-center gap-3 hover:scale-[1.02] transition-transform">
                  Solicitar Vacante e Ir al Panel <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
