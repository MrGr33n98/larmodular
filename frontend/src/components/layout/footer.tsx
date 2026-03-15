import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-floresta-dark text-white/80">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center space-x-2.5 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-terracota to-terracota-dark rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-serif font-bold text-lg">L</span>
              </div>
              <span className="font-serif font-bold text-xl text-white">LARModular</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              O marketplace definitivo para Tiny Houses, Containers e Construções Modulares no Brasil.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 font-serif">Navegação</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm hover:text-terracota-light transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/busca" className="text-sm hover:text-terracota-light transition-colors">
                  Buscar Produtos
                </Link>
              </li>
              <li>
                <Link href="/empresas" className="text-sm hover:text-terracota-light transition-colors">
                  Empresas
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="text-sm hover:text-terracota-light transition-colors">
                  Categorias
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 font-serif">Categorias</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/busca?categoria=tiny-house" className="text-sm hover:text-terracota-light transition-colors">
                  Tiny Houses
                </Link>
              </li>
              <li>
                <Link href="/busca?categoria=container" className="text-sm hover:text-terracota-light transition-colors">
                  Containers
                </Link>
              </li>
              <li>
                <Link href="/busca?categoria=modular" className="text-sm hover:text-terracota-light transition-colors">
                  Construção Modular
                </Link>
              </li>
              <li>
                <Link href="/busca?categoria=chale" className="text-sm hover:text-terracota-light transition-colors">
                  Chalés
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 font-serif">Contato</h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>contato@larmodular.com.br</li>
              <li>+55 (11) 99999-9999</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} LARModular. Todos os direitos reservados.
          </p>
          <div className="flex space-x-7 mt-4 md:mt-0">
            <Link href="/privacidade" className="text-sm text-white/60 hover:text-terracota-light">
              Privacidade
            </Link>
            <Link href="/termos" className="text-sm text-white/60 hover:text-terracota-light">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
