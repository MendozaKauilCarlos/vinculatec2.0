import React, { useState } from 'react';
import { FileText, CheckCircle, Clock, AlertCircle, Edit3, Eye, Send, Save, X, FileSignature } from 'lucide-react';

type DocStatus = 'aprobado' | 'en_revision' | 'borrador' | 'rechazado' | 'pendiente';

interface Documento {
  id: string;
  titulo: string;
  descripcion: string;
  status: DocStatus;
  ultimaModificacion?: string;
  observaciones?: string;
}

const mockDocumentos: Documento[] = [
  { id: 'formato_solicitud', titulo: 'Formato de Solicitud', descripcion: 'Solicitud oficial de asignación', status: 'aprobado', ultimaModificacion: '15 Mar 2026' },
  { id: 'carta_compromiso', titulo: 'Carta Compromiso', descripcion: 'Aceptación de términos y lineamientos', status: 'en_revision', ultimaModificacion: '17 Mar 2026' },
  { id: 'reporte_1', titulo: 'Reporte Bimestral 1', descripcion: 'Resumen de actividades meses 1 y 2', status: 'rechazado', observaciones: 'Falta detallar las actividades de la semana 3. Por favor corrige y vuelve a enviar.', ultimaModificacion: '18 Mar 2026' },
  { id: 'reporte_2', titulo: 'Reporte Bimestral 2', descripcion: 'Resumen de actividades meses 3 y 4', status: 'borrador', ultimaModificacion: '18 Mar 2026' },
  { id: 'reporte_3', titulo: 'Reporte Bimestral 3', descripcion: 'Resumen de actividades meses 5 y 6', status: 'pendiente' },
  { id: 'carta_terminacion', titulo: 'Carta de Terminación', descripcion: 'Documento final de liberación', status: 'pendiente' },
];

export default function MisDocumentos() {
  const [documentos, setDocumentos] = useState<Documento[]>(mockDocumentos);
  const [docSeleccionado, setDocSeleccionado] = useState<Documento | null>(null);
  const [editorContent, setEditorContent] = useState('');

  const getStatusConfig = (status: DocStatus) => {
    switch (status) {
      case 'aprobado': return { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <CheckCircle size={16} />, label: 'Aprobado' };
      case 'en_revision': return { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: <Clock size={16} />, label: 'En Revisión' };
      case 'rechazado': return { color: 'bg-rose-100 text-rose-700 border-rose-200', icon: <AlertCircle size={16} />, label: 'Rechazado' };
      case 'borrador': return { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: <Edit3 size={16} />, label: 'Borrador' };
      default: return { color: 'bg-slate-100 text-slate-600 border-slate-200', icon: <FileText size={16} />, label: 'Pendiente' };
    }
  };

  const handleOpenEditor = (doc: Documento) => {
    setDocSeleccionado(doc);
    setEditorContent(doc.status === 'borrador' || doc.status === 'rechazado' ? 'Actividades realizadas:\n1. \n2. \n3. ' : 'Contenido bloqueado para edición.');
  };

  const handleSave = (enviarRevision: boolean) => {
    if (!docSeleccionado) return;
    
    setDocumentos(docs => docs.map(d => {
      if (d.id === docSeleccionado.id) {
        return {
          ...d,
          status: enviarRevision ? 'en_revision' : 'borrador',
          ultimaModificacion: 'Justo ahora',
          observaciones: enviarRevision ? undefined : d.observaciones
        };
      }
      return d;
    }));
    
    setDocSeleccionado(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#1B365D] tracking-tight mb-2">Mis Documentos</h1>
        <p className="text-slate-500">Gestiona y edita tu expediente de servicio social en línea.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {documentos.map((doc) => {
          const statusConfig = getStatusConfig(doc.status);
          const isEditable = doc.status === 'borrador' || doc.status === 'rechazado' || doc.status === 'pendiente';
          
          return (
            <div key={doc.id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-[#1B365D]/30 transition-all flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-xl ${doc.status === 'aprobado' ? 'bg-emerald-50 text-emerald-600' : 'bg-[#1B365D]/5 text-[#1B365D]'}`}>
                  <FileSignature size={24} />
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold uppercase tracking-wider ${statusConfig.color}`}>
                  {statusConfig.icon}
                  {statusConfig.label}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-1">{doc.titulo}</h3>
              <p className="text-sm text-slate-500 mb-4 flex-1">{doc.descripcion}</p>
              
              {doc.ultimaModificacion && (
                <p className="text-xs text-slate-400 font-medium mb-4">Última mod: {doc.ultimaModificacion}</p>
              )}

              <button 
                onClick={() => handleOpenEditor(doc)}
                className={`w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  isEditable 
                    ? 'bg-[#1B365D] hover:bg-[#152b4a] text-white shadow-md shadow-[#1B365D]/20' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {isEditable ? <Edit3 size={16} /> : <Eye size={16} />}
                {isEditable ? 'Llenar Documento' : 'Ver Documento'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Editor Modal */}
      {docSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{docSeleccionado.titulo}</h2>
                <p className="text-sm text-slate-500">Editor en línea</p>
              </div>
              <button 
                onClick={() => setDocSeleccionado(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 bg-slate-50/30">
              
              {docSeleccionado.status === 'rechazado' && docSeleccionado.observaciones && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex gap-3 text-rose-800">
                  <AlertCircle className="shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-sm mb-1">Observaciones del Revisor:</h4>
                    <p className="text-sm">{docSeleccionado.observaciones}</p>
                  </div>
                </div>
              )}

              {docSeleccionado.status === 'aprobado' && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex gap-3 text-emerald-800">
                  <CheckCircle className="shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-sm mb-1">Documento Aprobado</h4>
                    <p className="text-sm">Este documento ya fue revisado y aprobado. No se pueden realizar más cambios.</p>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Contenido del Documento</label>
                  <textarea 
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    disabled={docSeleccionado.status === 'aprobado' || docSeleccionado.status === 'en_revision'}
                    className="w-full h-64 p-4 bg-white border border-slate-200 rounded-2xl focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 outline-none transition-all text-slate-700 resize-none disabled:bg-slate-50 disabled:text-slate-500"
                    placeholder="Escribe aquí los detalles requeridos..."
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-end gap-3">
              <button 
                onClick={() => setDocSeleccionado(null)}
                className="px-5 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              
              {(docSeleccionado.status === 'borrador' || docSeleccionado.status === 'rechazado' || docSeleccionado.status === 'pendiente') && (
                <>
                  <button 
                    onClick={() => handleSave(false)}
                    className="px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 font-bold rounded-xl flex items-center gap-2 transition-all"
                  >
                    <Save size={18} />
                    Guardar Borrador
                  </button>
                  <button 
                    onClick={() => handleSave(true)}
                    className="px-5 py-2.5 bg-[#1B365D] hover:bg-[#152b4a] text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-[#1B365D]/20"
                  >
                    <Send size={18} />
                    Enviar a Revisión
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
