'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { Product, QuoteRequest } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice, formatDate } from '@/lib/utils';
import { 
  Package, Heart, FileText, Users, Settings, 
  BarChart3, Building, ChevronRight
} from 'lucide-react';

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const res = await api.get<{ data: Product[] }>('/favorites');
          setFavorites(res.data.data || []);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { href: '/dashboard', label: 'Geral', icon: BarChart3 },
    { href: '/dashboard/favoritos', label: 'Favoritos', icon: Heart },
    { href: '/dashboard/orcamentos', label: 'Orçamentos', icon: FileText },
    ...(user.company ? [{ href: '/dashboard/empresa', label: 'Minha Empresa', icon: Building }] : []),
    { href: '/dashboard/configuracoes', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Meus Favoritos</h1>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-64 animate-pulse" />
              ))}
            </div>
          ) : favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((product) => (
                <Link key={product.id} href={`/produto/${product.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow overflow-hidden h-full">
                    <div className="aspect-video bg-gray-200">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-500 mb-1">{product.category_name}</p>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{product.company_name}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-emerald-600">{formatPrice(product.base_price)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum favorito ainda</h3>
                <p className="text-gray-500 mb-6">Explore produtos e salve seus favoritos</p>
                <Link href="/busca">
                  <Button>Buscar Produtos</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
