import { Building2, Clock, FileSignature, Home, FolderOpen, User } from 'lucide-react';

export const mockInstitutions = [
  { id: 1, name: "Servicio de Administración Tributaria", acronym: "SAT", sector: "Gobierno", availableSpots: 5, location: "Av. Bonampak, Centro, Cancún", manager: "Lic. Laura Pérez", description: "Apoyo en el área de auditoría, análisis de datos financieros y atención al contribuyente para procesos digitales." },
  { id: 2, name: "Asociación de Hoteles de Cancún", acronym: "AHCE", sector: "Turismo", availableSpots: 12, location: "Zona Hotelera Km 9.5, Cancún", manager: "Ing. Roberto Díaz", description: "Desarrollo de software interno para gestión de ocupación hotelera y automatización de reportes turísticos." },
  { id: 3, name: "Comisión Federal de Electricidad", acronym: "CFE", sector: "Público", availableSpots: 3, location: "Sm 22, Cancún", manager: "Ing. Carlos Mendoza", description: "Mantenimiento de bases de datos de red, soporte técnico en sistemas de monitoreo y control de distribución." },
  { id: 4, name: "Grupo Xcaret Corporativo", acronym: "XCARET", sector: "Privado", availableSpots: 8, location: "Carretera Federal 307, Playa del Carmen", manager: "Mtra. Silvia Ocampo", description: "Participación en proyectos de innovación tecnológica, desarrollo de apps móviles para visitantes y UX/UI." },
  { id: 5, name: "Dolphin Discovery", acronym: "DOLPHIN", sector: "Turismo", availableSpots: 4, location: "Isla Mujeres, Quintana Roo", manager: "Biol. Ana Martínez", description: "Asistencia en programas de conservación marina, análisis de calidad del agua y soporte en sistemas veterinarios." },
  { id: 6, name: "Ayuntamiento de Benito Juárez", acronym: "MUNICIPIO", sector: "Gobierno", availableSpots: 10, location: "Palacio Municipal, Cancún", manager: "Lic. Carlos Ruiz", description: "Colaboración en la digitalización de trámites ciudadanos, soporte a infraestructura de red y atención pública." }
];

export const mockDocuments = [
  { id: 'doc1', title: 'Carta de Presentación', date: '10 Feb 2026', status: 'Aprobado', icon: FileSignature, step: 4 },
  { id: 'doc2', title: 'Carta de Aceptación', date: '15 Feb 2026', status: 'En Revisión', icon: Building2, step: 2 },
  { id: 'doc3', title: 'Reporte Mensual 1', date: '05 Mar 2026', status: 'Pendiente', icon: Clock, step: 1 }
];

export const navItems = [
  { id: 'home', icon: Home, label: 'Inicio' },
  { id: 'docs', icon: FolderOpen, label: 'Trámites' },
  { id: 'profile', icon: User, label: 'Mi Perfil' }
];
