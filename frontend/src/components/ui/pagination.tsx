'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
}

export function Pagination({ currentPage, totalPages, baseUrl = '' }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${baseUrl}?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;
    
    if (totalPages <= showPages + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (currentPage < totalPages - 2) pages.push('...');
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </Button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, idx) => (
          typeof page === 'number' ? (
            <Button
              key={idx}
              variant={page === currentPage ? 'default' : 'ghost'}
              size="sm"
              onClick={() => goToPage(page)}
              className="w-10"
            >
              {page}
            </Button>
          ) : (
            <MoreHorizontal key={idx} className="w-4 h-4 text-gray-400" />
          )
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="gap-1"
      >
        Próxima
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

interface LoadMoreProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

export function LoadMore({ onLoadMore, isLoading, hasMore }: LoadMoreProps) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center mt-8">
      <Button
        variant="outline"
        size="lg"
        onClick={onLoadMore}
        disabled={isLoading}
        className="gap-2"
      >
        {isLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            Carregando...
          </>
        ) : (
          'Carregar Mais'
        )}
      </Button>
    </div>
  );
}
