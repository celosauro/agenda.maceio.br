import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
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
            <svg
              className="w-10 h-10 text-sky-400"
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
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
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
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
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
                    <svg
                      className="w-6 h-6 text-sky-600"
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
                    <svg
                      className="w-6 h-6 text-sky-600"
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
                    <svg
                      className="w-6 h-6 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
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
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
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
