import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { CalendarDays, MapPin, DollarSign, ArrowLeft, Share2, AlertCircle } from 'lucide-react';
import type { Event } from '../types/event';
import { CategoryBadge } from '../components';
import { formatFullDate, formatTime, getISODate, formatPrice } from '../utils/date';
import eventsData from '../data/events.json';

const PLACEHOLDER_IMAGE = 'https://placehold.co/800x400/f0f9ff/0ea5e9?text=Evento';

export function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const event = useMemo(() => {
    const events = eventsData as Event[];
    return events.find((e) => e.id === id);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sky-100 mb-6">
            <AlertCircle className="w-10 h-10 text-sky-400" aria-hidden="true" />
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
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-sky-600 font-medium focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 rounded-lg px-2 py-1 -ml-2"
              aria-label="Voltar para a página anterior"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li>
                <Link to="/" className="hover:text-sky-600 transition-colors">
                  Agenda
                </Link>
              </li>
              <li aria-hidden="true">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
              <li>
                <span className="text-gray-700 font-medium truncate max-w-[200px] inline-block">
                  {event.title}
                </span>
              </li>
            </ol>
          </nav>

          {/* Imagem do evento */}
          <div className="relative aspect-[2/1] rounded-2xl overflow-hidden bg-sky-100 mb-8 shadow-sm">
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8">
              {/* Badge de categoria */}
              <div className="mb-4">
                <CategoryBadge category={event.category} size="md" />
              </div>

              {/* Título */}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
                {event.title}
              </h1>

              {/* Informações principais */}
              <div className="grid gap-4 mb-8">
                {/* Data e hora */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                    <CalendarDays className="w-6 h-6 text-sky-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-sm font-medium text-gray-500 mb-1">
                      Data e horário
                    </h2>
                    <time
                      dateTime={getISODate(event.date)}
                      className="text-lg font-semibold text-gray-800"
                    >
                      {formatFullDate(event.date)} às {formatTime(event.date)}
                    </time>
                  </div>
                </div>

                {/* Localização */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-sky-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-sm font-medium text-gray-500 mb-1">
                      Local
                    </h2>
                    <p className="text-lg font-semibold text-gray-800">
                      {event.location}
                    </p>
                    <address className="text-gray-500 not-italic">
                      {event.address}
                    </address>
                  </div>
                </div>

                {/* Preço */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-emerald-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-sm font-medium text-gray-500 mb-1">
                      Valor
                    </h2>
                    <p
                      className={`text-lg font-semibold ${
                        event.price === null ? 'text-emerald-600' : 'text-gray-800'
                      }`}
                    >
                      {formatPrice(event.price)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Sobre o evento
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Rodapé do card com ações */}
            <div className="bg-gray-50 px-6 sm:px-8 py-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-4">
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
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-sky-600 font-medium rounded-lg hover:bg-sky-50 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <Share2 className="w-5 h-5" />
                  Compartilhar
                </button>
              </div>
            </div>
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
