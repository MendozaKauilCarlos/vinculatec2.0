import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Sun, Moon, Palette, Check, Building2, User, Plus, Clock, LogOut, UploadCloud, FileCheck, CheckCircle2, AlertCircle, FileSignature, MessageSquare, Menu, X } from 'lucide-react';
import { ExpressiveInput, RichTooltip } from '../components/SharedComponents';
import { physics } from '../theme/themeEngine';
import { mockDocuments, navItems } from '../data/mockData';

export const DashboardView = ({ onNavigate, themeState }: any) => {
  const { isDark, toggleDark, toggleColor } = themeState;
  const [activeTab, setActiveTab] = useState('home'); 
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadState, setUploadState] = useState('idle'); 
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<any>(null);

  const scrollRef = useRef(null);
  const { scrollY } = useScroll({ container: scrollRef });
  const headerScale = useTransform(scrollY, [0, 80], [1, 0.8]);
  const headerY = useTransform(scrollY, [0, 80], [0, -5]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSimulateDrop = () => {
    setUploadState('uploading');
    setTimeout(() => setUploadState('success'), 2000);
    setTimeout(() => { 
      setUploadState('idle'); 
      setIsUploadModalOpen(false); 
    }, 4000); 
  };

  const filteredDocs = useMemo(() => {
    if (activeFilter === 'Todos') return mockDocuments;
    return mockDocuments.filter(doc => 
      activeFilter === 'Aprobados' ? doc.status === 'Aprobado' : doc.status !== 'Aprobado'
    );
  }, [activeFilter]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex-1 flex flex-col md:flex-row relative w-full h-screen overflow-hidden bg-[var(--bg)]">
      
      {/* SIDEBAR (DESKTOP) */}
      <motion.nav 
        animate={{ width: isSidebarHovered ? 280 : 88 }} 
        transition={physics.expressive}
        onMouseEnter={() => setIsSidebarHovered(true)} 
        onMouseLeave={() => setIsSidebarHovered(false)}
        className="hidden md:flex flex-col h-screen bg-[var(--surface)] z-50 items-center md:items-start py-8 border-r border-[var(--surface-high)] relative shadow-2xl transition-colors duration-500"
      >
        <div className="flex items-center w-full px-[16px] mb-12 h-14 relative group">
          <motion.div animate={{ rotate: isSidebarHovered ? 0 : 90, borderRadius: isSidebarHovered ? "16px" : "28px" }} className="min-h-[56px] min-w-[56px] bg-[var(--primary)] text-[var(--on-primary)] flex items-center justify-center shadow-lg absolute left-[16px] cursor-pointer transition-colors duration-500">
            {isSidebarHovered ? <div className="font-black text-2xl">V</div> : <Menu size={24} />}
          </motion.div>
          <AnimatePresence>
            {isSidebarHovered && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="ml-[80px]">
                <span className="font-black text-2xl tracking-tight block">VinculaTEC</span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--primary)]">Expressive</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col w-full gap-3 px-[16px] relative">
          {navItems.map((item) => (
            <div key={item.id} className="relative w-full" onMouseEnter={() => setHoveredNav(item.id)} onMouseLeave={() => setHoveredNav(null)}>
              <motion.div onClick={() => setActiveTab(item.id)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative flex items-center h-[56px] rounded-[28px] cursor-pointer group z-10 w-full overflow-hidden transition-colors duration-300" style={{ backgroundColor: activeTab === item.id ? 'var(--primary-container)' : (hoveredNav === item.id ? 'var(--surface-high)' : 'transparent') }}>
                <div className="min-w-[56px] h-full flex items-center justify-center z-10 relative transition-colors duration-500" style={{ color: activeTab === item.id ? 'var(--on-primary-container)' : 'var(--text-muted)' }}><item.icon size={24} /></div>
                <AnimatePresence>
                  {isSidebarHovered && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="z-10 font-bold ml-2 text-lg transition-colors duration-500" style={{ color: activeTab === item.id ? 'var(--on-primary-container)' : 'var(--text-muted)' }}>{item.label}</motion.span>}
                </AnimatePresence>
              </motion.div>
              {!isSidebarHovered && <RichTooltip text={item.label} visible={hoveredNav === item.id} />}
            </div>
          ))}
        </div>

        <div className="mt-auto w-full px-[16px]">
          <div className="h-[56px] w-full rounded-[28px] cursor-pointer flex items-center relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: isSidebarHovered ? 'var(--surface-high)' : 'transparent' }}>
             <div className="min-h-[56px] min-w-[56px] rounded-full flex items-center justify-center absolute left-0 bg-[var(--primary-container)] text-[var(--on-primary-container)] transition-colors duration-500"><span className="font-black text-xl">A</span></div>
             <AnimatePresence>
               {isSidebarHovered && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex justify-between items-center ml-[64px] pr-4">
                   <div><p className="font-black leading-tight">Alexis</p><p className="text-xs font-medium text-[var(--text-muted)]">ITC Cancún</p></div>
                   {/* Botón Logout que regresa a la Landing */}
                   <LogOut onClick={(e) => { e.stopPropagation(); onNavigate('landing'); }} size={18} className="text-[var(--text-muted)] hover:text-[var(--warning)] transition-colors" />
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      {/* NAV MÓVIL (PILL BAR) */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-[60] flex items-center justify-around p-2 rounded-full shadow-2xl border border-[var(--surface-high)] bg-[var(--surface)] transition-colors duration-500">
        {navItems.map((item) => (
          <div key={item.id} className="relative p-3 cursor-pointer" onClick={() => setActiveTab(item.id)}>
            {activeTab === item.id && <motion.div layoutId="navIndicatorMobileDashboard" transition={physics.expressive} className="absolute inset-0 bg-[var(--primary-container)] rounded-full z-0" />}
            <item.icon size={22} className="z-10 relative transition-colors duration-500" style={{ color: activeTab === item.id ? 'var(--on-primary-container)' : 'var(--text-muted)' }} />
          </div>
        ))}
      </nav>

      {/* ÁREA DE CONTENIDO */}
      <main ref={scrollRef} className="flex-1 px-4 md:px-6 pt-6 pb-36 md:pb-24 md:p-12 lg:p-16 w-full relative h-screen overflow-y-auto scroll-smooth">
        
        <header className="sticky top-0 z-30 flex flex-row justify-between items-end mb-6 md:mb-10 gap-4 pt-4 pb-4 bg-[var(--bg)] transition-colors duration-500">
          <div>
            <motion.h1 style={{ scale: headerScale, y: headerY, transformOrigin: 'left bottom' }} className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              {activeTab === 'home' ? 'Inicio.' : activeTab === 'docs' ? 'Expediente.' : 'Perfil.'}
            </motion.h1>
          </div>
          <div className="flex gap-2 md:gap-3">
             <motion.button whileHover={{ scale: 1.1, rotate: 10 }} onClick={toggleColor} className="p-3 md:p-4 rounded-full md:rounded-[24px] bg-[var(--surface-high)] shadow-sm"><Palette size={20} className="text-[var(--primary)] md:w-6 md:h-6" /></motion.button>
             <motion.button whileHover={{ scale: 1.1, rotate: -15 }} onClick={toggleDark} className="p-3 md:p-4 rounded-full md:rounded-[24px] bg-[var(--surface-high)] shadow-sm">{isDark ? <Sun size={20} className="text-[var(--primary)] md:w-6 md:h-6" /> : <Moon size={20} className="text-[var(--primary)] md:w-6 md:h-6" />}</motion.button>
          </div>
        </header>

        {/* SEGMENTED BUTTONS (Solo en Trámites) */}
        <AnimatePresence mode="wait">
          {activeTab === 'docs' && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full md:w-fit overflow-x-auto scrollbar-hide mb-6 md:mb-10 relative">
              <div className="flex p-1.5 rounded-full bg-[var(--surface-high)] w-max">
                {['Todos', 'Aprobados', 'Pendientes'].map(filter => (
                  <button key={filter} onClick={() => setActiveFilter(filter)} className="relative px-5 md:px-8 py-2 md:py-3 rounded-full font-bold text-xs md:text-sm z-10 flex-shrink-0 transition-colors duration-500" style={{ color: activeFilter === filter ? 'var(--on-primary-container)' : 'var(--text-muted)' }}>
                    {activeFilter === filter && <motion.div layoutId="slidingIndicatorDashboard" transition={physics.expressive} className="absolute inset-0 bg-[var(--primary-container)] rounded-full -z-10 shadow-sm" />}
                    <span className="flex items-center gap-2">{activeFilter === filter && <Check size={14} strokeWidth={3} />}{filter}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab + activeFilter} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={physics.expressive} className="w-full">
            
            {/* VISTA HOME */}
            {activeTab === 'home' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
                <motion.div className="p-6 md:p-10 rounded-[28px] md:rounded-[40px] flex flex-col relative overflow-hidden bg-[var(--surface)] shadow-sm border border-[var(--surface-high)]">
                  <div className="absolute inset-0 bg-[var(--tint)] pointer-events-none opacity-50" />
                  <div className="relative z-10 flex justify-between items-start mb-6 md:mb-8">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-1 text-[var(--primary)]">120 / 480</h3>
                      <p className="text-sm md:text-lg font-medium text-[var(--text-muted)]">Horas acreditadas</p>
                    </div>
                    <Clock size={28} className="text-[var(--primary)] md:w-8 md:h-8" />
                  </div>
                  <div className="relative z-10 mt-auto w-full h-2 md:h-3 bg-[var(--surface-high)] rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "25%" }} transition={{ delay: 0.5, duration: 1 }} className="h-full bg-[var(--primary)]" />
                  </div>
                </motion.div>
                <motion.div onClick={() => setActiveTab('docs')} className="p-6 md:p-10 rounded-[28px] md:rounded-[40px] cursor-pointer flex flex-col relative overflow-hidden bg-[var(--surface)] md:hover:scale-[1.02] shadow-sm border border-[var(--surface-high)] transition-all duration-500">
                  <div className="absolute inset-0 bg-[var(--tint)] pointer-events-none opacity-50" />
                  <div className="relative z-10 flex justify-between items-start mb-6 md:mb-8">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-1 text-[var(--primary)]">SAT</h3>
                      <p className="text-sm md:text-lg font-medium text-[var(--text-muted)]">Dependencia activa</p>
                    </div>
                    <Building2 size={28} className="text-[var(--primary)] md:w-8 md:h-8" />
                  </div>
                  <p className="relative z-10 font-bold text-base md:text-xl mt-auto leading-tight">Servicio de Administración Tributaria</p>
                </motion.div>
              </div>
            )}

            {/* VISTA TRÁMITES */}
            {activeTab === 'docs' && filteredDocs.length > 0 && (
              <div className="w-full rounded-[32px] md:rounded-[48px] p-3 md:p-8 bg-[var(--surface)] relative overflow-hidden shadow-sm border border-[var(--surface-high)]">
                <div className="absolute inset-0 bg-[var(--tint)] pointer-events-none opacity-40" />
                <div className="relative z-10 flex flex-col gap-2 md:gap-4">
                   {filteredDocs.map((doc) => (
                     <motion.div key={doc.id} layoutId={`doc-card-${doc.id}`} onClick={() => setSelectedDoc(doc)} className="flex flex-row items-center justify-between gap-3 px-4 py-4 md:px-8 md:py-6 rounded-[24px] cursor-pointer hover:bg-[var(--surface-high)] transition-colors duration-300">
                        <div className="flex items-center gap-3 md:gap-6 overflow-hidden">
                          <div className="min-h-[40px] min-w-[40px] md:min-h-[52px] md:min-w-[52px] rounded-[14px] md:rounded-[18px] bg-[var(--primary-container)] text-[var(--on-primary-container)] flex items-center justify-center shrink-0">
                            <doc.icon size={18} className="md:w-6 md:h-6" />
                          </div>
                          <span className="font-black text-sm md:text-xl truncate">{doc.title}</span>
                        </div>
                        <div className="shrink-0">
                           <div className="px-3 py-1.5 md:px-6 md:py-2.5 rounded-full font-black text-[10px] md:text-xs flex items-center gap-1.5 shadow-sm" style={{ backgroundColor: doc.status === 'Aprobado' ? 'var(--success)' : doc.status === 'En Revisión' ? 'var(--primary)' : 'var(--warning)', color: '#FFFFFF' }}>
                             {doc.status === 'Aprobado' ? <CheckCircle2 size={12} className="md:w-4 md:h-4" /> : doc.status === 'En Revisión' ? <Clock size={12} className="md:w-4 md:h-4" /> : <AlertCircle size={12} className="md:w-4 md:h-4" />}
                             <span className="hidden sm:inline">{doc.status}</span>
                           </div>
                        </div>
                     </motion.div>
                   ))}
                </div>
              </div>
            )}

            {/* VISTA PERFIL */}
            {activeTab === 'profile' && (
               <div className="w-full max-w-4xl mx-auto rounded-[32px] md:rounded-[48px] p-6 md:p-16 bg-[var(--surface)] relative overflow-hidden border border-[var(--surface-high)]">
                 <div className="absolute inset-0 bg-[var(--tint)] pointer-events-none opacity-40" />
                 <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start mb-8 md:mb-12 pb-8 border-b-2 border-[var(--surface-high)]">
                   <div className="w-24 h-24 md:w-40 h-40 rounded-[24px] md:rounded-[40px] bg-[var(--primary-container)] text-[var(--on-primary-container)] flex items-center justify-center text-4xl md:text-7xl font-black shadow-inner">A</div>
                   <div className="text-center md:text-left">
                     <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-3">Alexis</h2>
                     <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full font-black text-xs md:text-sm bg-[var(--primary)] text-[var(--on-primary)] shadow-md"><User size={16} className="md:w-5 md:h-5"/> Ingeniería</div>
                     <p className="text-[var(--text-muted)] font-bold mt-4 text-sm md:text-xl">Instituto Tecnológico de Cancún</p>
                     {/* Botón Logout móvil */}
                     <button onClick={() => onNavigate('landing')} className="md:hidden mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[var(--surface-high)] text-[var(--warning)] font-bold">
                       <LogOut size={16} /> Cerrar Sesión
                     </button>
                   </div>
                 </div>
                 <div className="relative z-10 flex flex-col md:grid md:grid-cols-2 gap-x-8 gap-y-2">
                   <ExpressiveInput label="Correo Institucional" initialValue="alexis@cancun.tecnm.mx" readOnly />
                   <ExpressiveInput label="Matrícula" initialValue="19530000" readOnly />
                   <div className="md:col-span-2"><ExpressiveInput label="Dependencia Asignada" initialValue="SAT (Hacienda)" readOnly /></div>
                 </div>
               </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* MODAL DETALLE DE TRÁMITE */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-xl">
            <motion.div layoutId={`doc-card-${selectedDoc.id}`} transition={physics.expressive} className="w-full max-w-2xl p-6 md:p-12 flex flex-col relative overflow-hidden bg-[var(--bg)] rounded-[36px] md:rounded-[56px] shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
              <button onClick={() => setSelectedDoc(null)} className="absolute top-4 right-4 md:top-10 md:right-10 p-2 md:p-3 rounded-full bg-[var(--surface-high)] md:bg-transparent hover:bg-[var(--surface-high)] transition-colors z-10"><X size={24} className="text-[var(--text)] md:w-7 md:h-7" /></button>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-8 md:mb-12 pr-10">
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-[20px] md:rounded-[28px] flex items-center justify-center bg-[var(--primary-container)] text-[var(--on-primary-container)] shrink-0">
                  <selectedDoc.icon size={28} className="md:w-9 md:h-9" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-5xl font-black tracking-tighter leading-tight">{selectedDoc.title}</h2>
                  <p className="text-sm md:text-xl font-bold text-[var(--primary)] mt-1">Ruta de Validación</p>
                </div>
              </div>
              <div className="flex flex-col gap-6 md:gap-8 relative ml-2 md:ml-0">
                <div className="absolute left-[22px] md:left-7 top-6 bottom-6 w-[2px] md:w-1 rounded-full bg-[var(--surface-high)] opacity-50" />
                {['Documento Subido', 'Revisión Asesor', 'Sello Institucional', 'Aprobado y Liberado'].map((step, idx) => {
                  const isDone = (idx + 1) <= selectedDoc.step;
                  const isCurrent = (idx + 1) === selectedDoc.step;
                  return (
                    <motion.div key={step} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + idx * 0.1 }} className="flex items-center gap-4 md:gap-8 relative z-10">
                      <motion.div animate={{ scale: isCurrent ? 1.25 : 1, backgroundColor: isDone ? 'var(--primary)' : 'var(--surface-high)', color: isDone ? 'var(--on-primary)' : 'var(--text-muted)' }} className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full flex items-center justify-center font-black shadow-lg border-[3px] md:border-4 border-[var(--bg)] text-sm md:text-base">
                        {isDone && !isCurrent ? <Check size={20} strokeWidth={3} className="md:w-6 md:h-6" /> : (idx + 1)}
                      </motion.div>
                      <div className={`flex-1 p-4 md:p-6 rounded-[20px] md:rounded-[28px] transition-all duration-500 ${isCurrent ? 'bg-[var(--surface)] shadow-md ring-1 ring-[var(--primary)]/20' : ''}`}>
                        <p className="font-black text-lg md:text-2xl leading-tight" style={{ opacity: isDone ? 1 : 0.4, color: 'var(--text)' }}>{step}</p>
                        {isCurrent && <p className="text-[10px] md:text-sm font-bold mt-1 md:mt-2 text-[var(--primary)] uppercase tracking-widest">En proceso</p>}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UPLOAD MODAL */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 bg-black/60 backdrop-blur-md">
            <motion.div initial={isMobile ? { y: "100%" } : { scale: 0.9, opacity: 0 }} animate={isMobile ? { y: 0 } : { scale: 1, opacity: 1 }} exit={isMobile ? { y: "100%" } : { scale: 0.9, opacity: 0 }} transition={physics.expressive} className="w-full max-w-lg bg-[var(--bg)] p-8 md:p-12 rounded-t-[40px] md:rounded-[56px] shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-6 md:mb-10">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Subir</h2>
                <button onClick={() => { setIsUploadModalOpen(false); setUploadState('idle'); }} className="p-2 md:p-3 rounded-full bg-[var(--surface-high)]"><X size={24} className="text-[var(--text)] md:w-7 md:h-7" /></button>
              </div>
              <motion.div onClick={() => uploadState === 'idle' && handleSimulateDrop()} animate={{ borderRadius: uploadState === 'dragging' ? '40px' : '24px', backgroundColor: uploadState === 'uploading' ? 'var(--surface-high)' : 'var(--surface)' }} className="w-full h-48 md:h-64 border-2 border-dashed border-[var(--primary)]/30 flex flex-col items-center justify-center cursor-pointer relative transition-all duration-500">
                <AnimatePresence mode="wait">
                  {uploadState === 'idle' && <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center"><UploadCloud size={48} className="text-[var(--primary)] mb-3 md:mb-4 md:w-14 md:h-14" /><p className="font-black text-lg md:text-xl">Toca para simular</p></motion.div>}
                  {uploadState === 'uploading' && <motion.div key="upload" className="flex flex-col items-center"><div className="w-12 h-12 md:w-16 md:h-16 border-4 rounded-full animate-spin border-[var(--primary)] border-t-transparent" /><p className="font-bold mt-4 md:mt-6 text-lg md:text-xl">Validando...</p></motion.div>}
                  {uploadState === 'success' && <motion.div key="success" initial={{ scale: 0.5 }} animate={{ scale: 1.25 }} className="flex flex-col items-center"><FileCheck size={64} className="text-[var(--primary)] md:w-20 md:h-20" /><p className="font-black text-2xl md:text-3xl mt-3 md:mt-4">¡Listo!</p></motion.div>}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB ACCIONES */}
      <div className="fixed bottom-[96px] md:bottom-12 right-4 md:right-8 z-[80]">
        <motion.div animate={{ width: isMenuOpen ? (isMobile ? 240 : 300) : (isMobile ? 56 : 80), height: isMenuOpen ? 'auto' : (isMobile ? 56 : 80), borderRadius: isMenuOpen ? 28 : 24, backgroundColor: isMenuOpen ? 'var(--surface-high)' : 'var(--primary-container)' }} transition={physics.organic} className="shadow-2xl overflow-hidden origin-bottom-right flex flex-col border border-[var(--primary)]/10">
          {isMenuOpen ? (
            <div className="p-4 md:p-5 flex flex-col gap-2 md:gap-3">
              <div className="flex justify-between items-center mb-1 md:mb-2 px-2">
                <span className="font-black text-[10px] md:text-sm uppercase tracking-[0.2em] text-[var(--primary)]">Acciones</span>
                <X size={18} className="cursor-pointer text-[var(--text)] md:w-5 md:h-5" onClick={() => setIsMenuOpen(false)} />
              </div>
              <button onClick={() => { setIsMenuOpen(false); setIsUploadModalOpen(true); }} className="flex items-center gap-3 md:gap-5 p-3 md:p-4 rounded-[20px] md:rounded-[24px] bg-[var(--surface)] hover:bg-[var(--surface-high)] shadow-sm transition-all duration-300">
                <div className="p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-[var(--primary)] text-[var(--on-primary)]"><FileSignature size={18} className="md:w-5 md:h-5" /></div>
                <span className="font-black text-sm md:text-lg text-[var(--text)]">Subir Reporte</span>
              </button>
              <button onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 md:gap-5 p-3 md:p-4 rounded-[20px] md:rounded-[24px] bg-[var(--surface)] hover:bg-[var(--surface-high)] shadow-sm transition-all duration-300">
                <div className="p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-[var(--surface-high)] text-[var(--text)]"><MessageSquare size={18} className="md:w-5 md:h-5" /></div>
                <span className="font-black text-sm md:text-lg text-[var(--text)]">Contactar Asesor</span>
              </button>
            </div>
          ) : (
            <div onClick={() => setIsMenuOpen(true)} className="w-full h-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <Plus size={28} className="text-[var(--on-primary-container)] md:w-9 md:h-9" />
            </div>
          )}
        </motion.div>
      </div>

    </motion.div>
  );
};
