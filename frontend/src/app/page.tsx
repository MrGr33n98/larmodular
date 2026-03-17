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
  Users,
  Compass,
  Star,
  Award,
  Sparkles
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
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-clay-sky-mist/30 rounded-full blur-[120px] -mr-96 -mt-96" />
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-clay-sky-cool/20 rounded-full blur-[100px] -ml-64" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white shadow-clay-flat mb-10 border-2 border-clay-surface-2 animate-bounce-slow">
              <Sparkles className="w-5 h-5 text-clay-primary" />
              <span className="text-[10px] font-black text-clay-text-muted uppercase tracking-[0.2em]">O Futuro da Moradia Chegou</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-display font-black text-clay-text-primary leading-[0.9] tracking-tighter mb-8">
              Sua casa modular, <br />
              <span className="text-clay-grass-deep">tátil e real.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-clay-text-secondary font-body font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
              Descubra a liberdade das Tiny Houses e construções modulares com segurança e design premium em um marketplace único.
            </p>

            <div className="clay-card p-3 max-w-3xl mx-auto flex flex-col md:flex-row gap-3 bg-white/80 backdrop-blur-xl border-none shadow-2xl">
              <div className="flex-[2] relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-clay-primary w-5 h-5 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Cidade ou Região"
                  className="h-14 pl-12 bg-clay-surface-2/30 border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] rounded-[20px] font-body font-bold text-clay-text-primary"
                />
              </div>
              <div className="flex-1 relative">
                <LayoutGrid className="absolute left-4 top-1/2 -translate-y-1/2 text-clay-primary w-5 h-5 pointer-events-none" />
                <select className="w-full h-14 pl-12 pr-4 rounded-[20px] bg-clay-surface-2/30 border-none text-clay-text-primary font-body font-bold text-sm focus:ring-2 focus:ring-clay-primary/20 appearance-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] h-full">
                  <option value="">Categoria</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <Button size="lg" className="h-14 rounded-[20px] md:px-10 shadow-xl hover:shadow-2xl">
                <Search className="w-5 h-5 mr-2" />
                Buscar Sonho
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Entrega Ágil", desc: "Construção off-site que reduz prazos em até 60%", bg: "bg-clay-sky-mist" },
              { icon: ShieldCheck, title: "Selos de Confiança", desc: "Fabricantes auditados e garantia total na entrega", bg: "bg-clay-sky-cool" },
              { icon: Compass, title: "Mobilidade", desc: "Leve sua casa para onde sua vida te levar", bg: "bg-clay-sky-sunrise" }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="clay-card p-10 flex flex-col items-center text-center group border-none"
              >
                <div className={`w-20 h-20 rounded-[28px] ${feature.bg} flex items-center justify-center text-clay-text-primary mb-8 shadow-clay-flat group-hover:scale-110 transition-all`}>
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-display font-black text-clay-text-primary mb-3">{feature.title}</h3>
                <p className="text-clay-text-secondary font-body leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <div>
              <p className="text-xs font-display font-black text-clay-primary uppercase tracking-[0.3em] mb-2">Explore</p>
              <h2 className="text-4xl md:text-5xl font-display font-black text-clay-text-primary tracking-tight">
                Categorias
              </h2>
            </div>
            <Link href="/categorias">
              <Button variant="clay" size="sm">
                Todas as Opções <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.slice(0, 6).map((category) => (
              <Link key={category.id} href={`/busca?categoria=${category.slug}`}>
                <div className="clay-card p-8 text-center group bg-white hover:bg-clay-surface-2/30 transition-all cursor-pointer">
                  <div className="w-20 h-20 bg-clay-surface-2 rounded-3xl shadow-clay-flat flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:ring-4 group-hover:ring-clay-primary/20 transition-all">
                    <Home className="w-10 h-10 text-clay-primary" />
                  </div>
                  <h3 className="font-display font-black text-clay-text-primary text-sm group-hover:text-clay-primary">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute -bottom-64 -right-64 w-[600px] h-[600px] bg-clay-grass-light/10 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-1 bg-clay-primary rounded-full" />
                <span className="text-xs font-display font-black text-clay-primary uppercase tracking-[0.2em]">Seleção de Especialista</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black text-clay-text-primary leading-none">
                Estilo & Inovação
              </h2>
            </div>
            <div className="flex gap-4">
              <Link href="/busca">
                <Button variant="clay" className="rounded-2xl h-14 px-8 text-lg">Ver Lançamentos</Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="clay-card aspect-[4/5] animate-pulse bg-clay-surface-2/30" />
              ))
            ) : (
              featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  basePrice={product.base_price || 0}
                  location={product.location || product.company_name || 'Brasil'}
                  area={product.area_m2 || 30}
                  bedrooms={product.bedrooms || 1}
                  imageUrl={product.images?.[0] || '/placeholder.jpg'}
                  isVerified={product.featured}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-24 mx-6">
        <div className="clay-card p-12 md:p-20 bg-clay-sky-mist/20 border-none shadow-none text-center">
          <div className="max-w-3xl mx-auto mb-20">
             <p className="text-xs font-display font-black text-clay-grass-deep uppercase tracking-[0.3em] mb-4">Fabricantes</p>
             <h2 className="text-4xl md:text-6xl font-display font-black text-clay-text-primary mb-6 tracking-tight">O Ecossistema Modular</h2>
             <p className="text-xl text-clay-text-secondary font-body">As construtoras mais inovadoras do país reunidas para entregar seu sonho com garantia LARModular.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredCompanies.map((company) => (
              <Link key={company.id} href={`/empresa/${company.slug}`}>
                <div className="clay-card p-10 flex flex-col items-center text-center group bg-white shadow-xl hover:shadow-2xl transition-all">
                  <div className="w-32 h-32 bg-clay-surface-2 rounded-[40px] flex items-center justify-center shadow-clay-flat mb-8 overflow-hidden border-4 border-white group-hover:border-clay-primary/20 transition-all">
                    {company.logo_url ? (
                      <img src={company.logo_url} alt={company.name} className="w-full h-full object-contain p-4 transition-transform group-hover:scale-110" />
                    ) : (
                      <Users className="w-12 h-12 text-clay-text-muted/30" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="text-2xl font-display font-black text-clay-text-primary group-hover:text-clay-primary transition-colors">{company.name}</h3>
                      {company.verified && <ShieldCheck className="w-5 h-5 text-clay-grass-deep" />}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs font-black text-clay-text-muted uppercase tracking-widest bg-clay-surface-2 px-4 py-1.5 rounded-full">
                      <MapPin className="w-3.5 h-3.5 text-clay-primary" />
                      {company.city_name || 'Brasil'}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="relative clay-card bg-clay-text-primary p-16 md:p-24 overflow-hidden text-center text-white border-none shadow-[20px_40px_80px_rgba(0,0,0,0.2)]">
            {/* Animated Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-clay-primary/30 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-clay-grass-mid/20 rounded-full blur-[80px] -ml-48 -mb-48" />
            
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
              <Award className="w-16 h-16 text-clay-primary mb-8" />
              <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-[0.9] mb-10">
                Comece sua <br />
                <span className="text-clay-primary">Jornada Modular Hoje.</span>
              </h2>
              <p className="text-xl md:text-2xl text-white/60 font-body mb-16 max-w-2xl">
                Seja você um comprador apaixonado ou um fabricante visionário, o LARModular é o seu ecossistema.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                <Button size="lg" className="rounded-[24px] text-xl h-20 px-16 shadow-[0_20px_40px_rgba(106,184,64,0.3)] hover:scale-105 transition-all">
                  Cadastrar Agora
                </Button>
                <Button variant="clay" size="lg" className="rounded-[24px] text-xl h-20 px-16 bg-white/10 text-white border-white/20 hover:bg-white/20">
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
