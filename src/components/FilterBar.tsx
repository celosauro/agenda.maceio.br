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

export function CategoryFilter({
  selectedCategories,
  onCategoryToggle,
}: CategoryFilterProps) {
  const categories = Object.values(EventCategory);

  return (
    <fieldset>
      <legend className="text-sm font-medium text-gray-600 mb-3">
        Categorias
      </legend>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categorias">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          const config = CATEGORY_CONFIG[category];
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryToggle(category)}
              className={`
                w-16 h-16 flex flex-col items-center justify-center gap-0.5 rounded-lg text-[10px] font-medium transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1
                ${isSelected 
                  ? 'bg-sky-100 text-sky-700 border-2 border-sky-400 shadow-md scale-[1.02]' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-sky-300 hover:shadow-sm'
                }
              `}
              aria-pressed={isSelected}
            >
              <svg
                className="w-5 h-5"
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
              <span className="text-center leading-tight">{config.label}</span>
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
