'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { Product, QuoteRequest, Lead } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice, formatDate } from '@/lib/utils';
import { Package, Heart, FileText, Users, TrendingUp, ArrowRight, Settings } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const [favRes, quotesRes] = await Promise.all([
            api.get<{ data: Product[] }>('/favorites'),
            api.get<{ data: QuoteRequest[] }>('/quote_requests'),
          ]);
          setFavorites(favRes.data.data || []);
          setQuoteRequests(quotesRes.data.data || []);

          if (user.company) {
            const leadsRes = await api.get<{ data: Lead[] }>('/leads');
            setLeads(leadsRes.data.data || []);
          }
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Favoritos', value: favorites.length, icon: Heart, href: '/dashboard/favoritos' },
    { label: 'Orçamentos', value: quoteRequests.length, icon: FileText, href: '/dashboard/orcamentos' },
    { label: 'Leads', value: leads.length, icon: Users, href: '/dashboard/leads' },
    { label: 'Visualizações', value: user.company?.products_count || 0, icon: TrendingUp, href: '/dashboard/estatisticas' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bem-vindo, {user.name || user.email}!</h1>
          <p className="text-gray-500">Gerencie sua conta e favoritos</p>
        </div>
        <Link href="/dashboard/configuracoes">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </Button>
        </Link>
      </div>

      {/* Subscription Card */}
      {user.subscription && (
        <Card className="mb-8 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100">Seu Plano</p>
                <h2 className="text-2xl font-bold">{user.subscription.plan_name}</h2>
                <p className="text-emerald-100">
                  {user.subscription.status === 'active' ? 'Ativo' : 'Inativo'} •{' '}
                  {user.subscription.billing_cycle === 'monthly' ? 'Mensal' : 'Anual'}
                </p>
              </div>
              <Link href="/planos">
                <Button variant="secondary">Alterar Plano</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Favorites */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Favoritos Recentes</CardTitle>
            <Link href="/dashboard/favoritos" className="text-sm text-emerald-600 hover:text-emerald-700">
              Ver todos <ArrowRight className="w-4 h-4 inline ml-1" />
            </Link>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            ) : favorites.length > 0 ? (
              <div className="space-y-4">
                {favorites.slice(0, 5).map((product) => (
                  <Link
                    key={product.id}
                    href={`/produto/${product.slug}`}
                    className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0">
                      {product.images?.[0] && (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.company_name}</p>
                      <p className="text-sm font-semibold text-emerald-600">{formatPrice(product.base_price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Nenhum favorito ainda</p>
                <Link href="/busca" className="text-emerald-600 hover:text-emerald-700 text-sm">
                  Buscar produtos
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Quote Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Orçamentos Recentes</CardTitle>
            <Link href="/dashboard/orcamentos" className="text-sm text-emerald-600 hover:text-emerald-700">
              Ver todos <ArrowRight className="w-4 h-4 inline ml-1" />
            </Link>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            ) : quoteRequests.length > 0 ? (
              <div className="space-y-4">
                {quoteRequests.slice(0, 5).map((quote) => (
                  <div key={quote.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{quote.product_name}</p>
                      <p className="text-sm text-gray-500">{quote.company_name}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        quote.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        quote.status === 'accepted' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {quote.status === 'pending' ? 'Pendente' :
                         quote.status === 'accepted' ? 'Aceito' :
                         quote.status === 'declined' ? 'Recusado' : quote.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(quote.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Nenhum orçamento ainda</p>
                <Link href="/busca" className="text-emerald-600 hover:text-emerald-700 text-sm">
                  Solicitar orçamento
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
