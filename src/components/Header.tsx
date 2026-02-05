import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';

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
        <div className="flex items-center justify-between h-20 gap-6">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 rounded-lg"
          >
            <img src="/logo.svg" alt="Agenda Maceió" className="w-12 h-12" />
          </Link>

          {/* Campo de busca - mais evidente */}
          <form 
            onSubmit={handleSubmit}
            className="flex-1 max-w-2xl"
            role="search"
          >
            <label htmlFor="search-events" className="sr-only">
              Buscar eventos
            </label>
            <div className="relative">
              <input
                type="search"
                id="search-events"
                name="search"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="O que você quer fazer em Maceió?"
                className="block w-full pl-5 pr-14 py-3.5 border-2 border-gray-200 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all hover:border-sky-300 shadow-sm text-base"
                autoComplete="off"
              />
              {inputValue ? (
                <button
                  type="button"
                  onClick={() => {
                    setInputValue('');
                    onSearchChange('');
                  }}
                  className="absolute inset-y-0 right-14 flex items-center"
                  aria-label="Limpar busca"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              ) : null}
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full"
                aria-label="Buscar"
              >
                <div className="w-10 h-10 bg-sky-500 hover:bg-sky-600 rounded-full flex items-center justify-center transition-colors shadow-md">
                  <Search className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}
