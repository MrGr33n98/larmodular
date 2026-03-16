import { Metadata } from 'next';
import { fetchProduct } from '@/lib/seo';
import ProductClient from './ProductClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  
  if (!product) {
    return {
      title: 'Produto Não Encontrado | LARModular',
      description: 'O produto que você procura não existe ou foi removido.',
    };
  }

  const title = product.meta_title || `${product.name} - ${product.category_name || 'Tiny House'} | LARModular`;
  const description = product.meta_description || product.description?.slice(0, 160) || `Compre ${product.name} no maior marketplace de construções modulares do Brasil.`;
  const image = product.images?.[0] || '/og-image.jpg';

  return {
    title,
    description,
    keywords: product.meta_keywords || `${product.name}, tiny house, container, construção modular, ${product.category_name}`,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: product.name }],
      siteName: 'LARModular',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: `https://larmodular.com.br/produto/${product.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  return <ProductClient slug={slug} />;
}
