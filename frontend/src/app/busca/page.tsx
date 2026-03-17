'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Product, Category, Company } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { Pagination, LoadMore } from '@/components/ui/pagination';
import { Search, Filter, Star, Package, Grid, List } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
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
        } else if (data.length === perPage && data.length > 0) {
          // Fallback: use last id as cursor for next page
          setCursor(String(data[data.length - 1].id));
          setHasMore(true);
        } else {
          setHasMore(false);
        }
        
        // Keep existing pagination info if available (for backward compatibility)
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
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={filters.q}
                onChange={(e) => handleFilterChange('q', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filters.categoria}
              onChange={(e) => handleFilterChange('categoria', e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Todas as Categorias</option>
              {categories.map((cat) => (
                <option key={cat.id} value={String(cat.id)}>{cat.name}</option>
              ))}
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => handleFilterChange('destaque', !filters.destaque)}
            className={`px-4 py-2 rounded-full text-sm ${
              filters.destaque
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                : 'bg-gray-100 text-gray-600 border border-gray-200'
            }`}
          >
            Destaques
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="w-64 flex-shrink-0 hidden lg:block">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Preço</h3>
              <div className="space-y-2">
                <Input
                  placeholder="Mín"
                  type="number"
                  value={filters.precoMin}
                  onChange={(e) => handleFilterChange('precoMin', e.target.value)}
                />
                <Input
                  placeholder="Máx"
                  type="number"
                  value={filters.precoMax}
                  onChange={(e) => handleFilterChange('precoMax', e.target.value)}
                />
              </div>

              <h3 className="font-semibold text-gray-900 mt-6 mb-4">Categorias</h3>
              <div className="space-y-2">
                {categories.slice(0, 6).map((cat) => (
                  <label key={cat.id} className="flex items-center">
                    <input
                      type="radio"
                      name="categoria"
                      checked={filters.categoria === String(cat.id)}
                      onChange={() => handleFilterChange('categoria', String(cat.id))}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-600">{cat.name}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {loading ? 'Carregando...' : `${pagination.totalCount} produtos encontrados`}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {products.map((product) => (
                  <Link key={product.id} href={`/produto/${product.slug}`}>
                    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                      <div className={`${viewMode === 'grid' ? 'aspect-video' : 'flex'} bg-gray-200 relative`}>
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full">
                            <Package className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                        {product.featured && (
                          <span className="absolute top-2 left-2 bg-emerald-600 text-white text-xs px-2 py-1 rounded">
                            Destaque
                          </span>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-gray-500 mb-1">{product.category_name}</p>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{product.company_name}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-emerald-600">{formatPrice(product.base_price)}</span>
                          {product.average_rating && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                              {product.average_rating}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {hasMore && (
                <LoadMore onLoadMore={handleLoadMore} isLoading={loading} hasMore={hasMore} />
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-500">Tente ajustar seus filtros de busca</p>
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
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse" />
          ))}
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
