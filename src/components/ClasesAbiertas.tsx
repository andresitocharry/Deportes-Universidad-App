import { useState } from 'react';
import { Plus, MapPin, Clock, Users, MessageSquare } from 'lucide-react';

interface Clase {
  id: number;
  deporte: string;
  tipo: 'clase' | 'entreno';
  ubicacion: string;
  fecha: string;
  hora: string;
  cupos: number;
  organizador: string;
  whatsapp: string;
}

export function ClasesAbiertas() {
  const [showModal, setShowModal] = useState(false);
  const [clases, setClases] = useState<Clase[]>([
    {
      id: 1,
      deporte: 'Fútbol',
      tipo: 'entreno',
      ubicacion: 'Canchas UniAndes',
      fecha: '2026-02-02',
      hora: '16:00',
      cupos: 8,
      organizador: 'Juan Pérez',
      whatsapp: '+57 300 123 4567'
    },
    {
      id: 2,
      deporte: 'Tenis',
      tipo: 'clase',
      ubicacion: 'Club El Nogal',
      fecha: '2026-02-03',
      hora: '10:00',
      cupos: 4,
      organizador: 'María González',
      whatsapp: '+57 301 234 5678'
    },
    {
      id: 3,
      deporte: 'Baloncesto',
      tipo: 'entreno',
      ubicacion: 'Gimnasio UniAndes',
      fecha: '2026-02-01',
      hora: '18:00',
      cupos: 10,
      organizador: 'Carlos Ruiz',
      whatsapp: '+57 302 345 6789'
    }
  ]);

  const contactarWhatsApp = (whatsapp: string, deporte: string) => {
    const mensaje = encodeURIComponent(`Hola! Me interesa unirme a la clase/entreno de ${deporte}`);
    window.open(`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${mensaje}`, '_blank');
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Clases & Entrenamientos</h2>
          <p className="text-gray-600">Encuentra o organiza sesiones deportivas</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-3 bg-black text-white border-2 border-black hover:bg-gray-800 transition-colors"
        >
          <Plus size={20} />
          <span>Crear Nueva</span>
        </button>
      </div>

      {/* Clases Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clases.map((clase) => (
          <div key={clase.id} className="border-2 border-black p-4 bg-white hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg">{clase.deporte}</h3>
                <span className={`inline-block px-2 py-1 text-xs border border-black mt-1 ${
                  clase.tipo === 'clase' ? 'bg-blue-200' : 'bg-green-200'
                }`}>
                  {clase.tipo === 'clase' ? 'CLASE' : 'ENTRENO'}
                </span>
              </div>
              <div className="w-12 h-12 border-2 border-black bg-yellow-300 flex items-center justify-center">
                <Users size={24} />
              </div>
            </div>

            {/* Detalles */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="flex-shrink-0" />
                <span>{clase.ubicacion}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="flex-shrink-0" />
                <span>{clase.fecha} • {clase.hora}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users size={16} className="flex-shrink-0" />
                <span>{clase.cupos} cupos disponibles</span>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-gray-200 pt-3">
              <p className="text-xs text-gray-600 mb-2">Organiza: {clase.organizador}</p>
              <button
                onClick={() => contactarWhatsApp(clase.whatsapp, clase.deporte)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white border-2 border-black hover:bg-green-600 transition-colors"
              >
                <MessageSquare size={16} />
                <span className="font-medium">Contactar por WhatsApp</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Creación */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-black max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Crear Clase/Entreno</h3>
            <form className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Deporte</label>
                <input type="text" className="w-full border-2 border-black px-3 py-2" placeholder="Ej: Fútbol" />
              </div>
              <div>
                <label className="block font-medium mb-1">Tipo</label>
                <select className="w-full border-2 border-black px-3 py-2">
                  <option>Clase</option>
                  <option>Entreno</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Ubicación</label>
                <input type="text" className="w-full border-2 border-black px-3 py-2" placeholder="Ej: Canchas UniAndes" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">Fecha</label>
                  <input type="date" className="w-full border-2 border-black px-3 py-2" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Hora</label>
                  <input type="time" className="w-full border-2 border-black px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1">Cupos</label>
                <input type="number" className="w-full border-2 border-black px-3 py-2" placeholder="Ej: 10" />
              </div>
              <div>
                <label className="block font-medium mb-1">WhatsApp</label>
                <input type="tel" className="w-full border-2 border-black px-3 py-2" placeholder="+57 300 123 4567" />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border-2 border-black bg-white hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 border-2 border-black bg-black text-white hover:bg-gray-800"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
