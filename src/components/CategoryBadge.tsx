import { CATEGORY_CONFIG, EventCategory } from '../types/event';

interface CategoryBadgeProps {
  category: EventCategory;
  size?: 'sm' | 'md' | 'lg';
}

export function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const config = CATEGORY_CONFIG[category];
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${config.bgColor} ${config.textColor} ${config.borderColor}
        border ${sizeClasses[size]}
      `}
    >
      {config.label}
    </span>
  );
}
