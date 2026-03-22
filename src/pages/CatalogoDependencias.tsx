import React, { useState } from 'react';
import { Search, Plus, MapPin, CheckCircle2, ChevronDown, GraduationCap, Building2, ShieldAlert, Heart, Scale, Users, Phone, Mail, Clock, User, Info, X, Briefcase } from 'lucide-react';

type StatusColor = 'green' | 'yellow' | 'red';

interface Dependencia {
  id: number;
  status: string;
  statusColor: StatusColor;
  image: string | React.ReactNode;
  vacantes: number;
  vacantesLabel: string;
  progress: number;
  title: string;
  category: string;
  location: string;
  // Información detallada
  titular: string;
  objetivo: string;
  telefono: string;
  correo: string;
  direccionCompleta: string;
  horario: string;
  actividades: string[];
}

// Datos simulados enriquecidos
const dependencias: Dependencia[] = [
  {
    id: 1,
    status: 'ALTA DISPONIBILIDAD',
    statusColor: 'green',
    image: 'https://images.unsplash.com/photo-1541888088374-c374929428f0?w=150&h=150&fit=crop',
    vacantes: 12,
    vacantesLabel: 'VACANTES',
    progress: 80,
    title: 'Secretaría de Educación',
    category: 'Educación y Cultura',
    location: 'Centro Histórico',
    titular: 'Lic. María Fernanda López',
    objetivo: 'Apoyar en la gestión de programas educativos y alfabetización en zonas vulnerables del municipio, promoviendo el desarrollo integral de los estudiantes.',
    telefono: '(998) 123-4567 ext. 102',
    correo: 'vinculacion@seducacion.gob.mx',
    direccionCompleta: 'Av. Tulum Sur, Mz 5, Lote 2, Centro Histórico, 77500 Cancún, Q.R.',
    horario: 'Lunes a Viernes, 09:00 AM - 01:00 PM',
    actividades: [
      'Captura y análisis de datos de aprovechamiento escolar.',
      'Apoyo logístico en eventos culturales y ferias de ciencias.',
      'Atención a padres de familia en ventanilla de servicios.',
      'Elaboración de material didáctico digital.'
    ]
  },
  {
    id: 2,
    status: 'LUGARES LIMITADOS',
    statusColor: 'yellow',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=150&h=150&fit=crop',
    vacantes: 5,
    vacantesLabel: 'VACANTES',
    progress: 30,
    title: 'Hospital General',
    category: 'Salud Pública',
    location: 'Zona Norte',
    titular: 'Dr. Roberto Sánchez',
    objetivo: 'Brindar soporte administrativo y técnico en las áreas de archivo clínico y atención ciudadana del hospital.',
    telefono: '(998) 884-1234',
    correo: 'servicio.social@hospitalgeneral.mx',
    direccionCompleta: 'Av. Kabah S/N, Región 225, 77524 Cancún, Q.R.',
    horario: 'Lunes a Viernes, 08:00 AM - 12:00 PM o 02:00 PM - 06:00 PM',
    actividades: [
      'Digitalización de expedientes clínicos.',
      'Orientación a familiares en sala de espera.',
      'Apoyo en campañas de vacunación y prevención.',
      'Gestión de citas en el sistema interno.'
    ]
  },
  {
    id: 3,
    status: 'DISPONIBLE',
    statusColor: 'green',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop',
    vacantes: 8,
    vacantesLabel: 'VACANTES',
    progress: 60,
    title: 'Centro de Integración Juvenil',
    category: 'Asistencia Social',
    location: 'Benito Juárez',
    titular: 'Mtra. Elena Rodríguez',
    objetivo: 'Colaborar en la prevención y tratamiento de adicciones mediante pláticas, talleres y actividades recreativas para jóvenes.',
    telefono: '(998) 884-5566',
    correo: 'contacto@cij.gob.mx',
    direccionCompleta: 'Región 92, Mz 14, Lote 3, 77516 Cancún, Q.R.',
    horario: 'Lunes a Viernes, 10:00 AM - 02:00 PM',
    actividades: [
      'Impartición de talleres preventivos en secundarias.',
      'Apoyo en la organización de torneos deportivos.',
      'Creación de contenido para redes sociales.',
      'Recepción y registro de nuevos usuarios.'
    ]
  },
  {
    id: 4,
    status: 'ÚLTIMOS LUGARES',
    statusColor: 'red',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=150&h=150&fit=crop',
    vacantes: 1,
    vacantesLabel: 'QUEDAN',
    progress: 10,
    title: 'Fiscalía General del Estado',
    category: 'Justicia y Derecho',
    location: 'Av. Xcaret',
    titular: 'Lic. Arturo Peniche',
    objetivo: 'Asistir en labores de integración de carpetas de investigación y atención primaria a víctimas.',
    telefono: '(998) 881-7150',
    correo: 'rh.servicio@fgeqroo.gob.mx',
    direccionCompleta: 'Av. Xcaret, Supermanzana 21, 77505 Cancún, Q.R.',
    horario: 'Lunes a Viernes, 09:00 AM - 01:00 PM',
    actividades: [
      'Revisión y foliado de expedientes.',
      'Atención en módulo de información.',
      'Redacción de oficios y actas administrativas.',
      'Acompañamiento a víctimas en trámites iniciales.'
    ]
  },
  {
    id: 5,
    status: 'ALTA DISPONIBILIDAD',
    statusColor: 'green',
    image: 'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=150&h=150&fit=crop',
    vacantes: 20,
    vacantesLabel: 'VACANTES',
    progress: 90,
    title: 'H. Ayuntamiento de Benito Juárez',
    category: 'Administración Pública',
    location: 'Palacio Municipal',
    titular: 'Ing. Carlos Martínez',
    objetivo: 'Participar en las distintas direcciones municipales para agilizar trámites y mejorar la atención ciudadana.',
    telefono: '(998) 881-2800',
    correo: 'servicio.social@cancun.gob.mx',
    direccionCompleta: 'Av. Tulum 5, Centro, 77500 Cancún, Q.R.',
    horario: 'Lunes a Viernes, 08:30 AM - 12:30 PM',
    actividades: [
      'Atención ciudadana en ventanilla única.',
      'Apoyo en el departamento de sistemas e informática.',
      'Gestión de archivo muerto.',
      'Logística en eventos del ayuntamiento.'
    ]
  },
  {
    id: 6,
    status: 'POCOS LUGARES',
    statusColor: 'yellow',
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=150&h=150&fit=crop',
    vacantes: 3,
    vacantesLabel: 'QUEDAN',
    progress: 20,
    title: 'Sistema DIF Municipal',
    category: 'Trabajo Social',
    location: 'Región 94',
    titular: 'Lic. Patricia Aguilar',
    objetivo: 'Apoyar en los programas de asistencia social dirigidos a familias, niños y adultos mayores en situación de vulnerabilidad.',
    telefono: '(998) 888-8921',
    correo: 'voluntariado@difcancun.gob.mx',
    direccionCompleta: 'Calle 44 Poniente, Región 94, 77517 Cancún, Q.R.',
    horario: 'Lunes a Viernes, 09:00 AM - 01:00 PM',
    actividades: [
      'Entrevistas de estudio socioeconómico.',
      'Entrega de despensas y apoyos funcionales.',
      'Organización de actividades recreativas en casa hogar.',
      'Captura de datos en el padrón de beneficiarios.'
    ]
  },
  {
    id: 7,
    status: 'DISPONIBLE',
    statusColor: 'green',
    image: <div className="w-full h-full bg-pink-100 flex items-center justify-center text-pink-500"><Users size={32} /></div>,
    vacantes: 7,
    vacantesLabel: 'VACANTES',
    progress: 50,
    title: 'Instituto Municipal de la Mujer',
    category: 'Apoyo Social',
    location: 'Supermanzana 23',
    titular: 'Mtra. Silvia Ponce',
    objetivo: 'Colaborar en la promoción de la igualdad de género y la prevención de la violencia contra las mujeres.',
    telefono: '(998) 886-8537',
    correo: 'contacto@immcancun.gob.mx',
    direccionCompleta: 'Retorno 3, Supermanzana 23, 77500 Cancún, Q.R.',
    horario: 'Lunes a Viernes, 10:00 AM - 02:00 PM',
    actividades: [
      'Apoyo en la línea de atención telefónica.',
      'Diseño de campañas de concientización.',
      'Logística en talleres de empoderamiento.',
      'Acompañamiento administrativo en asesorías legales.'
    ]
  },
  {
    id: 8,
    status: 'POCOS LUGARES',
    statusColor: 'yellow',
    image: <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-500"><ShieldAlert size={32} /></div>,
    vacantes: 4,
    vacantesLabel: 'VACANTES',
    progress: 25,
    title: 'Protección Civil',
    category: 'Seguridad y Emergencias',
    location: 'Av. Tulum',
    titular: 'Cmdte. Luis García',
    objetivo: 'Asistir en la elaboración de planes de contingencia y capacitación ciudadana en primeros auxilios y prevención de desastres.',
    telefono: '(998) 887-3435',
    correo: 'capacitacion@proteccioncivil.gob.mx',
    direccionCompleta: 'Av. Tulum, Supermanzana 2, 77500 Cancún, Q.R.',
    horario: 'Lunes a Viernes, 08:00 AM - 12:00 PM',
    actividades: [
      'Revisión de extintores y señalética en edificios públicos.',
      'Apoyo en simulacros de evacuación.',
      'Impartición de pláticas en escuelas.',
      'Monitoreo meteorológico básico.'
    ]
  }
];

const categorias = [
  { id: 'todos', label: 'Todos' },
  { id: 'internos', label: 'Internos (ITC)', icon: <GraduationCap size={16} /> },
  { id: 'gobierno', label: 'Gobierno / Ayuntamiento', icon: <Building2 size={16} /> },
  { id: 'salud', label: 'Salud / Hospitales', icon: <Heart size={16} /> },
  { id: 'civiles', label: 'Asociaciones Civiles', icon: <Users size={16} /> },
  { id: 'justicia', label: 'Justicia / Fiscalías', icon: <Scale size={16} /> },
];

export default function CatalogoDependencias({ onDependenciaSelected }: { onDependenciaSelected?: () => void }) {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [dependenciaSeleccionada, setDependenciaSeleccionada] = useState<Dependencia | null>(null);

  // Helpers para colores basados en el status
  const getStatusStyles = (color: StatusColor) => {
    switch (color) {
      case 'green': return 'bg-emerald-50 text-emerald-700';
      case 'yellow': return 'bg-amber-50 text-amber-700';
      case 'red': return 'bg-rose-50 text-rose-700';
      default: return 'bg-slate-50 text-slate-700';
    }
  };

  const getProgressColor = (color: StatusColor) => {
    switch (color) {
      case 'green': return 'bg-emerald-500';
      case 'yellow': return 'bg-amber-500';
      case 'red': return 'bg-rose-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="font-sans">
      <main className="max-w-7xl mx-auto py-4">
        
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1B365D] transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Buscar dependencia..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 outline-none transition-all text-slate-700 font-medium shadow-sm"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-[#1B365D] font-semibold rounded-2xl hover:bg-slate-50 hover:border-[#1B365D]/30 transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-[#1B365D]/10 whitespace-nowrap">
            <Plus size={20} />
            Proponer Nuevo Convenio
          </button>
        </div>

        {/* Categories / Filters */}
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 gap-3 hide-scrollbar mb-6">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all border ${
                categoriaActiva === cat.id
                  ? 'bg-[#1B365D] text-white border-[#1B365D] shadow-md shadow-[#1B365D]/20'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {cat.icon && <span className={categoriaActiva === cat.id ? 'text-white/80' : 'text-slate-400'}>{cat.icon}</span>}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dependencias.map((dep) => (
            <div 
              key={dep.id} 
              className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
              onClick={() => setDependenciaSeleccionada(dep)}
            >
              {/* Status Header */}
              <div className={`px-5 py-3 flex items-center justify-between text-xs font-bold tracking-wide ${getStatusStyles(dep.statusColor)}`}>
                <span>{dep.status}</span>
                <div className="w-2 h-2 rounded-full bg-current opacity-80 animate-pulse"></div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                {/* Image and Vacancies */}
                <div className="flex justify-between items-start mb-5">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shadow-inner border border-slate-100/50">
                    {typeof dep.image === 'string' ? (
                      <img src={dep.image} alt={dep.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      dep.image
                    )}
                  </div>
                  <div className="text-right">
                    <div className={`text-4xl font-black leading-none tracking-tighter ${
                      dep.statusColor === 'green' ? 'text-emerald-500' : 
                      dep.statusColor === 'yellow' ? 'text-amber-500' : 'text-rose-500'
                    }`}>
                      {dep.vacantes}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1">
                      {dep.vacantesLabel}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-5">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressColor(dep.statusColor)}`}
                    style={{ width: `${dep.progress}%` }}
                  ></div>
                </div>

                {/* Info */}
                <div className="mb-6 flex-1">
                  <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1.5 group-hover:text-[#1B365D] transition-colors">
                    {dep.title}
                  </h3>
                  <p className="text-sm font-medium text-[#2a528a] mb-3">
                    {dep.category}
                  </p>
                  <div className="flex items-center gap-1.5 text-slate-500 bg-slate-50 inline-flex px-2.5 py-1 rounded-lg">
                    <MapPin size={14} />
                    <span className="text-xs font-medium">{dep.location}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que se abra el modal dos veces
                    setDependenciaSeleccionada(dep);
                  }}
                  className="w-full py-3.5 bg-[#1B365D] hover:bg-[#152b4a] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-[#1B365D]/20 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#1B365D]/30"
                >
                  Ver Detalles
                  <Info size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 flex justify-center">
          <button className="flex items-center gap-2 text-[#1B365D] font-semibold hover:text-[#2a528a] transition-colors px-4 py-2 rounded-full hover:bg-[#1B365D]/5">
            Ver más plazas
            <ChevronDown size={20} />
          </button>
        </div>
      </main>

      {/* MODAL DE DETALLES DE LA DEPENDENCIA */}
      {dependenciaSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-sm">
                  {typeof dependenciaSeleccionada.image === 'string' ? (
                    <img src={dependenciaSeleccionada.image} alt={dependenciaSeleccionada.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    dependenciaSeleccionada.image
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">{dependenciaSeleccionada.title}</h2>
                  <p className="text-sm text-[#2a528a] font-medium mt-0.5">{dependenciaSeleccionada.category}</p>
                </div>
              </div>
              <button 
                onClick={() => setDependenciaSeleccionada(null)} 
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1B365D]"
                aria-label="Cerrar detalles"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 bg-white space-y-8">
              
              {/* Objetivo */}
              <section>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Info size={18} className="text-[#1B365D]" />
                  Objetivo del Programa
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {dependenciaSeleccionada.objetivo}
                </p>
              </section>

              {/* Actividades */}
              <section>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Briefcase size={18} className="text-[#1B365D]" />
                  Actividades a realizar
                </h3>
                <ul className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {dependenciaSeleccionada.actividades.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{act}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Datos de Contacto */}
              <section>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <User size={18} className="text-[#1B365D]" />
                  Datos de Contacto y Ubicación
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 shrink-0">
                      <User size={18} className="text-[#1B365D]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Titular</p>
                      <p className="text-sm font-semibold text-slate-900">{dependenciaSeleccionada.titular}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 shrink-0">
                      <Phone size={18} className="text-[#1B365D]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Teléfono</p>
                      <p className="text-sm font-semibold text-slate-900">{dependenciaSeleccionada.telefono}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 shrink-0">
                      <Mail size={18} className="text-[#1B365D]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Correo Electrónico</p>
                      <a href={`mailto:${dependenciaSeleccionada.correo}`} className="text-sm font-semibold text-[#2a528a] hover:underline break-all">
                        {dependenciaSeleccionada.correo}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 shrink-0">
                      <Clock size={18} className="text-[#1B365D]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Horario</p>
                      <p className="text-sm font-semibold text-slate-900">{dependenciaSeleccionada.horario}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:col-span-2 pt-2 border-t border-slate-200/60">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 shrink-0">
                      <MapPin size={18} className="text-[#1B365D]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Dirección Completa</p>
                      <p className="text-sm font-semibold text-slate-900">{dependenciaSeleccionada.direccionCompleta}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <span className={`w-3 h-3 rounded-full shadow-sm ${
                  dependenciaSeleccionada.statusColor === 'green' ? 'bg-emerald-500' : 
                  dependenciaSeleccionada.statusColor === 'yellow' ? 'bg-amber-500' : 'bg-rose-500'
                }`}></span>
                {dependenciaSeleccionada.vacantes} {dependenciaSeleccionada.vacantesLabel.toLowerCase()}
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => setDependenciaSeleccionada(null)}
                  className="flex-1 sm:flex-none px-5 py-2.5 text-slate-600 font-bold hover:bg-slate-200 bg-slate-100 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => {
                    alert('¡Solicitud enviada con éxito! La dependencia revisará tu perfil. (Simulación)');
                    setDependenciaSeleccionada(null);
                    if (onDependenciaSelected) onDependenciaSelected();
                  }}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-[#1B365D] hover:bg-[#152b4a] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-[#1B365D]/20 focus:outline-none focus:ring-4 focus:ring-[#1B365D]/30 active:scale-[0.98]"
                >
                  Solicitar Vacante
                  <CheckCircle2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global styles for hide-scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
