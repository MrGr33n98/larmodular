'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Company } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Star, Package, Grid, List, Building, ShieldCheck, ArrowRight, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="pb-24">
      {/* Header Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-clay-sky-cool/20 rounded-full blur-[100px] -mt-40" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-xs font-display font-black text-clay-primary uppercase tracking-[0.3em] mb-4">Fabricantes</p>
            <h1 className="text-4xl md:text-6xl font-display font-black text-clay-text-primary tracking-tight mb-6">
              Ecossistema <span className="text-clay-grass-deep">Modular</span>
            </h1>
            <p className="text-lg text-clay-text-secondary font-body mb-10 max-w-2xl mx-auto">
              Conecte-se com as construtoras mais inovadoras do Brasil. Qualidade, design e sustentabilidade em cada projeto.
            </p>

            <div className="clay-card p-2 max-w-xl mx-auto flex items-center bg-white/80 backdrop-blur-xl shadow-xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-clay-primary" />
                <Input
                  type="text"
                  placeholder="Buscar pelo nome do fabricante..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 h-14 bg-transparent border-none shadow-none font-body font-bold text-clay-text-primary"
                />
              </div>
              <Button size="lg" className="rounded-2xl h-14 md:px-8">
                Buscar
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4 py-4 rounded-3xl bg-clay-surface-2/30">
          <p className="font-display font-black text-clay-text-muted text-sm uppercase tracking-widest">
            {loading ? 'Sincronizando...' : `${companies.length} empresas encontradas`}
          </p>
          <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl shadow-clay-flat">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-clay-primary text-white shadow-lg' : 'text-clay-text-muted hover:bg-clay-surface-2'}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-clay-primary text-white shadow-lg' : 'text-clay-text-muted hover:bg-clay-surface-2'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Listing */}
      <div className="container mx-auto px-4">
        {loading ? (
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="clay-card h-64 animate-pulse bg-clay-surface-2/50" />
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
          >
            <AnimatePresence>
              {companies.map((company) => (
                <motion.div
                  layout
                  key={company.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Link href={`/empresa/${company.slug}`}>
                    <div className={`clay-card group h-full hover:shadow-2xl transition-all ${viewMode === 'list' ? 'flex items-center p-6 gap-8' : 'p-8 flex flex-col items-center text-center'}`}>
                      {/* Logo Wrapper */}
                      <div className={`${viewMode === 'list' ? 'w-32 h-32' : 'w-40 h-40 mb-8'} bg-clay-surface-2 rounded-[40px] shadow-clay-flat flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform border-4 border-white group-hover:border-clay-primary/20 overflow-hidden`}>
                        {company.logo_url ? (
                          <img src={company.logo_url} alt={company.name} className="w-full h-full object-contain p-4" />
                        ) : (
                          <Building className="w-12 h-12 text-clay-text-muted/30" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className={`flex items-center gap-2 mb-2 ${viewMode === 'grid' ? 'justify-center' : ''}`}>
                          <h3 className="text-2xl font-display font-black text-clay-text-primary group-hover:text-clay-primary transition-colors">
                            {company.name}
                          </h3>
                          {company.verified && <ShieldCheck className="w-5 h-5 text-clay-grass-deep" />}
                        </div>

                        <div className={`flex flex-wrap gap-3 mb-6 ${viewMode === 'grid' ? 'justify-center' : ''}`}>
                          {company.city_name && (
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-clay-surface-2 rounded-full text-[10px] font-black text-clay-text-muted uppercase tracking-widest">
                              <MapPin className="w-3 h-3 text-clay-primary" />
                              {company.city_name}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5 px-3 py-1 bg-clay-surface-2 rounded-full text-[10px] font-black text-clay-text-muted uppercase tracking-widest">
                            <Package className="w-3 h-3 text-clay-primary" />
                            {company.products_count || 0} Projetos
                          </span>
                        </div>

                        <div className={`flex items-center justify-between mt-auto ${viewMode === 'grid' ? 'w-full pt-6 border-t' : ''}`}>
                          {company.average_rating ? (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="font-display font-black text-clay-text-primary">{company.average_rating}</span>
                              <span className="text-xs text-clay-text-muted">({company.reviews_count})</span>
                            </div>
                          ) : (
                            <span className="text-xs font-body text-clay-text-muted italic">Novo fabricante</span>
                          )}
                          <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl group-hover:bg-clay-primary group-hover:text-white">
                            <ArrowRight className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && companies.length === 0 && (
          <div className="clay-card py-24 text-center bg-clay-surface-2/10 border-none">
            <Building className="w-20 h-20 text-clay-text-muted/20 mx-auto mb-6" />
            <h3 className="text-2xl font-display font-black text-clay-text-primary mb-2">Nenhum fabricante encontrado</h3>
            <p className="text-clay-text-secondary font-body">Tente buscar por outro termo ou limpe os filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}
