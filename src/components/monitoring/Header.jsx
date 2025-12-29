import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx';

function PowerBIIcon({ className }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M10.5 3A1.5 1.5 0 0 0 9 4.5v15A1.5 1.5 0 0 0 10.5 21h3a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 13.5 3h-3zm-6 6A1.5 1.5 0 0 0 3 10.5v9A1.5 1.5 0 0 0 4.5 21h3A1.5 1.5 0 0 0 9 19.5v-9A1.5 1.5 0 0 0 7.5 9h-3zm12 3a1.5 1.5 0 0 0-1.5 1.5v6a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5h-3z"/>
    </svg>
  );
}

export function Header({ lastRefresh }) {
  return (
    <header className="bg-primary text-primary-foreground py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/10 rounded-lg">
              <PowerBIIcon className="w-6 h-6 text-primary-foreground" />
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
            <Avatar className="h-10 w-10 border-2 border-primary-foreground/30">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Foto do perfil" />
              <AvatarFallback className="bg-secondary text-secondary-foreground">US</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
