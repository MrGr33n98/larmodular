'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Product, Review, Company, Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice, formatDate } from '@/lib/utils';
import { 
  Star, Heart, Share2, Phone, MessageCircle, MapPin, 
  ChevronLeft, ChevronRight, Check, Package, Shield, Truck
} from 'lucide-react';

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes] = await Promise.all([
          api.get<{ data: Product }>(`/products/${params.slug}`),
        ]);
        setProduct(productRes.data.data);
        
        if (productRes.data.data) {
          const [reviewsRes, relatedRes] = await Promise.all([
            api.get<{ data: Review[] }>(`/products/${params.slug}/reviews`),
            api.get<{ data: Product[] }>(`/products/${params.slug}/related`),
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

    if (params.slug) {
      fetchData();
    }
  }, [params.slug]);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-xl mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
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
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-emerald-600">Início</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/busca" className="hover:text-emerald-600">Produtos</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href={`/busca?categoria=${product.category_name}`} className="hover:text-emerald-600">
          {product.category_name}
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900 truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4 relative">
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
              onClick={() => setCurrentImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrentImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  currentImage === idx ? 'border-emerald-600' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
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

          <p className="text-gray-600 mb-6">
            {product.description}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button size="lg" className="flex-1">
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

          {/* Benefits */}
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

          {/* Company Info */}
          {product.company_name && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">Vendido por</p>
              <Link href={`/empresa/${product.company_name?.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center hover:text-emerald-600">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                  {product.company_logo ? (
                    <img src={product.company_logo} alt="" className="w-full h-full object-cover rounded-lg" />
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
                  {review.title && (
                    <p className="font-medium text-gray-900 mb-1">{review.title}</p>
                  )}
                  {review.comment && (
                    <p className="text-gray-600">{review.comment}</p>
                  )}
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
    </div>
  );
}
