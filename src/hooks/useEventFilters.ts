import { useSearchParams } from 'react-router-dom';
import { useMemo, useCallback } from 'react';
import { EventCategory } from '../types/event';
import type { Event, DateFilter } from '../types/event';
import { isToday, isTomorrow, isThisWeekend, isThisWeek, isNextWeek, isPastEvent, parseLocalDate } from '../utils/date';
import eventsData from '../data/events.json';

interface UseEventFiltersReturn {
  events: Event[];
  upcomingEvents: Event[];
  filteredEvents: Event[];
  totalCount: number;
  filteredCount: number;
  search: string;
  categories: EventCategory[];
  dateFilter: DateFilter;
  setSearch: (value: string) => void;
  toggleCategory: (value: EventCategory) => void;
  setDateFilter: (value: DateFilter) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export function useEventFilters(): UseEventFiltersReturn {
  const [searchParams, setSearchParams] = useSearchParams();

  // Ler filtros da URL
  const search = searchParams.get('search') || '';
  const categoryParam = searchParams.get('categories');
  const categories: EventCategory[] = categoryParam
    ? categoryParam.split(',').filter((c): c is EventCategory => 
        Object.values(EventCategory).includes(c as EventCategory)
      )
    : [];
  const dateFilterParam = searchParams.get('date');
  const dateFilter: DateFilter = ['today', 'tomorrow', 'weekend', 'this-week', 'next-week', 'all'].includes(dateFilterParam || '')
    ? (dateFilterParam as DateFilter)
    : 'today';

  // Carregar e tipar eventos
  const events = useMemo(() => {
    return eventsData as Event[];
  }, []);

  // Eventos futuros (base para contagem total)
  const upcomingEvents = useMemo(() => {
    return events.filter((event) => !isPastEvent(event.date));
  }, [events]);

  // Aplicar filtros e ordenação
  const filteredEvents = useMemo(() => {
    let result = [...upcomingEvents];

    // Filtro por busca
    if (search.trim()) {
      const searchLower = search.toLowerCase().trim();
      result = result.filter((event) =>
        event.title.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower)
      );
    }

    // Filtro por categorias (múltiplas)
    if (categories.length > 0) {
      result = result.filter((event) => categories.includes(event.category));
    }

    // Filtro por data
    if (dateFilter !== 'all') {
      result = result.filter((event) => {
        switch (dateFilter) {
          case 'today':
            return isToday(event.date);
          case 'tomorrow':
            return isTomorrow(event.date);
          case 'weekend':
            return isThisWeekend(event.date);
          case 'this-week':
            return isThisWeek(event.date);
          case 'next-week':
            return isNextWeek(event.date);
          default:
            return true;
        }
      });
    }

    // Ordenar por data (mais próxima primeiro) + título alfabético como desempate
    result.sort((a, b) => {
      const dateA = parseLocalDate(a.date).getTime();
      const dateB = parseLocalDate(b.date).getTime();
      if (dateA !== dateB) {
        return dateA - dateB;
      }
      return a.title.localeCompare(b.title, 'pt-BR');
    });

    return result;
  }, [upcomingEvents, search, categories, dateFilter]);

  // Funções para atualizar filtros
  const updateParams = useCallback((updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const setSearch = useCallback((value: string) => {
    // Se há texto de busca, aplica filtro "qualquer data" automaticamente
    if (value.trim()) {
      updateParams({ search: value, date: 'all' });
    } else {
      // Se limpou a busca, remove o parâmetro search (mantém date como está)
      updateParams({ search: null });
    }
  }, [updateParams]);

  const toggleCategory = useCallback((value: EventCategory) => {
    const newCategories = categories.includes(value)
      ? categories.filter(c => c !== value)
      : [...categories, value];
    updateParams({ categories: newCategories.length > 0 ? newCategories.join(',') : null });
  }, [updateParams, categories]);

  const setDateFilter = useCallback((value: DateFilter) => {
    updateParams({ date: value === 'today' ? null : value });
  }, [updateParams]);

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  // Considerar filtro ativo quando há busca, categorias, ou qualquer filtro de data diferente de "all"
  const hasActiveFilters = search !== '' || categories.length > 0 || dateFilter !== 'all';

  return {
    events,
    upcomingEvents,
    filteredEvents,
    totalCount: upcomingEvents.length,
    filteredCount: filteredEvents.length,
    search,
    categories,
    dateFilter,
    setSearch,
    toggleCategory,
    setDateFilter,
    clearFilters,
    hasActiveFilters,
  };
}
