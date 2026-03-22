import { useState, useEffect } from 'react';
import { Eye, EyeOff, GraduationCap, Quote, CheckCircle2, XCircle, Circle, CheckCircle, X, User, Lock } from 'lucide-react';
import PortalAlumno from './pages/PortalAlumno';

export default function App() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStep, setValidationStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<number[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  // Estados para la animación de las barras
  const [avanceProgress, setAvanceProgress] = useState(0);
  const [creditosProgress, setCreditosProgress] = useState(0);

  // Datos simulados del alumno
  const alumnoSimulado = {
    nombre: "Alejandro",
    avanceActual: 60, // Porcentaje
    avanceMeta: 70,
    creditosActuales: 3, // Cantidad
    creditosMeta: 5
  };

  // Animación de las barras de progreso cuando se abre el modal
  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setAvanceProgress(alumnoSimulado.avanceActual);
        setCreditosProgress((alumnoSimulado.creditosActuales / alumnoSimulado.creditosMeta) * 100);
      }, 100);
    } else {
      setAvanceProgress(0);
      setCreditosProgress(0);
    }
  }, [showModal]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    setValidationStep(1);
    setValidationErrors([]);
    
    const isSuccess = usuario.toLowerCase() === 'admin';

    // Paso 1: Identidad (siempre pasa)
    setTimeout(() => setValidationStep(2), 800);
    
    if (isSuccess) {
      setTimeout(() => setValidationStep(3), 1600);
      setTimeout(() => setValidationStep(4), 2400);
      setTimeout(() => setValidationStep(5), 3200);
      setTimeout(() => {
        setIsValidating(false);
        setIsLoggedIn(true);
      }, 3600);
    } else {
      // Evalúa todos los pasos y marca los errores uno por uno
      setTimeout(() => {
        setValidationErrors(prev => [...prev, 2]); // Falla avance
        setValidationStep(3);
      }, 1600);

      setTimeout(() => {
        setValidationErrors(prev => [...prev, 3]); // Falla créditos
        setValidationStep(4);
      }, 2400);

      setTimeout(() => {
        setValidationErrors(prev => [...prev, 4]); // Falla vacantes
        setValidationStep(5);
      }, 3200);

      // Al finalizar toda la evaluación, muestra el modal de requisitos
      setTimeout(() => {
        setIsValidating(false);
        setShowModal(true);
      }, 4200);
    }
  };

  if (isLoggedIn) {
    return <PortalAlumno onLogout={() => setIsLoggedIn(false)} />;
  }

  return (
    <div className="min-h-screen flex font-sans bg-white">
      {/* Left Column - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-20 xl:p-24 relative z-10">
        
        {/* Spacer for top */}
        <div></div>

        {/* Form Container */}
        <div className="max-w-md w-full mx-auto">
          
          {/* Logo Area */}
          <div className="flex items-center gap-4 mb-10 animate-in slide-in-from-bottom-4 fade-in duration-700 fill-mode-both">
            <div className="w-14 h-14 bg-gradient-to-br from-[#1B365D] to-[#2a528a] rounded-2xl flex items-center justify-center shadow-lg shadow-[#1B365D]/20 border border-[#1B365D]/10">
              <GraduationCap className="text-white" size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-[#1B365D] tracking-tight leading-none">VinculaTEC</h1>
              <p className="text-sm font-medium text-slate-500 tracking-wider uppercase mt-1">Portal de Alumnos</p>
            </div>
          </div>

          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-100 fill-mode-both">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">¡Bienvenido de nuevo!</h2>
            <p className="text-slate-500 mb-10 leading-relaxed text-lg">
              Tu servicio social es el puente hacia nuevas oportunidades profesionales.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Usuario Input */}
            <div className="space-y-2 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-200 fill-mode-both">
              <label htmlFor="usuario" className="block text-sm font-semibold text-slate-900">
                Número de Control / Usuario
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1B365D] transition-colors">
                  <User size={20} />
                </div>
                <input
                  id="usuario"
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="Ej. 19530001"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1B365D] focus:ring-2 focus:ring-[#1B365D]/20 outline-none transition-all text-slate-700 font-medium"
                  required
                />
              </div>
            </div>

            {/* Contraseña Input */}
            <div className="space-y-2 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300 fill-mode-both">
              <label htmlFor="contrasena" className="block text-sm font-semibold text-slate-900">
                Contraseña
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1B365D] transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  id="contrasena"
                  type={showPassword ? 'text' : 'password'}
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  placeholder="Al menos 8 caracteres"
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1B365D] focus:ring-2 focus:ring-[#1B365D]/20 outline-none transition-all text-slate-700 font-medium"
                  required
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1B365D] transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-[#1B365D] rounded-full"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500 fill-mode-both">
              <button
                type="submit"
                disabled={isValidating}
                className="w-full bg-gradient-to-r from-[#1B365D] to-[#2a528a] hover:from-[#152b4a] hover:to-[#1B365D] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-[#1B365D]/20 disabled:opacity-70 flex justify-center items-center transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-[#1B365D]/30"
                aria-busy={isValidating}
              >
                Iniciar Sesión
              </button>
            </div>

            {/* Help Link */}
            <div className="text-center mt-6 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-700 fill-mode-both">
              <p className="text-sm font-semibold text-[#1B365D] hover:underline cursor-pointer transition-all">¿Problemas para ingresar?</p>
              <p className="text-sm text-slate-500 mt-1">Acude al departamento de vinculación para soporte</p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-12 text-xs text-slate-400 font-semibold tracking-wider uppercase text-center lg:text-left">
          © 2026 VINCULATEC - TODOS LOS DERECHOS RESERVADOS
        </div>
      </div>

      {/* Right Column - Image Background with Glassmorphism */}
      <div className="hidden lg:block lg:w-1/2 relative p-4">
        <div className="absolute inset-4 rounded-[2rem] overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" 
            alt="Pasillo de la universidad" 
            className="w-full h-full object-cover transform scale-105 transition-transform duration-10000 hover:scale-100"
            referrerPolicy="no-referrer"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B365D]/90 via-[#1B365D]/40 to-transparent mix-blend-multiply"></div>
          
          {/* Glassmorphism Card */}
          <div className="absolute bottom-12 left-12 right-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-white shadow-2xl">
              <Quote className="text-white/40 mb-4" size={40} fill="currentColor" />
              <p className="text-2xl font-medium leading-relaxed mb-6 text-white/90">
                "El servicio social no es solo un requisito, es tu primera huella profesional en el mundo real."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                  <GraduationCap size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-base tracking-wide">Departamento de Vinculación</p>
                  <p className="text-sm text-white/70 font-medium">Instituto Tecnológico</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Process Modal */}
      {isValidating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-labelledby="validation-title">
          <div className="bg-white rounded-3xl p-10 max-w-sm w-full shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-300">
            
            {/* Top Spinner */}
            <div className="relative w-16 h-16 mb-6" aria-hidden="true">
              <div className="absolute inset-0 border-[3px] border-slate-100 rounded-full"></div>
              <div className="absolute inset-0 border-[3px] border-[#1B365D] rounded-full border-t-transparent animate-spin"></div>
            </div>

            <h3 id="validation-title" className="text-2xl font-bold text-slate-900 mb-2">¡Hola de nuevo!</h3>
            <p className="text-slate-500 text-sm mb-8 text-center">Estamos preparando tu acceso...</p>

            <div className="w-full space-y-5 px-2" aria-live="polite">
              {[
                { num: 1, text: "Verificando identidad" },
                { num: 2, text: "Evaluando avance académico" },
                { num: 3, text: "Revisando créditos complementarios" },
                { num: 4, text: "Buscando vacantes" }
              ].map((s) => {
                const isError = validationErrors.includes(s.num);
                const isCompleted = validationStep > s.num && !isError;
                const isActive = validationStep === s.num;
                const isPending = validationStep < s.num;

                return (
                  <div key={s.num} className="flex items-center gap-4">
                    {isCompleted && <CheckCircle className="text-emerald-500" fill="currentColor" color="white" size={24} />}
                    {isError && <XCircle className="text-red-500" fill="currentColor" color="white" size={24} />}
                    {isActive && (
                      <div className="relative w-6 h-6 flex items-center justify-center">
                        <div className="absolute inset-0 border-2 border-slate-200 rounded-full"></div>
                        <div className="absolute inset-0 border-2 border-[#1B365D] rounded-full border-t-transparent animate-spin"></div>
                      </div>
                    )}
                    {isPending && (
                      <Circle className="text-slate-300" size={24} />
                    )}

                    <span className={`text-sm ${
                      isCompleted ? 'text-slate-800 font-medium' :
                      isError ? 'text-red-600 font-bold' :
                      isActive ? 'text-slate-900 font-bold' :
                      'text-slate-400 font-medium'
                    }`}>
                      {s.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Validation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-labelledby="error-title">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300 relative">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1B365D] rounded-full p-1"
              aria-label="Cerrar ventana"
            >
              <X size={24} />
            </button>

            {/* Icon */}
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 border-8 border-white shadow-sm relative -mt-16">
              <span className="text-orange-500 text-4xl font-black">!</span>
            </div>

            {/* Text Content */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Requisitos incompletos
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hola <span className="font-semibold text-slate-800">{alumnoSimulado.nombre}</span>, para iniciar tu Servicio Social necesitas cumplir con los siguientes requisitos:
              </p>
            </div>

            {/* Requirements List */}
            <div className="space-y-6 mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              
              {/* Requirement 1: Avance de Carrera */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    {alumnoSimulado.avanceActual >= alumnoSimulado.avanceMeta ? (
                      <CheckCircle2 className="text-emerald-500" size={18} />
                    ) : (
                      <XCircle className="text-orange-500" size={18} />
                    )}
                    <span className="font-semibold text-slate-700 text-sm">Avance de Carrera</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    <span className={alumnoSimulado.avanceActual >= alumnoSimulado.avanceMeta ? "text-emerald-600" : "text-orange-600"}>
                      {alumnoSimulado.avanceActual}%
                    </span> / {alumnoSimulado.avanceMeta}% min
                  </span>
                </div>
                
                <div className="relative h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out ${
                      alumnoSimulado.avanceActual >= alumnoSimulado.avanceMeta ? 'bg-emerald-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${avanceProgress}%` }}
                  ></div>
                  {/* Meta Marker */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-400/50 z-10"
                    style={{ left: `${alumnoSimulado.avanceMeta}%` }}
                  ></div>
                </div>
              </div>

              {/* Requirement 2: Créditos Complementarios */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    {alumnoSimulado.creditosActuales >= alumnoSimulado.creditosMeta ? (
                      <CheckCircle2 className="text-emerald-500" size={18} />
                    ) : (
                      <XCircle className="text-orange-500" size={18} />
                    )}
                    <span className="font-semibold text-slate-700 text-sm">Créditos Complementarios</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    <span className={alumnoSimulado.creditosActuales >= alumnoSimulado.creditosMeta ? "text-emerald-600" : "text-orange-600"}>
                      {alumnoSimulado.creditosActuales}
                    </span> / {alumnoSimulado.creditosMeta} min
                  </span>
                </div>
                
                <div className="relative h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out ${
                      alumnoSimulado.creditosActuales >= alumnoSimulado.creditosMeta ? 'bg-emerald-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${creditosProgress}%` }}
                  ></div>
                </div>
              </div>

            </div>

            {/* Action Button */}
            <button 
              onClick={() => setShowModal(false)}
              className="w-full py-3.5 px-4 bg-white border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-bold rounded-xl transition-all active:scale-[0.98]"
            >
              Entendido, regresar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
