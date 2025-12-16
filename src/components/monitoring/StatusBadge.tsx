import { cn } from '@/lib/utils';
import type { ProcessStatus } from '@/data/mockProcesses';

interface StatusBadgeProps {
  status: ProcessStatus;
  className?: string;
}

const statusConfig = {
  success: {
    label: 'Sucesso',
    className: 'bg-success text-success-foreground',
  },
  error: {
    label: 'Erro',
    className: 'bg-destructive text-destructive-foreground',
  },
  warning: {
    label: 'Alerta',
    className: 'bg-warning text-warning-foreground',
  },
  pending: {
    label: 'Pendente',
    className: 'bg-muted text-muted-foreground',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}