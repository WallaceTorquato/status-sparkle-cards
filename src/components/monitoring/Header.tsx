import { Activity, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  lastRefresh: Date;
}

export function Header({ onRefresh, isRefreshing, lastRefresh }: HeaderProps) {
  return (
    <header className="bg-primary text-primary-foreground py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent rounded-lg">
              <Activity className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Painel de Monitoramento</h1>
              <p className="text-primary-foreground/70 text-sm">
                Acompanhe o status dos processos em tempo real
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-primary-foreground/70">
              Última atualização: {lastRefresh.toLocaleTimeString('pt-BR')}
            </span>
            <Button
              onClick={onRefresh}
              disabled={isRefreshing}
              variant="secondary"
              size="sm"
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}