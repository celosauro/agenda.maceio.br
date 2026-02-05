import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Share2 } from 'lucide-react';
import type { Event } from '../types/event';
import { CategoryBadge } from './CategoryBadge';
import { formatShortDate, formatTime, getISODate, formatPrice, generateEventSlug } from '../utils/date';

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'wide' | 'featured';
}

const PLACEHOLDER_IMAGE = 'https://placehold.co/400x200/f0f9ff/0ea5e9?text=Evento';

export function EventCard({ event, variant = 'default' }: EventCardProps) {
  const imageUrl = event.thumbnail 
    ? event.thumbnail.replace(/w=\d+&h=\d+/, variant === 'featured' ? 'w=800&h=400' : 'w=400&h=200')
    : PLACEHOLDER_IMAGE;

  const eventSlug = generateEventSlug(event.date, event.title);
  const eventUrl = `/evento/${eventSlug}`;

  // Card horizontal (wide) - estilo Open Event
  if (variant === 'wide') {
    return (
      <article className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-sky-200">
        <div className="flex flex-col sm:flex-row">
          {/* Imagem lateral */}
          <div className="relative sm:w-48 h-48 sm:h-auto overflow-hidden bg-gradient-to-br from-sky-100 to-sky-50 flex-shrink-0">
            <Link to={eventUrl}>
              <img
                src={imageUrl}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = PLACEHOLDER_IMAGE;
                }}
              />
            </Link>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <Link to={eventUrl} className="block group/link">
                <h3 className="text-lg font-bold text-gray-900 group-hover/link:text-sky-600 transition-colors line-clamp-2 mb-2">
                  {event.title}
                </h3>
              </Link>
              
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <CalendarDays className="w-4 h-4 text-sky-500" />
                <time dateTime={getISODate(event.date)} className="text-sm font-medium">
                  {formatShortDate(event.date)} às {formatTime(event.date)}
                </time>
              </div>

              <div className="flex items-center gap-2 text-gray-500 mb-3">
                <MapPin className="w-4 h-4 text-rose-400" />
                <address className="text-sm not-italic truncate">{event.location}</address>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <CategoryBadge category={event.category} size="sm" />
                <span className={`text-sm font-bold ${event.price === null ? 'text-emerald-600' : 'text-gray-800'}`}>
                  {formatPrice(event.price)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.share?.({ title: event.title, url: eventUrl });
                  }}
                  className="p-2 text-gray-400 hover:text-sky-500 hover:bg-sky-50 rounded-full transition-colors cursor-pointer"
                  aria-label="Compartilhar evento"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <Link
                  to={eventUrl}
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Ver detalhes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Card em destaque (featured) - maior, para hero section
  if (variant === 'featured') {
    return (
      <article className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <Link to={eventUrl} className="block">
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img
              src={imageUrl}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = PLACEHOLDER_IMAGE;
              }}
            />
            {/* Gradiente overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            {/* Badge no canto */}
            <div className="absolute top-4 left-4">
              <CategoryBadge category={event.category} />
            </div>

            {/* Conteúdo sobre a imagem */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 line-clamp-2 drop-shadow-lg">
                {event.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5" />
                  <time dateTime={getISODate(event.date)} className="font-medium">
                    {formatShortDate(event.date)} • {formatTime(event.date)}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">{event.location}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className={`text-lg font-bold ${event.price === null ? 'text-emerald-400' : 'text-white'}`}>
                  {formatPrice(event.price)}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                  Ver evento →
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Card padrão (vertical) - grid de 3 colunas
  return (
    <article className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-sky-200 flex flex-col h-full">
      <Link to={eventUrl} className="block flex-1 flex flex-col">
        {/* Imagem */}
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-sky-100 to-sky-50">
          <img
            src={imageUrl}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = PLACEHOLDER_IMAGE;
            }}
          />
          {/* Badge sobreposto */}
          <div className="absolute top-3 left-3">
            <CategoryBadge category={event.category} size="sm" />
          </div>
          {/* Preço no canto */}
          <div className="absolute bottom-3 right-3">
            <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-lg ${
              event.price === null 
                ? 'bg-emerald-500 text-white' 
                : 'bg-white text-gray-900'
            }`}>
              {formatPrice(event.price)}
            </span>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-base font-bold text-gray-900 group-hover:text-sky-600 transition-colors line-clamp-2 mb-3">
            {event.title}
          </h3>

          <div className="space-y-2 mt-auto">
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarDays className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <time dateTime={getISODate(event.date)} className="text-sm">
                {formatShortDate(event.date)} • {formatTime(event.date)}
              </time>
            </div>

            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <address className="text-sm not-italic truncate">{event.location}</address>
            </div>
          </div>
        </div>
      </Link>

      {/* Footer com ações */}
      <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
        <button 
          onClick={(e) => {
            e.preventDefault();
            navigator.share?.({ title: event.title, url: eventUrl });
          }}
          className="p-2 text-gray-400 hover:text-sky-500 hover:bg-white rounded-full transition-colors cursor-pointer"
          aria-label="Compartilhar evento"
        >
          <Share2 className="w-5 h-5" />
        </button>
        <Link
          to={eventUrl}
          className="text-sky-500 hover:text-sky-600 text-sm font-semibold transition-colors"
        >
          Ver detalhes →
        </Link>
      </div>
    </article>
  );
}
