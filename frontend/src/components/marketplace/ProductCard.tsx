'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Maximize, BedDouble, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import Link from 'next/link';

interface ProductCardProps {
  id: string | number;
  name: string;
  slug: string;
  basePrice: number;
  location: string;
  area: number;
  bedrooms: number;
  imageUrl: string;
  isVerified?: boolean;
  className?: string;
}

export function ProductCard({
  name,
  slug,
  basePrice,
  location,
  area,
  bedrooms,
  imageUrl,
  isVerified = true,
  className,
}: ProductCardProps) {
  // Format price to BRL
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(basePrice);

  return (
    <Link href={`/produto/${slug}`} className="block">
      <motion.div
        whileHover={{ translateY: -6, rotate: 0.5 }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        className={cn(
          "group relative bg-clay-surface-0 overflow-hidden",
          "rounded-[28px] p-5",
          "shadow-md",
          "before:content-[''] before:absolute before:inset-0 before:rounded-[28px] before:shadow-[inset_0_2px_0_rgba(255,255,255,0.55),inset_0_-2px_0_rgba(0,0,0,0.08)] before:pointer-events-none",
          "border-none",
          className
        )}
      >
        {/* Header with Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px] mb-4">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Verified Badge */}
          {isVerified && (
            <div className="absolute top-3 right-3 bg-clay-sky-warm/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-clay-grass-deep" strokeWidth={2.5} />
              <span className="text-[10px] font-display font-bold text-clay-text-primary uppercase tracking-wider">
                Verificado
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-2 space-y-3">
          <div className="space-y-1">
            <h3 className="text-xl font-display font-extrabold text-clay-text-primary leading-tight truncate">
              {name}
            </h3>
            <div className="flex items-center gap-1 text-clay-text-muted">
              <MapPin className="w-3.5 h-3.5 text-clay-grass-mid" strokeWidth={1.5} />
              <span className="text-sm font-body font-medium">{location}</span>
            </div>
          </div>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="flex items-center gap-2 text-clay-text-secondary bg-clay-surface-2/50 p-2 rounded-xl">
              <Maximize className="w-4 h-4 text-clay-grass-mid" strokeWidth={1.5} />
              <span className="text-sm font-body font-bold">{area} m²</span>
            </div>
            <div className="flex items-center gap-2 text-clay-text-secondary bg-clay-surface-2/50 p-2 rounded-xl">
              <BedDouble className="w-4 h-4 text-clay-grass-mid" strokeWidth={1.5} />
              <span className="text-sm font-body font-bold">{bedrooms} Quartos</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-2 pt-4 flex items-center justify-between border-t-2 border-clay-surface-2 mt-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-clay-text-muted font-display font-bold uppercase tracking-widest">
              A partir de
            </span>
            <span className="text-lg font-display font-black text-clay-grass-deep">
              {formattedPrice}
            </span>
          </div>
          
          <div className="bg-clay-primary text-white p-3 rounded-xl shadow-sm group-hover:bg-clay-grass-deep transition-colors">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
