import { Header, CategoryFilter, DateFilterBar, EventList } from '../components';
import { useEventFilters } from '../hooks/useEventFilters';

export function HomePage() {
  const {
    filteredEvents,
    totalCount,
    search,
    categories,
    dateFilter,
    setSearch,
    toggleCategory,
    setDateFilter,
    clearFilters,
    hasActiveFilters,
  } = useEventFilters();

  return (
    <>
      {/* Skip Links para acessibilidade */}
      <a href="#main-content" className="skip-link">
        Ir para o conteúdo principal
      </a>
      <a href="#event-filters" className="skip-link">
        Ir para os filtros
      </a>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header searchValue={search} onSearchChange={setSearch} />

        <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
          {/* Título da seção */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Descubra eventos em Maceió
            </h2>
            <p className="text-gray-500">
              Shows, teatro, exposições e muito mais na capital alagoana
            </p>
          </div>

          {/* Filtro de Categorias */}
          <div className="mb-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <CategoryFilter
              selectedCategories={categories}
              onCategoryToggle={toggleCategory}
            />
          </div>

          {/* Filtro de Data */}
          <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <DateFilterBar
              selectedDateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>

          {/* Lista de eventos */}
          <EventList
            events={filteredEvents}
            totalCount={totalCount}
            isFiltered={hasActiveFilters}
          />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                © 2026 Agenda Maceió. Todos os direitos reservados.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Desenvolvido com ♥ para a comunidade maceioense
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
