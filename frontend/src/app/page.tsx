'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Product, Category, Company, Region } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { ArrowRight, Search, Home, Package, Star, MapPin } from 'lucide-react';

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
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-floresta via-floresta-dark to-floresta text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 texture-linen" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-terracota/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-horizonte/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              Encontre sua Casa Modular dos Sonhos
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              O maior marketplace brasileiro de Tiny Houses, Containers e Construções Modulares
            </p>
            
            <div className="bg-white/95 backdrop-blur rounded-xl p-2 shadow-elevated flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="O que você procura?"
                  className="w-full px-4 py-3.5 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-terracota bg-creme"
                />
              </div>
              <div className="flex-1">
                <select className="w-full px-4 py-3.5 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-terracota bg-creme">
                  <option value="">Todas as categorias</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <Link href="/busca">
                <Button size="lg" className="w-full md:w-auto">
                  <Search className="w-5 h-5 mr-2" />
                  Buscar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-foreground font-serif">Categorias</h2>
            <Link href="/categorias" className="text-terracota hover:text-terracota-dark flex items-center font-medium">
              Ver todas <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {categories.slice(0, 8).map((category) => (
              <Link key={category.id} href={`/busca?categoria=${category.slug}`}>
                <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer organic-shadow-hover border-0">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-terracota/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Home className="w-7 h-7 text-terracota" />
                    </div>
                    <h3 className="font-semibold text-foreground">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-areia-escuro/50 texture-paper">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-foreground font-serif">Produtos em Destaque</h2>
            <Link href="/busca?destaque=true" className="text-terracota hover:text-terracota-dark flex items-center font-medium">
              Ver todos <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-areia-escuro rounded-xl h-80 animate-pulse" />
              ))
            ) : (
              featuredProducts.map((product) => (
                <Link key={product.id} href={`/produto/${product.slug}`}>
                  <Card className="hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden organic-shadow-hover border-0">
                    <div className="aspect-video bg-areia-escuro relative">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Package className="w-12 h-12 text-argila/40" />
                        </div>
                      )}
                      {product.featured && (
                        <span className="absolute top-3 left-3 bg-terracota text-white text-xs px-3 py-1.5 rounded-full font-medium">
                          Destaque
                        </span>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <p className="text-sm text-foreground-muted mb-1.5">{product.category_name}</p>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 leading-snug">{product.name}</h3>
                      <p className="text-sm text-foreground-muted mb-3">{product.company_name}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-terracota">{formatPrice(product.base_price)}</span>
                        {product.average_rating && (
                          <div className="flex items-center text-sm text-foreground-muted">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                            {product.average_rating}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground font-serif mb-10 text-center">Encontre por Região</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {regions.map((region) => (
              <Link key={region.id} href={`/busca?regiao=${region.slug}`}>
                <Card className="hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer organic-shadow border-0">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-floresta" />
                    <span className="font-medium text-foreground">{region.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-20 bg-areia-escuro/50 texture-paper">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-foreground font-serif">Empresas Parceiras</h2>
            <Link href="/empresas" className="text-terracota hover:text-terracota-dark flex items-center font-medium">
              Ver todas <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCompanies.map((company) => (
              <Link key={company.id} href={`/empresa/${company.slug}`}>
                <Card className="hover:shadow-xl transition-all hover:-translate-y-1 organic-shadow-hover border-0">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-areia-escuro rounded-lg flex items-center justify-center">
                        {company.logo_url ? (
                          <img src={company.logo_url} alt={company.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <Home className="w-8 h-8 text-argila/40" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground flex items-center">
                          {company.name}
                          {company.verified && <span className="ml-1.5 text-floresta text-sm">✓</span>}
                        </h3>
                        {company.city_name && <p className="text-sm text-foreground-muted">{company.city_name}</p>}
                        {company.average_rating && (
                          <div className="flex items-center mt-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm text-foreground-muted ml-1">{company.average_rating} ({company.reviews_count} avaliações)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-terracota to-terracota-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 texture-linen" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-floresta/30 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 font-serif">É uma empresa do setor?</h2>
          <p className="text-xl text-white/85 mb-10 max-w-2xl mx-auto">
            Cadastre sua empresa no maior marketplace de construções modulares do Brasil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro-empresa">
              <Button size="lg" className="bg-floresta hover:bg-floresta-dark text-white">Cadastrar Empresa</Button>
            </Link>
            <Link href="/planos">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">Ver Planos</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
