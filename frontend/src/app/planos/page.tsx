'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Plan } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Check, X, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get<{ data: Plan[] }>('/plans');
        setPlans(res.data.data || []);
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const defaultPlans: Plan[] = plans.length > 0 ? plans : [
    {
      id: 1,
      name: 'Grátis',
      slug: 'free',
      description: 'Perfeito para começar',
      price_monthly: 0,
      price_yearly: 0,
      features: ['Até 3 produtos', 'Perfil básico', 'Busca no marketplace', 'Suporte por email'],
      limits: { products: 3, views: 500 },
      highlighted: false,
      active: true,
      position: 1,
    },
    {
      id: 2,
      name: 'Starter',
      slug: 'starter',
      description: 'Ideal para pequenos negócios',
      price_monthly: 197,
      price_yearly: 1970,
      features: ['Até 10 produtos', 'Perfil completo', 'Destaque nos resultados', '优先 suporte', 'Estatísticas básicas'],
      limits: { products: 10, views: 5000 },
      highlighted: true,
      active: true,
      position: 2,
    },
    {
      id: 3,
      name: 'Pro',
      slug: 'pro',
      description: 'Para negócios em crescimento',
      price_monthly: 497,
      price_yearly: 4970,
      features: ['Produtos ilimitados', 'Perfil destacado', 'Topo dos resultados', 'Suporte prioritário', 'Estatísticas avançadas', 'API de integração', 'White-label'],
      limits: { products: -1, views: -1 },
      highlighted: false,
      active: true,
      position: 3,
    },
    {
      id: 4,
      name: 'Enterprise',
      slug: 'enterprise',
      description: 'Solução completa',
      price_monthly: 0,
      price_yearly: 0,
      features: ['Tudo do Pro', 'Conta dedicada', 'Desenvolvimento customizado', 'SLA garantido', 'Treinamento da equipe', 'Múltiplos usuários'],
      limits: { products: -1, views: -1 },
      highlighted: false,
      active: true,
      position: 4,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Planos e Preços</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Escolha o plano ideal para seu negócio. Todos os planos incluem acesso ao marketplace e suporte técnico.
        </p>
      </div>

      {/* Toggle */}
      {/* <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg flex">
          <button className="px-4 py-2 rounded-md bg-white shadow text-sm font-medium">Mensal</button>
          <button className="px-4 py-2 rounded-md text-sm text-gray-500 hover:text-gray-900">Anual</button>
        </div>
      </div> */}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {defaultPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.highlighted ? 'border-emerald-500 border-2 shadow-lg' : ''}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-emerald-600 text-white text-sm px-3 py-1 rounded-full flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    Mais Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center pt-2">
                <div className="mb-6">
                  {plan.price_monthly === 0 ? (
                    <div className="text-4xl font-bold text-gray-900">Sob Consulta</div>
                  ) : (
                    <>
                      <div className="text-4xl font-bold text-gray-900">
                        {formatPrice(plan.price_monthly)}
                        <span className="text-sm font-normal text-gray-500">/mês</span>
                      </div>
                      {plan.price_yearly && plan.price_yearly > 0 && (
                        <div className="text-sm text-gray-500 mt-1">
                          ou {formatPrice(plan.price_yearly)}/ano
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                <ul className="space-y-3 text-left">
                  {plan.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {user ? (
                  <Button 
                    className="w-full" 
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    Assinar {plan.name}
                  </Button>
                ) : (
                  <Link href="/cadastro" className="w-full">
                    <Button 
                      className="w-full" 
                      variant={plan.highlighted ? 'default' : 'outline'}
                    >
                      Começar Grátis
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Perguntas Frequentes</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: 'Posso mudar de plano depois?',
              a: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças serão aplicadas no próximo ciclo de cobrança.',
            },
            {
              q: 'Quais formas de pagamento são aceitas?',
              a: 'Aceitamos cartão de crédito (Visa, Mastercard, American Express), PIX e Boleto Bancário para planos anuais.',
            },
            {
              q: 'É possível cancelar a qualquer momento?',
              a: 'Sim, você pode cancelar sua assinatura a qualquer momento. O acesso será mantido até o final do período pago.',
            },
            {
              q: 'O que acontece se exceder os limites do plano?',
              a: 'Entraremos em contato para discutir opções de upgrade. Você não perderá acesso aos seus produtos cadastrados.',
            },
          ].map((faq, idx) => (
            <Card key={idx}>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
