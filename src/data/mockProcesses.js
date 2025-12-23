const categories = [
  'Sincronização',
  'API',
  'Banco de Dados',
  'Autenticação',
  'Pagamentos',
  'Notificações',
  'Relatórios',
  'Backup',
];

const processNames = [
  'Sync Produtos',
  'Sync Clientes',
  'Sync Pedidos',
  'API Gateway',
  'API Pagamentos',
  'API Auth',
  'DB Backup',
  'DB Migration',
  'Cache Redis',
  'Email Service',
  'SMS Gateway',
  'Push Notifications',
  'Report Generator',
  'Data Warehouse',
  'Log Aggregator',
];

function generateHistory(processId) {
  const statuses = ['success', 'error', 'warning', 'pending'];
  const messages = {
    success: 'Processo executado com sucesso',
    error: 'Falha na execução do processo',
    warning: 'Processo executado com alertas',
    pending: 'Processo aguardando execução',
  };
  
  const history = [];
  const count = Math.floor(Math.random() * 10) + 5;
  
  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    history.push({
      id: `${processId}-history-${i}`,
      timestamp: new Date(Date.now() - i * 3600000 * Math.random() * 24),
      status,
      message: messages[status],
    });
  }
  
  return history.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

function generateErrorMessage(status) {
  if (status !== 'error') return undefined;
  
  const errors = [
    'Timeout na conexão com o servidor',
    'Erro de autenticação: Token expirado',
    'Falha na validação dos dados',
    'Serviço indisponível',
    'Limite de requisições excedido',
    'Erro interno do servidor',
    'Conexão recusada pelo banco de dados',
    'Arquivo não encontrado',
  ];
  
  return errors[Math.floor(Math.random() * errors.length)];
}

export function generateMockProcesses(count = 60) {
  const statuses = ['success', 'error', 'warning', 'pending'];
  const processes = [];
  
  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const baseName = processNames[Math.floor(Math.random() * processNames.length)];
    
    processes.push({
      id: `process-${i + 1}`,
      name: `${baseName} ${i + 1}`,
      description: `Processo de ${category.toLowerCase()} - ${baseName}`,
      status,
      lastUpdate: new Date(Date.now() - Math.random() * 86400000),
      errorMessage: generateErrorMessage(status),
      history: generateHistory(`process-${i + 1}`),
      category,
    });
  }
  
  return processes;
}

export const mockProcesses = generateMockProcesses(60);
