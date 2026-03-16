import type { Metadata } from "next";
import { Inter, Merriweather, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/hooks/useAuth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "LARModular - Tiny Houses, Containers e Construções Modulares",
    template: "%s | LARModular"
  },
  description: "O marketplace definitivo para Tiny Houses, Containers e Construções Modulares no Brasil. Encontre as melhores opções de moradia modular.",
  keywords: "tiny house, container, construção modular, casa container, chalé, marketplace",
  metadataBase: new URL('https://larmodular.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://larmodular.com.br',
    siteName: 'LARModular',
    title: 'LARModular - Tiny Houses, Containers e Construções Modulares',
    description: 'O marketplace definitivo para Tiny Houses, Containers e Construções Modulares no Brasil.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LARModular - Marketplace de Construções Modulares',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LARModular - Tiny Houses, Containers e Construções Modulares',
    description: 'O marketplace definitivo para Tiny Houses, Containers e Construções Modulares no Brasil.',
    images: ['/og-image.jpg'],
    creator: '@larmodular',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${merriweather.variable} ${plusJakartaSans.variable} font-sans min-h-screen flex flex-col bg-areia texture-paper`}>
        <AuthProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
