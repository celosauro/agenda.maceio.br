import type { Event } from '../types/event';
import { EventCard } from './EventCard';

interface EventListProps {
  events: Event[];
  totalCount: number;
  isFiltered: boolean;
  hasFeaturedEvent?: boolean;
}

export function EventList({ events, totalCount, isFiltered, hasFeaturedEvent = false }: EventListProps) {
  if (events.length === 0 && !hasFeaturedEvent) {
    return (
      <div className="text-center py-20 px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-sky-100 to-sky-200 mb-6">
          <svg
            className="w-10 h-10 text-sky-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Nenhum evento encontrado
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          {isFiltered
            ? 'Tente ajustar os filtros ou buscar por outro termo para encontrar mais eventos.'
            : 'Não há eventos cadastrados no momento. Volte em breve!'}
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Lista de eventos">
      {/* Contador de resultados */}
      <div 
        className="mb-6" 
        role="status" 
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-sm text-gray-500">
          {isFiltered ? (
            <>
              Mostrando <span className="font-bold text-gray-700">{events.length}</span> de{' '}
              <span className="font-bold text-gray-700">{totalCount}</span> eventos
            </>
          ) : (
            <>
              <span className="font-bold text-gray-700">{events.length}</span> eventos encontrados
            </>
          )}
        </p>
      </div>

      {/* Próximos eventos - grid de cards */}
      {events.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-rose-500 to-orange-500 rounded-full"></span>
            Próximos Eventos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Se não há mais eventos além do destaque */}
      {events.length === 0 && hasFeaturedEvent && (
        <div className="text-center py-8 text-gray-500">
          <p>Mais eventos em breve!</p>
        </div>
      )}
    </section>
  );
}
