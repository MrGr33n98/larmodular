'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.password_confirmation) {
      setError('As senhas não conferem');
      setLoading(false);
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        name: formData.name,
        phone: formData.phone,
      });
      router.push('/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar conta';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Criar Conta</CardTitle>
          <CardDescription>Junte-se ao maior marketplace de construções modulares</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <Input
              label="Nome Completo"
              name="name"
              placeholder="João Silva"
              value={formData.name}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Telefone (opcional)"
              type="tel"
              name="phone"
              placeholder="(11) 99999-9999"
              value={formData.phone}
              onChange={handleChange}
            />
            
            <Input
              label="Senha"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Confirmar Senha"
              type="password"
              name="password_confirmation"
              placeholder="••••••••"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
            
            <div className="text-sm text-gray-600">
              Ao criar uma conta, você concorda com nossos{' '}
              <Link href="/termos" className="text-emerald-600 hover:text-emerald-700">
                Termos de Uso
              </Link>{' '}
              e{' '}
              <Link href="/privacidade" className="text-emerald-600 hover:text-emerald-700">
                Política de Privacidade
              </Link>.
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            Já tem conta?{' '}
            <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
              Entrar
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
