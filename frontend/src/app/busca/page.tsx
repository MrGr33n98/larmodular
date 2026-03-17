'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { Product, Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { LoadMore } from '@/components/ui/pagination';
import { Search, Filter, Package, Grid, List, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function SearchContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const perPage = 12;

  const [filters, setFilters] = useState({
    q: searchParams.get('q') || '',
    categoria: searchParams.get('categoria') || '',
    regiao: searchParams.get('regiao') || '',
    destaque: searchParams.get('destaque') === 'true',
    precoMin: '',
    precoMax: '',
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get<{ data: Category[] }>('/categories');
        setCategories(res.data.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (cursor) {
          params.append('cursor', cursor);
          params.append('per_page', perPage.toString());
        } else {
          params.append('page', currentPage.toString());
          params.append('per_page', perPage.toString());
        }
        if (filters.q) params.append('search', filters.q);
        if (filters.categoria) params.append('category_id', filters.categoria);
        if (filters.destaque) params.append('featured', 'true');
        if (filters.precoMin) params.append('price_min', filters.precoMin);
        if (filters.precoMax) params.append('price_max', filters.precoMax);

        const res = await api.get<{ data: Product[]; meta?: any }>(`/products?${params.toString()}`);
        const data = res.data.data || [];
        setProducts(data);
        
        if (res.data.meta?.next_cursor) {
          setCursor(res.data.meta.next_cursor);
          setHasMore(true);
        } else {
          setHasMore(false);
        }

        if (res.data.meta?.pagination) {
          setPagination({
            currentPage: res.data.meta.pagination.current_page || currentPage,
            totalPages: res.data.meta.pagination.total_pages || 1,
            totalCount: res.data.meta.pagination.total_count || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, currentPage]);

  const handleFilterChange = (key: string, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleLoadMore = async () => {
    if (!hasMore) return;
    const params = new URLSearchParams();
    if (cursor) params.append('cursor', cursor);
    params.append('per_page', perPage.toString());
    if (filters.q) params.append('search', filters.q);
    if (filters.categoria) params.append('category_id', filters.categoria);
    if (filters.destaque) params.append('featured', 'true');
    if (filters.precoMin) params.append('price_min', filters.precoMin);
    if (filters.precoMax) params.append('price_max', filters.precoMax);

    try {
      const res = await api.get<{ data: Product[]; meta?: any }>(`/products?${params.toString()}`);
      const data = res.data.data || [];
      if (data.length > 0) setProducts(prev => [...prev, ...data]);
      if (res.data.meta?.next_cursor) {
        setCursor(res.data.meta.next_cursor);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Search Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-black text-clay-text-primary mb-4 leading-tight">
          Encontre seu <span className="text-clay-grass-deep">Lar Modular</span>
        </h1>
        <p className="text-lg text-clay-text-secondary max-w-2xl mx-auto font-body">
          Explore as melhores opções de Tiny Houses, Containers e Moradias Modulares do Brasil.
        </p>
      </div>

      {/* Main Search Bar */}
      <div className="clay-card p-4 md:p-6 mb-12 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-clay-text-muted transition-colors group-focus-within:text-clay-primary" />
            <input
              type="text"
              placeholder="Ex: Tiny House de Luxo, Container 40 pés..."
              value={filters.q}
              onChange={(e) => handleFilterChange('q', e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-clay-surface-2/30 border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] focus:ring-2 focus:ring-clay-primary font-body text-clay-text-primary placeholder:text-clay-text-muted transition-all"
            />
          </div>
          <select
            value={filters.categoria}
            onChange={(e) => handleFilterChange('categoria', e.target.value)}
            className="px-6 py-4 rounded-2xl bg-clay-surface-2/30 border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] focus:ring-2 focus:ring-clay-primary font-display font-bold text-clay-text-primary appearance-none cursor-pointer transition-all min-w-[200px]"
          >
            <option value="">Todas Categorias</option>
            {categories.map((cat) => (
              <option key={cat.id} value={String(cat.id)}>{cat.name}</option>
            ))}
          </select>
          <Button variant="default" className="md:w-32 py-4 h-auto shadow-lg hover:shadow-xl">
            Buscar
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="clay-card sticky top-24 space-y-8">
            <div className="flex items-center gap-2 mb-2 pb-4 border-b-2 border-clay-surface-2">
              <SlidersHorizontal className="w-5 h-5 text-clay-primary" />
              <h2 className="text-xl font-display font-black text-clay-text-primary">Filtros</h2>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-clay-text-primary text-sm uppercase tracking-wider">Faixa de Preço</h3>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.precoMin}
                  onChange={(e) => handleFilterChange('precoMin', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-clay-surface-2/50 border-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] focus:ring-2 focus:ring-clay-primary text-sm font-bold"
                />
                <span className="text-clay-text-muted font-bold">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.precoMax}
                  onChange={(e) => handleFilterChange('precoMax', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-clay-surface-2/50 border-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] focus:ring-2 focus:ring-clay-primary text-sm font-bold"
                />
              </div>
            </div>

            {/* Quick Filters */}
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-clay-text-primary text-sm uppercase tracking-wider">Opções</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFilterChange('destaque', !filters.destaque)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    filters.destaque
                      ? 'bg-clay-primary text-white shadow-sm scale-105'
                      : 'bg-clay-surface-2 text-clay-text-secondary hover:bg-clay-surface-3'
                  }`}
                >
                  Destaques
                </button>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full py-3 h-auto"
              onClick={() => setFilters({
                q: '',
                categoria: '',
                regiao: '',
                destaque: false,
                precoMin: '',
                precoMax: '',
              })}
            >
              Limpar Filtros
            </Button>
          </div>
        </aside>

        {/* Product Grid Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <p className="text-clay-text-secondary font-body font-medium">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-clay-primary animate-ping" />
                  Buscando...
                </span>
              ) : (
                <>Mostrando <span className="text-clay-text-primary font-bold">{pagination.totalCount}</span> resultados</>
              )}
            </p>
            
            <div className="flex items-center gap-2 bg-clay-surface-2/40 p-1.5 rounded-2xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] border border-white/50">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-clay-primary' : 'text-clay-text-muted hover:text-clay-text-secondary'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-clay-primary' : 'text-clay-text-muted hover:text-clay-text-secondary'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {loading && products.length === 0 ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="clay-card h-96 bg-clay-surface-2/30 animate-pulse border-none shadow-none" />
                ))}
              </motion.div>
            ) : products.length > 0 ? (
              <motion.div 
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}
              >
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    basePrice={product.base_price}
                    imageUrl={product.images?.[0] || '/placeholder.jpg'}
                    location={product.location || 'Brasil'}
                    area={product.area_m2 || 0}
                    bedrooms={product.bedrooms || 0}
                    isVerified={product.featured}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 clay-card bg-clay-surface-2/20 border-none"
              >
                <Package className="w-20 h-20 text-clay-text-muted/30 mx-auto mb-6" />
                <h3 className="text-2xl font-display font-black text-clay-text-primary mb-2">Nenhum lar modular encontrado</h3>
                <p className="text-clay-text-secondary">Tente ajustar seus filtros ou use termos diferentes na busca.</p>
                <Button 
                  variant="clay" 
                  className="mt-8"
                  onClick={() => setFilters({
                    q: '',
                    categoria: '',
                    regiao: '',
                    destaque: false,
                    precoMin: '',
                    precoMax: '',
                  })}
                >
                  Recomeçar Busca
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {hasMore && (
            <div className="mt-16 flex justify-center">
              <LoadMore onLoadMore={handleLoadMore} isLoading={loading} hasMore={hasMore} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12 animate-pulse">
        <div className="h-12 w-2/3 bg-clay-surface-2 rounded-2xl mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="clay-card h-80 bg-clay-surface-2/30 shadow-none border-none" />
          ))}
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
