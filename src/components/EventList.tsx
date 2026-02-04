import type { Event } from '../types/event';
import { EventCard } from './EventCard';

interface EventListProps {
  events: Event[];
  totalCount: number;
  isFiltered: boolean;
}

export function EventList({ events, totalCount, isFiltered }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-100 mb-4">
          <svg
            className="w-8 h-8 text-sky-400"
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
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Nenhum evento encontrado
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          {isFiltered
            ? 'Tente ajustar os filtros ou buscar por outro termo.'
            : 'Não há eventos cadastrados no momento.'}
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Lista de eventos">
      {/* Contador de resultados - acessível para screen readers */}
      <div 
        className="mb-4" 
        role="status" 
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-sm text-gray-500">
          {isFiltered ? (
            <>
              Mostrando <span className="font-semibold text-gray-700">{events.length}</span> de{' '}
              <span className="font-semibold text-gray-700">{totalCount}</span> eventos
            </>
          ) : (
            <>
              <span className="font-semibold text-gray-700">{events.length}</span> eventos encontrados
            </>
          )}
        </p>
      </div>

      {/* Grid de eventos - 4 colunas em telas grandes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
