import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function Header({ searchValue, onSearchChange }: HeaderProps) {
  const [inputValue, setInputValue] = useState(searchValue);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sincronizar input com valor externo
  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  // Debounce da busca
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Limpar timer anterior
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Criar novo timer
    debounceTimerRef.current = setTimeout(() => {
      onSearchChange(value);
    }, 300);
  };

  // Limpar timer ao desmontar
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Cancelar debounce e aplicar imediatamente
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    onSearchChange(inputValue);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 rounded-lg"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-500 rounded-xl flex items-center justify-center shadow-sm">
              <svg
                className="w-6 h-6 text-white"
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
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-800">
                Agenda Maceió
              </h1>
              <p className="text-xs text-gray-500 -mt-0.5">
                Eventos e entretenimento
              </p>
            </div>
          </Link>

          {/* Campo de busca */}
          <form 
            onSubmit={handleSubmit}
            className="flex-1 max-w-xl"
            role="search"
          >
            <label htmlFor="search-events" className="sr-only">
              Buscar eventos
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-sky-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search-events"
                name="search"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Buscar eventos, shows, teatro..."
                className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all hover:border-sky-300"
                autoComplete="off"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => {
                    setInputValue('');
                    onSearchChange('');
                  }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label="Limpar busca"
                >
                  <svg
                    className="h-5 w-5 text-gray-400 hover:text-sky-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}
