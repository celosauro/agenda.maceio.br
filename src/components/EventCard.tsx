import { Link } from 'react-router-dom';
import type { Event } from '../types/event';
import { CategoryBadge } from './CategoryBadge';
import { formatShortDate, formatTime, getISODate, formatPrice } from '../utils/date';

interface EventCardProps {
  event: Event;
}

const PLACEHOLDER_IMAGE = 'https://placehold.co/260x140/f0f9ff/0ea5e9?text=Evento';

export function EventCard({ event }: EventCardProps) {
  const imageUrl = event.thumbnail 
    ? event.thumbnail.replace(/w=\d+&h=\d+/, 'w=260&h=140')
    : PLACEHOLDER_IMAGE;

  return (
    <article
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100 hover:border-sky-200 focus-within:ring-2 focus-within:ring-sky-400 focus-within:ring-offset-2"
    >
      <Link
        to={`/evento/${event.id}`}
        className="block focus:outline-none"
        aria-label={`Ver detalhes de ${event.title}`}
      >
        {/* Thumbnail - 260x140 */}
        <div className="relative w-full overflow-hidden bg-sky-50" style={{ height: '140px' }}>
          <img
            src={imageUrl}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = PLACEHOLDER_IMAGE;
            }}
          />
          {/* Badge de categoria sobreposto */}
          <div className="absolute top-2 left-2">
            <CategoryBadge category={event.category} size="sm" />
          </div>
        </div>

        {/* Conteúdo do card - mais compacto */}
        <div className="p-3">
          {/* Título */}
          <h3 className="text-sm font-semibold text-gray-800 group-hover:text-sky-600 transition-colors line-clamp-2 mb-1.5 leading-tight">
            {event.title}
          </h3>

          {/* Data e hora */}
          <div className="flex items-center gap-1.5 text-gray-500 mb-1">
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <time dateTime={getISODate(event.date)} className="text-xs">
              {formatShortDate(event.date)} • {formatTime(event.date)}
            </time>
          </div>

          {/* Localização */}
          <div className="flex items-center gap-1.5 text-gray-500 mb-2">
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <address className="text-xs not-italic truncate">
              {event.location}
            </address>
          </div>

          {/* Preço */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className={`text-xs font-semibold ${event.price === null ? 'text-emerald-600' : 'text-gray-700'}`}>
              {formatPrice(event.price)}
            </span>
            <span className="text-sky-500 text-xs font-medium group-hover:text-sky-600">
              Ver mais →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
