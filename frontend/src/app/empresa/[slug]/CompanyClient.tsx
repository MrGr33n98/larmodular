'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Company, Product, Review } from '@/types';
import { Button } from '@/components/ui/button';
import { formatPrice, formatDate } from '@/lib/utils';
import {
  Star, MapPin, Phone, Mail, Globe, ChevronRight,
  Package, Shield, MessageCircle, ArrowRight, Award,
  CheckCircle, Users, Layout
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/marketplace/ProductCard';

export default function CompanyClient({ slug }: { slug: string }) {
  const [company, setCompany] = useState<Company | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyRes] = await Promise.all([
          api.get<{ data: Company }>(`/companies/${slug}`),
        ]);
        setCompany(companyRes.data.data);

        if (companyRes.data.data) {
          const [productsRes, reviewsRes] = await Promise.all([
            api.get<{ data: Product[] }>(`/companies/${slug}/products`),
            api.get<{ data: Review[] }>(`/companies/${slug}/reviews`),
          ]);
          setProducts(productsRes.data.data || []);
          setReviews(reviewsRes.data.data || []);
        }
      } catch (error) {
        console.error('Error fetching company:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-64 bg-clay-surface-2/30 rounded-[32px]" />
          <div className="h-40 bg-clay-surface-2/30 rounded-[32px] w-full" />
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="clay-card max-w-md mx-auto py-16">
          <Package className="w-20 h-20 text-clay-text-muted/30 mx-auto mb-6" />
          <h1 className="text-3xl font-display font-black text-clay-text-primary mb-4">Empresa não encontrada</h1>
          <p className="text-clay-text-secondary mb-8 font-body">Esta empresa pode ter sido removida ou o link está incorreto.</p>
          <Link href="/busca">
            <Button variant="clay">Explorar Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Hero Banner */}
      <div className="h-[300px] md:h-[400px] relative overflow-hidden">
        <div className="absolute inset-0 bg-clay-sky-cool/40" />
        {company.cover_url ? (
          <img src={company.cover_url} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-clay-sky-cool to-clay-sky-mist" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-clay-background via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        {/* Company Info Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="clay-card p-8 md:p-12 mb-12 bg-white/95 border-none shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* Logo Wrapper */}
            <div className="w-40 h-40 rounded-[40px] bg-white p-3 shadow-clay-flat -mt-24 md:-mt-32 flex-shrink-0 border-8 border-clay-background">
              <div className="w-full h-full rounded-[30px] overflow-hidden border-2 border-clay-surface-2 bg-clay-surface-2/30 flex items-center justify-center">
                {company.logo_url ? (
                  <img src={company.logo_url} alt={company.name} className="w-full h-full object-contain" />
                ) : (
                  <Package className="w-16 h-16 text-clay-text-muted/40" />
                )}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <h1 className="text-4xl md:text-5xl font-display font-black text-clay-text-primary">
                  {company.name}
                </h1>
                {company.verified && (
                  <div className="inline-flex items-center self-center md:self-auto gap-2 px-4 py-2 bg-clay-sky-mist rounded-full text-clay-grass-deep text-xs font-black uppercase tracking-widest shadow-sm">
                    <Shield className="w-4 h-4" />
                    Verificada
                  </div>
                )}
              </div>

              <p className="text-lg text-clay-text-secondary font-body leading-relaxed mb-8 max-w-3xl">
                {company.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-3 text-clay-text-secondary font-body font-bold bg-clay-surface-2/30 px-5 py-3 rounded-2xl">
                  <MapPin className="w-5 h-5 text-clay-primary" />
                  <span>{company.city_name || 'Brasil'}</span>
                </div>
                <div className="flex items-center gap-3 text-clay-text-secondary font-body font-bold bg-clay-surface-2/30 px-5 py-3 rounded-2xl">
                  <Users className="w-5 h-5 text-clay-primary" />
                  <span>{company.reviews_count || 0} Avaliações</span>
                </div>
                {company.average_rating && (
                  <div className="flex items-center gap-3 text-clay-text-secondary font-body font-bold bg-clay-surface-2/30 px-5 py-3 rounded-2xl">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span>{company.average_rating} Estrelas</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-clay-text-secondary font-body font-bold bg-clay-surface-2/30 px-5 py-3 rounded-2xl">
                  <Layout className="w-5 h-5 text-clay-primary" />
                  <span>{company.products_count || 0} Projetos</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button size="lg" className="rounded-2xl px-10 h-14 text-lg shadow-xl hover:shadow-2xl">
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Entrar em Contato
                </Button>
                <div className="flex gap-4">
                  {company.phone && (
                    <Button variant="outline" className="w-14 h-14 p-0 rounded-2xl shadow-lg border-clay-surface-2 hover:bg-clay-surface-2">
                       <Phone className="w-6 h-6 text-clay-text-muted" />
                    </Button>
                  )}
                  {company.website && (
                    <Button variant="outline" className="w-14 h-14 p-0 rounded-2xl shadow-lg border-clay-surface-2 hover:bg-clay-surface-2">
                       <Globe className="w-6 h-6 text-clay-text-muted" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Company Badges / Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="clay-card p-8 text-center bg-clay-sky-mist/20 border-none">
             <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-clay-flat">
               <Award className="w-8 h-8 text-clay-grass-deep" />
             </div>
             <h3 className="text-xl font-display font-black text-clay-text-primary mb-2">Qualidade Premium</h3>
             <p className="text-sm font-body text-clay-text-secondary">Processos certificados e materiais de alta durabilidade em cada projeto.</p>
          </div>
          <div className="clay-card p-8 text-center bg-clay-sky-cool/20 border-none">
             <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-clay-flat">
               <CheckCircle className="w-8 h-8 text-clay-primary" />
             </div>
             <h3 className="text-xl font-display font-black text-clay-text-primary mb-2">Fabricação Própria</h3>
             <p className="text-sm font-body text-clay-text-secondary">Controle total da produção, garantindo prazos e acabamento superior.</p>
          </div>
          <div className="clay-card p-8 text-center bg-clay-sky-sunrise/10 border-none">
             <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-clay-flat">
               <Users className="w-8 h-8 text-clay-text-primary" />
             </div>
             <h3 className="text-xl font-display font-black text-clay-text-primary mb-2">Suporte Exclusivo</h3>
             <p className="text-sm font-body text-clay-text-secondary">Acompanhamento completo desde o projeto até a entrega final.</p>
          </div>
        </div>

        {/* Products Grid */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-sm font-display font-black text-clay-primary uppercase tracking-widest mb-1">Catálogo</p>
              <h2 className="text-4xl font-display font-black text-clay-text-primary">Modelos Disponíveis</h2>
            </div>
            <Link href={`/busca?empresa=${company.slug}`}>
              <Button variant="clay" size="sm" className="hidden sm:flex">
                Ver todos os {products.length} projetos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  basePrice={product.base_price}
                  imageUrl={product.images?.[0] || '/placeholder.jpg'}
                  location={product.location || company.city_name || 'Brasil'}
                  area={product.area_m2 || 0}
                  bedrooms={product.bedrooms || 0}
                  isVerified={product.featured}
                />
              ))}
            </div>
          ) : (
            <div className="clay-card py-24 text-center bg-clay-surface-2/10 border-none shadow-none">
              <Package className="w-20 h-20 text-clay-text-muted/20 mx-auto mb-6" />
              <p className="text-xl font-display font-bold text-clay-text-muted">Nenhum projeto publicado no momento.</p>
            </div>
          )}
        </section>

        {/* Reviews Section */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-sm font-display font-black text-clay-primary uppercase tracking-widest mb-1">Feedback</p>
              <h2 className="text-4xl font-display font-black text-clay-text-primary">O que dizem os clientes</h2>
            </div>
          </div>

          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.slice(0, 6).map((review) => (
                <div key={review.id} className="clay-card p-8 group hover:scale-[1.02] transition-transform">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-clay-surface-2 flex items-center justify-center font-display font-black text-clay-primary shadow-sm group-hover:bg-clay-primary group-hover:text-white transition-colors">
                        {review.user_name?.[0].toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-display font-black text-clay-text-primary">{review.user_name || 'Usuário'}</p>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-clay-surface-3'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {review.title && <h4 className="font-display font-bold text-clay-text-primary mb-3">{review.title}</h4>}
                  <p className="font-body text-clay-text-secondary leading-relaxed line-clamp-4">{review.comment}</p>
                  <div className="mt-6 pt-6 border-t font-body text-[10px] font-black text-clay-text-muted uppercase tracking-widest">
                    Postado em {formatDate(review.created_at)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="clay-card py-20 text-center bg-clay-surface-2/10 border-none shadow-none">
              <Star className="w-16 h-16 text-clay-text-muted/20 mx-auto mb-6" />
              <p className="text-clay-text-muted font-body">Esta empresa ainda não possui avaliações públicas.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
