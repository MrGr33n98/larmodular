# LARMODULAR Seeds

puts "🌱 Creating base data for LARModular..."

# ========================
# REGIONS
# ========================
puts "📍 Creating regions..."

regions_data = [
  { name: 'Norte', code: 'norte', full_name: 'Região Norte', tax_multiplier: 0.80 },
  { name: 'Nordeste', code: 'nordeste', full_name: 'Região Nordeste', tax_multiplier: 0.85 },
  { name: 'Centro-Oeste', code: 'centro-oeste', full_name: 'Região Centro-Oeste', tax_multiplier: 0.90 },
  { name: 'Sudeste', code: 'sudeste', full_name: 'Região Sudeste', tax_multiplier: 1.00 },
  { name: 'Sul', code: 'sul', full_name: 'Região Sul', tax_multiplier: 0.95 }
]

regions = {}
regions_data.each do |data|
  regions[data[:code]] = Region.find_or_create_by!(code: data[:code]) do |r|
    r.name = data[:name]
    r.full_name = data[:full_name]
    r.tax_multiplier = data[:tax_multiplier]
    r.active = true
  end
  puts "  ✅ Region: #{data[:name]}"
end

# ========================
# CITIES (Top cities per region)
# ========================
puts "🏙️ Creating cities..."

cities_data = {
  'norte' => [
    { name: 'Manaus', state: 'AM', population: 2_219_000 },
    { name: 'Belém', state: 'PA', population: 1_499_000 },
    { name: 'Porto Velho', state: 'RO', population: 539_000 }
  ],
  'nordeste' => [
    { name: 'Salvador', state: 'BA', population: 2_900_000 },
    { name: 'Recife', state: 'PE', population: 1_661_000 },
    { name: 'Fortaleza', state: 'CE', population: 2_703_000 },
    { name: 'Natal', state: 'RN', population: 890_000 }
  ],
  'centro-oeste' => [
    { name: 'Brasília', state: 'DF', population: 3_015_000 },
    { name: 'Goiânia', state: 'GO', population: 1_537_000 },
    { name: 'Cuiabá', state: 'MT', population: 618_000 }
  ],
  'sudeste' => [
    { name: 'São Paulo', state: 'SP', population: 12_325_000 },
    { name: 'Rio de Janeiro', state: 'RJ', population: 6_748_000 },
    { name: 'Belo Horizonte', state: 'MG', population: 2_530_000 },
    { name: 'Vitória', state: 'ES', population: 1_827_000 },
    { name: 'Campinas', state: 'SP', population: 1_213_000 }
  ],
  'sul' => [
    { name: 'Curitiba', state: 'PR', population: 1_963_000 },
    { name: 'Porto Alegre', state: 'RS', population: 1_488_000 },
    { name: 'Florianópolis', state: 'SC', population: 508_000 }
  ]
}

cities_data.each do |region_code, cities|
  cities.each do |city|
    City.find_or_create_by!(name: city[:name], state: city[:state]) do |c|
      c.region_id = regions[region_code].id
      c.population = city[:population]
      c.state_name = city[:name]
      c.active = true
    end
    puts "  ✅ City: #{city[:name]} (#{city[:state]})"
  end
end

# ========================
# CATEGORIES
# ========================
puts "📦 Creating categories..."

categories_data = [
  { name: 'Tiny Houses', slug: 'tiny-houses', icon: 'home', description: 'Casas迷你minimalistas e sustentáveis', position: 1 },
  { name: 'Containers', slug: 'containers', icon: 'box', description: 'Casas e módulos de container marítimo', position: 2 },
  { name: 'Modulares', slug: 'modulares', icon: 'grid_view', description: 'Construções modulares rápidas', position: 3 },
  { name: 'Kitnetes', slug: 'kitnetes', icon: 'apartment', description: 'Unidades compactas e rentáveis', position: 4 },
  { name: 'Acessórios', slug: 'acessorios', icon: 'handyman', description: 'Acessórios e componentes', position: 5 }
]

categories = {}
categories_data.each do |data|
  categories[data[:slug]] = Category.find_or_create_by!(slug: data[:slug]) do |c|
    c.name = data[:name]
    c.description = data[:description]
    c.icon = data[:icon]
    c.position = data[:position]
    c.active = true
  end
  puts "  ✅ Category: #{data[:name]}"
end

# Subcategories
subcategories_data = [
  { name: 'Tiny House Solo', slug: 'tiny-house-solo', parent: 'tiny-houses' },
  { name: 'Tiny House Casal', slug: 'tiny-house-casal', parent: 'tiny-houses' },
  { name: 'Container 20ft', slug: 'container-20ft', parent: 'containers' },
  { name: 'Container 40ft', slug: 'container-40ft', parent: 'containers' },
  { name: 'Escritório Container', slug: 'escritorio-container', parent: 'containers' },
  { name: 'Casa Modular', slug: 'casa-modular', parent: 'modulares' },
  { name: 'Galpão Modular', slug: 'galpao-modular', parent: 'modulares' }
]

subcategories_data.each do |data|
  Category.find_or_create_by!(slug: data[:slug]) do |c|
    c.name = data[:name]
    c.description = "Categoria de #{data[:name]}"
    c.parent_id = categories[data[:parent]]&.id
    c.position = 10
    c.active = true
  end
  puts "  ✅ Subcategory: #{data[:name]}"
end

# ========================
# PLANS
# ========================
puts "💳 Creating plans..."

plans_data = [
  {
    name: 'Freemium',
    slug: 'freemium',
    description: 'Perfeito para começar',
    price_monthly: 0,
    price_yearly: 0,
    features: ['Perfil básico', '3 produtos', '500 visualizações/mês', '10 orçamentos/mês', 'Avaliações'],
    limits: { products: 3, images_per_product: 3, views_per_month: 500, quotes_per_month: 10 },
    highlighted: false,
    position: 1
  },
  {
    name: 'Starter',
    slug: 'starter',
    description: 'Para pequenos fabricantes',
    price_monthly: 197,
    price_yearly: 1970,
    features: ['Perfil completo', '15 produtos', '5K visualizações/mês', '50 orçamentos/mês', 'Chat com clientes', 'Email prioritário', 'Analytics básico'],
    limits: { products: 15, images_per_product: 10, views_per_month: 5000, quotes_per_month: 50 },
    highlighted: false,
    position: 2
  },
  {
    name: 'Pro',
    slug: 'pro',
    description: 'Para média e grandes empresas',
    price_monthly: 497,
    price_yearly: 4970,
    features: ['Perfil premium', 'Produtos ilimitados', '50K visualizações/mês', 'Orçamentos ilimitados', 'API Access', 'Banner personalizado', 'Chat online', 'Analytics avançado', 'Suporte chat+telefone'],
    limits: { products: nil, images_per_product: 25, views_per_month: 50000, quotes_per_month: nil },
    highlighted: true,
    position: 3
  },
  {
    name: 'Enterprise',
    slug: 'enterprise',
    description: 'Para múltiplas filiais',
    price_monthly: nil,
    price_yearly: nil,
    features: ['Tudo do Pro', 'Multi-franquias', 'White-label', 'API dedicada', 'Account manager', 'SLA garantido'],
    limits: {},
    highlighted: false,
    position: 4
  }
]

plans_data.each do |data|
  Plan.find_or_create_by!(slug: data[:slug]) do |p|
    p.name = data[:name]
    p.description = data[:description]
    p.price_monthly = data[:price_monthly]
    p.price_yearly = data[:price_yearly]
    p.features = data[:features]
    p.limits = data[:limits]
    p.highlighted = data[:highlighted]
    p.position = data[:position]
    p.active = true
  end
  puts "  ✅ Plan: #{data[:name]}"
end

# ========================
# AD PLACEMENTS
# ========================
puts "📢 Creating ad placements..."

placements_data = [
  { position_key: 'global_topo', page: 'global', location: 'topo', width: 970, height: 90, price_cents: 10000000, description: 'Banner global no topo (Leaderboard)' },
  { position_key: 'global_rodape', page: 'global', location: 'rodape', width: 728, height: 90, price_cents: 5000000, description: 'Banner global no rodapé' },
  { position_key: 'home_categorias', page: 'home', location: 'entre_categorias', width: 728, height: 90, price_cents: 6000000, description: 'Entre categorias na home' },
  { position_key: 'home_sidebar', page: 'home', location: 'sidebar', width: 300, height: 250, price_cents: 4000000, description: 'Sidebar na home (Retângulo)' },
  { position_key: 'lista_resultados', page: 'list', location: 'antes_resultados', width: 728, height: 90, price_cents: 7000000, description: 'Antes dos resultados de busca' },
  { position_key: 'lista_nativo', page: 'list', location: 'nativo', width: nil, height: nil, price_cents: 5000000, description: 'Card nativo patrocinado' },
  { position_key: 'produto_topo', page: 'product', location: 'topo', width: 728, height: 90, price_cents: 8000000, description: 'Acima das abas do produto' },
  { position_key: 'produto_lateral', page: 'product', location: 'lateral', width: 160, height: 600, price_cents: 7500000, description: 'Banner lateral (Arranha-céu)' },
  { position_key: 'comparacao_topo', page: 'comparison', location: 'topo', width: 728, height: 90, price_cents: 6000000, description: 'Topo na página de comparação' }
]

placements_data.each do |data|
  AdPlacement.find_or_create_by!(position_key: data[:position_key]) do |p|
    p.page = data[:page]
    p.location = data[:location]
    p.width = data[:width]
    p.height = data[:height]
    p.price_cents = data[:price_cents]
    p.description = data[:description]
    p.active = true
  end
  puts "  ✅ Placement: #{data[:position_key]}"
end

# ========================
# FEATURE FLAGS
# ========================
puts "🚩 Creating feature flags..."

feature_flags_data = [
  { key: 'products_unlimited', enabled: true, plans: ['pro', 'enterprise'], description: 'Produtos ilimitados' },
  { key: 'analytics_advanced', enabled: true, plans: ['pro', 'enterprise'], description: 'Analytics avançado' },
  { key: 'chat_enabled', enabled: true, plans: ['starter', 'pro', 'enterprise'], description: 'Chat com clientes' },
  { key: 'api_access', enabled: true, plans: ['pro', 'enterprise'], description: 'Acesso à API' },
  { key: 'ads_native', enabled: true, plans: ['pro', 'enterprise'], description: 'Anúncios nativos' },
  { key: 'white_label', enabled: true, plans: ['enterprise'], description: 'White-label' },
  { key: 'banner_personalizado', enabled: true, plans: ['pro', 'enterprise'], description: 'Banner personalizado' }
]

feature_flags_data.each do |data|
  FeatureFlag.find_or_create_by!(key: data[:key]) do |f|
    f.enabled = data[:enabled]
    f.plans = data[:plans]
    f.description = data[:description]
    f.active = true
  end
  puts "  ✅ Feature: #{data[:key]}"
end

# ========================
# ADMIN USER
# ========================
puts "👤 Creating admin user..."

if Rails.env.development?
  AdminUser.find_or_create_by!(email: 'admin@larmodular.com') do |admin|
    admin.password = 'admin123'
    admin.password_confirmation = 'admin123'
  end
  puts "  ✅ Admin: admin@larmodular.com"
end

puts ""
puts "🎉 Base data created successfully!"
puts ""
puts "📊 Summary:"
puts "   - Regions: #{Region.count}"
puts "   - Cities: #{City.count}"
puts "   - Categories: #{Category.count}"
puts "   - Plans: #{Plan.count}"
puts "   - Ad Placements: #{AdPlacement.count}"
puts "   - Feature Flags: #{FeatureFlag.count}"
