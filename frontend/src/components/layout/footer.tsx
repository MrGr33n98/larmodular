import Link from 'next/link';
import { Sparkles, Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-clay-text-primary text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-clay-primary/10 rounded-full blur-[120px] -mt-48" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-10">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-clay-primary rounded-2xl flex items-center justify-center shadow-clay-flat transition-transform group-hover:rotate-6">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <span className="font-display font-black text-2xl text-white tracking-tighter">
                LAR<span className="text-clay-primary">Modular</span>
              </span>
            </Link>
            <p className="text-lg text-white/50 font-body leading-relaxed">
              Redefinindo o futuro da moradia no Brasil através de tecnologia, design e sustentabilidade modular.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/60 hover:bg-clay-primary hover:text-white hover:scale-110 transition-all border border-white/10"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-display font-black uppercase tracking-[0.3em] text-clay-primary mb-10">Explorar</h3>
            <ul className="space-y-6">
              {[
                { label: 'Marketplace', href: '/busca' },
                { label: 'Fabricantes', href: '/empresas' },
                { label: 'Categorias', href: '/categorias' },
                { label: 'Como Funciona', href: '/ajuda' }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-lg text-white/60 hover:text-white transition-colors font-body flex items-center group">
                    {item.label}
                    <ArrowUpRight className="w-4 h-4 ml-2 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-display font-black uppercase tracking-[0.3em] text-clay-primary mb-10">Suporte</h3>
            <ul className="space-y-6">
              {[
                { label: 'Central de Ajuda', href: '/faq' },
                { label: 'Políticas de Privacidade', href: '/privacidade' },
                { label: 'Termos de Uso', href: '/termos' },
                { label: 'Contato', href: '/contato' }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-lg text-white/60 hover:text-white transition-colors font-body">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-display font-black uppercase tracking-[0.3em] text-clay-primary mb-10">Contato</h3>
            <ul className="space-y-8">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Mail className="w-5 h-5 text-clay-primary" />
                </div>
                <div>
                  <p className="text-xs font-black text-white/30 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-white font-body">contato@larmodular.com.br</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Phone className="w-5 h-5 text-clay-primary" />
                </div>
                <div>
                  <p className="text-xs font-black text-white/30 uppercase tracking-widest mb-1">Telefone</p>
                  <p className="text-white font-body">+55 (11) 98765-4321</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                  <MapPin className="w-5 h-5 text-clay-primary" />
                </div>
                <div>
                  <p className="text-xs font-black text-white/30 uppercase tracking-widest mb-1">Escritório</p>
                  <p className="text-white font-body">Av. Paulista, 1000 - SP</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm text-white/30 font-body">
            © {new Date().getFullYear()} LARModular. Uma infraestrutura sustentável para o Brasil.
          </p>
          <div className="flex items-center gap-4 px-6 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
            <div className="w-2 h-2 bg-clay-grass-light rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Sistema Operacional em Tempo Real</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
