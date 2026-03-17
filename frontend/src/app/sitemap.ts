import { MetadataRoute } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
const BASE_URL = 'https://larmodular.com.br';

async function fetchFromApi<T>(endpoint: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`API responded with ${res.status}`);
    const json = await res.json();
    return json.data ?? [];
  } catch (error) {
    console.error(`Sitemap: failed to fetch ${endpoint}:`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/busca`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cadastro`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  const [products, companies, categories] = await Promise.all([
    fetchFromApi<any>('/products?per_page=1000'),
    fetchFromApi<any>('/companies?per_page=1000'),
    fetchFromApi<any>('/categories'),
  ]);

  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/produto/${product.slug}`,
    lastModified: new Date(product.updated_at || product.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const companyUrls: MetadataRoute.Sitemap = companies.map((company) => ({
    url: `${BASE_URL}/empresa/${company.slug}`,
    lastModified: new Date(company.updated_at || company.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/busca?categoria=${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...productUrls, ...companyUrls, ...categoryUrls];
}
