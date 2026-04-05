# Constituição do Projeto "Grid Quest: A Trilha das Áreas"

## 1. Visão Geral e Experiência do Usuário (UX)
* **Inspiração:** Duolingo (Trilha de progresso linear, lições curtas, "vidas", ofensivas e feedback imediato).
* **Público-alvo:** Estudantes de matemática (foco em dispositivos móveis/Chromebooks).
* **Estética:** Neobrutalismo Moderno. Cores vibrantes, bordas grossas pretas, tipografia legível e ícones dinâmicos.
* **Neurociência aplicada:** 
  * *Dopamina:* Micro-recompensas (sons de "sucesso", barras de progresso enchendo, animações de confete).
  * *Chunking:* Divisão do conteúdo em pequenos desafios de no máximo $60$ segundos.
  * *Efeito de Espaçamento:* Sistema de revisão de erros ao final de cada fase.

## 2. Estrutura Pedagógica (TRRS & Habilidades)
O motor do jogo deve alternar entre representações: Figural (malhas/desenhos), Língua Natural (enunciados), Numérica (cálculos) e Algébrica (fórmulas).

### Unidades da Trilha (Sprints)
* **Unidade 1: O Despertar do Quadrado (Nível 1)**
  * Mecânica: Pintar malha.
  * Desafio: "Pinte $12$ unidades".
  * Objetivo: Perceber que formas diferentes podem ter a mesma área.
* **Unidade 2: O Mestre Ladrilhador (Nível 2)**
  * Mecânica: Arrastar blocos retangulares.
  * Objetivo: Transição da contagem $1$ a $1$ para $A = b \times h$.
* **Unidade 3: Dimensão Real (Níveis 3/4)**
  * Mecânica: Quiz comparativo e escala.
  * Objetivo: Diferenciar perímetro de área; introdução do $\text{m}^2$.
* **Unidade 4: Cirurgião de Formas (Nível 5)**
  * Mecânica: "Slicing" (fatiar polígonos não convexos).
  * Objetivo: Decomposição e composição de figuras.
* **Unidade 5: O Enigma da Escala (Nível 7)**
  * Mecânica: Sliders de ampliação.
  * Objetivo: Provar visualmente a razão $k^2$ em áreas semelhantes.
* **Unidade 6: Arquiteto Master (Nível 8)**
  * Mecânica: Puzzle de planta baixa.
  * Objetivo: Integração de fórmulas (Triângulos, Trapézios, Círculos).

## 3. Arquitetura de Dados e Lógica de Jogo
### Sistema de Banco de Desafios (Anti-Repetição)
* Cada nível possui um Pool de 10 objetos JSON únicos.
* Lógica de Sorteio: Utilizar o algoritmo Fisher-Yates Shuffle para embaralhar os desafios.
* Persistência: Salvar no localStorage os IDs dos desafios já completados na sessão atual para evitar repetições imediatas.

### Exemplo de Estrutura de Desafio (JSON):
```json
{
  "id": "N1_D5",
  "tipo": "figural_para_natural",
  "pergunta": "Qual a área desta figura em unidades de malha?",
  "figura": "mapa_coordenadas_L",
  "resposta_correta": 8,
  "dica": "Tente contar os quadradinhos um a um ou divida em dois retângulos."
}
```

## 4. Requisitos Técnicos (Mobile-First)
* **Performance:** Zero frameworks pesados. Usar Vanilla JS e CSS Grid/Flexbox.
* **Interatividade:** Eventos de PointerEvents para garantir que o "toque" no celular e o "clique" no PC funcionem identicamente.
* **Feedback Instantâneo:** 
  * *Acerto:* Cor verde vibrante, vibração curta (Haptic), som agudo harmônico.
  * *Erro:* Cor vermelha, "tremidinha" na tela (shake effect), explicação imediata da regra.

## 5. Novas Condições e Refinamentos (Adicionado)
Após reavaliar as habilidades, incluímos estas diretrizes para o Agente:
* **Condição de Erro Progressivo:** Se o aluno errar o mesmo conceito 2 vezes, o jogo deve "simplificar" a representação (ex: de Algébrica para Figural com malha) para ajudar na abstração.
* **Habilidade Extra (Nível 6 - Implícita):** Adicionar desafios de Estimativa. "Olhe para este polígono irregular: a área está entre $10$ e $15$ ou $20$ e $25$?". Isso estimula a percepção espacial antes do cálculo formal.
* **Transição de Nível:** Entre cada unidade, deve haver um "Boss Challenge" que mistura as duas representações aprendidas anteriormente.

## 6. Instruções para o Agent Manager (Antigravity)
* Sempre gere código modular (um arquivo para o motor de níveis, outro para os dados dos desafios).
* Sempre priorize CSS customizado para manter o visual "Moderno/Neobrutalista".
* Não avance para o Nível 2 sem garantir que o sistema de "shuffle" do banco de dados do Nível 1 está funcional.
