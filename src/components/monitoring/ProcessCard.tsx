import { Card } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';
import type { Process } from '@/data/mockProcesses';
import { Clock, AlertCircle, History } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProcessCardProps {
  process: Process;
  onViewDetails: (process: Process) => void;
  onViewHistory: (process: Process) => void;
}

export function ProcessCard({ process, onViewDetails, onViewHistory }: ProcessCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow duration-200 bg-card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-card-foreground truncate">{process.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{process.category}</p>
        </div>
        <StatusBadge status={process.status} />
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {process.description}
      </p>
      
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
        <Clock className="w-3.5 h-3.5" />
        <span>
          Atualizado {formatDistanceToNow(process.lastUpdate, { addSuffix: true, locale: ptBR })}
        </span>
      </div>
      
      {process.status === 'error' && process.errorMessage && (
        <div className="flex items-start gap-2 p-2 bg-destructive/10 rounded-md mb-3">
          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-xs text-destructive line-clamp-2">{process.errorMessage}</p>
        </div>
      )}
      
      <div className="flex gap-2 mt-auto">
        {process.status === 'error' && (
          <button
            onClick={() => onViewDetails(process)}
            className="flex-1 px-3 py-1.5 text-xs font-medium bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
          >
            Ver Erro
          </button>
        )}
        <button
          onClick={() => onViewHistory(process)}
          className="flex-1 px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors flex items-center justify-center gap-1"
        >
          <History className="w-3.5 h-3.5" />
          Histórico
        </button>
      </div>
    </Card>
  );
}