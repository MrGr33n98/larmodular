'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Product, Category, Company, Region } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Search, 
  Home, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  LayoutGrid,
  Users
} from 'lucide-react';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredCompanies, setFeaturedCompanies] = useState<Company[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, companiesRes, regionsRes] = await Promise.all([
          api.get<{ data: Product[] }>('/products?featured=true&per_page=8'),
          api.get<{ data: Category[] }>('/categories'),
          api.get<{ data: Company[] }>('/companies?featured=true&per_page=6'),
          api.get<{ data: Region[] }>('/regions'),
        ]);
        
        setFeaturedProducts(productsRes.data.data || []);
        setCategories(categoriesRes.data.data || []);
        setFeaturedCompanies(companiesRes.data.data || []);
        setRegions(regionsRes.data.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mesh-gradient min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
                <ShieldCheck className="w-4 h-4" />
                O Maior Marketplace Modular do Brasil
              </span>
              <h1 className="text-5xl md:text-7xl font-jakarta font-extrabold text-brand-secondary tracking-tighter leading-[0.95] mb-6">
                Sua casa modular, <br />
                <span className="text-brand-primary">simples e tátil.</span>
              </h1>
              <p className="text-xl text-brand-secondary/60 font-medium max-w-2xl mx-auto">
                Descubra a liberdade das Tiny Houses e construções modulares com segurança e design premium.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/40 backdrop-blur-xl rounded-[40px] p-3 shadow-clay-external border border-white/40 flex flex-col md:flex-row gap-3 max-w-3xl mx-auto"
            >
              <div className="flex-[2]">
                <Input
                  type="text"
                  placeholder="Onde você quer morar?"
                  className="h-14 bg-white/60"
                />
              </div>
              <div className="flex-1">
                <select className="w-full h-14 px-4 rounded-2xl bg-white/60 border-none text-brand-secondary font-bold text-sm focus:ring-2 focus:ring-brand-primary/20 appearance-none shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)]">
                  <option value="">Tipo de Obra</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <Button size="lg" className="h-14 rounded-2xl md:px-8">
                <Search className="w-5 h-5 mr-2" />
                Explorar
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats / Features Grid */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Rapidez", desc: "Entrega em tempo recorde" },
              { icon: ShieldCheck, title: "Segurança", desc: "Fabricantes homologados" },
              { icon: LayoutGrid, title: "Variedade", desc: "Centenas de modelos" }
            ].map((feature, i) => (
              <div key={i} className="clay-card p-6 flex items-center gap-4 group hover:-translate-y-1 transition-premium">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-premium">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-secondary">{feature.title}</h3>
                  <p className="text-sm text-brand-secondary/50 font-medium">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Horizontal Scroll */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-jakarta font-extrabold text-brand-secondary tracking-tight">
                Categorias
              </h2>
              <p className="text-brand-secondary/50 font-medium">Encontre o estilo perfeito para você</p>
            </div>
            <Link href="/categorias">
              <Button variant="clay" size="sm" className="rounded-xl">
                Ver Todas <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {categories.slice(0, 6).map((category) => (
              <Link key={category.id} href={`/busca?categoria=${category.slug}`}>
                <div className="clay-card p-6 text-center group cursor-pointer hover:bg-brand-primary/5 transition-premium">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-premium">
                    <Home className="w-8 h-8 text-brand-primary" />
                  </div>
                  <h3 className="font-bold text-brand-secondary text-sm group-hover:text-brand-primary transition-premium">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-brand-primary font-bold text-xs uppercase tracking-widest">Vitrine Premium</span>
              <h2 className="text-4xl font-jakarta font-extrabold text-brand-secondary tracking-tight leading-none">
                Módulos em Destaque
              </h2>
            </div>
            <div className="flex gap-3">
              <Link href="/busca">
                <Button variant="clay" className="rounded-2xl">Mais Populares</Button>
              </Link>
              <Link href="/busca">
                <Button className="rounded-2xl">Ver Todos</Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="clay-card aspect-[4/5] animate-pulse bg-white/50" />
              ))
            ) : (
              featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.base_price || 0}
                  location={product.company_name || 'Brasil'}
                  area={product.specs?.area || 30}
                  bedrooms={product.specs?.bedrooms || 1}
                  imageUrl={product.images?.[0] || 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80'}
                  isVerified={product.featured}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-20 bg-white/20 backdrop-blur-sm rounded-[60px] mx-6">
        <div className="container mx-auto px-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-jakarta font-extrabold text-brand-secondary">Fabricantes Parceiros</h2>
            <p className="text-brand-secondary/60 font-medium">As melhores construtoras modulares do país reunidas em um só lugar.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCompanies.map((company) => (
              <Link key={company.id} href={`/empresa/${company.slug}`}>
                <div className="clay-card p-8 flex items-center gap-6 group hover:bg-white transition-premium">
                  <div className="w-20 h-20 bg-surface-base rounded-[24px] flex items-center justify-center shadow-inner overflow-hidden border border-white/40">
                    {company.logo_url ? (
                      <img src={company.logo_url} alt={company.name} className="w-full h-full object-cover p-2" />
                    ) : (
                      <Users className="w-10 h-10 text-brand-primary/20" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-extrabold text-brand-secondary group-hover:text-brand-primary transition-premium">{company.name}</h3>
                      {company.verified && <ShieldCheck className="w-4 h-4 text-brand-primary" />}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-brand-secondary/40 font-bold uppercase tracking-wider">
                      <MapPin className="w-3 h-3" />
                      {company.city_name || 'Brasil'}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="relative clay-card bg-brand-secondary p-12 md:p-20 overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px]" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-6xl font-jakarta font-extrabold text-white tracking-tighter leading-tight">
                Pronto para <br />
                <span className="text-brand-primary">viver o futuro?</span>
              </h2>
              <p className="text-xl text-white/60 font-medium">
                Seja você um comprador ou fabricante, o LARModular é o seu lugar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-2xl text-lg h-16 px-12">
                  Criar Minha Conta
                </Button>
                <Button variant="clay" size="lg" className="rounded-2xl text-lg h-16 px-12 bg-white/10 text-white border-white/20">
                  Falar com Consultor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
