'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Maximize, BedDouble, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  location: string;
  area: number;
  bedrooms: number;
  imageUrl: string;
  isVerified?: boolean;
  className?: string;
}

export function ProductCard({
  name,
  price,
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
  }).format(price);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.4, 0, 0.2, 1] 
      }}
      className={cn(
        "group relative bg-surface-elevated overflow-hidden",
        "rounded-[32px] p-4",
        "shadow-clay-external",
        "before:content-[''] before:absolute before:inset-0 before:rounded-[32px] before:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.03)] before:pointer-events-none",
        "after:content-[''] after:absolute after:inset-0 after:rounded-[32px] after:shadow-[inset_-6px_-6px_12px_rgba(255,255,255,0.7)] after:pointer-events-none",
        "border border-white/40",
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
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary" strokeWidth={2.5} />
            <span className="text-[10px] font-jakarta font-bold text-brand-secondary uppercase tracking-wider">
              Verificado
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-2 space-y-3">
        <div className="space-y-1">
          <h3 className="text-xl font-jakarta font-extrabold text-brand-secondary leading-tight truncate">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-foreground-muted">
            <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="text-sm font-jakarta font-medium">{location}</span>
          </div>
        </div>

        {/* Technical Specs Grid */}
        <div className="grid grid-cols-2 gap-4 py-2">
          <div className="flex items-center gap-2 text-brand-secondary/80 bg-surface-base/50 p-2 rounded-xl">
            <Maximize className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-sm font-jakarta font-semibold">{area} m²</span>
          </div>
          <div className="flex items-center gap-2 text-brand-secondary/80 bg-surface-base/50 p-2 rounded-xl">
            <BedDouble className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-sm font-jakarta font-semibold">{bedrooms} Quartos</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-2 pt-4 flex items-center justify-between border-t border-brand-secondary/5 mt-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-foreground-muted font-jakarta font-bold uppercase tracking-widest">
            A partir de
          </span>
          <span className="text-lg font-jakarta font-bold text-brand-secondary">
            {formattedPrice}
          </span>
        </div>
        
        <Button 
          className={cn(
            "bg-brand-primary hover:bg-brand-primary/90 text-white font-jakarta font-bold",
            "rounded-2xl px-6 py-5 shadow-lg shadow-brand-primary/20 transition-all duration-300",
            "hover:shadow-xl hover:shadow-brand-primary/30 hover:-translate-y-0.5",
            "relative overflow-hidden"
          )}
        >
          Ver Detalhes
        </Button>
      </div>
    </motion.div>
  );
}
