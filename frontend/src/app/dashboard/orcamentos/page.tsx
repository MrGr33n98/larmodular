'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { QuoteRequest } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice, formatDate } from '@/lib/utils';
import { 
  Package, Heart, FileText, Users, Settings, 
  BarChart3, Building, ChevronRight
} from 'lucide-react';

export default function QuotesPage() {
  const { user, loading: authLoading } = useAuth();
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
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
          const res = await api.get<{ data: QuoteRequest[] }>('/quote_requests');
          setQuotes(res.data.data || []);
        } catch (error) {
          console.error('Error fetching quotes:', error);
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
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
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

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      responded: 'bg-blue-100 text-blue-700',
      accepted: 'bg-green-100 text-green-700',
      declined: 'bg-red-100 text-red-700',
      expired: 'bg-gray-100 text-gray-700',
    };
    const labels: Record<string, string> = {
      pending: 'Pendente',
      responded: 'Respondido',
      accepted: 'Aceito',
      declined: 'Recusado',
      expired: 'Expirado',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${styles[status] || styles.pending}`}>
        {labels[status] || status}
      </span>
    );
  };

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
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Meus Orçamentos</h1>
          
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : quotes.length > 0 ? (
            <div className="space-y-3">
              {quotes.map((quote) => (
                <Card key={quote.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{quote.product_name}</h3>
                          {getStatusBadge(quote.status)}
                        </div>
                        <p className="text-sm text-gray-500">{quote.company_name}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDate(quote.created_at)}
                        </p>
                      </div>
                      <div className="text-right">
                        {quote.quoted_price && (
                          <p className="font-bold text-emerald-600">{formatPrice(quote.quoted_price)}</p>
                        )}
                        {quote.budget_min && quote.budget_max && (
                          <p className="text-sm text-gray-500">
                            Orçamento: {formatPrice(quote.budget_min)} - {formatPrice(quote.budget_max)}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum orçamento ainda</h3>
                <p className="text-gray-500 mb-6">Solicite orçamentos aos vendedores</p>
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
