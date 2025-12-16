import { useState, useMemo, useEffect, useCallback } from 'react';
import { Header } from '@/components/monitoring/Header';
import { SummaryCard } from '@/components/monitoring/SummaryCard';
import { FilterBar } from '@/components/monitoring/FilterBar';
import { ProcessCard } from '@/components/monitoring/ProcessCard';
import { ProcessDetailsModal } from '@/components/monitoring/ProcessDetailsModal';
import { ProcessHistoryModal } from '@/components/monitoring/ProcessHistoryModal';
import { generateMockProcesses, type Process, type ProcessStatus } from '@/data/mockProcesses';
import { CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 12;

const Index = () => {
  const [processes, setProcesses] = useState<Process[]>(() => generateMockProcesses(60));
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<ProcessStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(processes.map((p) => p.category));
    return Array.from(cats).sort();
  }, [processes]);

  const summary = useMemo(() => {
    return {
      total: processes.length,
      success: processes.filter((p) => p.status === 'success').length,
      error: processes.filter((p) => p.status === 'error').length,
      warning: processes.filter((p) => p.status === 'warning').length,
      pending: processes.filter((p) => p.status === 'pending').length,
    };
  }, [processes]);

  const filteredProcesses = useMemo(() => {
    return processes.filter((process) => {
      const matchesSearch =
        process.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        process.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || process.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || process.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [processes, searchTerm, categoryFilter, statusFilter]);

  const totalPages = Math.ceil(filteredProcesses.length / ITEMS_PER_PAGE);
  const paginatedProcesses = filteredProcesses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setProcesses(generateMockProcesses(60));
      setLastRefresh(new Date());
      setIsRefreshing(false);
    }, 1000);
  }, []);

  // Simulação de atualização em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setProcesses((prev) => {
        const newProcesses = [...prev];
        const randomIndex = Math.floor(Math.random() * newProcesses.length);
        const statuses: ProcessStatus[] = ['success', 'error', 'warning', 'pending'];
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        newProcesses[randomIndex] = {
          ...newProcesses[randomIndex],
          status: newStatus,
          lastUpdate: new Date(),
          errorMessage: newStatus === 'error' ? 'Erro simulado na atualização automática' : undefined,
        };
        
        return newProcesses;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, statusFilter]);

  const handleViewDetails = (process: Process) => {
    setSelectedProcess(process);
    setDetailsModalOpen(true);
  };

  const handleViewHistory = (process: Process) => {
    setSelectedProcess(process);
    setHistoryModalOpen(true);
  };

  const handleStatusFilter = (status: ProcessStatus | 'all') => {
    setStatusFilter((prev) => (prev === status ? 'all' : status));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onRefresh={handleRefresh} isRefreshing={isRefreshing} lastRefresh={lastRefresh} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <SummaryCard
            title="Total"
            value={summary.total}
            icon={Clock}
            variant="neutral"
            onClick={() => handleStatusFilter('all')}
            isActive={statusFilter === 'all'}
          />
          <SummaryCard
            title="Sucesso"
            value={summary.success}
            icon={CheckCircle}
            variant="success"
            onClick={() => handleStatusFilter('success')}
            isActive={statusFilter === 'success'}
          />
          <SummaryCard
            title="Erro"
            value={summary.error}
            icon={XCircle}
            variant="error"
            onClick={() => handleStatusFilter('error')}
            isActive={statusFilter === 'error'}
          />
          <SummaryCard
            title="Alerta"
            value={summary.warning}
            icon={AlertTriangle}
            variant="warning"
            onClick={() => handleStatusFilter('warning')}
            isActive={statusFilter === 'warning'}
          />
          <SummaryCard
            title="Pendente"
            value={summary.pending}
            icon={Clock}
            variant="neutral"
            onClick={() => handleStatusFilter('pending')}
            isActive={statusFilter === 'pending'}
          />
        </div>

        {/* Filters */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          categories={categories}
        />

        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          Mostrando {paginatedProcesses.length} de {filteredProcesses.length} processos
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedProcesses.map((process) => (
            <ProcessCard
              key={process.id}
              process={process}
              onViewDetails={handleViewDetails}
              onViewHistory={handleViewHistory}
            />
          ))}
        </div>

        {/* Empty State */}
        {paginatedProcesses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum processo encontrado com os filtros selecionados.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => setCurrentPage(pageNum)}
                      isActive={currentPage === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>

      {/* Modals */}
      <ProcessDetailsModal
        process={selectedProcess}
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
      />
      <ProcessHistoryModal
        process={selectedProcess}
        open={historyModalOpen}
        onOpenChange={setHistoryModalOpen}
      />
    </div>
  );
};

export default Index;