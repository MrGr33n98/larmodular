export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Termos de Uso</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
            <p className="text-gray-600 mb-4">
              Ao acessar e utilizar o LARModular, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossa plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Uso da Plataforma</h2>
            <p className="text-gray-600 mb-4">
              O LARModular é uma plataforma de marketplace para Tiny Houses, Containers e Construções Modulares. Você concorda em:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Utilizar a plataforma apenas para fins legais</li>
              <li>Não publicar conteúdo falso, enganoso ou fraudulento</li>
              <li>Não violar direitos de terceiros</li>
              <li>Manter suas informações de conta seguras</li>
              <li>Não tentar acessar contas de outros usuários</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Cadastro de Empresas</h2>
            <p className="text-gray-600 mb-4">
              Para cadastrar sua empresa no LARModular, você deve:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Fornecer informações verdadeiras e atualizadas</li>
              <li>Possuir autorização para representar a empresa</li>
              <li>Manter dados de contato válidos</li>
              <li>Responsabilizar-se pelo conteúdo publicado</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Propriedade Intelectual</h2>
            <p className="text-gray-600 mb-4">
              Todo o conteúdo presente no LARModular, incluindo textos, gráficos, logotipos, imagens e software, é propriedade do LARModular ou de seus licenciadores e está protegido por leis de direitos autorais.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Limitação de Responsabilidade</h2>
            <p className="text-gray-600 mb-4">
              O LARModular não será responsável por quaisquer danos indiretos, incidentais, especiais ou consequenciais decorrentes do uso ou incapacidade de uso da plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Modificações</h2>
            <p className="text-gray-600 mb-4">
              Reservamo-nos o direito de modificar estes termos a qualquer tempo. As modificações entrarão em vigor imediatamente após a publicação na plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Contato</h2>
            <p className="text-gray-600">
              Para questions sobre estes termos, entre em contato conosco em <strong>contato@larmodular.com.br</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
