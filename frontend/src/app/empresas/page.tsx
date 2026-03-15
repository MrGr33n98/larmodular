'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Company } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Star, Package, Grid, List, Building } from 'lucide-react';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = search ? `?search=${search}` : '';
        const res = await api.get<{ data: Company[] }>(`/companies${params}`);
        setCompanies(res.data.data || []);
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Empresas Parceiras</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Descubra as melhores empresas de construções modulares, tiny houses e containers do Brasil.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar empresas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          {loading ? 'Carregando...' : `${companies.length} empresas encontradas`}
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
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-48 animate-pulse" />
          ))}
        </div>
      ) : companies.length > 0 ? (
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {companies.map((company) => (
            <Link key={company.id} href={`/empresa/${company.slug}`}>
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className={`p-6 ${viewMode === 'list' ? 'flex items-center' : ''}`}>
                  <div className={`${viewMode === 'list' ? 'w-24 h-24 mr-6' : 'w-16 h-16'} bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {company.logo_url ? (
                      <img src={company.logo_url} alt={company.name} className={`${viewMode === 'list' ? 'w-24 h-24' : 'w-16 h-16'} object-cover rounded-lg`} />
                    ) : (
                      <Building className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 flex items-center">
                      {company.name}
                      {company.verified && (
                        <span className="ml-1 text-emerald-600 text-sm">✓</span>
                      )}
                    </h3>
                    {company.city_name && (
                      <p className="text-sm text-gray-500 flex items-center mb-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        {company.city_name}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      {company.average_rating ? (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="text-sm text-gray-600">{company.average_rating}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">Sem avaliações</span>
                      )}
                      <span className="text-sm text-gray-500 flex items-center">
                        <Package className="w-3 h-3 mr-1" />
                        {company.products_count || 0} produtos
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma empresa encontrada</h3>
          <p className="text-gray-500">Tente buscar com outros termos</p>
        </div>
      )}
    </div>
  );
}
