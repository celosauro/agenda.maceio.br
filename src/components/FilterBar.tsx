import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EventCategory, CATEGORY_CONFIG } from '../types/event';
import type { DateFilter } from '../types/event';

interface CategoryFilterProps {
  selectedCategories: EventCategory[];
  onCategoryToggle: (category: EventCategory) => void;
}

interface DateFilterBarProps {
  selectedDateFilter: DateFilter;
  onDateFilterChange: (filter: DateFilter) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const DATE_FILTERS: { value: DateFilter; label: string }[] = [
  { value: 'all', label: 'Qualquer data' },
  { value: 'today', label: 'Hoje' },
  { value: 'tomorrow', label: 'Amanhã' },
  { value: 'this-week', label: 'Esta semana' },
  { value: 'weekend', label: 'Este fim de semana' },
  { value: 'next-week', label: 'Semana que vem' },
];

// Cores de fundo para cada categoria (gradientes suaves)
const CATEGORY_COLORS: Record<EventCategory, { bg: string; iconBg: string }> = {
  [EventCategory.SHOW]: { bg: 'from-rose-100 to-rose-200', iconBg: 'bg-rose-500' },
  [EventCategory.TEATRO]: { bg: 'from-violet-100 to-violet-200', iconBg: 'bg-violet-500' },
  [EventCategory.FESTIVAL]: { bg: 'from-orange-100 to-orange-200', iconBg: 'bg-orange-500' },
  [EventCategory.STANDUP]: { bg: 'from-yellow-100 to-yellow-200', iconBg: 'bg-yellow-500' },
  [EventCategory.EXPOSICAO]: { bg: 'from-sky-100 to-sky-200', iconBg: 'bg-sky-500' },
  [EventCategory.CINEMA]: { bg: 'from-slate-100 to-slate-200', iconBg: 'bg-slate-500' },
  [EventCategory.DANCA]: { bg: 'from-fuchsia-100 to-fuchsia-200', iconBg: 'bg-fuchsia-500' },
  [EventCategory.BARZINHO]: { bg: 'from-amber-100 to-amber-200', iconBg: 'bg-amber-500' },
};

export function CategoryFilter({
  selectedCategories,
  onCategoryToggle,
}: CategoryFilterProps) {
  const categories = Object.values(EventCategory);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <fieldset className="relative">
      <div className="flex items-center justify-between mb-3">
        <legend className="text-sm font-semibold text-gray-700">
          Explore por categoria
        </legend>
      </div>
      
      {/* Container do Carrossel */}
      <div className="relative group">
        {/* Botão Scroll Esquerda */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200 border border-gray-200"
            aria-label="Rolar para esquerda"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Botão Scroll Direita */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200 border border-gray-200"
            aria-label="Rolar para direita"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Gradiente de fade nas bordas */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-[5] pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent z-[5] pointer-events-none" />
        )}

        {/* Lista de Categorias */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-1"
          role="group" 
          aria-label="Filtrar por categorias"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            const config = CATEGORY_CONFIG[category];
            // Usar sempre as cores do Cinema (slate) para todas as categorias selecionadas
            const selectedColors = CATEGORY_COLORS[EventCategory.CINEMA];
            
            return (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryToggle(category)}
                className={`
                  flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2
                  min-w-[100px] sm:min-w-[120px]
                  ${isSelected 
                    ? `bg-gradient-to-br ${selectedColors.bg} shadow-lg scale-105 ring-2 ring-sky-400` 
                    : 'bg-white hover:bg-gray-50 shadow-sm hover:shadow-md border border-gray-100'
                  }
                `}
                aria-pressed={isSelected}
              >
                {/* Ícone SVG com fundo colorido */}
                <div className={`
                  w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-300
                  ${isSelected 
                    ? `${selectedColors.iconBg} shadow-md` 
                    : 'bg-gray-100'
                  }
                `}>
                  <svg
                    className={`w-6 h-6 sm:w-7 sm:h-7 ${isSelected ? 'text-white' : 'text-gray-600'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={config.icon}
                    />
                  </svg>
                </div>
                
                {/* Label */}
                <span className={`
                  text-xs sm:text-sm font-medium text-center leading-tight
                  ${isSelected ? 'text-gray-800' : 'text-gray-600'}
                `}>
                  {config.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </fieldset>
  );
}

export function DateFilterBar({
  selectedDateFilter,
  onDateFilterChange,
  onClearFilters,
  hasActiveFilters,
}: DateFilterBarProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDateFilterChange(e.target.value as DateFilter);
  };

  return (
    <div 
      id="event-filters" 
      className="flex flex-wrap items-center gap-4"
      aria-label="Filtro de data"
    >
      {/* Select de Data */}
      <div className="flex items-center gap-2">
        <label htmlFor="date-filter" className="text-gray-600 text-sm font-medium whitespace-nowrap">
          Quando:
        </label>
        <select
          id="date-filter"
          value={selectedDateFilter}
          onChange={handleDateChange}
          className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sky-600 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all cursor-pointer hover:border-sky-300"
        >
          {DATE_FILTERS.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>

      {/* Botão limpar filtros */}
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="text-sm text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1 focus:outline-none focus:underline px-3 py-2 rounded-lg hover:bg-sky-50 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Limpar filtros
        </button>
      )}
    </div>
  );
}

// Mantém export legado para compatibilidade
export function FilterBar(props: CategoryFilterProps & DateFilterBarProps) {
  return (
    <nav className="flex flex-col gap-4" aria-label="Filtros de eventos">
      <CategoryFilter 
        selectedCategories={props.selectedCategories} 
        onCategoryToggle={props.onCategoryToggle} 
      />
      <DateFilterBar 
        selectedDateFilter={props.selectedDateFilter}
        onDateFilterChange={props.onDateFilterChange}
        onClearFilters={props.onClearFilters}
        hasActiveFilters={props.hasActiveFilters}
      />
    </nav>
  );
}
