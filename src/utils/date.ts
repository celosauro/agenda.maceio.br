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
 * Parseia uma string de data (YYYY-MM-DD) como data local, não UTC
 */
export function parseLocalDate(dateString: string): Date {
  // Se a string tem apenas data (YYYY-MM-DD), adiciona T00:00:00 para forçar parse local
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return new Date(dateString + 'T00:00:00');
  }
  return new Date(dateString);
}

/**
 * Formata data para exibição no card (ex: "Sáb, 7 de fev")
 */
export function formatShortDate(dateString: string): string {
  const date = parseLocalDate(dateString);
  const formatted = shortDateFormatter.format(date);
  // Capitaliza primeira letra
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * Formata data completa para página de detalhes (ex: "Sábado, 7 de fevereiro")
 */
export function formatFullDate(dateString: string): string {
  const date = parseLocalDate(dateString);
  const formatted = fullDateFormatter.format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * Formata hora (ex: "19:00")
 */
export function formatTime(dateString: string): string {
  const date = parseLocalDate(dateString);
  return timeFormatter.format(date);
}

/**
 * Formata data e hora completos para página de detalhes
 */
export function formatFullDateTime(dateString: string): string {
  const date = parseLocalDate(dateString);
  const formatted = fullDateTimeFormatter.format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * Retorna data no formato ISO para atributo datetime do elemento <time>
 */
export function getISODate(dateString: string): string {
  return parseLocalDate(dateString).toISOString();
}

/**
 * Verifica se a data é hoje
 */
export function isToday(dateString: string): boolean {
  const date = parseLocalDate(dateString);
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
  const date = parseLocalDate(dateString);
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
  const date = parseLocalDate(dateString);
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
  const date = parseLocalDate(dateString);
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
  const date = parseLocalDate(dateString);
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
  const date = parseLocalDate(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
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

/**
 * Converte texto para slug (remove acentos e caracteres especiais)
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Espaços viram hífens
    .replace(/-+/g, '-') // Múltiplos hífens viram um
    .trim();
}

/**
 * Gera slug do evento no formato: DIA-MES-ANO-TITULO-EVENTO
 * Ex: "15-01-2025-show-do-safadao"
 */
export function generateEventSlug(date: string, title: string): string {
  const eventDate = parseLocalDate(date);
  const day = String(eventDate.getDate()).padStart(2, '0');
  const month = String(eventDate.getMonth() + 1).padStart(2, '0');
  const year = eventDate.getFullYear();
  const titleSlug = slugify(title);
  
  return `${day}-${month}-${year}-${titleSlug}`;
}

/**
 * Extrai data do slug no formato DIA-MES-ANO-TITULO
 * Retorna { day, month, year } ou null se inválido
 */
export function parseDateFromSlug(slug: string): { day: string; month: string; year: string } | null {
  const match = slug.match(/^(\d{2})-(\d{2})-(\d{4})-/);
  if (!match) return null;
  return { day: match[1], month: match[2], year: match[3] };
}
