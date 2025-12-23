import { cn } from '../../lib/utils.js';

const variantStyles = {
  success: 'border-l-4 border-l-success hover:bg-success/5',
  error: 'border-l-4 border-l-destructive hover:bg-destructive/5',
  warning: 'border-l-4 border-l-warning hover:bg-warning/5',
  neutral: 'border-l-4 border-l-primary hover:bg-primary/5',
};

const iconStyles = {
  success: 'text-success',
  error: 'text-destructive',
  warning: 'text-warning',
  neutral: 'text-primary',
};

export function SummaryCard({ title, value, icon: Icon, variant, onClick, isActive }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 p-4 bg-card rounded-lg shadow-sm transition-all duration-200 w-full text-left',
        variantStyles[variant],
        isActive && 'ring-2 ring-primary ring-offset-2'
      )}
    >
      <div className={cn('p-3 rounded-full bg-secondary', iconStyles[variant])}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-card-foreground">{value}</p>
      </div>
    </button>
  );
}
