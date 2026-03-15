'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Category } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Building, Warehouse, TreePine, Package, ArrowRight } from 'lucide-react';

const categoryIcons: Record<string, React.ElementType> = {
  'tiny-house': Home,
  'container': Warehouse,
  'modular': Building,
  'chale': TreePine,
  'default': Package,
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get<{ data: Category[] }>('/categories');
        setCategories(res.data.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getIcon = (slug: string) => {
    const key = Object.keys(categoryIcons).find(k => slug.includes(k)) || 'default';
    return categoryIcons[key] || categoryIcons.default;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Categorias</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore nossas categorias de construções modulares, tiny houses, containers e muito mais.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-48 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = getIcon(category.slug);
            return (
              <Link key={category.id} href={`/busca?categoria=${category.slug}`}>
                <Card className="hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                        <Icon className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                    {category.description && (
                      <p className="text-gray-600 text-sm line-clamp-2">{category.description}</p>
                    )}
                    {category.children && category.children.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-2">Subcategorias:</p>
                        <div className="flex flex-wrap gap-2">
                          {category.children.slice(0, 3).map((child) => (
                            <span key={child.id} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {child.name}
                            </span>
                          ))}
                          {category.children.length > 3 && (
                            <span className="text-xs text-emerald-600 px-2 py-1">
                              +{category.children.length - 3} mais
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      {/* Categories by Type */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Populares</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['tiny-house', 'container', 'modular', 'chale'].map((slug) => {
            const category = categories.find(c => c.slug.includes(slug));
            if (!category) return null;
            const Icon = getIcon(slug);
            return (
              <Link key={slug} href={`/busca?categoria=${slug}`}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
