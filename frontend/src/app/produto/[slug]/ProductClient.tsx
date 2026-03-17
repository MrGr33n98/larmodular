'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/toast';
import { Product, Review } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice, formatDate } from '@/lib/utils';
import {
  Star, Heart, Share2, MessageCircle, MapPin,
  ChevronLeft, ChevronRight, Check, Package, Shield, Truck, X,
  Maximize, BedDouble, Bath, Calendar, Award, SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '@/components/marketplace/ProductCard';

// ── Quote form schema ──────────────────────────────────────────────
const quoteSchema = z.object({
  name:       z.string().min(2, 'Nome obrigatório'),
  email:      z.string().email('E-mail inválido'),
  phone:      z.string().min(8, 'Telefone obrigatório'),
  message:    z.string().min(10, 'Descreva brevemente sua necessidade'),
  budget_min: z.string().optional(),
  budget_max: z.string().optional(),
  timeline:   z.string().optional(),
});
type QuoteFormData = z.infer<typeof quoteSchema>;

// ── Quote Modal ────────────────────────────────────────────────────
function QuoteModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({ resolver: zodResolver(quoteSchema) });

  const onSubmit = async (data: QuoteFormData) => {
    setSubmitting(true);
    try {
      await api.post('/quote_requests', {
        quote_request: {
          product_id:  product.id,
          company_id:  product.company_id,
          message:     data.message,
          budget_min:  data.budget_min ? parseFloat(data.budget_min) : undefined,
          budget_max:  data.budget_max ? parseFloat(data.budget_max) : undefined,
          timeline:    data.timeline,
          lead_attributes: {
            name:  data.name,
            email: data.email,
            phone: data.phone,
          },
        },
      });
      toast({
        type: 'success',
        title: 'Orçamento enviado!',
        description: 'A empresa entrará em contato em breve.',
      });
      reset();
      onClose();
    } catch (err: any) {
      const messages: string[] =
        err?.response?.data?.errors ||
        err?.response?.data?.message ||
        [];
      toast({
        type: 'error',
        title: 'Não foi possível enviar',
        description: Array.isArray(messages) ? messages.join(', ') : String(messages),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-clay-text-primary/20 backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="clay-card relative w-full max-w-xl p-0 overflow-hidden border-none"
      >
        {/* Header */}
        <div className="p-8 pb-4 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-display font-black text-clay-text-primary">Solicitar Orçamento</h2>
            <p className="text-sm text-clay-text-secondary mt-1 font-body">{product.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-clay-surface-2 text-clay-text-muted hover:text-clay-text-primary transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 pt-4 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-display font-bold text-clay-text-primary ml-1">Nome Completo</label>
              <Input 
                {...register('name')} 
                placeholder="Seu nome" 
                className="bg-clay-surface-2/50 border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] rounded-2xl h-12"
              />
              {errors.name && <p className="text-xs text-red-500 font-bold ml-1">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-display font-bold text-clay-text-primary ml-1">Telefone / WhatsApp</label>
              <Input 
                {...register('phone')} 
                placeholder="(00) 00000-0000" 
                className="bg-clay-surface-2/50 border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] rounded-2xl h-12"
              />
              {errors.phone && <p className="text-xs text-red-500 font-bold ml-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-display font-bold text-clay-text-primary ml-1">E-mail</label>
            <Input 
              {...register('email')} 
              placeholder="seu@email.com" 
              className="bg-clay-surface-2/50 border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] rounded-2xl h-12"
            />
            {errors.email && <p className="text-xs text-red-500 font-bold ml-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-display font-bold text-clay-text-primary ml-1">Mensagem</label>
            <textarea
              {...register('message')}
              rows={3}
              placeholder="Descreva suas necessidades..."
              className="w-full px-4 py-3 bg-clay-surface-2/50 border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] rounded-2xl focus:ring-2 focus:ring-clay-primary font-body text-clay-text-primary resize-none"
            />
            {errors.message && <p className="text-xs text-red-500 font-bold ml-1">{errors.message.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-display font-bold text-clay-text-primary ml-1">Prazo Desejado</label>
              <select
                {...register('timeline')}
                className="w-full px-4 py-3 bg-clay-surface-2/50 border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] rounded-2xl focus:ring-2 focus:ring-clay-primary font-body text-clay-text-primary appearance-none h-12"
              >
                <option value="">Selecione...</option>
                <option value="1_month">Até 1 mês</option>
                <option value="3_months">1 a 3 meses</option>
                <option value="6_months">3 a 6 meses</option>
                <option value="flexible">Flexível</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                type="submit"
                className="w-full h-12 shadow-lg hover:shadow-xl"
                disabled={submitting}
              >
                {submitting ? 'Enviando...' : 'Enviar Agora'}
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────
export default function ProductClient({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes] = await Promise.all([
          api.get<{ data: Product }>(`/products/${slug}`),
        ]);
        setProduct(productRes.data.data);

        if (productRes.data.data) {
          const [reviewsRes, relatedRes] = await Promise.all([
            api.get<{ data: Review[] }>(`/products/${slug}/reviews`),
            api.get<{ data: Product[] }>(`/products/${slug}/related`),
          ]);
          setReviews(reviewsRes.data.data || []);
          setRelatedProducts(relatedRes.data.data || []);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  const handleFavorite = () => setIsFavorite(!isFavorite);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product?.name, text: product?.description, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ type: 'success', title: 'Link copiado!' });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-96 bg-clay-surface-2/30 rounded-[32px]" />
          <div className="w-2/3 h-10 bg-clay-surface-2/30 rounded-xl" />
          <div className="w-1/3 h-6 bg-clay-surface-2/30 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="clay-card max-w-md mx-auto py-16">
          <Package className="w-20 h-20 text-clay-text-muted/30 mx-auto mb-6" />
          <h1 className="text-3xl font-display font-black text-clay-text-primary mb-4">Produto não encontrado</h1>
          <p className="text-clay-text-secondary mb-8 font-body">Este item pode ter sido removido ou o link está incorreto.</p>
          <Link href="/busca">
            <Button variant="clay">Voltar para busca</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : ['/placeholder.jpg'];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm font-body font-bold text-clay-text-muted mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-clay-primary transition-colors">Início</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/busca" className="hover:text-clay-primary transition-colors">Produtos</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-clay-text-primary truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Images Selection */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="clay-card p-4 aspect-square relative group bg-white border-none shadow-xl"
          >
            <div className="w-full h-full rounded-[24px] overflow-hidden relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] border-4 border-clay-surface-2/30">
              <img
                src={images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.featured && (
                <div className="absolute top-4 left-4 bg-clay-primary text-white text-xs font-black px-4 py-2 rounded-full shadow-lg uppercase tracking-widest">
                  Edição Limitada
                </div>
              )}
            </div>
            
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                className="p-3 rounded-full bg-white/90 shadow-clay-flat text-clay-text-primary pointer-events-auto hover:scale-110 active:scale-95 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                className="p-3 rounded-full bg-white/90 shadow-clay-flat text-clay-text-primary pointer-events-auto hover:scale-110 active:scale-95 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2 px-1 scrollbar-hide">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`flex-shrink-0 w-24 h-24 rounded-[20px] overflow-hidden border-4 transition-all ${
                  currentImage === idx 
                    ? 'border-clay-primary scale-110 shadow-lg' 
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <span className="inline-block bg-clay-sky-mist px-4 py-1.5 rounded-full text-xs font-black text-clay-grass-deep uppercase tracking-widest mb-4 shadow-sm">
              {product.category_name || 'Construção Modular'}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-black text-clay-text-primary leading-tight mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-6 text-clay-text-secondary font-body font-bold">
              {product.average_rating && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full shadow-sm">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-clay-text-primary">{product.average_rating}</span>
                  <span className="text-clay-text-muted text-sm font-medium">({product.reviews_count} avaliações)</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-clay-primary" />
                <span>{product.location || 'Brasil'}</span>
              </div>
            </div>
          </div>

          <div className="clay-card bg-clay-surface-2/20 border-none shadow-none mb-8 p-6">
            <p className="text-[12px] font-display font-black text-clay-text-muted uppercase tracking-[0.2em] mb-1">Investimento Inicial</p>
            <p className="text-5xl font-display font-black text-clay-grass-deep">
              {formatPrice(product.base_price)}
            </p>
          </div>

          <p className="text-lg text-clay-text-secondary font-body leading-relaxed mb-10">
            {product.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="clay-inset p-4 rounded-3xl flex flex-col items-center justify-center text-center">
              <Maximize className="w-6 h-6 text-clay-primary mb-2" />
              <span className="text-lg font-display font-black text-clay-text-primary">{product.area_m2 || 0}m²</span>
              <span className="text-[10px] font-black text-clay-text-muted uppercase tracking-widest">Área Total</span>
            </div>
            <div className="clay-inset p-4 rounded-3xl flex flex-col items-center justify-center text-center">
              <BedDouble className="w-6 h-6 text-clay-primary mb-2" />
              <span className="text-lg font-display font-black text-clay-text-primary">{product.bedrooms || 0}</span>
              <span className="text-[10px] font-black text-clay-text-muted uppercase tracking-widest">Quartos</span>
            </div>
            <div className="clay-inset p-4 rounded-3xl flex flex-col items-center justify-center text-center">
              <Bath className="w-6 h-6 text-clay-primary mb-2" />
              <span className="text-lg font-display font-black text-clay-text-primary">{product.bathrooms || 0}</span>
              <span className="text-[10px] font-black text-clay-text-muted uppercase tracking-widest">Banheiros</span>
            </div>
            <div className="clay-inset p-4 rounded-3xl flex flex-col items-center justify-center text-center">
              <Calendar className="w-6 h-6 text-clay-primary mb-2" />
              <span className="text-lg font-display font-black text-clay-text-primary">{product.lead_time_days || 45}d</span>
              <span className="text-[10px] font-black text-clay-text-muted uppercase tracking-widest">Entrega</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-auto">
            <Button
              size="lg"
              className="flex-1 min-w-[200px] py-8 rounded-[24px] text-xl shadow-xl hover:shadow-2xl active:scale-95 transition-all h-auto"
              onClick={() => setShowQuoteModal(true)}
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Quero um Orçamento
            </Button>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                variant="outline" 
                className="p-8 rounded-[24px] h-full shadow-lg hover:bg-clay-surface-2 transition-all"
                onClick={handleFavorite}
              >
                <Heart className={`w-8 h-8 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-clay-text-muted'}`} />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="p-8 rounded-[24px] h-full shadow-lg hover:bg-clay-surface-2 transition-all"
                onClick={handleShare}
              >
                <Share2 className="w-8 h-8 text-clay-text-muted" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sell by */}
      {product.company_name && (
        <section className="mb-20">
          <div className="clay-card p-10 flex flex-col md:flex-row items-center gap-8 bg-clay-sky-mist/30 border-none shadow-none">
            <div className="w-24 h-24 rounded-[28px] bg-white p-2 shadow-clay-flat flex-shrink-0">
              <div className="w-full h-full rounded-[22px] overflow-hidden border-2 border-clay-surface-2">
                {product.company_logo ? (
                  <img src={product.company_logo} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-clay-surface-2">
                    <Package className="w-10 h-10 text-clay-text-muted/40" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-sm font-display font-black text-clay-text-muted uppercase tracking-wider mb-1">Fabricante Autorizado</p>
              <h2 className="text-3xl font-display font-black text-clay-text-primary mb-2">{product.company_name}</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-1.5 text-clay-grass-deep font-body font-bold">
                  <Award className="w-4 h-4" />
                  <span>Vendedor Verificado</span>
                </div>
                <div className="flex items-center gap-1.5 text-clay-text-secondary font-body">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>4.8 (82 vendas)</span>
                </div>
              </div>
            </div>
            <Link href={`/empresa/${product.company_name?.toLowerCase().replace(/\s+/g, '-')}`}>
              <Button variant="clay" size="lg" className="px-8 rounded-2xl">
                Ver Perfil Completo
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Specifications & Content */}
      <div className="flex flex-col lg:flex-row gap-12 mb-20">
        <div className="flex-1 space-y-12">
          {/* Detailed Specs */}
          <section>
            <h2 className="text-3xl font-display font-black text-clay-text-primary mb-8 flex items-center gap-3">
              <SlidersHorizontal className="w-8 h-8 text-clay-primary" />
              Ficha Técnica
            </h2>
            <div className="clay-card p-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {product.specifications ? (
                Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b-2 border-clay-surface-2 last:border-0">
                    <span className="text-clay-text-secondary font-body font-bold capitalize">{key.replace(/_/g, ' ')}</span>
                    <span className="text-clay-text-primary font-display font-black">{String(value)}</span>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-8 text-center text-clay-text-muted font-body">
                  Nenhuma especificação detalhada disponível.
                </div>
              )}
            </div>
          </section>

          {/* Reviews Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-display font-black text-clay-text-primary">Avaliações</h2>
              <Button variant="clay" size="sm">Fazer Avaliação</Button>
            </div>
            
            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="clay-card p-8 group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-clay-surface-2 flex items-center justify-center font-display font-black text-clay-primary shadow-sm">
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
                      <span className="text-xs font-bold text-clay-text-muted">{formatDate(review.created_at)}</span>
                    </div>
                    {review.title && <h4 className="font-display font-bold text-clay-text-primary mb-2">{review.title}</h4>}
                    <p className="font-body text-clay-text-secondary leading-relaxed">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="clay-card py-16 text-center bg-clay-surface-2/20 border-none shadow-none">
                  <Package className="w-16 h-16 text-clay-text-muted/20 mx-auto mb-4" />
                  <p className="text-clay-text-muted font-body">Este produto ainda não recebeu avaliações.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Desktop Sidebar / Sticky CTA */}
        <aside className="lg:w-96 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="clay-card p-8 border-clay-primary/10">
              <h3 className="text-xl font-display font-black text-clay-text-primary mb-6 text-center leading-tight">Pronto para seu novo lar?</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-clay-text-secondary">
                  <div className="w-10 h-10 rounded-xl bg-clay-sky-mist flex items-center justify-center text-clay-grass-deep flex-shrink-0 shadow-sm">
                    <Shield className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-body font-bold">Compra Garantida LARModular</p>
                </div>
                <div className="flex items-center gap-4 text-clay-text-secondary">
                  <div className="w-10 h-10 rounded-xl bg-clay-sky-mist flex items-center justify-center text-clay-grass-deep flex-shrink-0 shadow-sm">
                    <Truck className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-body font-bold">Entrega em todo o Brasil</p>
                </div>
                <div className="flex items-center gap-4 text-clay-text-secondary">
                  <div className="w-10 h-10 rounded-xl bg-clay-sky-mist flex items-center justify-center text-clay-grass-deep flex-shrink-0 shadow-sm">
                    <Award className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-body font-bold">Padrão de Qualidade Premium</p>
                </div>
              </div>
              <Button 
                variant="clay" 
                className="w-full py-6 rounded-2xl text-lg h-auto shadow-lg"
                onClick={() => setShowQuoteModal(true)}
              >
                Atendimento Rápido
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="text-3xl font-display font-black text-clay-text-primary mb-8">Também pode te interessar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.slice(0, 4).map((prod) => (
              <ProductCard
                key={prod.id}
                id={prod.id}
                name={prod.name}
                slug={prod.slug}
                basePrice={prod.base_price}
                imageUrl={prod.images?.[0] || '/placeholder.jpg'}
                location={prod.location || 'Brasil'}
                area={prod.area_m2 || 0}
                bedrooms={prod.bedrooms || 0}
                isVerified={prod.featured}
              />
            ))}
          </div>
        </section>
      )}

      {/* Quote Modal */}
      <AnimatePresence>
        {showQuoteModal && (
          <QuoteModal product={product} onClose={() => setShowQuoteModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
