'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Company, Product, Review } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice, formatDate } from '@/lib/utils';
import { 
  Star, MapPin, Phone, Mail, Globe, ChevronRight, 
  Package, Shield, MessageCircle, ArrowRight
} from 'lucide-react';

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

    if (slug) {
      fetchData();
    }
  }, [slug]);

  const jsonLd = company ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": company.name,
    "description": company.description,
    "logo": company.logo_url,
    "image": company.cover_url,
    "address": company.address ? {
      "@type": "PostalAddress",
      "addressLocality": company.city_name,
      "addressRegion": company.region_name,
      "postalCode": company.zip_code,
      "streetAddress": company.address
    } : undefined,
    "telephone": company.phone,
    "email": company.email,
    "url": company.website,
    "aggregateRating": company.average_rating ? {
      "@type": "AggregateRating",
      "ratingValue": company.average_rating,
      "reviewCount": company.reviews_count || 0
    } : undefined
  } : null;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Empresa não encontrada</h1>
        <p className="text-gray-500 mb-6">A empresa que você procura não existe ou foi removida.</p>
        <Link href="/empresas">
          <Button>Ver Empresas</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      
      <div className="h-64 bg-gradient-to-r from-emerald-600 to-emerald-800 relative">
        {company.cover_url && (
          <img src={company.cover_url} alt="" className="w-full h-full object-cover" />
        )}
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center -mt-16 md:-mt-20 border-4 border-white">
              {company.logo_url ? (
                <img src={company.logo_url} alt={company.name} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <Package className="w-16 h-16 text-gray-400" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
                {company.verified && (
                  <span className="bg-emerald-100 text-emerald-700 text-sm px-2 py-1 rounded-full flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    Verificada
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                {company.city_name && (
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {company.city_name}
                  </span>
                )}
                {company.average_rating && (
                  <span className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                    {company.average_rating} ({company.reviews_count} avaliações)
                  </span>
                )}
                <span className="flex items-center">
                  <Package className="w-4 h-4 mr-1" />
                  {company.products_count || 0} produtos
                </span>
              </div>

              <p className="text-gray-600 mb-4">{company.description}</p>

              <div className="flex flex-wrap gap-3">
                {company.phone && (
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    {company.phone}
                  </Button>
                )}
                {company.email && (
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                )}
                {company.website && (
                  <Button variant="outline" size="sm">
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                  </Button>
                )}
                <Button size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </div>
            </div>
          </div>
        </div>

        {company.categories && company.categories.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Atuação</h2>
            <div className="flex flex-wrap gap-2">
              {company.categories.map((cat) => (
                <Link key={cat.id} href={`/busca?categoria=${cat.slug}`}>
                  <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Produtos</h2>
            <Link href={`/busca?empresa=${company.slug}`} className="text-emerald-600 hover:text-emerald-700 flex items-center">
              Ver todos <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <Link key={product.id} href={`/produto/${product.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="aspect-video bg-gray-200 relative">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Package className="w-8 h-8 text-gray-400" />
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
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Nenhum produto cadastrado</p>
              </CardContent>
            </Card>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Avaliações</h2>
          </div>
          
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.slice(0, 6).map((review) => (
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
                <Star className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Nenhuma avaliação ainda</p>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}
