# 🏗️ Build With Agent Team (Advanced Orchestration)

Esta skill permite a coordenação de múltiplos agentes especializados para executar planos complexos no projeto LARModular.

## 👥 Catálogo de Agentes Disponíveis
O orquestrador pode convocar os seguintes especialistas baseados no diretório `.opencode/agent/`:

### Núcleo Técnico (Dev & Ops)
- **@aios-developer**: Especialista em implementação Full-stack e padrões AIOS.
- **@dev**: Desenvolvedor focado em entregas rápidas e código limpo.
- **@architect**: Responsável pela estrutura sistêmica e escalabilidade.
- **@devops**: Automação de CI/CD, Docker e saúde da infraestrutura AWS.
- **@data-engineer**: Pipeline de dados e processamento em larga escala.
- **@db-sage**: Mestre em modelagem PostgreSQL e otimização de queries.

### Gestão & Estratégia
- **@pm / @po**: Gerenciamento de produto, Backlog e visão de negócio.
- **@sm**: Scrum Master para remoção de impedimentos e fluxo do time.
- **@analyst**: Auditoria de SEO, análise de mercado e métricas.

### Interface & Qualidade
- **@ux-design-expert**: Design de interface, acessibilidade e conversão.
- **@qa**: Automação de testes e garantia de qualidade (End-to-End).

### Agentes de Comando (Orquestração)
- **@aios-master**: Coordenação de alto nível do framework AIOS.
- **@aios-orchestrator**: Distribuição dinâmica de tarefas.
- **@aios-vanguard**: Pesquisa proativa e resolução de bugs críticos.
- **@squad-creator**: Gerador de squads personalizados para missões específicas.

### Especialistas de Domínio
- **@avalia-solar-leads**: Especialista em conversão de leads do setor solar.
- **@avalia-solar-team**: Gestão de equipes externas de instalação solar.

## 🛠️ Skills Integradas
Cada agente acima tem acesso automático às seguintes capacidades documentadas em `.opencode/skill/`:
- **SEO Cluster**: `seo-audit`, `seo-fundamentals`, `seo-keyword-strategist`, `seo-meta-optimizer`, `seo-snippet-hunter`, `seo-structure-architect`.
- **Backend Pro**: `ruby-pro`, `scalability`, `security`, `fix-review`.
- **Marketing & Vendas**: `sales-automator`, `customer-support`, `n8n`.
- **Estratégia**: `cost-reducer`, `blueprint`.

## 🚀 Como Executar
Use o mestre de planos para delegar tarefas:
```bash
python .opencode/skill/build-with-agent-team/build-with-agent-team.py plans/larmodular-master-plan.md 5
```
*(Substitua `5` pelo número de agentes em paralelo que deseja no squad).*
