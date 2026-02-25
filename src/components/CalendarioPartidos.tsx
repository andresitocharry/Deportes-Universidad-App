import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, MessageSquare } from 'lucide-react';

interface Partido {
  id: number;
  deporte: string;
  fecha: string;
  hora: string;
  ubicacion: string;
  participantes: number;
  maxParticipantes: number;
  organizador: string;
  whatsapp: string;
}

export function CalendarioPartidos() {
  const [vistaActual, setVistaActual] = useState<'mes' | 'lista'>('lista');
  const [showModal, setShowModal] = useState(false);
  const [partidos] = useState<Partido[]>([
    {
      id: 1,
      deporte: 'Fútbol 5vs5',
      fecha: '2026-02-01',
      hora: '15:00',
      ubicacion: 'Canchas UniAndes',
      participantes: 8,
      maxParticipantes: 10,
      organizador: 'Juan Pérez',
      whatsapp: '+57 300 123 4567'
    },
    {
      id: 2,
      deporte: 'Tenis Dobles',
      fecha: '2026-02-02',
      hora: '10:00',
      ubicacion: 'Club El Nogal',
      participantes: 3,
      maxParticipantes: 4,
      organizador: 'María González',
      whatsapp: '+57 301 234 5678'
    },
    {
      id: 3,
      deporte: 'Baloncesto 3vs3',
      fecha: '2026-02-03',
      hora: '18:00',
      ubicacion: 'Gimnasio UniAndes',
      participantes: 5,
      maxParticipantes: 6,
      organizador: 'Carlos Ruiz',
      whatsapp: '+57 302 345 6789'
    },
    {
      id: 4,
      deporte: 'Voleibol',
      fecha: '2026-02-05',
      hora: '16:30',
      ubicacion: 'Canchas UniAndes',
      participantes: 10,
      maxParticipantes: 12,
      organizador: 'Laura Mendoza',
      whatsapp: '+57 303 456 7890'
    }
  ]);

  const contactarWhatsApp = (whatsapp: string, deporte: string) => {
    const mensaje = encodeURIComponent(`Hola! Me gustaría unirme al partido de ${deporte}`);
    window.open(`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${mensaje}`, '_blank');
  };

  const agruparPorFecha = () => {
    const agrupado: { [key: string]: Partido[] } = {};
    partidos.forEach((partido) => {
      if (!agrupado[partido.fecha]) {
        agrupado[partido.fecha] = [];
      }
      agrupado[partido.fecha].push(partido);
    });
    return agrupado;
  };

  const partidosAgrupados = agruparPorFecha();
  const fechasOrdenadas = Object.keys(partidosAgrupados).sort();

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Calendario de Partidos</h2>
          <p className="text-gray-600">Organiza y únete a partidos</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setVistaActual('lista')}
            className={`px-4 py-2 border-2 border-black ${vistaActual === 'lista' ? 'bg-black text-white' : 'bg-white'}`}
          >
            Lista
          </button>
          <button
            onClick={() => setVistaActual('mes')}
            className={`px-4 py-2 border-2 border-black ${vistaActual === 'mes' ? 'bg-black text-white' : 'bg-white'}`}
          >
            Mes
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white border-2 border-black hover:bg-gray-800"
          >
            <Plus size={20} />
            <span>Nuevo</span>
          </button>
        </div>
      </div>

      {/* Vista Lista */}
      {vistaActual === 'lista' && (
        <div className="space-y-6">
          {fechasOrdenadas.map((fecha) => (
            <div key={fecha}>
              <div className="flex items-center gap-3 mb-3">
                <Calendar size={20} />
                <h3 className="font-bold text-lg">
                  {new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {partidosAgrupados[fecha].map((partido) => (
                  <div key={partido.id} className="border-2 border-black p-4 bg-white hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-lg">{partido.deporte}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <Clock size={14} />
                          <span>{partido.hora}</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 border-2 border-black text-sm font-bold ${
                        partido.participantes >= partido.maxParticipantes 
                          ? 'bg-red-300' 
                          : 'bg-green-300'
                      }`}>
                        {partido.participantes}/{partido.maxParticipantes}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={16} className="flex-shrink-0" />
                        <span>{partido.ubicacion}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users size={16} className="flex-shrink-0" />
                        <span>Organiza: {partido.organizador}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => contactarWhatsApp(partido.whatsapp, partido.deporte)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white border-2 border-black hover:bg-green-600"
                      disabled={partido.participantes >= partido.maxParticipantes}
                    >
                      <MessageSquare size={16} />
                      <span className="font-medium">
                        {partido.participantes >= partido.maxParticipantes ? 'Completo' : 'Unirme - WhatsApp'}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vista Mes (Calendario Simple) */}
      {vistaActual === 'mes' && (
        <div className="border-2 border-black bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-bold text-xl">Febrero 2026</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 border-2 border-black hover:bg-gray-100">←</button>
              <button className="px-3 py-1 border-2 border-black hover:bg-gray-100">→</button>
            </div>
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((dia) => (
              <div key={dia} className="text-center font-bold py-2 border-2 border-black bg-gray-100">
                {dia}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, i) => {
              const dia = i - 5; // Febrero 2026 empieza en domingo (índice 6)
              const fecha = `2026-02-${String(dia).padStart(2, '0')}`;
              const partidosDelDia = partidos.filter(p => p.fecha === fecha);
              
              if (dia < 1 || dia > 28) {
                return <div key={i} className="aspect-square border-2 border-gray-200 bg-gray-50" />;
              }

              return (
                <div
                  key={i}
                  className={`aspect-square border-2 border-black p-2 hover:bg-gray-50 cursor-pointer ${
                    partidosDelDia.length > 0 ? 'bg-yellow-100' : 'bg-white'
                  }`}
                >
                  <div className="font-bold text-sm mb-1">{dia}</div>
                  {partidosDelDia.length > 0 && (
                    <div className="text-xs">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      <span className="text-[10px]">{partidosDelDia.length} partido(s)</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal para Nuevo Partido */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-black max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Crear Nuevo Partido</h3>
            <form className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Deporte</label>
                <input type="text" className="w-full border-2 border-black px-3 py-2" placeholder="Ej: Fútbol 5vs5" />
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
                <label className="block font-medium mb-1">Máx. Participantes</label>
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
