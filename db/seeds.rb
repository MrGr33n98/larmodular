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

# ========================
# COMPANIES
# ========================
puts "🏢 Creating companies..."

sp = City.find_by(name: 'São Paulo')
rj = City.find_by(name: 'Rio de Janeiro')
ctb = City.find_by(name: 'Curitiba')
flp = City.find_by(name: 'Florianópolis')
bh = City.find_by(name: 'Belo Horizonte')

companies_data = [
  {
    name: 'ModuLar Brasil', slug: 'modular-brasil',
    description: 'Líder em construções modulares no Brasil com mais de 15 anos de experiência. Produzimos tiny houses, containers e módulos sob medida com tecnologia de ponta e sustentabilidade.',
    phone: '(11) 3456-7890', email: 'contato@modularbrasil.com.br', website: 'https://modularbrasil.com.br',
    region: regions['sudeste'], city: sp, status: 'approved', verified: true, featured: true, experience_years: 15
  },
  {
    name: 'Container House SP', slug: 'container-house-sp',
    description: 'Especialistas em casas container de alto padrão. Projetos personalizados com acabamento premium, isolamento térmico e acústico de última geração.',
    phone: '(11) 2345-6789', email: 'projetos@containerhousesp.com.br', website: 'https://containerhousesp.com.br',
    region: regions['sudeste'], city: sp, status: 'approved', verified: true, featured: true, experience_years: 8
  },
  {
    name: 'Tiny Living Sul', slug: 'tiny-living-sul',
    description: 'Fabricamos tiny houses artesanais com madeira de reflorestamento. Cada projeto é único e feito à mão por mestres carpinteiros da região Sul.',
    phone: '(41) 3456-1234', email: 'ola@tinylivingsul.com.br', website: 'https://tinylivingsul.com.br',
    region: regions['sul'], city: ctb, status: 'approved', verified: true, featured: false, experience_years: 6
  },
  {
    name: 'EcoMod Construções', slug: 'ecomod-construcoes',
    description: 'Construções modulares ecológicas com energia solar integrada, captação de água da chuva e materiais 100% reciclados.',
    phone: '(48) 3456-5678', email: 'contato@ecomod.com.br', website: 'https://ecomod.com.br',
    region: regions['sul'], city: flp, status: 'approved', verified: true, featured: true, experience_years: 10
  },
  {
    name: 'Nova Habitar', slug: 'nova-habitar',
    description: 'Módulos residenciais e comerciais com entrega em até 90 dias. Fábrica própria em Belo Horizonte com capacidade para 50 módulos/mês.',
    phone: '(31) 3456-9012', email: 'vendas@novahabitar.com.br', website: 'https://novahabitar.com.br',
    region: regions['sudeste'], city: bh, status: 'approved', verified: false, featured: false, experience_years: 4
  },
  {
    name: 'CasaBox Rio', slug: 'casabox-rio',
    description: 'Containers transformados em espaços modernos no Rio de Janeiro. Escritórios, lojas, studios e residências compactas.',
    phone: '(21) 3456-3456', email: 'contato@casaboxrio.com.br', website: 'https://casaboxrio.com.br',
    region: regions['sudeste'], city: rj, status: 'approved', verified: true, featured: false, experience_years: 7
  }
]

companies = {}
companies_data.each do |data|
  companies[data[:slug]] = Company.find_or_create_by!(slug: data[:slug]) do |c|
    c.name = data[:name]
    c.description = data[:description]
    c.phone = data[:phone]
    c.email = data[:email]
    c.website = data[:website]
    c.region = data[:region]
    c.city = data[:city]
    c.status = data[:status]
    c.verified = data[:verified]
    c.featured = data[:featured]
    c.experience_years = data[:experience_years]
  end
  puts "  ✅ Company: #{data[:name]}"
end

# ========================
# PRODUCTS
# ========================
puts "🏠 Creating products..."

products_data = [
  # ModuLar Brasil
  {
    company: 'modular-brasil', category: 'tiny-houses',
    name: 'Tiny House Aurora 25m²', slug: 'tiny-house-aurora-25m2',
    description: 'Tiny house completa com 25m², sala integrada com cozinha, 1 quarto, 1 banheiro. Acabamento em madeira de reflorestamento, isolamento térmico e acústico. Inclui instalações elétricas e hidráulicas completas.',
    short_description: 'Tiny house compacta e funcional para casal',
    base_price: 89_900, area_m2: 25, bedrooms: 1, bathrooms: 1,
    warranty_months: 24, lead_time_days: 60, featured: true,
    specs: { material: 'Madeira de reflorestamento', isolamento: 'Lã de PET', telhado: 'Metálico termoacústico', piso: 'Porcelanato', acabamento: 'Premium' }
  },
  {
    company: 'modular-brasil', category: 'modulares',
    name: 'Casa Modular Horizonte 60m²', slug: 'casa-modular-horizonte-60m2',
    description: 'Casa modular espaçosa com 60m², 2 quartos, sala ampla, cozinha americana, 1 banheiro e varanda. Estrutura em steel frame com acabamento contemporâneo.',
    short_description: 'Casa modular para família pequena',
    base_price: 189_000, area_m2: 60, bedrooms: 2, bathrooms: 1,
    warranty_months: 36, lead_time_days: 90, featured: true,
    specs: { material: 'Steel Frame', isolamento: 'EPS + Lã mineral', telhado: 'Shingle', piso: 'Porcelanato 60x60', acabamento: 'Alto padrão' }
  },
  {
    company: 'modular-brasil', category: 'modulares',
    name: 'Módulo Comercial Flex 30m²', slug: 'modulo-comercial-flex-30m2',
    description: 'Módulo versátil para escritório, loja ou consultório. 30m² com layout aberto, ar-condicionado split, piso elevado e cabeamento estruturado.',
    short_description: 'Módulo comercial pronto para uso',
    base_price: 125_000, area_m2: 30, bedrooms: 0, bathrooms: 1,
    warranty_months: 24, lead_time_days: 45, featured: false,
    specs: { material: 'Steel Frame', uso: 'Comercial', ar_condicionado: 'Split 12000 BTU', rede: 'Cat6 estruturado' }
  },

  # Container House SP
  {
    company: 'container-house-sp', category: 'containers',
    name: 'Container Loft 40ft Premium', slug: 'container-loft-40ft-premium',
    description: 'Loft container de 40 pés com design industrial moderno. Pé-direito duplo, mezanino em aço, cozinha gourmet e banheiro com acabamento em porcelanato. Isolamento térmico certificado.',
    short_description: 'Loft industrial premium em container 40ft',
    base_price: 165_000, area_m2: 28, bedrooms: 1, bathrooms: 1,
    warranty_months: 24, lead_time_days: 75, featured: true,
    specs: { container: '40ft High Cube', isolamento: 'Poliuretano projetado', janelas: 'Vidro duplo temperado', piso: 'Porcelanato retificado', mezanino: 'Estrutura metálica' }
  },
  {
    company: 'container-house-sp', category: 'containers',
    name: 'Container Studio 20ft', slug: 'container-studio-20ft',
    description: 'Studio compacto em container 20 pés. Ideal para airbnb, home office ou moradia solo. Inclui banheiro completo, mini cozinha e ar-condicionado.',
    short_description: 'Studio compacto para airbnb ou home office',
    base_price: 79_500, area_m2: 14, bedrooms: 0, bathrooms: 1,
    warranty_months: 18, lead_time_days: 45, featured: false,
    specs: { container: '20ft Standard', isolamento: 'Poliuretano 50mm', ar_condicionado: 'Split 9000 BTU', aquecedor: 'Elétrico de passagem' }
  },
  {
    company: 'container-house-sp', category: 'containers',
    name: 'Container Duplo Família 56m²', slug: 'container-duplo-familia-56m2',
    description: '2 containers 40ft unidos formando uma casa completa: 2 quartos, sala, cozinha, 2 banheiros e área de serviço. Acabamento residencial completo.',
    short_description: 'Casa container para família com 2 quartos',
    base_price: 245_000, area_m2: 56, bedrooms: 2, bathrooms: 2,
    warranty_months: 36, lead_time_days: 120, featured: true,
    specs: { containers: '2x 40ft High Cube', isolamento: 'Dupla camada', telhado: 'Butterfly com calha central', energia_solar: '3kWp incluso' }
  },

  # Tiny Living Sul
  {
    company: 'tiny-living-sul', category: 'tiny-houses',
    name: 'Tiny House Pinheiro 18m²', slug: 'tiny-house-pinheiro-18m2',
    description: 'Tiny house artesanal em madeira maciça de pinus tratado. Design aconchegante com loft para cama, sala com lareira, cozinha compacta e banheiro seco compostável.',
    short_description: 'Tiny house rústica artesanal',
    base_price: 68_000, area_m2: 18, bedrooms: 1, bathrooms: 1,
    warranty_months: 24, lead_time_days: 90, featured: false,
    specs: { madeira: 'Pinus tratado em autoclave', telhado: 'Duas águas em madeira', lareira: 'A lenha com duto', banheiro: 'Seco compostável' }
  },
  {
    company: 'tiny-living-sul', category: 'tiny-houses',
    name: 'Tiny House Araucária 32m²', slug: 'tiny-house-araucaria-32m2',
    description: 'Tiny house premium com 32m² em madeira nobre. 1 suíte com closet, sala com amplas janelas panorâmicas, cozinha planejada e deck externo de 10m².',
    short_description: 'Tiny house premium com deck panorâmico',
    base_price: 142_000, area_m2: 32, bedrooms: 1, bathrooms: 1,
    warranty_months: 36, lead_time_days: 120, featured: true,
    specs: { madeira: 'Eucalipto tratado + acabamento em pinus', janelas: 'Panorâmicas 2.4m', deck: '10m² em deck modular', aquecimento: 'Piso radiante elétrico' }
  },

  # EcoMod
  {
    company: 'ecomod-construcoes', category: 'modulares',
    name: 'EcoCasa Solar 45m²', slug: 'ecocasa-solar-45m2',
    description: 'Casa modular 100% sustentável: energia solar 5kWp, captação de água da chuva 5000L, materiais reciclados e certificação LEED. 2 quartos e 1 banheiro.',
    short_description: 'Casa modular sustentável com energia solar',
    base_price: 198_000, area_m2: 45, bedrooms: 2, bathrooms: 1,
    warranty_months: 60, lead_time_days: 90, featured: true,
    specs: { energia_solar: '5kWp com bateria', agua_chuva: 'Cisterna 5000L', certificacao: 'LEED Silver', material: 'Painéis OSB reciclados' }
  },
  {
    company: 'ecomod-construcoes', category: 'modulares',
    name: 'EcoStudio Compacto 20m²', slug: 'ecostudio-compacto-20m2',
    description: 'Módulo compacto com pegada de carbono zero. Energia solar, banheiro com reuso de água cinza e materiais biocompatíveis. Ideal para home office ou ADU.',
    short_description: 'Módulo zero carbono para home office',
    base_price: 85_000, area_m2: 20, bedrooms: 0, bathrooms: 1,
    warranty_months: 36, lead_time_days: 60, featured: false,
    specs: { energia: 'Off-grid solar 2kWp', reuso_agua: 'Sistema de água cinza', ventilacao: 'Natural cruzada', certificacao: 'Carbono neutro' }
  },

  # Nova Habitar
  {
    company: 'nova-habitar', category: 'modulares',
    name: 'Módulo Residencial Prático 35m²', slug: 'modulo-residencial-pratico-35m2',
    description: 'Módulo residencial de fábrica com entrega em 60 dias. 1 quarto, sala, cozinha e banheiro. Acabamento padrão com opção de upgrade.',
    short_description: 'Módulo residencial econômico e rápido',
    base_price: 95_000, area_m2: 35, bedrooms: 1, bathrooms: 1,
    warranty_months: 24, lead_time_days: 60, featured: false,
    specs: { estrutura: 'Steel Frame leve', acabamento: 'Padrão com upgrade opcional', entrega: 'Transporte incluso até 500km' }
  },

  # CasaBox Rio
  {
    company: 'casabox-rio', category: 'containers',
    name: 'Container Beach House 40ft', slug: 'container-beach-house-40ft',
    description: 'Casa container tropical para litoral. Varanda ampla, ventilação cruzada, proteção contra maresia e design praiano com tons naturais.',
    short_description: 'Casa container projetada para praia',
    base_price: 155_000, area_m2: 28, bedrooms: 1, bathrooms: 1,
    warranty_months: 24, lead_time_days: 75, featured: false,
    specs: { container: '40ft com tratamento anticorrosivo extra', pintura: 'Epóxi naval', ventilacao: 'Cruzada natural', varanda: '12m² coberta' }
  },
  {
    company: 'casabox-rio', category: 'containers',
    name: 'Pop-up Store Container 20ft', slug: 'popup-store-container-20ft',
    description: 'Container comercial com abertura lateral total, iluminação LED, prateleiras modulares e identidade visual customizável. Pronto para eventos e feiras.',
    short_description: 'Container para loja pop-up e eventos',
    base_price: 62_000, area_m2: 14, bedrooms: 0, bathrooms: 0,
    warranty_months: 12, lead_time_days: 30, featured: false,
    specs: { container: '20ft com abertura lateral', iluminacao: 'LED perimetral', prateleiras: 'Modulares removíveis', identidade_visual: 'Adesivagem inclusa' }
  }
]

products_data.each do |data|
  company = companies[data[:company]]
  category = categories[data[:category]] || Category.find_by(slug: data[:category])
  next unless company && category

  Product.find_or_create_by!(slug: data[:slug]) do |p|
    p.company = company
    p.category = category
    p.name = data[:name]
    p.description = data[:description]
    p.short_description = data[:short_description]
    p.base_price = data[:base_price]
    p.area_m2 = data[:area_m2]
    p.bedrooms = data[:bedrooms]
    p.bathrooms = data[:bathrooms]
    p.warranty_months = data[:warranty_months]
    p.lead_time_days = data[:lead_time_days]
    p.featured = data[:featured]
    p.active = true
    p.specs = data[:specs]
  end
  puts "  ✅ Product: #{data[:name]} (#{data[:base_price]})"
end

# ========================
# SAMPLE REVIEWS
# ========================
puts "⭐ Creating sample reviews..."

# Create a test user for reviews
test_user = User.find_or_create_by!(email: 'usuario@teste.com') do |u|
  u.name = 'Maria Silva'
  u.password = 'teste123456'
  u.password_confirmation = 'teste123456'
  u.role = 'buyer'
end

reviews_data = [
  { company: 'modular-brasil', rating: 5, title: 'Excelente qualidade!', comment: 'Compramos uma casa modular e ficou perfeita. Entrega no prazo e acabamento impecável.' },
  { company: 'modular-brasil', rating: 4, title: 'Muito bom', comment: 'Ótima empresa, apenas o prazo de entrega atrasou uma semana.' },
  { company: 'container-house-sp', rating: 5, title: 'Superou expectativas', comment: 'O container loft ficou incrível! Design industrial mas muito confortável.' },
  { company: 'tiny-living-sul', rating: 5, title: 'Artesanato de verdade', comment: 'Cada detalhe é feito com carinho. A tiny house é uma obra de arte.' },
  { company: 'ecomod-construcoes', rating: 4, title: 'Sustentável e bonita', comment: 'A energia solar funciona perfeitamente. Conta de luz zerada há 3 meses.' },
  { company: 'casabox-rio', rating: 4, title: 'Container praiano top', comment: 'Ótima ventilação e resistência à maresia. Recomendo para litoral.' }
]

reviews_data.each do |data|
  company = companies[data[:company]]
  next unless company

  product = company.products.first
  Review.find_or_create_by!(user: test_user, company: company) do |r|
    r.product = product
    r.rating = data[:rating]
    r.title = data[:title]
    r.comment = data[:comment]
    r.status = 'approved'
    r.verified_purchase = true
  end
  puts "  ✅ Review: #{data[:title]}"
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
