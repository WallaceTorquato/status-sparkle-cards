import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StatusBadge } from './StatusBadge';
import type { Process } from '@/data/mockProcesses';
import { AlertCircle, Clock, Tag, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProcessDetailsModalProps {
  process: Process | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProcessDetailsModal({ process, open, onOpenChange }: ProcessDetailsModalProps) {
  if (!process) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-destructive" />
            Detalhes do Erro
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{process.name}</h3>
            <StatusBadge status={process.status} />
          </div>
          
          <div className="grid gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Categoria:</span>
              <span className="font-medium">{process.category}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Última atualização:</span>
              <span className="font-medium">
                {format(process.lastUpdate, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
              </span>
            </div>
            
            <div className="flex items-start gap-2 text-sm">
              <FileText className="w-4 h-4 text-muted-foreground mt-0.5" />
              <span className="text-muted-foreground">Descrição:</span>
              <span className="font-medium">{process.description}</span>
            </div>
          </div>
          
          {process.errorMessage && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <h4 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Mensagem de Erro
              </h4>
              <p className="text-sm text-destructive/90">{process.errorMessage}</p>
            </div>
          )}
          
          <div className="p-4 bg-secondary rounded-lg">
            <h4 className="font-semibold text-secondary-foreground mb-2">Sugestões de Resolução</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Verifique a conexão com o servidor</li>
              <li>Confirme se as credenciais estão corretas</li>
              <li>Reinicie o serviço e tente novamente</li>
              <li>Consulte os logs para mais detalhes</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}