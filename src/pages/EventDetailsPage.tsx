import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { CalendarDays, MapPin, Ticket, ArrowLeft, Share2, AlertCircle, Clock } from 'lucide-react';
import type { Event } from '../types/event';
import { CategoryBadge } from '../components';
import { formatFullDate, formatTime, getISODate, formatPrice, generateEventSlug } from '../utils/date';
import eventsData from '../data/events.json';

const PLACEHOLDER_IMAGE = 'https://placehold.co/800x400/f0f9ff/0ea5e9?text=Evento';

export function EventDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const event = useMemo(() => {
    const events = eventsData as Event[];
    // Encontrar evento pelo slug (comparando o slug gerado)
    return events.find((e) => generateEventSlug(e.date, e.title) === slug);
  }, [slug]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sky-100 mb-6">
            <AlertCircle className="w-10 h-10 text-sky-500" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Evento não encontrado
          </h1>
          <p className="text-gray-500 mb-6">
            O evento que você está procurando não existe ou foi removido.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 text-white font-medium rounded-xl hover:bg-sky-600 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para a agenda
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = event.thumbnail || PLACEHOLDER_IMAGE;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com botão voltar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-sky-600 font-medium focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 rounded-lg px-2 py-1 -ml-2 cursor-pointer"
              aria-label="Voltar para a página anterior"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: event.title,
                    text: `Confira este evento: ${event.title}`,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copiado para a área de transferência!');
                }
              }}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-sky-600 font-medium rounded-lg hover:bg-sky-50 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
              aria-label="Compartilhar evento"
            >
              <Share2 className="w-5 h-5" />
              <span className="hidden sm:inline">Compartilhar</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Imagem do evento */}
          <div className="relative aspect-[2/1] bg-gray-100">
            <img
              src={imageUrl}
              alt={`Imagem do evento ${event.title}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = PLACEHOLDER_IMAGE;
              }}
            />
          </div>

          {/* Conteúdo */}
          <div className="p-6 sm:p-8">
            {/* Badge de categoria */}
            <div className="mb-3">
              <CategoryBadge category={event.category} size="md" />
            </div>

            {/* Título */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              {event.title}
            </h1>

            {/* Grid de informações */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Data */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="flex-shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-gray-600" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Data
                  </h2>
                  <time
                    dateTime={getISODate(event.date)}
                    className="text-sm font-semibold text-gray-800 truncate block"
                  >
                    {formatFullDate(event.date)}
                  </time>
                </div>
              </div>

              {/* Horário */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="flex-shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gray-600" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Horário
                  </h2>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatTime(event.date)}
                  </p>
                </div>
              </div>

              {/* Localização */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="flex-shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-600" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Local
                  </h2>
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {event.location}
                  </p>
                </div>
              </div>

              {/* Preço */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="flex-shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                  <Ticket className="w-5 h-5 text-gray-600" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Valor
                  </h2>
                  <p
                    className={`text-sm font-semibold ${
                      event.price === null ? 'text-emerald-600' : 'text-gray-800'
                    }`}
                  >
                    {formatPrice(event.price)}
                  </p>
                </div>
              </div>
            </div>

            {/* Endereço completo */}
            <div className="p-4 bg-gray-50 rounded-xl mb-6">
              <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Endereço
              </h2>
              <address className="text-sm text-gray-700 not-italic">
                {event.address}
              </address>
            </div>

            {/* Descrição */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Sobre o evento
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>
          </div>

          {/* Rodapé com botão compartilhar */}
          <div className="bg-gray-50 px-6 sm:px-8 py-4 border-t border-gray-100">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: event.title,
                    text: `Confira este evento: ${event.title}`,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copiado para a área de transferência!');
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-sky-500 text-white font-medium rounded-xl hover:bg-sky-600 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 cursor-pointer"
            >
              <Share2 className="w-5 h-5" />
              Compartilhar evento
            </button>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <Link
              to="/"
              className="text-sky-600 hover:text-sky-700 font-medium"
            >
              ← Voltar para a agenda
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
