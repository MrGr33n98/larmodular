import { Metadata } from 'next';
import { fetchCompany } from '@/lib/seo';
import CompanyClient from './CompanyClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = await fetchCompany(slug);
  
  if (!company) {
    return {
      title: 'Empresa Não Encontrada | LARModular',
      description: 'A empresa que você procura não existe ou foi removida.',
    };
  }

  const title = company.meta_title || `${company.name} - Fabricante de Construções Modulares | LARModular`;
  const description = company.meta_description || company.description?.slice(0, 160) || `Conheça ${company.name}, fabricante de tiny houses e construções modulares. ${company.products_count || 0} produtos disponíveis.`;
  const image = company.logo_url || company.cover_url || '/og-image.jpg';

  return {
    title,
    description,
    keywords: company.meta_keywords || `${company.name}, tiny house, container, construção modular, fabricante`,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: company.name }],
      siteName: 'LARModular',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: `https://larmodular.com.br/empresa/${company.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  return <CompanyClient slug={slug} />;
}
