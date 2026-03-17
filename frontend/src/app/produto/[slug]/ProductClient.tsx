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
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatPrice, formatDate } from '@/lib/utils';
import {
  Star, Heart, Share2, MessageCircle, MapPin,
  ChevronLeft, ChevronRight, Check, Package, Shield, Truck, X,
} from 'lucide-react';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.95)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.1)',
        }}
      >
        {/* Header */}
        <div className="px-7 pt-7 pb-4 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Solicitar Orçamento</h2>
            <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{product.name}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-7 pb-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
              <Input {...register('name')} placeholder="Seu nome completo" />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone *</label>
              <Input {...register('phone')} placeholder="(11) 99999-9999" type="tel" />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
            <Input {...register('email')} placeholder="seu@email.com" type="email" />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem *</label>
            <textarea
              {...register('message')}
              rows={3}
              placeholder="Descreva suas necessidades, localidade, personalização..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            />
            {errors.message && (
              <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Orçamento mín. (R$)</label>
              <Input {...register('budget_min')} placeholder="50.000" type="number" min="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Orçamento máx. (R$)</label>
              <Input {...register('budget_max')} placeholder="200.000" type="number" min="0" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prazo desejado</label>
            <select
              {...register('timeline')}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Selecione</option>
              <option value="1_month">Até 1 mês</option>
              <option value="3_months">1 a 3 meses</option>
              <option value="6_months">3 a 6 meses</option>
              <option value="12_months">6 a 12 meses</option>
              <option value="flexible">Flexível</option>
            </select>
          </div>

          <div className="pt-2 flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={submitting}
            >
              {submitting ? 'Enviando...' : 'Enviar Orçamento'}
            </Button>
          </div>
        </form>
      </div>
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

  const jsonLd = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.images,
    "offers": {
      "@type": "Offer",
      "price": product.base_price,
      "priceCurrency": "BRL",
      "availability": product.active ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    "aggregateRating": product.average_rating ? {
      "@type": "AggregateRating",
      "ratingValue": product.average_rating,
      "reviewCount": product.reviews_count || 0,
    } : undefined,
    "seller": product.company_name ? {
      "@type": "Organization",
      "name": product.company_name,
    } : undefined,
  } : null;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-xl mb-8" />
          <div className="h-8 bg-gray-200 rounded w-2/3 mb-4" />
          <div className="h-6 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Produto não encontrado</h1>
        <p className="text-gray-500 mb-6">O produto que você procura não existe ou foi removido.</p>
        <Link href="/busca">
          <Button>Buscar Produtos</Button>
        </Link>
      </div>
    );
  }

  const images = product.images?.length ? product.images : ['/placeholder.jpg'];

  return (
    <div className="container mx-auto px-4 py-8">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <nav className="flex items-center text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-emerald-600">Início</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/busca" className="hover:text-emerald-600">Produtos</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href={`/busca?categoria=${product.category_id}`} className="hover:text-emerald-600">
          {product.category_name}
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900 truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4 relative"
               style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
            <img
              src={images[currentImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.featured && (
              <span className="absolute top-4 left-4 bg-emerald-600 text-white text-sm px-3 py-1 rounded-full">
                Destaque
              </span>
            )}
            <button
              onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                  currentImage === idx ? 'border-emerald-500 scale-105' : 'border-transparent opacity-70'
                }`}
              >
                <img src={img} alt={`${product.name} - ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-gray-500 mb-2">{product.category_name}</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

          <div className="flex items-center gap-4 mb-4">
            {product.average_rating && (
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 font-medium">{product.average_rating}</span>
                <span className="ml-1 text-gray-500">({product.reviews_count} avaliações)</span>
              </div>
            )}
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">{product.views_count} visualizações</span>
          </div>

          <p className="text-4xl font-bold text-emerald-600 mb-6">
            {formatPrice(product.base_price)}
          </p>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button
              size="lg"
              className="flex-1"
              onClick={() => setShowQuoteModal(true)}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Solicitar Orçamento
            </Button>
            <Button size="lg" variant="outline" onClick={handleFavorite}>
              <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              {isFavorite ? 'Favoritado' : 'Favoritar'}
            </Button>
            <Button size="lg" variant="ghost" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Shield className="w-5 h-5 mr-3 text-emerald-600" />
              <span>Compra segura</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Truck className="w-5 h-5 mr-3 text-emerald-600" />
              <span>Frete calculado para seu CEP</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Check className="w-5 h-5 mr-3 text-emerald-600" />
              <span>Garantia do fabricante</span>
            </div>
          </div>

          {product.company_name && (
            <div className="mt-8 p-4 bg-gray-50 rounded-2xl">
              <p className="text-sm text-gray-500 mb-2">Vendido por</p>
              <Link
                href={`/empresa/${product.company_name?.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center hover:text-emerald-600"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-xl mr-3 flex items-center justify-center overflow-hidden">
                  {product.company_logo ? (
                    <img src={product.company_logo} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Package className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{product.company_name}</p>
                  <p className="text-sm text-gray-500">Ver perfil</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Specifications */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Especificações</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-100 pb-2">
                    <p className="text-sm text-gray-500 capitalize">{key.replace(/_/g, ' ')}</p>
                    <p className="font-medium text-gray-900">{String(value)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Reviews */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Avaliações ({product.reviews_count || 0})
        </h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.slice(0, 5).map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{review.user_name}</p>
                      <div className="flex items-center mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
                  </div>
                  {review.title && <p className="font-medium text-gray-900 mb-1">{review.title}</p>}
                  {review.comment && <p className="text-gray-600">{review.comment}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">Nenhuma avaliação ainda</p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <Link key={prod.id} href={`/produto/${prod.slug}`}>
                <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-video bg-gray-200 relative">
                    {prod.images?.[0] ? (
                      <img src={prod.images[0]} alt={prod.name} className="object-cover w-full h-full" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500">{prod.category_name}</p>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{prod.name}</h3>
                    <p className="text-lg font-bold text-emerald-600">{formatPrice(prod.base_price)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Quote Modal */}
      {showQuoteModal && (
        <QuoteModal product={product} onClose={() => setShowQuoteModal(false)} />
      )}
    </div>
  );
}
