# 🤖 Como Rodar o Agent Team (Protótipo) no LARModular

Este guia explica como usar o script `build-with-agent-team.py` para orquestrar tarefas baseadas no plano mestre do projeto.

## 📋 Pré-requisitos
- Python 3 instalado no seu ambiente (Windows ou Linux).

## 🚀 Passo a Passo (Uso Local)

### 1. Preparar o Plano
O plano mestre já foi criado em: `plans/larmodular-master-plan.md`. Ele contém todas as fases de SEO, Back, Front e Automação.

### 2. Executar a Orquestração
Abra o terminal no diretório raiz do projeto e execute o seguinte comando:

```bash
python .opencode/skill/build-with-agent-team/build-with-agent-team.py plans/larmodular-master-plan.md 3
```
*O número `3` no final indica que você quer simular **3 agentes** trabalhando em paralelo.*

## 🛠️ O que acontece por baixo dos panos?
- O script lê cada item marcado com `- ` no seu arquivo `.md`.
- Ele distribui essas tarefas entre os "Agentes" (processos paralelos).
- No protótipo atual, ele simula a execução com logs detalhados.

---

# 🛸 Opção B: Agent Teams Real (Claude Code)

Se você estiver usando o **Claude Code** no terminal e tiver o `tmux` instalado, você pode usar a funcionalidade nativa de Agent Teams:

1. **Configurar o Ambiente:**
   ```bash
   export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
   ```

2. **Chamar o Time:**
   No chat do Claude, use:
   > /build-with-agent-team plans/larmodular-master-plan.md

Isso abrirá múltiplos panes no seu tmux e cada agente assumirá uma "persona" (@analyst, @dev, @architect) baseada nas skills que definimos.
