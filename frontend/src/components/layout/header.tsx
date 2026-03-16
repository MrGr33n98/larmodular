'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Building, Package, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-premium w-full",
        scrolled 
          ? "bg-surface-elevated/80 backdrop-blur-xl shadow-clay-external py-2 border-b border-white/20" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 bg-white/40 backdrop-blur-md rounded-[24px] px-6 border border-white/40 shadow-[inset_0_0_12px_rgba(255,255,255,0.5)]">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-brand-primary rounded-2xl flex items-center justify-center clay-button transition-premium group-hover:rotate-6">
              <span className="text-white font-jakarta font-extrabold text-xl">L</span>
            </div>
            <span className="font-jakarta font-extrabold text-2xl text-brand-secondary tracking-tighter">
              LAR<span className="text-brand-primary">Modular</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {['Início', 'Buscar', 'Categorias', 'Empresas'].map((item) => (
              <Link
                key={item}
                href={item === 'Início' ? '/' : `/${item.toLowerCase()}`}
                className="text-brand-secondary/70 hover:text-brand-primary transition-premium text-sm font-bold tracking-tight relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full rounded-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link href="/dashboard">
                  <Button variant="clay" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Meu Painel
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout} className="text-red-500 hover:bg-red-50">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="font-bold text-brand-secondary">
                    Entrar
                  </Button>
                </Link>
                <Link href="/cadastro">
                  <Button size="sm" className="rounded-xl">
                    Começar Agora
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 text-brand-secondary hover:bg-brand-primary/5 rounded-xl transition-premium"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden absolute top-full left-0 w-full p-4 transition-premium',
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <div className="bg-surface-elevated/95 backdrop-blur-2xl rounded-[32px] p-6 shadow-clay-external border border-white/40 space-y-4">
          <Link
            href="/"
            className="flex items-center space-x-3 text-brand-secondary font-bold py-3 px-4 hover:bg-brand-primary/5 rounded-2xl transition-premium"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Home className="w-5 h-5 text-brand-primary" />
            <span>Início</span>
          </Link>
          <Link
            href="/busca"
            className="flex items-center space-x-3 text-brand-secondary font-bold py-3 px-4 hover:bg-brand-primary/5 rounded-2xl transition-premium"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Package className="w-5 h-5 text-brand-primary" />
            <span>Buscar</span>
          </Link>
          <Link
            href="/empresas"
            className="flex items-center space-x-3 text-brand-secondary font-bold py-3 px-4 hover:bg-brand-primary/5 rounded-2xl transition-premium"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Building className="w-5 h-5 text-brand-primary" />
            <span>Empresas</span>
          </Link>
          
          <div className="pt-4 border-t border-brand-secondary/5">
            {user ? (
              <div className="space-y-3">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-3 text-brand-secondary font-bold py-3 px-4 hover:bg-brand-primary/5 rounded-2xl transition-premium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5 text-brand-primary" />
                  <span>Meu Painel</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 text-red-500 font-bold py-3 px-4 hover:bg-red-50 rounded-2xl transition-premium w-full text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sair da Conta</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/login" className="w-full">
                  <Button variant="outline" className="w-full rounded-2xl">
                    Entrar
                  </Button>
                </Link>
                <Link href="/cadastro" className="w-full">
                  <Button className="w-full rounded-2xl shadow-clay-external">
                    Cadastrar Gratuitamente
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
