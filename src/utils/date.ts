/**
 * Utilitários de data com formatação pt-BR
 * Usa Intl.DateTimeFormat nativo para melhor performance
 */

// Formatador para dia da semana completo + data
const fullDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

// Formatador para dia da semana curto + data curta
const shortDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
});

// Formatador para hora
const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
});

// Formatador para data completa com hora
const fullDateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

/**
 * Formata data para exibição no card (ex: "Sáb, 7 de fev")
 */
export function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  const formatted = shortDateFormatter.format(date);
  // Capitaliza primeira letra
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * Formata data completa para página de detalhes (ex: "Sábado, 7 de fevereiro")
 */
export function formatFullDate(dateString: string): string {
  const date = new Date(dateString);
  const formatted = fullDateFormatter.format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * Formata hora (ex: "19:00")
 */
export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return timeFormatter.format(date);
}

/**
 * Formata data e hora completos para página de detalhes
 */
export function formatFullDateTime(dateString: string): string {
  const date = new Date(dateString);
  const formatted = fullDateTimeFormatter.format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * Retorna data no formato ISO para atributo datetime do elemento <time>
 */
export function getISODate(dateString: string): string {
  return new Date(dateString).toISOString();
}

/**
 * Verifica se a data é hoje
 */
export function isToday(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Verifica se a data é amanhã
 */
export function isTomorrow(dateString: string): boolean {
  const date = new Date(dateString);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
}

/**
 * Verifica se a data é neste fim de semana (próximo sábado ou domingo)
 */
export function isThisWeekend(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  
  // Encontrar o próximo sábado
  const daysUntilSaturday = (6 - today.getDay() + 7) % 7 || 7;
  const saturday = new Date(today);
  saturday.setDate(today.getDate() + daysUntilSaturday);
  saturday.setHours(0, 0, 0, 0);
  
  // Domingo é o dia seguinte
  const sunday = new Date(saturday);
  sunday.setDate(saturday.getDate() + 1);
  sunday.setHours(23, 59, 59, 999);
  
  // Se hoje for sábado ou domingo, considerar este fim de semana
  if (today.getDay() === 0 || today.getDay() === 6) {
    const startOfWeekend = new Date(today);
    if (today.getDay() === 0) {
      // Domingo - início foi ontem (sábado)
      startOfWeekend.setDate(today.getDate() - 1);
    }
    startOfWeekend.setHours(0, 0, 0, 0);
    
    const endOfWeekend = new Date(startOfWeekend);
    endOfWeekend.setDate(startOfWeekend.getDate() + 1);
    endOfWeekend.setHours(23, 59, 59, 999);
    
    return date >= startOfWeekend && date <= endOfWeekend;
  }
  
  return date >= saturday && date <= sunday;
}

/**
 * Verifica se a data está nesta semana (a partir de hoje até domingo)
 */
export function isThisWeek(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Encontrar o próximo domingo
  const daysUntilSunday = (7 - today.getDay()) % 7;
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + daysUntilSunday);
  endOfWeek.setHours(23, 59, 59, 999);
  
  return date >= today && date <= endOfWeek;
}

/**
 * Verifica se a data está na próxima semana
 */
export function isNextWeek(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Encontrar o próximo domingo (fim desta semana)
  const daysUntilSunday = (7 - today.getDay()) % 7;
  const endOfThisWeek = new Date(today);
  endOfThisWeek.setDate(today.getDate() + daysUntilSunday);
  
  // Próxima semana começa na segunda
  const startOfNextWeek = new Date(endOfThisWeek);
  startOfNextWeek.setDate(endOfThisWeek.getDate() + 1);
  startOfNextWeek.setHours(0, 0, 0, 0);
  
  // Fim da próxima semana (domingo)
  const endOfNextWeek = new Date(startOfNextWeek);
  endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);
  endOfNextWeek.setHours(23, 59, 59, 999);
  
  return date >= startOfNextWeek && date <= endOfNextWeek;
}

/**
 * Verifica se o evento já passou
 */
export function isPastEvent(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  return date < now;
}

/**
 * Formata preço em Real brasileiro
 */
export function formatPrice(price: number | null): string {
  if (price === null || price === 0) {
    return 'Gratuito';
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}
