import { MetadataRoute } from 'next';
import { fetchProducts, fetchCompanies, fetchCategories } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://larmodular.com.br';
  
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/busca`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categorias`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/empresas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/planos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cadastro`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/termos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const products = await fetchProducts(1, 500);
  const companies = await fetchCompanies(1, 200);
  const categories = await fetchCategories();

  const productUrls: MetadataRoute.Sitemap = products.map((product: any) => ({
    url: `${baseUrl}/produto/${product.slug}`,
    lastModified: new Date(product.updated_at || product.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const companyUrls: MetadataRoute.Sitemap = companies.map((company: any) => ({
    url: `${baseUrl}/empresa/${company.slug}`,
    lastModified: new Date(company.updated_at || company.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((category: any) => ({
    url: `${baseUrl}/busca?categoria=${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...productUrls,
    ...companyUrls,
    ...categoryUrls,
  ];
}
