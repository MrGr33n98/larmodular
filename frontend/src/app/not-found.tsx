export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Página não encontrada</h2>
        <p className="text-gray-500 mb-6">
          A página que você procura não existe ou foi movida.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
}
