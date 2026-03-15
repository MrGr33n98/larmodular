Estou em modo de planejamento (READ-ONLY) e não posso salvar arquivos neste momento. 

Vou apresentar todo o conteúdo completo que você pode copiar e salvar manualmente:

---

# 📄 CONTEÚDO COMPLETO PARA ARQUIVO

**Salvar em:** `C:\Users\Bobi\larmodular\docs\blueprint_larmodular_completo.md`

---

```markdown
# 🏠 LARMODULAR - BLUEPRINT COMPLETO

## Marketplace de Construção Modular do Brasil

---

## 1. VISÃO GERAL

**Nome:** LARMODULAR
**Tipo:** Marketplace B2B/B2C para Construção Modular
**Stack:** Rails 7.x + Next.js 14 + PostgreSQL + Active Admin

---

## 2. SISTEMA DE PLANOS

| Plano | Preço | Limites |
|-------|-------|---------|
| Freemium | R$ 0 | 3 produtos, 500 views/mês, 10 orçamentos/mês |
| Starter | R$ 197/mês | 15 produtos, 5K views/mês, 50 orçamentos/mês |
| Pro | R$ 497/mês | Ilimitado, 50K views/mês, API, Ads |
| Enterprise | Sob consulta | Multi-franquias, white-label |

### Funcionalidades por Plano

**Freemium:**
- Perfil básico, 3 produtos, 3 imagens/produto, 500 views/mês, 10 orçamentos/mês, avaliações, suporte email

**Starter:**
- Perfil completo, 15 produtos, 10 imagens/produto, 5K views/mês, 50 orçamentos/mês, chat, email prioritário, analytics básico

**Pro:**
- Perfil premium, ilimitado produtos, 25 imagens/produto, 50K views/mês, ilimitado orçamentos, API, ads nativo, analytics avançado, banner personalizado, chat, suporte chat+telefone

**Enterprise:**
- Tudo do Pro + multi-franquias, white-label, API dedicada, account manager, SLA

---

## 3. MODELOS DE DADOS

### CORE
- **Company**: Fabricantes (name, slug, logo, banner, region_id, city_id, delivery_areas, lead_contact_rate, plan_id, status)
- **Product**: Modelos (name, slug, description, price, base_price, specs JSON, category_id, company_id)
- **Category**: Categorias hierárquicas (Tiny House, Container, Modular)
- **User**: Usuários (Devise + roles)
- **Review**: Avaliações (rating 1-5, comment, verified_purchase)
- **Favorite**: Produtos favoritados

### LEADS & ORÇAMENTOS
- **Lead**: name, email, phone, intent_score, funnel_stage, qualification_status, region_id
- **QuoteRequest**: user_id, product_id, company_id, message, budget, converted, revenue

### PLANOS & ASSINATURAS
- **Plan**: name, slug, price_monthly, price_yearly, features JSON, limits JSON
- **Subscription**: user_id, plan_id, status, stripe_subscription_id, period_start, period_end
- **Payment**: subscription_id, stripe_payment_id, amount, status
- **Invoice**: subscription_id, amount, status, pdf_url
- **FeatureFlag**: key, enabled, plans JSON

### GEO-TARGETING
- **Region**: name, code, tax_multiplier
- **City**: name, state, region_id, population
- **PriceRegion**: product_id, region_id, price_cents

### MONETIZAÇÃO (ADS)
- **Advertiser**: name, email, logo, active
- **AdCampaign**: advertiser_id, budget, targeting JSON, status
- **AdPlacement**: position_key, page, location, width, height, price_cents
- **AdBanner**: campaign_id, placement_id, image_url, target_url, impressions, clicks
- **AdImpression/AdClick**: tracking

### INTENT & INTELIGÊNCIA
- **IntentEvent**: event_type, event_data JSON, session_id, lead_id
- **IntentSession**: session_id, page_views, events_count
- **LeadScore**: lead_id, score 0-100, intent_level (cold/warm/hot/ready)
- **ProductView**: user_id, product_id, duration_seconds
- **ProductAffinity**: product_a_id, product_b_id, score

### CONTEÚDO & SEO
- **Article**: title, slug, content, meta_title, meta_description
- **FAQ**: question, answer, category
- **Page**: title, slug, content
- **SearchQuery**: term, searches_count

---

## 4. PONTOS DE INTENÇÃO

### Topo (Awareness)
- Landing Categoria → page_view
- Blog Artigo → time_on_page

### Meio (Consideração)
| Evento | Peso |
|--------|------|
| product_view | 3 |
| calculator_use | 15 |
| simulator_use | 20 |
| scroll_depth | 2 |

### Fundo (Decisão)
| Evento | Peso |
|--------|------|
| quote_request | 25 |
| favorite_add | 15 |
| whatsapp_click | 30 |
| phone_click | 30 |
| return_visit | +2/dia |

---

## 5. API ENDPOINTS

### Auth
- POST /auth/register, /auth/login, /auth/forgot
- GET /auth/me, PUT /auth/me

### Companies
- GET /companies (filters: category, region, featured, search)
- GET /companies/:slug, /:slug/products, /:slug/reviews
- CRUD (admin)

### Products
- GET /products, /products/:slug, /products/categories, /products/search
- CRUD (company_admin)

### Quotes
- POST /quotes, GET /quotes, GET /quotes/:id
- PUT /quotes/:id/status (company)

### Favorites
- GET /favorites, POST /favorites, DELETE /favorites/:product_id

### Reviews
- GET /reviews, POST /reviews, DELETE /reviews/:id

### Geo
- GET /geo/detect, /geo/regions, /geo/cities, /geo/prices/:id, /geo/trending

### Recomendações
- GET /recommendations/similar/:id, /also_bought/:id, /popular, /personalized

### Plans
- GET /plans, /plans/:slug

### Subscriptions
- POST /subscriptions, GET /subscriptions/me, PUT /subscriptions/me
- DELETE /subscriptions/me, POST /subscriptions/webhook
- GET /payments, /invoices

### Intent
- POST /intent/events, GET /intent/lead/:id/score, /intent/leaderboard

### Ads
- GET /ads/placements, /ads/render
- POST /ads/impressions, /ads/clicks

### Content
- GET /articles, /articles/:slug, /faqs, /pages/:slug, /sitemap.xml

---

## 6. PÁGINAS

### Públicas (14)
1. Home (/)
2. Categorias (/categorias)
3. Categoria (/categorias/[slug])
4. Produto (/produtos/[slug])
5. Empresa (/empresas/[slug])
6. Busca (/busca)
7. Comparar (/comparar)
8. Calculadora (/calculadora)
9. Simulador (/simulador)
10. Blog (/blog)
11. Artigo (/blog/[slug])
12. FAQ (/faq)
13. Página Estática (/[slug])

### Usuário (6)
14. Dashboard (/dashboard)
15. Perfil (/dashboard/perfil)
16. Orçamentos (/dashboard/orcamentos)
17. Favoritos (/dashboard/favoritos)
18. Notificações (/dashboard/notificacoes)
19. Configurações (/dashboard/configuracoes)

### Fabricante (11)
20. Painel (/empresa)
21. Produtos (/empresa/produtos)
22. Novo Produto (/empresa/produtos/novo)
23. Editar Produto (/empresa/produtos/[id]/editar)
24. Orçamentos (/empresa/orcamentos)
25. Detalhe Orçamento (/empresa/orcamentos/[id])
26. Avaliações (/empresa/avaliacoes)
27. Perfil (/empresa/perfil)
28. Assinatura (/empresa/assinatura)
29. Análises (/empresa/analises)
30. Configurações (/empresa/configuracoes)

### Admin (21)
31. Dashboard (/admin)
32-51. CRUDs: Companies, Users, Products, Categories, Reviews, Leads, Quotes, Plans, Subscriptions, Advertisers, Campaigns, Banners, Placements, Articles, FAQs, Pages, Regions, Cities + Relatórios

### Auth (5)
52. Login (/login)
53. Cadastro (/cadastro)
54. Esqueci Senha (/esqueci-senha)
55. Redefinir Senha (/redefinir-senha)

### Checkout (4)
56. Planos (/planos)
57. Checkout (/checkout/[plan_id])
58. Sucesso (/checkout/sucesso)
59. Cancelado (/checkout/cancelado)

---

## 7. COMPONENTES (120+)

### Base UI (18)
Button, Input, Card, Badge, Avatar, Modal, Dropdown, Tabs, Toast, Spinner, Skeleton, Tooltip, Accordion, Table, Pagination, Breadcrumb, Alert, Progress

### Layout (7)
Header, Footer, Sidebar, Container, Grid, Section, Hero

### Marketplace (17)
ProductCard, ProductGrid, ProductGallery, ProductSpecs, ProductPrice, CompanyCard, CompanyHeader, CompanyInfo, CategoryCard, SearchBar, Filters, SortSelect, CompareTable, ReviewCard, ReviewForm, RatingStars, FavoriteButton

### Ferramentas (6)
Calculator, Simulator, QuoteForm, BudgetSlider, TimelineSelector, RegionSelector

### Ads (7)
AdBanner, AdSidebar, AdSkyscraper, AdNative, AdPopup, AdSticky, AdPlaceholder

### Dashboard (11)
StatCard, ChartLine, ChartBar, ChartPie, DataTable, MetricTrend, ActivityFeed, LeadCard, QuoteCard, PlanCard, SubscriptionStatus

### Auth (5)
LoginForm, RegisterForm, PasswordReset, SocialLogin, OtpInput

### Chat (5)
ChatWidget, ChatWindow, ChatMessage, ChatInput, ChatList

### SEO (5)
SEOHead, JSONLD, Sitemap, CanonicalURL, OpenGraph

### Admin (5)
AdminTable, AdminFilters, AdminForm, AdminSidebar, StatsWidget

---

## 8. RBAC (ROLES & PERMISSIONS)

### Roles
- super_admin (total)
- admin (gestão)
- moderator (moderação)
- company_admin (empresa)
- company_user (funcionário)
- user (comprador)
- guest (visitante)

### Permissions
```
companies.read     → all
companies.create  → super_admin, admin
companies.update  → super_admin, admin, company_admin
companies.delete   → super_admin
products.create   → company_admin, company_user
products.update   → company_admin, owner
products.delete   → company_admin
quotes.read       → company, user_own
quotes.create     → all
subscriptions     → company_admin
ads.manage        → super_admin
reports.dashboard → company_admin, super_admin
```

### Feature Flags
```
products.unlimited    → pro, enterprise
analytics.advanced   → pro, enterprise
chat.enabled         → starter, pro, enterprise
api.access           → pro, enterprise
ads.native           → pro, enterprise
white_label          → enterprise
```

---

## 9. TASKS POR FASE

### Fase 1: Infraestrutura (8)
T001-T008: PostgreSQL, gems, CORS, Redis, Stripe, seeds

### Fase 2: Modelagem Core (11)
T010-T020: Region, City, Category, Company, Product, User, Review, Favorite, Lead, QuoteRequest

### Fase 3: Planos (9)
T030-T038: Plan, Subscription, Payment, Invoice, FeatureFlag, seeds, webhook

### Fase 4: Geo (6)
T040-T045: PriceRegion, popular dados, APIs

### Fase 5: Intent (10)
T050-T059: IntentEvent, LeadScore, ProductView, scoring, jobs

### Fase 6: Ads (11)
T060-T070: Advertiser, Campaign, Banner, Placement, tracking

### Fase 7: Conteúdo (11)
T080-T090: Article, FAQ, Page, SEO, sitemap

### Fase 8: API (80+)
T100-T179: Todos endpoints

### Fase 9: Active Admin (24)
T180-T203: CRUDs, dashboards, PT-BR

### Fase 10: TDD (24)
T210-T233: Specs models, requests, features

### Fase 11: Frontend (80+)
T240-T312: Next.js setup, páginas, componentes

**TOTAL: ~274 tasks**

---

## 10. PREÇOS REGIONAIS

| Região | Multiplicador |
|--------|---------------|
| Sudeste | 1.00x |
| Sul | 0.95x |
| Centro-Oeste | 0.90x |
| Nordeste | 0.85x |
| Norte | 0.80x |

---

## 11. POSIÇÕES ADS

| ID | Posição | Formato | Preço/Semana |
|----|---------|---------|--------------|
| AD01 | Global Topo | 970x90 | R$ 10.000 |
| AD02 | Global Rodapé | 728x90 | R$ 5.000 |
| AD03 | Home Categorias | 728x90 | R$ 6.000 |
| AD04 | Home Sidebar | 300x250 | R$ 4.000 |
| AD05-7 | Lista | various | R$ 4-7K |
| AD8-10 | Produto | various | R$ 3-8K |
| AD11 | Comparação | 728x90 | R$ 6.000 |

---

## 12. USER STORIES (70)

### Visitante (US001-US010)
Busca, visualização, calculadora, simulador, comparação, blog, ads, FAQ, geo

### Usuário Logado (US011-US020)
Orçamento, favorito, avaliação, recomendações, perfil, chat, notificações

### Fabricante (US021-US030)
Perfil, produtos CRUD, orçamentos, métricas, avaliações

### Fabricante Plano (US031-US040)
Upgrade, limites, API, ads, analytics, whitelabel

### Admin (US041-US060)
CRUDs, aprovação, moderação, planos

### Admin Ads (US051-US060)
Anunciantes, campanhas, banners, relatórios

### Admin Intent (US061-US070)
Leads, scores, jornadas, analytics

---

## 13. DESIGN

```css
--primary: #13ecec;
--background-light: #f6f8f8;
--background-dark: #102222;
--font-display: 'Inter';
```

---

*Versão: 2.0*
*Data: 2026-03-15*
```

---

**Para salvar:**
1. Copie o conteúdo acima
2. Crie o arquivo `docs/blueprint_larmodular_completo.md`
3. Cole o conteúdo

Após salvar, posso iniciar a implementação das tasks. Deseja que eu ajuste algo no documento antes de salvar?