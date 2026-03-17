'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  Menu, X, Search, ChevronDown,
  Home, Warehouse, Building2, TreePine, Briefcase, Tent,
  LogOut, User, ArrowRight, Sparkles,
} from 'lucide-react';
import { useState, useEffect, useRef, FormEvent } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { label: 'Tiny Houses',      slug: 'tiny-house',  icon: Home,      desc: 'Casas compactas e sustentáveis' },
  { label: 'Containers',       slug: 'container',   icon: Warehouse, desc: 'Residências e espaços em container' },
  { label: 'Casas Modulares',  slug: 'modular',     icon: Building2, desc: 'Construção rápida e eficiente' },
  { label: 'Chalés',           slug: 'chale',       icon: TreePine,  desc: 'Lazer e pousadas na natureza' },
  { label: 'Escritórios',      slug: 'escritorio',  icon: Briefcase, desc: 'Home office e coworkings modulares' },
  { label: 'Glamping',         slug: 'glamping',    icon: Tent,      desc: 'Turismo e hospitalidade sustentável' },
];

const FOR_COMPANIES = [
  { label: 'Cadastrar minha empresa', href: '/cadastro',      desc: 'Liste seus produtos gratuitamente' },
  { label: 'Planos e Preços',         href: '/planos',        desc: 'Destaque no marketplace' },
  { label: 'Como Funciona',           href: '/como-funciona', desc: 'Entenda a plataforma' },
];

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [catOpen, setCatOpen]             = useState(false);
  const [compOpen, setCompOpen]           = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [query, setQuery]                 = useState('');

  const catRef  = useRef<HTMLDivElement>(null);
  const compRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close dropdowns on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current  && !catRef.current.contains(e.target as Node))  setCatOpen(false);
      if (compRef.current && !compRef.current.contains(e.target as Node)) setCompOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full transition-all duration-300',
      scrolled ? 'py-1.5' : 'py-3',
    )}>
      <div className="container mx-auto px-4">
        <div className={cn(
          'flex items-center gap-3 h-14 transition-all duration-300 rounded-2xl px-5',
          scrolled
            ? 'bg-white/80 backdrop-blur-2xl shadow-lg border border-white/60'
            : 'bg-white/50 backdrop-blur-md shadow-md border border-white/40',
        )}>

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group mr-2">
            <div className="w-8 h-8 bg-clay-primary rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:rotate-6">
              <Sparkles className="text-white w-4 h-4" />
            </div>
            <span className="font-display font-bold text-lg text-clay-text-primary tracking-tight leading-none">
              LAR<span className="text-clay-primary">Modular</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-1 flex-1">

            {/* Categorias */}
            <div ref={catRef} className="relative">
              <button
                onClick={() => { setCatOpen(v => !v); setCompOpen(false); }}
                className={cn(
                  'flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium transition-colors',
                  catOpen
                    ? 'bg-clay-primary/10 text-clay-primary'
                    : 'text-clay-text-secondary hover:bg-clay-surface-2/60 hover:text-clay-text-primary',
                )}
              >
                Categorias
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', catOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-[520px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-clay-surface-2/60 p-4 z-50"
                  >
                    <p className="text-[11px] font-semibold text-clay-text-muted uppercase tracking-widest mb-3 px-1">
                      Explorar por tipo
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/busca?categoria=${cat.slug}`}
                          onClick={() => setCatOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-clay-primary/8 group transition-colors"
                        >
                          <div className="w-9 h-9 rounded-lg bg-clay-surface-2/60 flex items-center justify-center shrink-0 group-hover:bg-clay-primary group-hover:text-white transition-colors">
                            <cat.icon className="w-4 h-4 text-clay-primary group-hover:text-white transition-colors" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-clay-text-primary leading-none mb-0.5">{cat.label}</p>
                            <p className="text-xs text-clay-text-muted leading-none">{cat.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-clay-surface-2/60">
                      <Link
                        href="/categorias"
                        onClick={() => setCatOpen(false)}
                        className="flex items-center gap-1.5 text-sm text-clay-primary font-medium hover:underline"
                      >
                        Ver todas as categorias <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Para Empresas */}
            <div ref={compRef} className="relative">
              <button
                onClick={() => { setCompOpen(v => !v); setCatOpen(false); }}
                className={cn(
                  'flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium transition-colors',
                  compOpen
                    ? 'bg-clay-primary/10 text-clay-primary'
                    : 'text-clay-text-secondary hover:bg-clay-surface-2/60 hover:text-clay-text-primary',
                )}
              >
                Para Empresas
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', compOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {compOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-clay-surface-2/60 p-3 z-50"
                  >
                    {FOR_COMPANIES.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setCompOpen(false)}
                        className="flex flex-col gap-0.5 p-3 rounded-xl hover:bg-clay-primary/8 transition-colors group"
                      >
                        <span className="text-sm font-medium text-clay-text-primary group-hover:text-clay-primary transition-colors">
                          {item.label}
                        </span>
                        <span className="text-xs text-clay-text-muted">{item.desc}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/empresas"
              className="px-3 py-2 rounded-xl text-sm font-medium text-clay-text-secondary hover:bg-clay-surface-2/60 hover:text-clay-text-primary transition-colors"
            >
              Fabricantes
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 mx-2 max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-clay-text-muted pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Buscar tiny houses, containers…"
                  className="w-full h-9 pl-8 pr-3 bg-clay-surface-2/50 border border-clay-surface-3/50 rounded-xl text-sm text-clay-text-primary placeholder:text-clay-text-muted focus:outline-none focus:ring-2 focus:ring-clay-primary/30 focus:border-clay-primary/40 transition-all"
                />
              </div>
            </form>
          </nav>

          {/* ── Auth buttons ── */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="h-9 px-4 text-sm font-medium rounded-xl">
                    <User className="w-3.5 h-3.5 mr-1.5" />
                    Painel
                  </Button>
                </Link>
                <button
                  onClick={logout}
                  className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all"
                  title="Sair"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="h-9 px-4 text-sm font-medium rounded-xl text-clay-text-secondary">
                    Entrar
                  </Button>
                </Link>
                <Link href="/cadastro">
                  <Button size="sm" className="h-9 px-5 text-sm font-medium rounded-xl shadow-sm">
                    Começar grátis
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile toggle ── */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center bg-clay-surface-2/60 rounded-xl text-clay-text-primary hover:bg-clay-primary hover:text-white transition-all ml-auto"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden absolute top-full left-0 w-full px-4 pt-2 z-50"
          >
            <div className="bg-white/96 backdrop-blur-2xl rounded-2xl shadow-xl border border-clay-surface-2/60 p-4 space-y-1">

              {/* Mobile search */}
              <form onSubmit={(e) => { handleSearch(e); setMobileOpen(false); }} className="mb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-clay-text-muted pointer-events-none" />
                  <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Buscar tiny houses, containers…"
                    className="w-full h-10 pl-9 pr-3 bg-clay-surface-2/50 border border-clay-surface-3/40 rounded-xl text-sm placeholder:text-clay-text-muted focus:outline-none focus:ring-2 focus:ring-clay-primary/30"
                  />
                </div>
              </form>

              <p className="text-[11px] font-semibold text-clay-text-muted uppercase tracking-widest px-2 pb-1">Categorias</p>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/busca?categoria=${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-clay-primary/8 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-clay-surface-2/60 flex items-center justify-center group-hover:bg-clay-primary transition-colors">
                    <cat.icon className="w-4 h-4 text-clay-primary group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-clay-text-primary">{cat.label}</span>
                </Link>
              ))}

              <div className="border-t border-clay-surface-2/60 pt-2 mt-2 space-y-1">
                <Link href="/empresas" onClick={() => setMobileOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-clay-text-secondary hover:bg-clay-surface-2/60 transition-colors">
                  Fabricantes
                </Link>
                <Link href="/cadastro" onClick={() => setMobileOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-clay-text-secondary hover:bg-clay-surface-2/60 transition-colors">
                  Para Empresas
                </Link>
              </div>

              <div className="border-t border-clay-surface-2/60 pt-3 mt-1 flex flex-col gap-2">
                {user ? (
                  <>
                    <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full h-10 rounded-xl text-sm font-medium">
                        <User className="w-4 h-4 mr-2" /> Meu Painel
                      </Button>
                    </Link>
                    <button onClick={() => { logout(); setMobileOpen(false); }}
                      className="w-full h-10 rounded-xl bg-red-50 text-red-500 text-sm font-medium hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2">
                      <LogOut className="w-4 h-4" /> Sair
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full h-10 rounded-xl text-sm font-medium">Entrar</Button>
                    </Link>
                    <Link href="/cadastro" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full h-10 rounded-xl text-sm font-medium shadow-sm">Começar grátis</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
