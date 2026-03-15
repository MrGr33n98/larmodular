'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Building, Package, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-creme/95 backdrop-blur-sm border-b border-argila/15">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-terracota to-terracota-dark rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-serif font-bold text-lg">L</span>
            </div>
            <span className="font-serif font-bold text-xl text-foreground">LARModular</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground-muted hover:text-terracota transition-colors text-sm font-medium"
            >
              Início
            </Link>
            <Link
              href="/busca"
              className="text-foreground-muted hover:text-terracota transition-colors text-sm font-medium"
            >
              Buscar
            </Link>
            <Link
              href="/categorias"
              className="text-foreground-muted hover:text-terracota transition-colors text-sm font-medium"
            >
              Categorias
            </Link>
            <Link
              href="/empresas"
              className="text-foreground-muted hover:text-terracota transition-colors text-sm font-medium"
            >
              Empresas
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Meu Painel
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Entrar
                  </Button>
                </Link>
                <Link href="/cadastro">
                  <Button size="sm">Cadastrar</Button>
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 text-foreground-muted"
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

      <div
        className={cn(
          'md:hidden border-t border-argila/10',
          mobileMenuOpen ? 'block' : 'hidden'
        )}
      >
        <div className="px-4 py-4 space-y-3 bg-creme">
          <Link
            href="/"
            className="flex items-center space-x-2 text-foreground-muted py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Home className="w-4 h-4" />
            <span>Início</span>
          </Link>
          <Link
            href="/busca"
            className="flex items-center space-x-2 text-foreground-muted py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Package className="w-4 h-4" />
            <span>Buscar</span>
          </Link>
          <Link
            href="/empresas"
            className="flex items-center space-x-2 text-foreground-muted py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Building className="w-4 h-4" />
            <span>Empresas</span>
          </Link>
          
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-foreground-muted py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                <span>Meu Painel</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-red-600 py-2 w-full"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </button>
            </>
          ) : (
            <div className="flex space-x-3 pt-2">
              <Link href="/login" className="flex-1">
                <Button variant="outline" className="w-full">
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro" className="flex-1">
                <Button className="w-full">Cadastrar</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
