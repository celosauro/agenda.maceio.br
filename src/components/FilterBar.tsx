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
  { value: 'today', label: 'Hoje' },
  { value: 'tomorrow', label: 'Amanhã' },
  { value: 'this-week', label: 'Esta semana' },
  { value: 'weekend', label: 'Este fim de semana' },
  { value: 'next-week', label: 'Semana que vem' },
  { value: 'all', label: 'Qualquer data' },
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
  // Usar sempre as cores do Cinema (slate) para todas as categorias selecionadas
  const selectedColors = CATEGORY_COLORS[EventCategory.CINEMA];

  return (
    <fieldset>
      <legend className="text-sm font-semibold text-gray-700 mb-3">
        Explore por categoria
      </legend>
      
      {/* Grid de Categorias - preenche todo o espaço */}
      <div 
        className="grid grid-cols-4 sm:grid-cols-8 gap-2"
        role="group" 
        aria-label="Filtrar por categorias"
      >
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          const config = CATEGORY_CONFIG[category];
          
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryToggle(category)}
              className={`
                flex flex-col items-center justify-center gap-1.5 p-2 sm:p-3 rounded-xl transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1
                aspect-square
                ${isSelected 
                  ? `bg-gradient-to-br ${selectedColors.bg} shadow-lg ring-2 ring-sky-400` 
                  : 'bg-white hover:bg-gray-50 shadow-sm hover:shadow-md border border-gray-100'
                }
              `}
              aria-pressed={isSelected}
            >
              {/* Ícone SVG com fundo colorido */}
              <div className={`
                w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all duration-300
                ${isSelected 
                  ? `${selectedColors.iconBg} shadow-md` 
                  : 'bg-gray-100'
                }
              `}>
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? 'text-white' : 'text-gray-600'}`}
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
                text-[10px] sm:text-xs font-medium text-center leading-tight
                ${isSelected ? 'text-gray-800' : 'text-gray-600'}
              `}>
                {config.label}
              </span>
            </button>
          );
        })}
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
  return (
    <fieldset 
      id="event-filters" 
      className="flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <legend className="text-sm font-semibold text-gray-700">
          Quando
        </legend>
        
        {/* Botão limpar filtros */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1 focus:outline-none focus:underline px-2 py-1 rounded-lg hover:bg-sky-50 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
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

      {/* Radio Buttons de Data */}
      <div 
        className="flex flex-wrap gap-2"
        role="radiogroup" 
        aria-label="Filtrar por data"
      >
        {DATE_FILTERS.map((filter) => {
          const isSelected = selectedDateFilter === filter.value;
          
          return (
            <button
              key={filter.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onDateFilterChange(filter.value)}
              className={`
                px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1
                ${isSelected 
                  ? 'bg-sky-500 text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-sky-300 hover:bg-sky-50'
                }
              `}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </fieldset>
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
