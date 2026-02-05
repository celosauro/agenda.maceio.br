import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Event } from '../types/event';
import { CategoryBadge } from './CategoryBadge';
import { formatShortDate, formatTime, getISODate, formatPrice, generateEventSlug } from '../utils/date';

interface FeaturedCarouselProps {
  events: Event[];
  autoPlayInterval?: number;
}

const PLACEHOLDER_IMAGE = 'https://placehold.co/800x400/f0f9ff/0ea5e9?text=Evento';

export function FeaturedCarousel({ events, autoPlayInterval = 5000 }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const totalSlides = events.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, goToNext, totalSlides]);

  // Pausar auto-play no hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (events.length === 0) return null;

  const currentEvent = events[currentIndex];
  const imageUrl = currentEvent.thumbnail
    ? currentEvent.thumbnail.replace(/w=\d+&h=\d+/, 'w=800&h=400')
    : PLACEHOLDER_IMAGE;
  const eventSlug = generateEventSlug(currentEvent.date, currentEvent.title);
  const eventUrl = `/evento/${eventSlug}`;

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Eventos em destaque"
    >
      {/* Slide atual */}
      <div className="relative overflow-hidden rounded-2xl">
        <Link to={eventUrl} className="block group">
          <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
            <img
              src={imageUrl}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = PLACEHOLDER_IMAGE;
              }}
            />
            
            {/* Gradiente overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Badge de categoria */}
            <div className="absolute top-4 left-4">
              <CategoryBadge category={currentEvent.category} />
            </div>

            {/* Conteúdo sobre a imagem */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 line-clamp-2 drop-shadow-lg">
                {currentEvent.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5" />
                  <time dateTime={getISODate(currentEvent.date)} className="font-medium">
                    {formatShortDate(currentEvent.date)} • {formatTime(currentEvent.date)}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium truncate max-w-[200px]">{currentEvent.location}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className={`text-lg font-bold ${currentEvent.price === null ? 'text-emerald-400' : 'text-white'}`}>
                  {formatPrice(currentEvent.price)}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-lg group-hover:bg-sky-500 transition-colors">
                  Ver detalhes
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Botões de navegação */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                goToPrevious();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Evento anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                goToNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Próximo evento"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Indicadores de paginação */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Navegação do carrossel">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-sky-500'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Ir para evento ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
