import { useState, useEffect } from 'react';
import { Star, ChatCircle, Phone, CaretRight, Medal, CalendarBlank, X, SealCheck, Trophy, TrendUp } from '@phosphor-icons/react';

interface Profesor {
  id: number;
  nombre: string;
  deporte: string;
  rating: number;
  totalReviews: number;
  precio: string;
  experiencia: string;
  whatsapp: string;
  disponibilidad: string;
  especialidad: string;
  verified: boolean;
  sessionsDelivered: number;
  tournamentWins: number;
  rankInSport: number;
  totalCoachesInSport: number;
}

interface Review {
  id: number;
  estudiante: string;
  rating: number;
  comentario: string;
  fecha: string;
}

interface ProfesoresProps {
  onNavigate?: (screen: string) => void;
  fabTrigger?: number;
}

export function Profesores({ onNavigate, fabTrigger }: ProfesoresProps) {
  const [selectedProfesor, setSelectedProfesor] = useState<number | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    if (fabTrigger && fabTrigger > 0) setShowSearchModal(true);
  }, [fabTrigger]);

  const profesores: Profesor[] = [
    { id: 1, nombre: 'Carlos Mendez', deporte: 'Soccer', rating: 4.8, totalReviews: 24, precio: '$30/hour', experiencia: '8 years', whatsapp: '+57 300 1234567', disponibilidad: 'Mon-Fri 4-8 PM', especialidad: 'Technical skills & tactics', verified: true, sessionsDelivered: 142, tournamentWins: 5, rankInSport: 1, totalCoachesInSport: 8 },
    { id: 2, nombre: 'Ana Rodriguez', deporte: 'Tennis', rating: 4.9, totalReviews: 31, precio: '$35/hour', experiencia: '10 years', whatsapp: '+57 310 7654321', disponibilidad: 'Tue-Sat 9 AM-6 PM', especialidad: 'Singles & doubles strategy', verified: true, sessionsDelivered: 210, tournamentWins: 8, rankInSport: 1, totalCoachesInSport: 5 },
    { id: 3, nombre: 'Miguel Torres', deporte: 'Basketball', rating: 4.7, totalReviews: 18, precio: '$28/hour', experiencia: '6 years', whatsapp: '+57 315 9876543', disponibilidad: 'Mon-Wed 5-9 PM', especialidad: 'Shooting & defense', verified: false, sessionsDelivered: 67, tournamentWins: 2, rankInSport: 3, totalCoachesInSport: 4 },
    { id: 4, nombre: 'Laura Gomez', deporte: 'Swimming', rating: 5.0, totalReviews: 12, precio: '$40/hour', experiencia: '12 years', whatsapp: '+57 320 4561237', disponibilidad: 'Daily 6-10 AM', especialidad: 'All strokes & endurance', verified: true, sessionsDelivered: 320, tournamentWins: 12, rankInSport: 1, totalCoachesInSport: 3 },
    { id: 5, nombre: 'David Silva', deporte: 'Running', rating: 4.6, totalReviews: 15, precio: '$25/hour', experiencia: '5 years', whatsapp: '+57 318 7894561', disponibilidad: 'Mon-Sat 6-9 AM', especialidad: 'Marathon training', verified: false, sessionsDelivered: 45, tournamentWins: 1, rankInSport: 4, totalCoachesInSport: 6 },
  ];

  const reviews: Record<number, Review[]> = {
    1: [
      { id: 1, estudiante: 'Student A', rating: 5, comentario: 'Excellent coach! Improved my technique significantly.', fecha: 'Jan 20, 2026' },
      { id: 2, estudiante: 'Student B', rating: 5, comentario: 'Very patient and knowledgeable. Highly recommend!', fecha: 'Jan 15, 2026' },
      { id: 3, estudiante: 'Student C', rating: 4, comentario: 'Good sessions, would like more tactical exercises.', fecha: 'Jan 10, 2026' },
    ],
    2: [
      { id: 1, estudiante: 'Student D', rating: 5, comentario: 'Best tennis coach! My serve has improved dramatically.', fecha: 'Jan 22, 2026' },
      { id: 2, estudiante: 'Student E', rating: 5, comentario: 'Professional and dedicated. Great experience!', fecha: 'Jan 18, 2026' },
    ],
    3: [
      { id: 1, estudiante: 'Student F', rating: 5, comentario: 'Helped me improve my shooting accuracy. Great coach!', fecha: 'Jan 19, 2026' },
      { id: 2, estudiante: 'Student G', rating: 4, comentario: 'Good training sessions, clear explanations.', fecha: 'Jan 12, 2026' },
    ],
    4: [
      { id: 1, estudiante: 'Student H', rating: 5, comentario: 'Perfect technique instruction. Very professional.', fecha: 'Jan 25, 2026' },
      { id: 2, estudiante: 'Student I', rating: 5, comentario: 'Amazing coach! Improved all my strokes.', fecha: 'Jan 21, 2026' },
    ],
    5: [
      { id: 1, estudiante: 'Student J', rating: 5, comentario: 'Great marathon prep program. Highly recommended!', fecha: 'Jan 24, 2026' },
      { id: 2, estudiante: 'Student K', rating: 4, comentario: 'Good coaching, helped improve my pace.', fecha: 'Jan 16, 2026' },
    ],
  };

  const deportes = ['all', 'Soccer', 'Tennis', 'Basketball', 'Swimming', 'Running'];
  const filteredProfesores = filter === 'all' ? profesores : profesores.filter(p => p.deporte === filter);

  const renderStars = (rating: number, size: number = 14) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <Star key={star} size={size} weight={star <= Math.round(rating) ? 'fill' : 'regular'} className={star <= Math.round(rating) ? 'text-amber-400' : 'text-gray-300'} />
      ))}
    </div>
  );

  const handleWhatsApp = (whatsapp: string, nombre: string) => {
    const message = encodeURIComponent(`Hi ${nombre}, I'm interested in your classes!`);
    window.open(`https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="pb-4 space-y-5 pt-2">

      {/* Sport Filter */}
      <div className="px-5">
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {deportes.map(dep => (
            <button
              key={dep}
              onClick={() => setFilter(dep)}
              className={`px-4 py-2 rounded-2xl text-[13px] font-bold whitespace-nowrap transition-all shadow-sm ${filter === dep
                ? 'bg-primary dark:bg-primary text-white scale-105'
                : 'bg-white dark:bg-gray-800 text-muted-foreground dark:text-gray-400 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
              {dep === 'all' ? 'All Coaches' : dep}
            </button>
          ))}
        </div>
      </div>

      {/* Coach Cards */}
      <div className="px-5 space-y-4 pt-2">
        {filteredProfesores.map(prof => (
          <div key={prof.id} className="bg-white dark:bg-gray-800 rounded-[28px] p-5 shadow-lg shadow-gray-200/40 dark:shadow-black/20 border border-gray-50 dark:border-gray-700/50">
            {/* Header Area */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/60 dark:from-gray-700 dark:to-gray-600 text-primary dark:text-tertiary rounded-2xl flex items-center justify-center flex-shrink-0 text-xl font-black font-heading shadow-inner">
                  {prof.nombre.split(' ').map(n => n[0]).join('')}
                </div>
                {prof.verified && (
                  <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-md">
                    <SealCheck size={16} weight="fill" className="text-blue-500" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex flex-wrap items-center gap-1.5 mb-1">
                  <h3 className="text-base font-black font-heading text-foreground dark:text-white leading-tight">{prof.nombre}</h3>
                </div>
                <p className="text-[13px] font-medium text-tertiary dark:text-tertiary/90 mb-1.5">{prof.deporte} • {prof.precio}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded text-amber-600 dark:text-amber-500">
                    <Star size={12} weight="fill" />
                    <span className="text-[11px] font-bold">{prof.rating}</span>
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground dark:text-gray-400">{prof.totalReviews} reviews</span>
                </div>
              </div>
            </div>

            {/* Specialties & Info */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-3.5 mb-4">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Medal size={16} weight="duotone" className="text-tertiary" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{prof.experiencia} exp.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy size={16} weight="duotone" className="text-orange-500" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">#{prof.rankInSport} in {prof.deporte}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-700/50 pt-3">
                <span className="font-semibold text-foreground dark:text-gray-200">Specialty:</span> {prof.especialidad}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedProfesor(prof.id)}
                className="flex-1 px-4 py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
              >
                View Profile
              </button>
              <button
                onClick={() => handleWhatsApp(prof.whatsapp, prof.nombre)}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-all active:scale-[0.98]"
              >
                <Phone size={22} weight="fill" />
              </button>
            </div>
          </div>
        ))}

        {filteredProfesores.length === 0 && (
          <div className="text-center py-8 bg-muted rounded-2xl">
            <p className="text-sm text-muted-foreground">No coaches found for this sport</p>
          </div>
        )}
      </div>

      {/* Coach Detail Modal */}
      {selectedProfesor && (() => {
        const prof = profesores.find(p => p.id === selectedProfesor);
        if (!prof) return null;
        return (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-5 z-[100]">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl max-h-[85vh] overflow-y-auto">
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold font-heading uppercase leading-tight">{prof.nombre}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(prof.rating, 16)}
                      <span className="text-sm font-bold font-data text-primary">{prof.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{prof.totalReviews} reviews</p>
                  </div>
                  <button onClick={() => setSelectedProfesor(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <X size={18} weight="bold" />
                  </button>
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Sport', value: prof.deporte },
                      { label: 'Price', value: prof.precio },
                      { label: 'Experience', value: prof.experiencia },
                      { label: 'Availability', value: prof.disponibilidad },
                    ].map(stat => (
                      <div key={stat.label} className="bg-muted rounded-xl p-3">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{stat.label}</p>
                        <p className="text-sm font-bold text-primary">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-muted rounded-xl p-3">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Specialty</p>
                    <p className="text-sm font-bold text-primary">{prof.especialidad}</p>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="mb-4">
                  <h4 className="text-sm font-bold font-heading uppercase mb-2 flex items-center gap-1.5">
                    <TrendUp size={14} weight="bold" className="text-tertiary" />
                    Performance
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-muted rounded-xl p-2.5 text-center">
                      <p className="text-lg font-bold font-data text-primary">{prof.sessionsDelivered}</p>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">Sessions</p>
                    </div>
                    <div className="bg-muted rounded-xl p-2.5 text-center">
                      <p className="text-lg font-bold font-data text-primary">{prof.tournamentWins}</p>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">Wins</p>
                    </div>
                    <div className="bg-muted rounded-xl p-2.5 text-center">
                      <p className="text-lg font-bold font-data text-primary">#{prof.rankInSport}</p>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">Rank</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1">
                    <Trophy size={12} weight="duotone" className="text-tertiary" />
                    Ranked #{prof.rankInSport} of {prof.totalCoachesInSport} {prof.deporte} coaches
                    {prof.verified && ' • Verified Athlete'}
                  </p>
                </div>

                {/* Reviews */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold font-heading uppercase">Reviews</h4>
                    <button onClick={() => setShowReviewModal(true)} className="text-xs font-semibold text-tertiary flex items-center gap-1">
                      <ChatCircle size={12} weight="bold" />
                      Add Review
                    </button>
                  </div>
                  <div className="space-y-2">
                    {reviews[selectedProfesor]?.slice(0, 3).map(review => (
                      <div key={review.id} className="bg-muted rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold">{review.estudiante}</span>
                          {renderStars(review.rating, 10)}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{review.fecha}</p>
                        <p className="text-xs text-foreground">{review.comentario}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleWhatsApp(prof.whatsapp, prof.nombre)}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-foreground flex items-center justify-center gap-2 hover:bg-gray-50"
                  >
                    <Phone size={16} weight="bold" />
                    Contact
                  </button>
                  <button className="flex-1 px-4 py-3 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90">
                    Book Class
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Add Review Modal */}
      {showReviewModal && selectedProfesor && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-5 z-[110]">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-heading uppercase">Add Review</h3>
              <button onClick={() => setShowReviewModal(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={18} weight="bold" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center hover:bg-secondary transition-colors">
                      <Star size={18} weight="fill" className="text-amber-400" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Comment</label>
                <textarea className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary" placeholder="Share your experience..." />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowReviewModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-muted-foreground hover:bg-gray-50">Cancel</button>
              <button onClick={() => setShowReviewModal(false)} className="flex-1 px-4 py-2.5 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90">Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Request Coach Modal (FAB action) */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-5 z-[100]">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-heading uppercase">Request Coach</h3>
              <button onClick={() => setShowSearchModal(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={18} weight="bold" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Sport</label>
                <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary">
                  <option>Soccer</option>
                  <option>Tennis</option>
                  <option>Basketball</option>
                  <option>Swimming</option>
                  <option>Running</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Skill Level</label>
                <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Preferred Schedule</label>
                <input type="text" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary" placeholder="e.g. Weekdays 4-6 PM" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Notes</label>
                <textarea className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm h-20 resize-none focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary" placeholder="Anything specific you're looking for..." />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowSearchModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-muted-foreground hover:bg-gray-50">Cancel</button>
              <button onClick={() => setShowSearchModal(false)} className="flex-1 px-4 py-2.5 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
