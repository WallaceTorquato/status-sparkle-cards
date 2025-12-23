import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog.jsx';
import { StatusBadge } from './StatusBadge.jsx';
import { History, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ScrollArea } from '../ui/scroll-area.jsx';

export function ProcessHistoryModal({ process, open, onOpenChange }) {
  if (!process) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <History className="w-5 h-5 text-primary" />
            Histórico de Atualizações
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{process.name}</h3>
            <StatusBadge status={process.status} />
          </div>
          
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {process.history.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start gap-3 p-3 bg-secondary rounded-lg"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-2 h-2 rounded-full ${
                      entry.status === 'success' ? 'bg-success' :
                      entry.status === 'error' ? 'bg-destructive' :
                      entry.status === 'warning' ? 'bg-warning' :
                      'bg-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <StatusBadge status={entry.status} className="text-[10px] px-2 py-0" />
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {format(entry.timestamp, "dd/MM/yyyy HH:mm", { locale: ptBR })}
                      </div>
                    </div>
                    <p className="text-sm text-secondary-foreground">{entry.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
