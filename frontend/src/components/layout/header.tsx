'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Building, Package, User, LogOut, Compass, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

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
        "sticky top-0 z-50 transition-all duration-500 w-full",
        scrolled ? "py-2" : "py-6"
      )}
    >
      <div className="container mx-auto px-6">
        <div 
          className={cn(
            "flex items-center justify-between h-20 transition-all duration-500 rounded-[32px] px-8",
            scrolled 
              ? "bg-white/70 backdrop-blur-2xl shadow-2xl border-none" 
              : "bg-white/40 backdrop-blur-md shadow-clay-flat border border-white/40"
          )}
        >
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-clay-primary rounded-2xl flex items-center justify-center shadow-clay-flat transition-transform group-hover:rotate-6 group-active:scale-95">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-black text-2xl text-clay-text-primary tracking-tighter">
              LAR<span className="text-clay-primary">Modular</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-10">
            {[
              { label: 'Início', href: '/', icon: Home },
              { label: 'Buscar', href: '/busca', icon: Package },
              { label: 'Empresas', href: '/empresas', icon: Building }
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-clay-text-muted hover:text-clay-primary transition-colors text-xs font-black uppercase tracking-widest relative group flex items-center gap-2"
              >
                <item.icon className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                <span>{item.label}</span>
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-clay-primary transition-all group-hover:w-full rounded-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="clay" size="sm" className="px-6 h-11 rounded-xl">
                    <User className="w-4 h-4 mr-2" />
                    Meu Painel
                  </Button>
                </Link>
                <button 
                  onClick={logout} 
                  className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button variant="ghost" className="font-black text-xs uppercase tracking-widest text-clay-text-muted">
                    Entrar
                  </Button>
                </Link>
                <Link href="/cadastro">
                  <Button className="h-12 px-8 rounded-xl shadow-xl hover:shadow-2xl">
                    Começar
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden w-12 h-12 flex items-center justify-center bg-clay-surface-2 rounded-2xl text-clay-text-primary hover:bg-clay-primary hover:text-white transition-all shadow-clay-flat"
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full p-6 z-50"
          >
            <div className="clay-card p-8 bg-white/95 backdrop-blur-2xl shadow-2xl border-none space-y-6">
              <Link
                href="/"
                className="flex items-center space-x-4 text-clay-text-primary font-display font-black text-lg p-4 bg-clay-surface-2/30 rounded-2xl transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="w-6 h-6 text-clay-primary" />
                <span>Início</span>
              </Link>
              <Link
                href="/busca"
                className="flex items-center space-x-4 text-clay-text-primary font-display font-black text-lg p-4 bg-clay-surface-2/30 rounded-2xl transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Package className="w-6 h-6 text-clay-primary" />
                <span>Buscar</span>
              </Link>
              <Link
                href="/empresas"
                className="flex items-center space-x-4 text-clay-text-primary font-display font-black text-lg p-4 bg-clay-surface-2/30 rounded-2xl transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Building className="w-6 h-6 text-clay-primary" />
                <span>Empresas</span>
              </Link>
              
              <div className="pt-6 border-t border-clay-surface-2">
                {user ? (
                  <div className="space-y-4">
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-4 text-clay-text-primary font-display font-black text-lg p-4 bg-clay-surface-2/30 rounded-2xl transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-6 h-6 text-clay-primary" />
                      <span>Meu Painel</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-4 text-red-500 font-display font-black text-lg p-4 bg-red-50 rounded-2xl transition-all w-full text-left"
                    >
                      <LogOut className="w-6 h-6" />
                      <span>Sair da Conta</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full h-14 rounded-2xl text-lg font-display font-black">
                        Entrar
                      </Button>
                    </Link>
                    <Link href="/cadastro" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full h-14 rounded-2xl text-lg font-display font-black shadow-xl">
                        Cadastrar Agora
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
