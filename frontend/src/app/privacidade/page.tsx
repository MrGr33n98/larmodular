export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidade</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introdução</h2>
            <p className="text-gray-600 mb-4">
              A LARModular respeita sua privacidade e está comprometida em proteger seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Dados que Coletamos</h2>
            <p className="text-gray-600 mb-4">Podemos coletar os seguintes tipos de dados:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Dados de cadastro:</strong> nome, email, telefone, CPF/CNPJ, endereço</li>
              <li><strong>Dados da empresa:</strong> razão social, CNPJ, endereço comercial, descrição</li>
              <li><strong>Dados de navegação:</strong> IP, navegador, páginas visitadas, tempo de acesso</li>
              <li><strong>Dados de pagamento:</strong> processados de forma segura via Stripe</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Como Utilizamos seus Dados</h2>
            <p className="text-gray-600 mb-4">Utilizamos seus dados para:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Fornecer e melhorar nossos serviços</li>
              <li>Processar suas transações e assinaturas</li>
              <li>Comunicar重要 informações sobre sua conta</li>
              <li>Personalizar sua experiência na plataforma</li>
              <li>Cumprir obrigações legais</li>
              <li>Prevenir fraudes e garantir segurança</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Cookies e Tecnologías Semelhantes</h2>
            <p className="text-gray-600 mb-4">
              Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar tráfego e personalizar conteúdo. Você pode controlar cookies através das configurações do seu navegador.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Compartilhamento de Dados</h2>
            <p className="text-gray-600 mb-4">Podemos compartilhar seus dados com:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Parceiros de pagamento:</strong> Stripe para processamento de pagamentos</li>
              <li><strong>Fornecedores de serviços:</strong> para operação da plataforma</li>
              <li><strong>Autoridades legais:</strong> quando exigido por lei</li>
              <li><strong>Empresas:</strong> quando você solicita orçamento ou contato</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Segurança</h2>
            <p className="text-gray-600 mb-4">
              Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição. Utilizamos criptografia SSL/TLS e práticas de segurança recomendadas pela indústria.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Seus Direitos</h2>
            <p className="text-gray-600 mb-4">Você tem direito a:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incorretos</li>
              <li>Solicitar exclusão de dados</li>
              <li>Exportar seus dados</li>
              <li>Revogar consentimento</li>
              <li>Opor-se ao tratamento de dados</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Retenção de Dados</h2>
            <p className="text-gray-600 mb-4">
              Manemos seus dados pelo tempo necessário para cumplir as finalidades descritas nesta política, a menos que um período de retenção maior seja exigido ou permitido por lei.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Transferência Internacional</h2>
            <p className="text-gray-600 mb-4">
              Seus dados podem ser transferidos para servidores fuera do Brasil para processamento. Garantimos que tais transferências complym com a Lei Geral de Proteção de Dados (LGPD).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Alterações</h2>
            <p className="text-gray-600 mb-4">
              Podemos atualizar esta política periodicamente. Notificaremos sobre quaisquer alterações significativas através do email cadastrado ou aviso na plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Contato</h2>
            <p className="text-gray-600">
              Para questions sobre esta política ou para exercer seus direitos, entre em contato conosco em <strong>privacidade@larmodular.com.br</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
