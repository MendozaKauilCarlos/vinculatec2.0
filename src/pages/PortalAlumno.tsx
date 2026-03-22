import React, { useState } from 'react';
import { Building2, FileText, LogOut, User, Menu, X, GraduationCap, LayoutDashboard, Lock } from 'lucide-react';
import CatalogoDependencias from './CatalogoDependencias';
import MisDocumentos from './MisDocumentos';

export default function PortalAlumno({ onLogout }: { onLogout: () => void }) {
  const [hasSelectedDependencia, setHasSelectedDependencia] = useState(false);
  const [activeTab, setActiveTab] = useState<'plazas' | 'documentos' | 'perfil'>('plazas');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'plazas', label: 'Catálogo de Plazas', icon: <Building2 size={20} /> },
    { id: 'documentos', label: 'Mis Documentos', icon: <FileText size={20} /> },
    { id: 'perfil', label: 'Mi Perfil', icon: <User size={20} /> },
  ];

  const handleTabClick = (id: string) => {
    if (!hasSelectedDependencia && id !== 'plazas') {
      alert('Primero debes seleccionar una dependencia (Solicitar Vacante) para habilitar esta sección.');
      return;
    }
    setActiveTab(id as any);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 h-screen sticky top-0 z-40">
        <div className="p-8 flex items-center gap-3 border-b border-slate-100">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1B365D] to-[#2a528a] rounded-xl flex items-center justify-center shadow-sm">
            <GraduationCap className="text-white" size={24} strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#1B365D] tracking-tight leading-none">VinculaTEC</h1>
            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1">Portal Alumno</p>
          </div>
        </div>

        <div className="p-6 flex-1">
          <div className="mb-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">Menú Principal</p>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isLocked = !hasSelectedDependencia && item.id !== 'plazas';
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                      activeTab === item.id
                        ? 'bg-[#1B365D]/5 text-[#1B365D] border border-[#1B365D]/10 shadow-sm'
                        : isLocked
                          ? 'text-slate-300 cursor-not-allowed border border-transparent'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={activeTab === item.id ? 'text-[#1B365D]' : isLocked ? 'text-slate-300' : 'text-slate-400'}>
                        {item.icon}
                      </span>
                      {item.label}
                    </div>
                    {isLocked && <Lock size={14} className="text-slate-300" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold">
              CM
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Carlos Mendoza</p>
              <p className="text-xs text-slate-500 font-medium">19530001</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-xl font-bold text-sm transition-colors"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Mobile Header & Menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#1B365D] to-[#2a528a] rounded-lg flex items-center justify-center">
            <GraduationCap className="text-white" size={18} strokeWidth={2} />
          </div>
          <h1 className="text-lg font-extrabold text-[#1B365D] tracking-tight">VinculaTEC</h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="absolute top-16 left-0 right-0 bottom-0 bg-white animate-in slide-in-from-top-4 flex flex-col">
            <nav className="p-4 space-y-2 flex-1">
              {navItems.map((item) => {
                const isLocked = !hasSelectedDependencia && item.id !== 'plazas';
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleTabClick(item.id);
                      if (!isLocked) setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-4 rounded-xl font-bold text-base transition-all ${
                      activeTab === item.id
                        ? 'bg-[#1B365D]/5 text-[#1B365D] border border-[#1B365D]/10'
                        : isLocked
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={activeTab === item.id ? 'text-[#1B365D]' : isLocked ? 'text-slate-300' : 'text-slate-400'}>
                        {item.icon}
                      </span>
                      {item.label}
                    </div>
                    {isLocked && <Lock size={16} className="text-slate-300" />}
                  </button>
                );
              })}
            </nav>
            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-3 px-4 py-4 text-rose-600 bg-white border border-rose-100 hover:bg-rose-50 rounded-xl font-bold text-base transition-colors shadow-sm"
              >
                <LogOut size={20} />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden pt-16 lg:pt-0">
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10">
          {activeTab === 'documentos' && <MisDocumentos />}
          {activeTab === 'plazas' && (
            <CatalogoDependencias 
              onDependenciaSelected={() => {
                setHasSelectedDependencia(true);
                setActiveTab('documentos');
              }} 
            />
          )}
          {activeTab === 'perfil' && (
            <div className="max-w-3xl mx-auto text-center py-20">
              <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto flex items-center justify-center text-slate-400 mb-6 border-4 border-white shadow-lg">
                <User size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Carlos Eduardo Mendoza Kauil</h2>
              <p className="text-slate-500 mb-8">Ingeniería en Sistemas Computacionales</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg font-bold text-sm border border-amber-200">
                <AlertCircle size={16} />
                Perfil en construcción
              </div>
            </div>
          )}
        </div>
      </main>

    </div>
  );
}
