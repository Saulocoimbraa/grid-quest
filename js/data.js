// js/data.js
const level1Challenges = [
  { id: "N1_D1", unidade: 1, tipo: "pintar_area", pergunta: "Pinte exatos 4 quadrinhos de área.", target: 4, cols: 4, rows: 4 },
  { id: "N1_D2", unidade: 1, tipo: "pintar_area", pergunta: "Pinte 7 quadrinhos quaisquer.", target: 7, cols: 5, rows: 4 },
  { id: "N1_D3", unidade: 1, tipo: "calcular_area_destacada", pergunta: "Qual a área da figura abaixo?", target: 6, cols: 4, rows: 4, prePaintedCoords: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]] },
  { id: "N1_D4", unidade: 1, tipo: "calcular_area_destacada", pergunta: "Quantos quadrados formam a figura?", target: 5, cols: 5, rows: 5, prePaintedCoords: [[0, 2], [1, 1], [1, 2], [1, 3], [2, 2]] },
  { id: "N1_D5", unidade: 1, tipo: "desenhar_quadrado", pergunta: "Desenhe um quadrado 3x3.", target: 3, cols: 5, rows: 5 },
  { id: "N1_D6", unidade: 1, tipo: "desenhar_quadrado", pergunta: "Construa um quadrado 2x2.", target: 2, cols: 4, rows: 4 },
  { id: "N1_D7", unidade: 1, tipo: "desenhar_retangulo", pergunta: "Crie um retângulo de 2 por 4.", targetX: 2, targetY: 4, cols: 6, rows: 5 },
  { id: "N1_D8", unidade: 1, tipo: "desenhar_retangulo", pergunta: "Construa um retângulo de 3 por 1.", targetX: 3, targetY: 1, cols: 5, rows: 4 },
  { id: "N1_D9", unidade: 1, tipo: "desenhar_L", pergunta: "Desenhe um 'L' de 5 blocos.", target: 5, cols: 5, rows: 5 },
  { id: "N1_D10", unidade: 1, tipo: "desenhar_L", pergunta: "Desenhe um 'L' de 4 blocos.", target: 4, cols: 5, rows: 5 },

  // --- TIPO: pintar_area (N1_D11 a N1_D16) ---
  { id: "N1_D11", unidade: 1, tipo: "pintar_area", pergunta: "Pinte uma área de exatos 6 quadrinhos.", target: 6, cols: 5, rows: 4 },
  { id: "N1_D12", unidade: 1, tipo: "pintar_area", pergunta: "Crie uma mancha no grid com 8 blocos.", target: 8, cols: 5, rows: 5 },
  { id: "N1_D13", unidade: 1, tipo: "pintar_area", pergunta: "Pinte 10 quadrinhos quaisquer.", target: 10, cols: 6, rows: 4 },
  { id: "N1_D14", unidade: 1, tipo: "pintar_area", pergunta: "Pinte apenas 2 quadrinhos distantes um do outro.", target: 2, cols: 4, rows: 4 },
  { id: "N1_D15", unidade: 1, tipo: "pintar_area", pergunta: "Preencha o grid com exatos 12 blocos.", target: 12, cols: 5, rows: 5 },
  { id: "N1_D16", unidade: 1, tipo: "pintar_area", pergunta: "Pinte uma linha de 5 blocos horizontais.", target: 5, cols: 6, rows: 3 },

  // --- TIPO: calcular_area_destacada (N1_D17 a N1_D22) ---
  { id: "N1_D17", unidade: 1, tipo: "calcular_area_destacada", pergunta: "Qual a área da figura destacada?", target: 3, cols: 4, rows: 4, prePaintedCoords: [[1, 1], [1, 2], [2, 2]] },
  { id: "N1_D18", unidade: 1, tipo: "calcular_area_destacada", pergunta: "Quantos quadrados formam este desenho?", target: 8, cols: 5, rows: 5, prePaintedCoords: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]] },
  { id: "N1_D19", unidade: 1, tipo: "calcular_area_destacada", pergunta: "Conte os blocos da figura abaixo:", target: 4, cols: 4, rows: 4, prePaintedCoords: [[0, 0], [1, 1], [2, 2], [3, 3]] },
  { id: "N1_D20", unidade: 1, tipo: "calcular_area_destacada", pergunta: "Qual o tamanho desta área pintada?", target: 9, cols: 5, rows: 5, prePaintedCoords: [[1, 1], [1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2], [3, 3], [2, 2]] },
  { id: "N1_D21", unidade: 1, tipo: "calcular_area_destacada", pergunta: "Quantos blocos há na figura?", target: 2, cols: 3, rows: 3, prePaintedCoords: [[0, 1], [2, 1]] },
  { id: "N1_D22", unidade: 1, tipo: "calcular_area_destacada", pergunta: "Determine a área da figura azul:", target: 7, cols: 6, rows: 4, prePaintedCoords: [[0, 1], [1, 1], [2, 1], [3, 1], [1, 2], [2, 2], [3, 2]] },

  // --- TIPO: desenhar_quadrado (N1_D23 a N1_D28) ---
  { id: "N1_D23", unidade: 1, tipo: "desenhar_quadrado", pergunta: "Desenhe um quadrado de lado 1.", target: 1, cols: 3, rows: 3 },
  { id: "N1_D24", unidade: 1, tipo: "desenhar_quadrado", pergunta: "Construa um quadrado 4x4.", target: 4, cols: 6, rows: 6 },
  { id: "N1_D25", unidade: 1, tipo: "desenhar_quadrado", pergunta: "Crie um quadrado pequeno (lado 2).", target: 2, cols: 4, rows: 4 },
  { id: "N1_D26", unidade: 1, tipo: "desenhar_quadrado", pergunta: "Desenhe um quadrado de lado 3.", target: 3, cols: 5, rows: 5 },
  { id: "N1_D27", unidade: 1, tipo: "desenhar_quadrado", pergunta: "Faça um quadrado que ocupe 4 blocos no total.", target: 2, cols: 4, rows: 4 },
  { id: "N1_D28", unidade: 1, tipo: "desenhar_quadrado", pergunta: "Construa um quadrado de lado 4.", target: 4, cols: 5, rows: 5 },

  // --- TIPO: desenhar_retangulo (N1_D29 a N1_D34) ---
  { id: "N1_D29", unidade: 1, tipo: "desenhar_retangulo", pergunta: "Crie um retângulo de 3 por 2.", targetX: 3, targetY: 2, cols: 5, rows: 5 },
  { id: "N1_D30", unidade: 1, tipo: "desenhar_retangulo", pergunta: "Desenhe um retângulo de 1 por 4.", targetX: 1, targetY: 4, cols: 4, rows: 6 },
  { id: "N1_D31", unidade: 1, tipo: "desenhar_retangulo", pergunta: "Construa um retângulo de 5 por 2.", targetX: 5, targetY: 2, cols: 7, rows: 4 },
  { id: "N1_D32", unidade: 1, tipo: "desenhar_retangulo", pergunta: "Crie um retângulo de 2 por 3.", targetX: 2, targetY: 3, cols: 4, rows: 5 },
  { id: "N1_D33", unidade: 1, tipo: "desenhar_retangulo", pergunta: "Desenhe um retângulo de 4 por 2.", targetX: 4, targetY: 2, cols: 6, rows: 4 },
  { id: "N1_D34", unidade: 1, tipo: "desenhar_retangulo", pergunta: "Construa um retângulo de 1 por 2.", targetX: 1, targetY: 2, cols: 3, rows: 3 },

  // --- TIPO: desenhar_L (N1_D35 a N1_D40) ---
  { id: "N1_D35", unidade: 1, tipo: "desenhar_L", pergunta: "Desenhe um 'L' com 3 blocos.", target: 3, cols: 4, rows: 4 },
  { id: "N1_D36", unidade: 1, tipo: "desenhar_L", pergunta: "Crie um 'L' usando 6 blocos.", target: 6, cols: 5, rows: 5 },
  { id: "N1_D37", unidade: 1, tipo: "desenhar_L", pergunta: "Desenhe um 'L' de 4 blocos de altura e 2 de base.", target: 5, cols: 5, rows: 6 },
  { id: "N1_D38", unidade: 1, tipo: "desenhar_L", pergunta: "Faça um 'L' pequeno com 4 blocos no total.", target: 4, cols: 4, rows: 4 },
  { id: "N1_D39", unidade: 1, tipo: "desenhar_L", pergunta: "Desenhe um 'L' invertido com 5 blocos.", target: 5, cols: 5, rows: 5 },
  { id: "N1_D40", unidade: 1, tipo: "desenhar_L", pergunta: "Crie um 'L' bem grande usando 7 blocos.", target: 7, cols: 6, rows: 6 }
];

const level2Challenges = [
  // Fase A: Percepção de Agrupamento
  { id: "N2_D1", unidade: 2, tipo: "arrastar_e_responder", pergunta: "O Tapete Estreito: Arraste para cobrir o grid inteiro. Quantos quadrados você pintou?", targetArea: 5, targetAnswer: 5, inputType: "number", inputPlaceholder: "Total?", cols: 5, rows: 1, feedbackAghy: "Excelente! Você cobriu todo o espaço.", dica: "Arraste do primeiro ao último quadrado e conte-os um por um." },
  { id: "N2_D2", unidade: 2, tipo: "arrastar_e_responder", pergunta: "Duplicando a Linha: Cubra o espaço todo. Qual a forma geométrica formada?", targetArea: 6, targetAnswer: "retângulo", inputType: "options", inputOptions: ["Triângulo", "Retângulo", "Círculo"], cols: 3, rows: 2, dica: "Observe o formato final após preencher o grid. As bordas são iguais?" },
  { id: "N2_D3", unidade: 2, tipo: "arrastar_bloco", pergunta: "O Quadrado Médio: Preencha todo o espaço arrastando do início ao fim da malha.", targetArea: 9, numBlocks: 1, cols: 3, rows: 3 },

  // Fase B: A Descoberta da Fórmula
  { id: "N2_D4", unidade: 2, tipo: "arrastar_medidas", pergunta: "A Sala de Estar: Pinte a sala toda e responda quantos quadrados ela possui:", target: 20, cols: 5, rows: 4, dica: "Você pode contar um por um ou perceber que existem fileiras repetidas." },
  { id: "N2_D5", unidade: 2, tipo: "clique_rapido", pergunta: "Desafio Rápido: Qual a área total deste retângulo?", timeLimit: 10, target: 12, cols: 6, rows: 2, prePaintedFull: true },
  { id: "N2_D6", unidade: 2, tipo: "ladrilhador_inverso", pergunta: "O Arquiteto: Desenhe qualquer RETÂNGULO que tenha exatamente 12 quadrados de área.", targetArea: 12, targetCount: 1, cols: 6, rows: 4, dica: "Pense em dois números que multiplicados resultam em 12." },
  { id: "N2_D7", unidade: 2, tipo: "area_distributiva", pergunta: "Caminho das Cores: Qual a área total somando as duas partes coloridas?", target: 25, cols: 5, rows: 5, colorSplit: { cA: 2 }, dica: "A área total é a união dos blocos de cores diferentes." },

  // Fase C: Abstração e Autonomia
  { id: "N2_D8", unidade: 2, tipo: "malha_fantasma", pergunta: "A Malha Fantasma: Determine a área total desta malha preenchida.", target: 21, cols: 7, rows: 3, dica: "Fique atento aos espaços em branco; as marcas no grid indicam o tamanho invisível." },
  { id: "N2_D9", unidade: 2, tipo: "problema_natural", pergunta: "O Armazém: Várias fileiras e colunas de caixas formam um estoque. Desenhe o formato e responda o total:", target: 20, targetH: 4, targetW: 5, cols: 6, rows: 6, dica: "Crie um retângulo e conte o total de blocos." },
  { id: "N2_D10", unidade: 2, tipo: "tres_salas", pergunta: "Desafio do Mestre: Crie duas salas de área 12 em locais diferentes (sem sobrepor).", targetArea: 12, targetCount: 2, cols: 8, rows: 6, dica: "Lembre-se: formatos diferentes (como 2x6 e 3x4) podem ter a mesma área!" },

  // --- VARIAÇÕES FASE A: Percepção de Agrupamento ---
  { id: "N2_D11", unidade: 2, tipo: "arrastar_e_responder", pergunta: "A Coluna Alta: Arraste de cima a baixo. Quantos quadrados formam essa coluna?", targetArea: 4, targetAnswer: 4, inputType: "number", cols: 1, rows: 4, dica: "É uma linha em pé! Conte os blocos um a um." },
  { id: "N2_D12", unidade: 2, tipo: "arrastar_e_responder", pergunta: "O Dobro do Espaço: Preencha o grid. Qual o formato final desta área de 8 blocos?", targetArea: 8, targetAnswer: "retângulo", inputType: "options", inputOptions: ["Quadrado", "Retângulo", "Triângulo"], cols: 4, rows: 2, dica: "Lembre-se: se os lados são diferentes, é um retângulo." },
  { id: "N2_D13", unidade: 2, tipo: "arrastar_bloco", pergunta: "O Quadrado de Lado 2: Arraste para preencher todo o espaço 2x2.", targetArea: 4, numBlocks: 1, cols: 2, rows: 2 },
  { id: "N2_D14", unidade: 2, tipo: "arrastar_bloco", pergunta: "Bloco Gigante: Arraste o seletor para preencher a malha de 2x5.", targetArea: 10, numBlocks: 1, cols: 5, rows: 2 },

  // --- VARIAÇÕES FASE B: A Descoberta da Fórmula ---
  { id: "N2_D15", unidade: 2, tipo: "arrastar_medidas", pergunta: "Campo de Papiro: Pinte o campo todo e calcule a área total:", target: 18, cols: 6, rows: 3, dica: "As fileiras horizontais podem te ajudar no cálculo rápido." },
  { id: "N2_D16", unidade: 2, tipo: "arrastar_medidas", pergunta: "Mosaico Grego: Qual a área total desta faixa preenchida?", target: 20, cols: 10, rows: 2, dica: "Base x Altura é o segredo aqui." },
  { id: "N2_D17", unidade: 2, tipo: "clique_rapido", pergunta: "Relâmpago: Digite a área antes que o tempo acabe!", timeLimit: 7, target: 9, cols: 3, rows: 3, prePaintedFull: true },
  { id: "N2_D18", unidade: 2, tipo: "clique_rapido", pergunta: "Flash: Qual a área total desta figura?", timeLimit: 8, target: 10, cols: 5, rows: 2, prePaintedFull: true },
  { id: "N2_D19", unidade: 2, tipo: "ladrilhador_inverso", pergunta: "O Arquiteto de Vilas: Desenhe qualquer retângulo com área de 10 quadrados.", targetArea: 10, targetCount: 1, cols: 6, rows: 4, dica: "Imagine o grid como um tabuleiro e forme um bloco sólido de 10." },
  { id: "N2_D20", unidade: 2, tipo: "ladrilhador_inverso", pergunta: "O Designer: Crie qualquer retângulo que resulte em 16 de área.", targetArea: 16, targetCount: 1, cols: 6, rows: 6, dica: "Fórmulas de multiplicação podem te dar várias ideias de retângulos." },
  { id: "N2_D21", unidade: 2, tipo: "area_distributiva", pergunta: "Tapete Colorido: Somando as duas partes do tapete, qual a área total?", target: 12, cols: 4, rows: 3, colorSplit: { cA: 2 }, dica: "A área total não muda se a cor da tinta mudar." },
  { id: "N2_D22", unidade: 2, tipo: "area_distributiva", pergunta: "Jardim Dividido: Qual a área total deste jardim bicolor?", target: 20, cols: 4, rows: 5, colorSplit: { rA: 2 }, dica: "Calcule a área do retângulo completo ignorando a divisão." },

  // --- VARIAÇÕES FASE C: Abstração e Autonomia ---
  { id: "N2_D23", unidade: 2, tipo: "malha_fantasma", pergunta: "O Lote Invisível: Determine a área total necessária para cobrir esse lote.", target: 16, cols: 8, rows: 2, dica: "Conte as marcas no topo e na lateral." },
  { id: "N2_D24", unidade: 2, tipo: "malha_fantasma", pergunta: "O Tabuleiro Fantasma: Determine o valor da área do tabuleiro.", target: 16, cols: 4, rows: 4, dica: "Multiplicar largura por altura é o caminho mais rápido." },
  { id: "N2_D25", unidade: 2, tipo: "problema_natural", pergunta: "A Biblioteca: Uma estante tem várias fileiras com a mesma quantidade de livros em cada. Desenhe o formato e diga a área:", target: 24, targetH: 3, targetW: 8, cols: 9, rows: 4, dica: "O problema descreve um retângulo. Quais seriam os lados?" },
  { id: "N2_D26", unidade: 2, tipo: "problema_natural", pergunta: "Caixa de Bombom: Fileiras de doces formam um retângulo. Desenhe a caixa e responda a área:", target: 12, targetH: 2, targetW: 6, cols: 7, rows: 3, dica: "Conte as marcas no grid para saber as dimensões da caixa." },
  { id: "N2_D27", unidade: 2, tipo: "tres_salas", pergunta: "Desafio Duplo: Crie dois formatos diferentes para a área 8 (ex: 2x4 e 1x8).", targetArea: 8, targetCount: 2, cols: 9, rows: 4 },
  { id: "N2_D28", unidade: 2, tipo: "tres_salas", pergunta: "Mestre do 18: Desenhe dois retângulos diferentes que deem 18 de área.", targetArea: 18, targetCount: 2, cols: 10, rows: 6 },

  // --- REFORÇO MISTO (Aprofundamento) ---
  { id: "N2_D29", unidade: 2, tipo: "ladrilhador_inverso", pergunta: "A Praça: Desenhe um retângulo de área 14.", targetArea: 14, targetW: 7, targetH: 2, targetCount: 1, cols: 8, rows: 3 },
  { id: "N2_D30", unidade: 2, tipo: "arrastar_medidas", pergunta: "O Estacionamento: 6 vagas em 3 fileiras. Pinte e responda o total:", target: 18, cols: 6, rows: 3 },
  { id: "N2_D31", unidade: 2, tipo: "clique_rapido", pergunta: "Rápido! Área de um 10x2!", timeLimit: 6, target: 20, cols: 10, rows: 2, prePaintedFull: true },
  { id: "N2_D32", unidade: 2, tipo: "malha_fantasma", pergunta: "O Terreno: 5 metros de base por 6 metros de altura. Qual a área?", target: 30, cols: 5, rows: 6 },
  { id: "N2_D33", unidade: 2, tipo: "area_distributiva", pergunta: "Piso da Cozinha: Lado Cinza (3x4) e Lado Branco (3x1). Qual o total?", target: 15, cols: 5, rows: 3, colorSplit: { cA: 4 } },
  { id: "N2_D34", unidade: 2, tipo: "problema_natural", pergunta: "O Pomar: 7 fileiras com 3 árvores. Desenhe o pomar e calcule a área total:", target: 21, targetH: 7, targetW: 3, cols: 4, rows: 8 },
  { id: "N2_D35", unidade: 2, tipo: "tres_salas", pergunta: "O Desafio do 20: Crie dois retângulos diferentes que somem 20 cada um.", targetArea: 20, targetCount: 2, cols: 11, rows: 5 },
  { id: "N2_D36", unidade: 2, tipo: "arrastar_bloco", pergunta: "Área Estreita: Preencha um espaço de 1x9 arrastando.", targetArea: 9, numBlocks: 1, cols: 9, rows: 1 },
  { id: "N2_D37", unidade: 2, tipo: "ladrilhador_inverso", pergunta: "Área Prime: Desenhe um retângulo de área 11. Só há um jeito!", targetArea: 11, targetW: 11, targetH: 1, targetCount: 1, cols: 12, rows: 2 },
  { id: "N2_D38", unidade: 2, tipo: "clique_rapido", pergunta: "Visão Ninja: Qual a área de um 4x5?", timeLimit: 5, target: 20, cols: 5, rows: 4, prePaintedFull: true },
  { id: "N2_D39", unidade: 2, tipo: "area_distributiva", pergunta: "A Bandeira: Parte Superior (1x10) e Inferior (1x10). Área total?", target: 20, cols: 10, rows: 2, colorSplit: { rA: 1 } },
  { id: "N2_D40", unidade: 2, tipo: "malha_fantasma", pergunta: "Desafio Final Nível 2: 9 de base por 3 de altura. Qual a área?", target: 27, cols: 9, rows: 3 }
];

const level3Challenges = [
  { "id": "N3_D1", "unidade": 3, "tipo": "quiz_duas_figuras", "pergunta": "Ambas possuem a mesma área. Qual delas possui o MAIOR contorno (Perímetro)?", "figA": { "w": 2, "h": 3, "label": "Figura A" }, "figB": { "w": 1, "h": 6, "label": "Figura B" }, "targetAnswer": "Figura B", "inputType": "options", "inputOptions": ["Figura A", "Figura B"], "dica": "O contorno é o perímetro. Conte os lados de cada quadradinho que fica na borda externa." },
  { "id": "N3_D2", "unidade": 3, "tipo": "arrastar_e_responder", "pergunta": "Desenhe um retângulo 4x2. Qual a ÁREA total (quadrados pintados)?", "targetArea": 8, "targetAnswer": 8, "inputType": "number", "cols": 6, "rows": 4, "dica": "A área é o total de quadradinhos dentro da forma desenhada." },
  { "id": "N3_D3", "unidade": 3, "tipo": "clique_rapido", "pergunta": "Observe o retângulo destacado. Qual o valor total do seu PERÍMETRO?", "target": 12, "targetAnswer": 12, "timeLimit": 15, "cols": 6, "rows": 4, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [1, 4], [2, 1], [2, 2], [2, 3], [2, 4]], "dica": "O perímetro é a soma de todos os lados externos da figura." },
  { "id": "N3_D4", "unidade": 3, "tipo": "arrastar_e_responder", "pergunta": "Campo de Futebol: Cada quadrado no grid vale 10m de lado. Pinte um campo de 5 fileiras por 2 colunas. Qual a área total em m²?", "targetArea": 10, "targetAnswer": 1000, "inputType": "number", "cols": 6, "rows": 5, "dica": "Pense no valor de cada quadradinho: se o lado é 10m, qual a área de UM único quadrado?" },
  { "id": "N3_D5", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "Qual unidade usar para medir a área total de um Telefone?", "targetAnswer": "cm²", "inputType": "options", "inputOptions": ["m²", "km²", "cm²"], "dica": "Pense no tamanho do objeto: pequeno (cm²), médio (m²) ou gigante (km²)." },
  { "id": "N3_D6", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "Para medir a área de uma Floresta Amazônica completa, usamos:", "targetAnswer": "km²", "inputType": "options", "inputOptions": ["m²", "km²", "cm²"], "dica": "Florestas são áreas extensas, use a maior unidade." },
  { "id": "N3_D7", "unidade": 3, "tipo": "quiz_duas_figuras", "pergunta": "Com 12m de cerca, qual formato garante MAIS ÁREA INTERNA?", "figA": { "w": 1, "h": 5, "label": "Retângulo 1x5" }, "figB": { "w": 3, "h": 3, "label": "Quadrado 3x3" }, "targetAnswer": "Quadrado 3x3", "inputType": "options", "inputOptions": ["Retângulo 1x5", "Quadrado 3x3"], "dica": "Calcule a área de cada um (base x altura) e compare." },
  { "id": "N3_D8", "unidade": 3, "tipo": "conversao_area", "pergunta": "Este cartão cobre vários quadrados mágicos. Use a legenda para calcular a área total do cartão:", "targetAnswer": 45, "inputType": "number", "cols": 6, "rows": 5, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5]], "elementos_visuais": { "referencia": { "label": "1 quadrado = 3cm²" } }, "dica": "Conte os quadrados ocupados e use o valor unitário da legenda para descobrir o total." },
  { "id": "N3_D9", "unidade": 3, "tipo": "construcao_livre", "pergunta": "Use 16m de perímetro (borda amarela) para criar a maior área possível.", "targetArea": 16, "targetPerimeter": 16, "cols": 6, "rows": 6, "dica": "Tente formar um quadrado 4x4." },
  { "id": "N3_D10", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "O tamanho de um Chip de Celular (SIM Card) é cerca de 2...?", "targetAnswer": "cm²", "inputType": "options", "inputOptions": ["m²", "km²", "cm²"] },

  // --- ÁREA VS PERÍMETRO (N3_D11 a N3_D20) ---
  { "id": "N3_D11", "unidade": 3, "tipo": "quiz_duas_figuras", "pergunta": "Ambas têm contorno 12. Qual delas possui MENOS espaço interno?", "figA": { "w": 3, "h": 3, "label": "Quadrado" }, "figB": { "w": 5, "h": 1, "label": "Retângulo" }, "targetAnswer": "Figura B", "inputType": "options", "inputOptions": ["Figura A", "Figura B"], "dica": "Calcule a área interna de cada uma e compare os resultados." },
  { "id": "N3_D12", "unidade": 3, "tipo": "arrastar_e_responder", "pergunta": "Desenhe um retângulo 5x2. Qual o PERÍMETRO (soma de todos os lados)?", "targetArea": 10, "targetAnswer": 14, "inputType": "number", "cols": 7, "rows": 4, "dica": "O perímetro é a medida total do contorno da figura." },
  { "id": "N3_D13", "unidade": 3, "tipo": "clique_rapido", "pergunta": "Um quadrado de lado 3. Digite rápido a ÁREA dele!", "target": 9, "timeLimit": 10, "cols": 5, "rows": 5, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]] },
  { "id": "N3_D14", "unidade": 3, "tipo": "clique_rapido", "pergunta": "O mesmo quadrado de lado 3. Digite agora o PERÍMETRO!", "target": 12, "timeLimit": 10, "cols": 5, "rows": 5, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]] },
  { "id": "N3_D15", "unidade": 3, "tipo": "quiz_duas_figuras", "pergunta": "Um Quadrado e uma Linha. Ambos têm área 4. O Perímetro é igual?", "figA": { "w": 2, "h": 2, "label": "Quadrado" }, "figB": { "w": 4, "h": 1, "label": "Linha" }, "targetAnswer": "Não, o da Linha é maior", "inputType": "options", "inputOptions": ["Sim, são iguais", "Não, o da Linha é maior"], "dica": "Conte o contorno de cada um; figuras esticadas costumam ter perímetros maiores." },
  { "id": "N3_D16", "unidade": 3, "tipo": "construcao_livre", "pergunta": "Crie uma figura de área 6 que gaste o MENOR contorno possível.", "targetArea": 6, "targetPerimeter": 10, "cols": 5, "rows": 5, "dica": "Tente deixar a figura o mais 'quadrada' possível para economizar contorno." },
  { "id": "N3_D17", "unidade": 3, "tipo": "arrastar_e_responder", "pergunta": "Desenhe um quadrado de lado 5. Qual a área total?", "targetArea": 25, "targetAnswer": 25, "inputType": "number", "cols": 6, "rows": 6 },
  { "id": "N3_D18", "unidade": 3, "tipo": "quiz_duas_figuras", "pergunta": "Quem vence? Um retângulo 4x3 ou um quadrado 4x4 em PERÍMETRO?", "figA": { "w": 4, "h": 3, "label": "Retângulo 4x3" }, "figB": { "w": 4, "h": 4, "label": "Quadrado 4x4" }, "targetAnswer": "Quadrado 4x4", "inputType": "options", "inputOptions": ["Retângulo 4x3", "Quadrado 4x4"] },
  { "id": "N3_D19", "unidade": 3, "tipo": "construcao_livre", "pergunta": "Use 10m de perímetro para cercar uma área de 6m².", "targetArea": 6, "targetPerimeter": 10, "cols": 5, "rows": 5, "dica": "Um retângulo 3x2 resolve esse mistério!" },
  { "id": "N3_D20", "unidade": 3, "tipo": "clique_rapido", "pergunta": "Retângulo 10x1. Qual o Perímetro?", "target": 22, "timeLimit": 12, "cols": 10, "rows": 1, "prePaintedFull": true },

  // --- UNIDADES DE MEDIDA E CONVERSÃO (N3_D21 a N3_D30) ---
  { "id": "N3_D21", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "Qual a melhor unidade para medir um campo de futebol?", "targetAnswer": "m²", "inputType": "options", "inputOptions": ["cm²", "m²", "km²"] },
  { "id": "N3_D22", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "A tela de um relógio de pulso mede cerca de 6...?", "targetAnswer": "cm²", "inputType": "options", "inputOptions": ["cm²", "m²", "km²"] },
  { "id": "N3_D23", "unidade": 3, "tipo": "conversao_area", "pergunta": "O mosaico abaixo usa várias peças mágicas. Use a legenda para descobrir a área total do conjunto:", "targetAnswer": 50, "inputType": "number", "cols": 6, "rows": 4, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5]], "elementos_visuais": { "referencia": { "label": "1 peça = 5cm²" } }, "dica": "Aplique o valor de área de cada peça para descobrir o total." },
  { "id": "N3_D24", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "A cidade de Olinda tem sua área medida em:", "targetAnswer": "km²", "inputType": "options", "inputOptions": ["m²", "km²", "cm²"] },
  { "id": "N3_D25", "unidade": 3, "tipo": "conversao_area", "pergunta": "Abaixo vemos a região de um lago. Use a escala do mapa para calcular a área real dele:", "targetAnswer": 16, "inputType": "number", "cols": 5, "rows": 5, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2]], "dica": "Cada quadradinho pintado no mapa representa um valor real maior de área terrestre." },
  { "id": "N3_D26", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "Uma folha de papel A4 tem aproximadamente 600...?", "targetAnswer": "cm²", "inputType": "options", "inputOptions": ["cm²", "m²", "km²"] },
  { "id": "N3_D27", "unidade": 3, "tipo": "conversao_area", "pergunta": "O tapete abaixo possui 4 partes. Use a legenda para calcular sua área total:", "targetAnswer": 2, "inputType": "number", "cols": 4, "rows": 4, "prePaintedCoords": [[1, 1], [1, 2], [2, 1], [2, 2]], "elementos_visuais": { "referencia": { "label": "1 quadrado = 0,5m²" } }, "dica": "Some o valor de cada parte para obter a área de todo o tapete." },
  { "id": "N3_D28", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "A área de uma moeda é medida em:", "targetAnswer": "cm²", "inputType": "options", "inputOptions": ["cm²", "m²", "km²"] },
  { "id": "N3_D29", "unidade": 3, "tipo": "arrastar_e_responder", "pergunta": "Pinte 4 blocos. Se cada bloco vale 10cm², qual a área pintada?", "targetArea": 4, "targetAnswer": 40, "inputType": "number", "cols": 4, "rows": 4 },
  { "id": "N3_D30", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "A superfície de uma mesa de jantar mede cerca de 2...?", "targetAnswer": "m²", "inputType": "options", "inputOptions": ["cm²", "m²", "km²"] },

  // --- DESAFIOS DE MAESTRIA (N3_D31 a N3_D40) ---
  { "id": "N3_D31", "unidade": 3, "tipo": "quiz_duas_figuras", "pergunta": "Qual destas cercas de 14m guarda a MAIOR área de horta?", "figA": { "w": 6, "h": 1, "label": "6x1 (Área 6)" }, "figB": { "w": 4, "h": 3, "label": "4x3 (Área 12)" }, "targetAnswer": "Figura B", "inputType": "options", "inputOptions": ["Figura A", "Figura B"] },
  { "id": "N3_D32", "unidade": 3, "tipo": "construcao_livre", "pergunta": "O Equilíbrio Perfeito: Crie um quadrado onde a ÁREA (blocos) e o PERÍMETRO (contorno) coincidam numericamente.", "targetArea": 16, "targetPerimeter": 16, "cols": 5, "rows": 5, "dica": "Lembre-se: em que situação o preenchimento total e a borda se tornam iguais?" },
  { "id": "N3_D33", "unidade": 3, "tipo": "conversao_area", "pergunta": "Um pixel gigante vale 4cm². Desenhe um 'L' com 2 blocos de altura e 2 de base (total 3). Qual a área total?", "targetArea": 3, "targetAnswer": 12, "inputType": "number", "cols": 3, "rows": 3 },
  { "id": "N3_D34", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "O Brasil tem 8,5 milhões de...?", "targetAnswer": "km²", "inputType": "options", "inputOptions": ["m²", "km²", "cm²"] },
  { "id": "N3_D35", "unidade": 3, "tipo": "arrastar_e_responder", "pergunta": "Pinte um retângulo 3x4. Qual o Perímetro?", "targetArea": 12, "targetAnswer": 14, "inputType": "number", "cols": 5, "rows": 5 },
  { "id": "N3_D36", "unidade": 3, "tipo": "clique_rapido", "pergunta": "Área de um retângulo 2x5?", "target": 10, "timeLimit": 5, "cols": 5, "rows": 2, "prePaintedFull": true },
  { "id": "N3_D37", "unidade": 3, "tipo": "clique_rapido", "pergunta": "Perímetro de um retângulo 2x5?", "target": 14, "timeLimit": 8, "cols": 5, "rows": 2, "prePaintedFull": true },
  { "id": "N3_D38", "unidade": 3, "tipo": "construcao_livre", "pergunta": "Desenhe uma linha de 5 blocos. Qual o seu perímetro total?", "targetArea": 5, "targetPerimeter": 12, "targetAnswer": 12, "inputType": "number", "cols": 6, "rows": 6, "dica": "Para descobrir o perímetro, conte todos os lados externos expostos da figura." },
  { "id": "N3_D39", "unidade": 3, "tipo": "quiz_duas_figuras", "pergunta": "Um quadrado e um retângulo possuem a mesma área. Quem tem mais contorno (borda)?", "figA": { "w": 2, "h": 2, "label": "Quadrado" }, "figB": { "w": 4, "h": 1, "label": "Retângulo" }, "targetAnswer": "Retângulo 4x1", "inputType": "options", "inputOptions": ["Quadrado 2x2", "Retângulo 4x1"] },
  { "id": "N3_D40", "unidade": 3, "tipo": "arrastar_e_responder", "pergunta": "🔥 DESAFIO DO MESTRE: Desenhe um retângulo com área de 24m² onde um dos lados seja 6m. Qual o PERÍMETRO dele?", "targetArea": 24, "targetAnswer": 20, "inputType": "number", "cols": 8, "rows": 6, "dica": "Se a área é 24 e um lado é 6, o outro é 4 (6x4=24). Agora some: 6+4+6+4." }
];

// --- NÍVEL 4 (Unidade 3 - Parte 2: Escalas e Dimensões Avançadas) ---
const level4Challenges = [
  { "id": "N4_D1", "unidade": 3, "tipo": "conversao_area", "pergunta": "Expansão Geométrica: Se dobrarmos os lados de um quadrado de 1m², qual será sua nova área?", "targetAnswer": 4, "inputType": "number", "cols": 4, "rows": 4, "prePaintedCoords": [[1, 1]], "dica": "Tente desenhar o novo formato no grid para ver quantos blocos ele agora ocupa." },
  { "id": "N4_D2", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "Um retângulo tem área 20m² e um de seus lados mede 5m. Quanto mede o outro lado?", "targetAnswer": "4m", "inputType": "options", "inputOptions": ["4m", "5m", "15m"], "dica": "Pense em qual número multiplicado por 5 resulta no total de 20." },
  { "id": "N4_D3", "unidade": 3, "tipo": "construcao_livre", "pergunta": "Desafio do Arquiteto: Desenhe um retângulo que tenha área 12 e contorno (perímetro) 14.", "targetArea": 12, "targetPerimeter": 14, "cols": 6, "rows": 6, "dica": "Existem formas diferentes com área 12; teste qual delas possui a borda externa no tamanho 14." },
  { "id": "N4_D4", "unidade": 3, "tipo": "conversao_area", "pergunta": "O Terreno: Um lote retangular tem 10m de base por 5m de altura. Qual sua área total?", "targetAnswer": 50, "inputType": "number", "cols": 10, "rows": 5, "prePaintedCoords": [[0, 0]], "dica": "Utilize a lógica da multiplicação das dimensões para o preenchimento total." },
  { "id": "N4_D5", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "Se um quadrado tem perímetro de 12m, qual é sua área interna?", "targetAnswer": "9m²", "inputType": "options", "inputOptions": ["12m²", "9m²", "16m²"], "dica": "O perímetro é a soma de quatro lados iguais. Descubra o valor de um lado primeiro." },
  { "id": "N4_D6", "unidade": 3, "tipo": "construcao_livre", "pergunta": "Desenhe duas figuras diferentes que tenham 8 unidades de área cada.", "targetArea": 8, "cols": 8, "rows": 8, "dica": "Podem ser retângulos 2x4 ou formas irregulares!" },
  { "id": "N4_D7", "unidade": 3, "tipo": "conversao_area", "pergunta": "Um tile de cerâmica mede 10cm x 10cm (100cm²). Quantos tiles preciso para cobrir 1000cm²?", "targetAnswer": 10, "inputType": "number", "cols": 5, "rows": 2, "dica": "Divida a área total pela área de um tile." },
  { "id": "N4_D8", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "Qual figura tem maior área: um quadrado de lado 4m ou um retângulo de 5m x 3m?", "targetAnswer": "Quadrado", "inputType": "options", "inputOptions": ["Quadrado", "Retângulo", "São iguais"] },
  { "id": "N4_D9", "unidade": 3, "tipo": "construcao_livre", "pergunta": "Desenhe um quadrado de área 1 e um retângulo de área 4 ao lado.", "targetArea": 5, "cols": 6, "rows": 4, "dica": "Pinte 1 bloco e depois um bloco 4x1 ou 2x2." },
  { "id": "N4_D10", "unidade": 3, "tipo": "boss_challenge", "pergunta": "🔥 BOSS CHALLENGE: Construa um retângulo de 10m² e calcule seu perímetro total.", "targetArea": 10, "targetAnswer": 14, "cols": 10, "rows": 5, "dica": "Após desenhar a figura, conte cada segmento de reta que forma o contorno externo." }
];

// --- NÍVEL 5 (Unidade 4: Cirurgião de Formas - Decomposição) ---
const level5Challenges = [
  // Tipo 1: O L em Fatias (Decomposição Simples)
  { "id": "N5_D1", "unidade": 4, "tipo": "conversao_area", "pergunta": "Qual a área deste 'L' vertical? Use o fatiamento para ajudar no cálculo.", "targetAnswer": 8, "inputType": "number", "cols": 10, "rows": 8, "prePaintedCoords": [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [6, 2], [5, 2]], "dica": "Tente dividir a figura em dois retângulos menores que você já sabe calcular a área." },
  { "id": "N5_D2", "unidade": 4, "tipo": "conversao_area", "pergunta": "Qual a área deste 'L' horizontal?", "targetAnswer": 12, "inputType": "number", "cols": 10, "rows": 8, "prePaintedCoords": [[1, 1], [1, 2], [2, 1], [2, 2], [3, 1], [3, 2], [4, 1], [4, 2], [4, 3], [4, 4], [3, 3], [3, 4]], "dica": "Decomponha a forma em partes mais simples e some as áreas." },
  { "id": "N5_D3", "unidade": 4, "tipo": "conversao_area", "pergunta": "Qual a área deste 'L' invertido?", "targetAnswer": 16, "inputType": "number", "cols": 10, "rows": 8, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [3, 1], [3, 2], [4, 1], [4, 2], [5, 1], [5, 2]], "dica": "Dividir para conquistar: que retângulos se escondem nesta figura?" },

  // Tipo 2: O Moldura (Subtração de Áreas)
  { "id": "N5_D4", "unidade": 4, "tipo": "conversao_area", "pergunta": "Qual a área total desta moldura de 6x6 com um buraco central de 2x2?", "targetAnswer": 32, "inputType": "number", "cols": 8, "rows": 8, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [3, 1], [3, 2], [3, 5], [3, 6], [4, 1], [4, 2], [4, 5], [4, 6], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6]], "dica": "Pense no retângulo de fora e retire a área do buraco de dentro." },
  { "id": "N5_D5", "unidade": 4, "tipo": "conversao_area", "pergunta": "Calcule a área desta moldura retangular com um buraco no meio.", "targetAnswer": 24, "inputType": "number", "cols": 10, "rows": 6, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [2, 1], [2, 2], [2, 7], [2, 8], [3, 1], [3, 2], [3, 7], [3, 8], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8]], "dica": "Área Total - Área do Buraco = Área da Moldura." },
  { "id": "N5_D6", "unidade": 4, "tipo": "conversao_area", "pergunta": "Qual a área de um retângulo 10x10 com um buraco de 6x6 no meio?", "targetAnswer": 64, "inputType": "number", "cols": 12, "rows": 12, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10], [3, 1], [3, 2], [3, 9], [3, 10], [4, 1], [4, 2], [4, 9], [4, 10], [5, 1], [5, 2], [5, 9], [5, 10], [6, 1], [6, 2], [6, 9], [6, 10], [7, 1], [7, 2], [7, 9], [7, 10], [8, 1], [8, 2], [8, 9], [8, 10], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10], [10, 1], [10, 2], [10, 3], [10, 4], [10, 5], [10, 6], [10, 7], [10, 8], [10, 9], [10, 10]], "dica": "Subtraia a área interna da área externa." },

  // Tipo 3: Cirurgia de Expansão (Modificação)
  { "id": "N5_D7", "unidade": 4, "tipo": "construcao_livre", "pergunta": "Desenhe um retângulo 3x4. Agora, dobre sua largura mas mantenha a altura. Qual a nova área?", "targetArea": 24, "targetAnswer": 24, "inputType": "number", "cols": 8, "rows": 6, "dica": "Como as dimensões mudaram? Calcule a nova área multiplicando-as." },
  { "id": "N5_D8", "unidade": 4, "tipo": "construcao_livre", "pergunta": "Desenhe um quadrado de lado 4. Aumente sua altura em 2 blocos. Qual a nova área?", "targetArea": 24, "targetAnswer": 24, "inputType": "number", "cols": 6, "rows": 8, "dica": "Base e altura agora são diferentes. Qual o novo resultado da multiplicação?" },
  { "id": "N5_D9", "unidade": 4, "tipo": "construcao_livre", "pergunta": "Desenhe um retângulo 2x5. Triplique a área total criando um novo retângulo livre. Qual a área alvo?", "targetArea": 30, "targetAnswer": 30, "inputType": "number", "cols": 10, "rows": 6, "dica": "Primeiro calcule a área original e multiplique por 3." },

  // Tipo 4: A Escada (Composição Aditiva)
  { "id": "N5_D10", "unidade": 4, "tipo": "conversao_area", "pergunta": "Qual a área desta escada de 3 degraus largos?", "targetAnswer": 24, "inputType": "number", "cols": 10, "rows": 10, "prePaintedCoords": [[1, 1], [2, 1], [1, 2], [2, 2], [1, 3], [2, 3], [3, 3], [4, 3], [1, 4], [2, 4], [3, 4], [4, 4], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]], "dica": "Some a área de cada degrau individualmente." },
  { "id": "N5_D11", "unidade": 4, "tipo": "conversao_area", "pergunta": "Qual a área desta pirâmide de blocos?", "targetAnswer": 24, "inputType": "number", "cols": 10, "rows": 10, "prePaintedCoords": [[3, 1], [3, 2], [4, 1], [4, 2], [5, 1], [5, 2], [6, 1], [6, 2], [7, 1], [7, 2], [8, 1], [8, 2], [4, 3], [4, 4], [5, 3], [5, 4], [6, 3], [6, 4], [7, 3], [7, 4], [5, 5], [5, 6], [6, 5], [6, 6]], "dica": "Divida a pirâmide em camadas horizontais." },
  { "id": "N5_D12", "unidade": 4, "tipo": "conversao_area", "pergunta": "Qual a área desta escadaria plana?", "targetAnswer": 15, "inputType": "number", "cols": 10, "rows": 10, "prePaintedCoords": [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [1, 3], [2, 3]], "dica": "Conte quantos blocos há em cada nível da escada." },

  // Tipo 5: O Enigma do "U"/H (Polígonos Côncavos)
  { "id": "N5_D13", "unidade": 4, "tipo": "conversao_area", "pergunta": "Qual a área deste 'U' clássico?", "targetAnswer": 20, "inputType": "number", "cols": 10, "rows": 10, "prePaintedCoords": [[1, 1], [1, 2], [2, 1], [2, 2], [3, 1], [3, 2], [4, 1], [4, 2], [5, 1], [5, 2], [6, 1], [6, 2], [1, 3], [1, 4], [1, 5], [1, 6], [6, 3], [6, 4], [6, 5], [6, 6]], "dica": "O 'U' pode ser visto como um retângulo grande com um buraco ou como três partes menores." },
  { "id": "N5_D14", "unidade": 4, "tipo": "conversao_area", "pergunta": "Qual a área desta figura em 'C'?", "targetAnswer": 24, "inputType": "number", "cols": 10, "rows": 10, "prePaintedCoords": [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [1, 3], [2, 3], [1, 4], [2, 4], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]], "dica": "Corte a figura mentalmente para facilitar o cálculo." },
  { "id": "N5_D15", "unidade": 4, "tipo": "boss_challenge", "pergunta": "🔥 BOSS CHALLENGE: Construa um polígono em 'H' com estas proporções: duas torres laterais (2x6 cada) unidas por uma ponte central (2x2). Ao final, qual a área total deste gigante?", "targetArea": 28, "targetAnswer": 28, "inputType": "number", "cols": 10, "rows": 10, "dica": "Desenhe a figura primeiro: 2 torres de 2x6 blocos cada, e ligue-as no meio com um quadrado 2x2. No final, some as áreas parciais." }
];

// --- NÍVEL 6 (Implicit - Habilidade de Estimativa) ---
const level6Challenges = [
  // Tipo 1: Mancha Irregular (Percepção de Superfície Fragmentada)
  { "id": "N6_D1", "unidade": 6, "tipo": "estimativa", "pergunta": "Olhe para esta mancha de tinta: Aproximadamente quantos quadradinhos INTEIROS ela cobre?", "targetRange": [10, 14], "inputType": "number", "cols": 8, "rows": 6, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3], [4, 2], [0, 1]], "dica": "Não tente contar perfeitamente; qual é a sua melhor aposta entre 10 e 15?" },
  { "id": "N6_D2", "unidade": 6, "tipo": "estimativa", "pergunta": "A região destacada do lago no mapa é de cerca de quantos km²?", "targetRange": [18, 22], "inputType": "number", "cols": 10, "rows": 8, "prePaintedCoords": [[2, 2], [2, 3], [2, 4], [3, 2], [3, 3], [3, 4], [3, 5], [4, 3], [4, 4], [4, 5], [4, 6], [5, 4], [5, 5], [5, 6], [6, 5], [6, 6], [3, 6], [2, 5]], "dica": "Cada bloco vale 1km². Quantos blocos cheios você estima?" },
  { "id": "N6_D3", "unidade": 6, "tipo": "quiz_multiplo", "pergunta": "Sem contar um a um, a área deste polígono fragmentado está entre:", "targetAnswer": "12 e 15", "inputType": "options", "inputOptions": ["5 e 8", "12 e 15", "20 e 25"], "prePaintedCoords": [[1, 1], [1, 2], [2, 1], [2, 2], [3, 2], [3, 3], [4, 3], [4, 4], [5, 4], [5, 5], [0, 0], [1, 0], [2, 0]], "dica": "Agrupe mentalmente os pedaços para formar blocos inteiros." },
  { "id": "N6_D4", "unidade": 6, "tipo": "estimativa", "pergunta": "Qual a área aproximada desta ilha?", "targetRange": [25, 30], "inputType": "number", "cols": 10, "rows": 8, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [1, 4], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [6, 4], [6, 5]], "dica": "Tente dividir em blocos de 5 para facilitar a estimativa rápida." },
  { "id": "N6_D5", "unidade": 6, "tipo": "estimativa", "pergunta": "Sombra de Nuvem: Estime a área total sombreada.", "targetRange": [6, 9], "inputType": "number", "cols": 6, "rows": 6, "prePaintedCoords": [[1, 1], [1, 2], [2, 1], [2, 2], [3, 2], [3, 3], [2, 3]], "dica": "A nuvem é pequena. Está mais perto de 5 ou de 10?" },

  // Tipo 2: Comparação Visual (Referencial de Escala)
  { "id": "N6_D6", "unidade": 6, "tipo": "quiz_multiplo", "pergunta": "Este 'L' tem área 8. Olhando para o novo polígono ao lado, qual sua estimativa de área?", "targetAnswer": "Entre 15 e 18", "inputType": "options", "inputOptions": ["Entre 8 e 10", "Entre 15 e 18", "Mais de 30"], "prePaintedCoords": [[1, 1], [2, 1], [3, 1], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [3, 5], [2, 5], [1, 5], [0, 5], [5, 5], [5, 4], [5, 3], [5, 2]], "dica": "Use o 'L' de referência como uma régua visual." },
  { "id": "N6_D7", "unidade": 6, "tipo": "estimativa", "pergunta": "Se um cartão ocupa 15 blocos, quantos blocos você estima que este telefone ocupa?", "targetRange": [8, 12], "inputType": "number", "cols": 8, "rows": 8, "prePaintedCoords": [[1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [2, 2], [3, 2], [4, 2], [1, 3], [2, 3]], "dica": "O telefone parece ser menor que o cartão?" },
  { "id": "N6_D8", "unidade": 6, "tipo": "estimativa", "pergunta": "Área de uma Moeda no Grid: Qual a melhor estimativa em 'quadradinhos'?", "targetRange": [2, 4], "inputType": "number", "cols": 4, "rows": 4, "prePaintedCoords": [[1, 1], [1, 2], [2, 1], [2, 2]], "dica": "Uma moeda cabe em quantos quadrados?" },
  { "id": "N6_D9", "unidade": 6, "tipo": "quiz_multiplo", "pergunta": "A área da Floresta Amazônica (em escala) parece ser:", "targetAnswer": "Maior que 50 blocos", "inputType": "options", "inputOptions": ["Menor que 10 blocos", "Entre 10 e 20 blocos", "Maior que 50 blocos"], "prePaintedCoords": [[0, 0], [0, 1], [0, 2], [1, 1], [1, 2], [2, 2], [2, 3], [3, 3], [3, 4], [4, 4], [4, 5], [4, 1], [5, 1], [6, 1], [6, 2], [7, 2]], "dica": "A floresta cobre quase o grid todo!" },
  { "id": "N6_D10", "unidade": 6, "tipo": "estimativa", "pergunta": "Pinte uma área que você estima ter entre 12 e 15 blocos.", "targetRange": [12, 15], "inputType": "number", "cols": 6, "rows": 6, "dica": "Tente fazer um retângulo quase 4x4, mas retire um pouco." },

  // Tipo 3: Boss de Estimativa (O Mapa do Tesouro)
  { "id": "N6_D11", "unidade": 6, "tipo": "boss_challenge", "pergunta": "🔥 BOSS ESTIMATIVA: Estime a área total da região rochosa do mapa.", "targetRange": [20, 25], "targetAnswer": 22, "cols": 10, "rows": 10, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 2], [3, 3], [3, 4], [4, 3], [4, 4], [4, 5], [5, 4], [5, 5], [5, 6], [6, 5], [6, 6], [6, 7], [7, 6], [7, 7], [7, 8]], "dica": "A resposta exata não importa tanto quanto estar dentro da faixa segura (20 a 25)." },
  { "id": "N6_D12", "unidade": 6, "tipo": "estimativa", "pergunta": "Estime a área da letra 'A' gigante desenhada.", "targetRange": [14, 18], "inputType": "number", "cols": 10, "rows": 10, "prePaintedCoords": [[1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [3, 5], [3, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [1, 5], [1, 6]], "dica": "Conte as pernas do 'A' e a barra do meio." },
  { "id": "N6_D13", "unidade": 6, "tipo": "estimativa", "pergunta": "Quantos m² você estima para este salão circular (aproximado)?", "targetRange": [30, 40], "inputType": "number", "cols": 10, "rows": 10, "prePaintedCoords": [[2, 4], [2, 5], [2, 6], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [7, 4], [7, 5], [7, 6]], "dica": "É um círculo quase completo inscrito em um quadrado 6x6 (36)." },
  { "id": "N6_D14", "unidade": 6, "tipo": "estimativa", "pergunta": "Qual a área estimada da moldura externa?", "targetRange": [25, 32], "inputType": "number", "cols": 10, "rows": 10, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8]], "dica": "Pense no perímetro somado como blocos." },
  { "id": "N6_D15", "unidade": 6, "tipo": "quiz_multiplo", "pergunta": "A área da figura 'S' ao lado está mais próxima de:", "targetAnswer": "25 unidades", "inputType": "options", "inputOptions": ["10 unidades", "25 unidades", "50 unidades"], "prePaintedCoords": [[1, 2], [1, 3], [1, 4], [1, 5], [2, 2], [3, 2], [4, 2], [4, 3], [4, 4], [4, 5], [5, 5], [6, 5], [7, 5], [7, 4], [7, 3], [7, 2]], "dica": "Conte as fileiras." }
];

// --- NÍVEL 7 (Unidade 5: O Enigma da Escala - Razão k²) ---
const level7Challenges = [
  // Tipo 1: Ampliação (Razão k²)
  { "id": "N7_D1", "unidade": 5, "tipo": "quiz_duas_figuras", "pergunta": "Se dobrarmos todos os lados de um quadrado, o que acontece com a ÁREA?", "figA": { "w": 2, "h": 2, "label": "Lado 2", "labelBottom": "L=2" }, "figB": { "w": 4, "h": 4, "label": "Lado 4", "labelBottom": "L=4" }, "targetAnswer": "Aumenta 4 vezes", "inputType": "options", "inputOptions": ["Dobra também", "Aumenta 3 vezes", "Aumenta 4 vezes"], "dica": "Experimente imaginar quantos quadrados menores preenchem o espaço do maior." },
  { "id": "N7_D2", "unidade": 5, "tipo": "quiz_multiplo", "pergunta": "Um retângulo é ampliado para o TRIPLO de suas dimensões originais. Quantas vezes a nova área será maior?", "targetAnswer": "9 vezes", "inputType": "options", "inputOptions": ["3 vezes", "6 vezes", "9 vezes"], "dica": "Quando base e altura triplicam simultaneamente, o espaço total cresce de forma multiplicativa." },
  { "id": "N7_D3", "unidade": 5, "tipo": "quiz_duas_figuras", "pergunta": "Comparando escalas: Qual figura teve seu tamanho DOBRADO proporcionalmente?", "figA": { "w": 2, "h": 1, "label": "Original", "labelBottom": "B2", "labelSide": "H1" }, "figB": { "w": 4, "h": 2, "label": "Dobro", "labelBottom": "B4", "labelSide": "H2" }, "targetAnswer": "Figura B", "inputType": "options", "inputOptions": ["Figura A", "Figura B", "São iguais"], "dica": "Em uma ampliação proporcional, o formato da figura permanece idêntico, apenas o tamanho muda." },
  { "id": "N7_D4", "unidade": 5, "tipo": "quiz_multiplo", "pergunta": "Se a base de um triângulo triplica, mas sua altura não muda, a área total:", "targetAnswer": "Triplica", "inputType": "options", "inputOptions": ["Dobra", "Triplica", "Multiplica por 9"], "dica": "Pense no que acontece com o espaço ocupado se apenas 'esticarmos' a base de uma forma." },
  { "id": "N7_D5", "unidade": 5, "tipo": "arrastar_e_responder", "pergunta": "Desenhe a ampliação 2x do retângulo 2x1 (Base 4, Altura 2). Qual a nova área?", "targetArea": 8, "targetAnswer": 8, "inputType": "number", "cols": 6, "rows": 4, "dica": "Aplique o dobro em cada dimensão antes de construir sua figura." },

  // Tipo 2: Redução (Proporção Inversa)
  { "id": "N7_D6", "unidade": 5, "tipo": "quiz_duas_figuras", "pergunta": "Se reduzirmos os lados de um quadrado pela metade, qual a nova fração da área?", "figA": { "w": 4, "h": 4, "label": "Original", "labelBottom": "L=4" }, "figB": { "w": 2, "h": 2, "label": "Reduzido", "labelBottom": "L=2" }, "targetAnswer": "1/4 da original", "inputType": "options", "inputOptions": ["1/2 da original", "1/4 da original", "Fica igual"], "dica": "Se dividimos o espaço em duas direções ao mesmo tempo, o efeito é maior do que parece." },
  { "id": "N7_D7", "unidade": 5, "tipo": "quiz_multiplo", "pergunta": "Um fractal duplica sua área a cada passo. Se no passo 1 a área era 4, quanto será no passo 2?", "targetAnswer": "8", "inputType": "options", "inputOptions": ["6", "8", "16"], "dica": "Observe se o crescimento é apenas sobre a área total ou sobre os lados." },
  { "id": "N7_D8", "unidade": 5, "tipo": "quiz_duas_figuras", "pergunta": "Qual destes retângulos de área 12 é uma ampliação 2x das dimensões de um 3x1?", "figA": { "w": 6, "h": 2, "label": "6x2", "labelBottom": "B6", "labelSide": "H2" }, "figB": { "w": 4, "h": 3, "label": "4x3", "labelBottom": "B4", "labelSide": "H3" }, "targetAnswer": "Figura A", "inputType": "options", "inputOptions": ["Figura A", "Figura B"], "dica": "Verifique se tanto a base quanto a altura foram dobradas individualmente." },
  { "id": "N7_D9", "unidade": 5, "tipo": "quiz_multiplo", "pergunta": "Para que a área de um quadrado aumente 100 vezes, seu lado deve ser multiplicado por:", "targetAnswer": "10", "inputType": "options", "inputOptions": ["10", "50", "100"], "dica": "Busque a relação entre o crescimento linear do lado e o preenchimento total do espaço." },
  { "id": "N7_D10", "unidade": 5, "tipo": "conversao_area", "pergunta": "Um parque 2x2 foi planejado para crescer em escala 3x. Qual o novo tamanho total em blocos?", "targetAnswer": 36, "inputType": "number", "cols": 10, "rows": 10, "dica": "Uma escala 3x significa que a nova figura terá 6 blocos de base e 6 de altura." },

  // Tipo 3: Razão de Semelhança (K²)
  { "id": "N7_D11", "unidade": 5, "tipo": "quiz_multiplo", "pergunta": "Se uma figura tem área 5 e é ampliada com razão K=5, sua nova área será:", "targetAnswer": "125", "inputType": "options", "inputOptions": ["25", "50", "125"], "dica": "Multiplique a área original pelo quadrado da razão de ampliação." },
  { "id": "N7_D12", "unidade": 5, "tipo": "quiz_duas_figuras", "pergunta": "Qual relação entre as áreas destas duas figuras circulares (Raio 1 e Raio 3)?", "figA": { "w": 2, "h": 2, "shapeType": "circulo", "label": "Raio 1" }, "figB": { "w": 6, "h": 6, "shapeType": "circulo", "label": "Raio 3" }, "targetAnswer": "9 vezes maior", "inputType": "options", "inputOptions": ["3 vezes maior", "6 vezes maior", "9 vezes maior"], "dica": "Assim como nos quadrados, o crescimento circular depende do quadrado do aumento do raio." },
  { "id": "N7_D13", "unidade": 5, "tipo": "conversao_area", "pergunta": "Uma miniatura 100x menor que o original em dimensões. Quantas vezes a área original é maior?", "targetAnswer": 10000, "inputType": "number", "cols": 4, "rows": 4, "dica": "O efeito da escala na superfície é sempre o produto da escala por si mesma." },
  { "id": "N7_D14", "unidade": 5, "tipo": "quiz_multiplo", "pergunta": "Se a área de um triângulo quadruplica, o que aconteceu com sua base e altura (mantendo a proporção)?", "targetAnswer": "Dobraram", "inputType": "options", "inputOptions": ["Dobraram", "Triplicaram", "Quadruplicaram"], "dica": "Pense no caminho inverso: qual aumento linear gera um aumento de 4 vezes no espaço?" },
  { "id": "N7_D15", "unidade": 5, "tipo": "boss_challenge", "pergunta": "🔥 BOSS ESCALA: Um terreno retangular 2x3 foi ampliado em escala 4x. Qual a nova área total?", "targetAnswer": 96, "inputType": "number", "cols": 10, "rows": 10, "dica": "Comece calculando a área original e aplique a regra do crescimento superficial proporcional." }
];


// --- NÍVEL 8 (Unidade 6: Arquiteto Master - Planta Baixa e Fórmulas Mistais) ---
const level8Challenges = [
  // Tipo 1: Triângulos (Decomposição do Retângulo)
  { "id": "N8_D1", "unidade": 6, "tipo": "quiz_duas_figuras", "pergunta": "Qual a relação entre a área deste retângulo e o triângulo fatiado a partir dele?", "figA": { "w": 4, "h": 4, "label": "Retângulo", "labelBottom": "B=4", "labelSide": "H=4" }, "figB": { "w": 4, "h": 4, "shapeType": "triangulo", "label": "Triângulo", "labelBottom": "B=4", "labelSide": "H=4" }, "targetAnswer": "Metade da área", "inputType": "options", "inputOptions": ["Mesma área", "Metade da área", "Dobro da área"], "dica": "Observe como o triângulo ocupa apenas uma parte do espaço delimitado pelo retângulo." },
  { "id": "N8_D2", "unidade": 6, "tipo": "quiz_duas_figuras", "pergunta": "Se um triângulo tem a mesma base e a mesma altura de um retângulo, a área triangular será:", "figA": { "w": 6, "h": 2, "label": "Retângulo 6x2" }, "figB": { "w": 6, "h": 2, "shapeType": "triangulo", "label": "Triângulo 6x2" }, "targetAnswer": "Metade", "inputType": "options", "inputOptions": ["Mesma", "Dobro", "Metade"], "dica": "Imagine o retângulo sendo fatiado diagonalmente de um canto ao outro." },
  { "id": "N8_D3", "unidade": 6, "tipo": "quiz_multiplo", "pergunta": "Um triângulo de base 10 e altura 6 tem área equivalente a um retângulo de:", "targetAnswer": "Base 5 e altura 6", "inputType": "options", "inputOptions": ["Base 10 e altura 6", "Base 5 e altura 6", "Base 10 e altura 12"], "dica": "Compensamos o formato triangular transformando-o mentalmente em um retângulo de base reduzida." },
  { "id": "N8_D4", "unidade": 6, "tipo": "arrastar_e_responder", "pergunta": "Se um retângulo 4x4 tem área 16, desenhe o espaço que um triângulo de mesma base e altura ocuparia (Área 8).", "targetArea": 8, "targetAnswer": 8, "inputType": "number", "cols": 4, "rows": 4, "dica": "Pense no preenchimento que representa exatamente a metade da capacidade total do desenho." },
  { "id": "N8_D5", "unidade": 6, "tipo": "quiz_duas_figuras", "pergunta": "Qual destas figuras triangulares tem MAIOR área total?", "figA": { "w": 4, "h": 4, "shapeType": "triangulo", "label": "Base 4, Altura 4" }, "figB": { "w": 2, "h": 8, "shapeType": "triangulo", "label": "Base 2, Altura 8" }, "targetAnswer": "São iguais", "inputType": "options", "inputOptions": ["Figura A", "Figura B", "São iguais"], "dica": "O espaço ocupado depende do balanço entre a largura da base e a altura da ponta." },

  // Tipo 2: Trapézios e Círculos (Formas Complexas)
  { "id": "N8_D6", "unidade": 6, "tipo": "quiz_duas_figuras", "pergunta": "O que acontece com o espaço ocupado se 'estreitarmos' o topo de um retângulo para formar um trapézio?", "figA": { "w": 6, "h": 4, "label": "Retângulo", "labelBottom": "B6", "labelTop": "B6" }, "figB": { "w": 6, "h": 4, "shapeType": "trapezio", "label": "Trapézio", "labelBottom": "B6", "labelTop": "B2" }, "targetAnswer": "Diminui", "inputType": "options", "inputOptions": ["Aumenta", "Diminui", "Fica igual"], "dica": "Note as áreas que foram removidas nos cantos superiores para criar a inclinação." },
  { "id": "N8_D7", "unidade": 6, "tipo": "quiz_multiplo", "pergunta": "Um trapézio de bases 8 e 2 com altura 4 tem a mesma área que um retângulo de altura 4 e base:", "targetAnswer": "5", "inputType": "options", "inputOptions": ["10", "5", "8"], "dica": "Busque o valor que representa a média entre a largura do topo e da base." },
  { "id": "N8_D8", "unidade": 6, "tipo": "quiz_duas_figuras", "pergunta": "Qual figura circular tem área mais próxima de um quadrado 3x3 (Área 9)?", "figA": { "w": 2, "h": 2, "shapeType": "circulo", "label": "Raio 1" }, "figB": { "w": 3.4, "h": 3.4, "shapeType": "circulo", "label": "Raio 1.7" }, "targetAnswer": "Figura B", "inputType": "options", "inputOptions": ["Figura A", "Figura B", "Nenhuma"], "dica": "A área de um círculo é aproximadamente três vezes o quadrado do seu raio." },
  { "id": "N8_D9", "unidade": 6, "tipo": "quiz_duas_figuras", "pergunta": "Comparação de Curvas: Qual área é maior?", "figA": { "w": 4, "h": 4, "shapeType": "circulo", "label": "Círculo (R=2)" }, "figB": { "w": 6, "h": 3, "shapeType": "semicirculo", "label": "Semicírculo (R=3)" }, "targetAnswer": "Figura B", "inputType": "options", "inputOptions": ["Figura A", "Figura B", "São iguais"], "dica": "Mesmo sendo 'metade', um raio maior pode compensar o espaço total." },
  { "id": "N8_D10", "unidade": 6, "tipo": "conversao_area", "pergunta": "Rampa de Acesso: Determine a área lateral deste trapézio de base 1 e 5 com altura 10.", "targetAnswer": 30, "inputType": "number", "cols": 10, "rows": 10, "dica": "Imagine o trapézio se transformando em um retângulo equilibrado entre os dois extremos." },

  // Tipo 3: Arquiteto Master (Planta Baixa)
  {
    "id": "N8_D11",
    "unidade": 6,
    "tipo": "conversao_area",
    "pergunta": "🔥 ARQUITETO MASTER: Determine a área total desta residência decompondo as formas: Quarto (Azul), Sala (Triangular) e Jardim (Circular).",
    "targetAnswer": 42,
    "inputType": "number",
    "cols": 10,
    "rows": 10,
    "prePaintedCoords": [
      [1, 1], [1, 2], [1, 3], [1, 4], [2, 1], [2, 2], [2, 3], [2, 4], [3, 1], [3, 2], [3, 3], [3, 4], [4, 1], [4, 2], [4, 3], [4, 4], [5, 1], [5, 2], [5, 3], [5, 4],
      [6, 1], [6, 2], [6, 3], [6, 4], [7, 1], [7, 2], [7, 3], [8, 1], [8, 2], [9, 1],
      { r: 1, c: 7, shape: "circle" }, { r: 1, c: 8, shape: "circle" },
      { r: 2, c: 6, shape: "circle" }, { r: 2, c: 7, shape: "circle" }, { r: 2, c: 8, shape: "circle" }, { r: 2, c: 9, shape: "circle" },
      { r: 3, c: 6, shape: "circle" }, { r: 3, c: 7, shape: "circle" }, { r: 3, c: 8, shape: "circle" }, { r: 3, c: 9, shape: "circle" },
      { r: 4, c: 7, shape: "circle" }, { r: 4, c: 8, shape: "circle" }
    ],
    "dica": "Não tente calcular tudo de uma vez. Identifique o espaço de cada cômodo individualmente."
  },
  { "id": "N8_D12", "unidade": 6, "tipo": "quiz_multiplo", "pergunta": "Para cercar um jardim circular de raio 3m, precisamos de 18m de muro. Já para gramar o interior, precisamos de quanto?", "targetAnswer": "27m²", "inputType": "options", "inputOptions": ["9m²", "18m²", "27m²"], "dica": "Lembre-se que o preenchimento (área) cresce em ritmo diferente do contorno (perímetro)." },
  { "id": "N8_D13", "unidade": 6, "tipo": "quiz_duas_figuras", "pergunta": "O que ocupa mais espaço na planta?", "figA": { "w": 4, "h": 4, "shapeType": "triangulo", "label": "Depósito Triangular" }, "figB": { "w": 3, "h": 3, "shapeType": "circulo", "label": "Fonte Circular" }, "targetAnswer": "Figura B", "inputType": "options", "inputOptions": ["Figura A", "Figura B", "Empate"], "dica": "O círculo de raio 1.5 é quase 3 vezes maior que o quadrado de lado 1.5." },
  { "id": "N8_D14", "unidade": 6, "tipo": "quiz_duas_figuras", "pergunta": "Terreno em 'A': Composto por um triângulo no topo (8m²) e um trapézio na base (20m²). Qual a área total?", "figA": { "w": 4, "h": 4, "shapeType": "triangulo", "label": "Topo" }, "figB": { "w": 6, "h": 4, "shapeType": "trapezio", "label": "Base" }, "targetAnswer": "28", "inputType": "options", "inputOptions": ["20", "28", "40"], "dica": "A área total de figuras encostadas é simplesmente a soma de suas superfícies individuais." },
  {
    "id": "N8_D15",
    "unidade": 6,
    "tipo": "conversao_area",
    "pergunta": "🔥 DESAFIO FINAL: Projetar o Estádio Master! Campo (100 unidades) e duas Alas Curvas que juntas formam um círculo completo (75 unidades). Qual a área total?",
    "targetAnswer": 175,
    "inputType": "number",
    "cols": 22,
    "rows": 10,
    "prePaintedCoords": [
      [0, 6], [0, 7], [0, 8], [0, 9], [0, 10], [0, 11], [0, 12], [0, 13], [0, 14], [0, 15],
      [1, 6], [1, 7], [1, 8], [1, 9], [1, 10], [1, 11], [1, 12], [1, 13], [1, 14], [1, 15],
      [2, 6], [2, 7], [2, 8], [2, 9], [2, 10], [2, 11], [2, 12], [2, 13], [2, 14], [2, 15],
      [3, 6], [3, 7], [3, 8], [3, 9], [3, 10], [3, 11], [3, 12], [3, 13], [3, 14], [3, 15],
      [4, 6], [4, 7], [4, 8], [4, 9], [4, 10], [4, 11], [4, 12], [4, 13], [4, 14], [4, 15],
      [5, 6], [5, 7], [5, 8], [5, 9], [5, 10], [5, 11], [5, 12], [5, 13], [5, 14], [5, 15],
      [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [6, 15],
      [7, 6], [7, 7], [7, 8], [7, 9], [7, 10], [7, 11], [7, 12], [7, 13], [7, 14], [7, 15],
      [8, 6], [8, 7], [8, 8], [8, 9], [8, 10], [8, 11], [8, 12], [8, 13], [8, 14], [8, 15],
      [9, 6], [9, 7], [9, 8], [9, 9], [9, 10], [9, 11], [9, 12], [9, 13], [9, 14], [9, 15],
      { r: 0, c: 5, shape: "circle" }, { r: 1, c: 4, shape: "circle" }, { r: 2, c: 3, shape: "circle" }, { r: 3, c: 2, shape: "circle" }, { r: 4, c: 1, shape: "circle" },
      { r: 5, c: 1, shape: "circle" }, { r: 6, c: 2, shape: "circle" }, { r: 7, c: 3, shape: "circle" }, { r: 8, c: 4, shape: "circle" }, { r: 9, c: 5, shape: "circle" },
      { r: 1, c: 5, shape: "circle" }, { r: 2, c: 5, shape: "circle" }, { r: 3, c: 5, shape: "circle" }, { r: 4, c: 5, shape: "circle" }, { r: 5, c: 5, shape: "circle" }, { r: 6, c: 5, shape: "circle" }, { r: 7, c: 5, shape: "circle" }, { r: 8, c: 5, shape: "circle" },
      { r: 2, c: 4, shape: "circle" }, { r: 3, c: 4, shape: "circle" }, { r: 4, c: 4, shape: "circle" }, { r: 5, c: 4, shape: "circle" }, { r: 6, c: 4, shape: "circle" }, { r: 7, c: 4, shape: "circle" },
      { r: 3, c: 3, shape: "circle" }, { r: 4, c: 3, shape: "circle" }, { r: 5, c: 3, shape: "circle" }, { r: 6, c: 3, shape: "circle" },
      { r: 4, c: 2, shape: "circle" }, { r: 5, c: 2, shape: "circle" },
      { r: 0, c: 16, shape: "circle" }, { r: 1, c: 17, shape: "circle" }, { r: 2, c: 18, shape: "circle" }, { r: 3, c: 19, shape: "circle" }, { r: 4, c: 20, shape: "circle" },
      { r: 5, c: 20, shape: "circle" }, { r: 6, c: 19, shape: "circle" }, { r: 7, c: 18, shape: "circle" }, { r: 8, c: 17, shape: "circle" }, { r: 9, c: 16, shape: "circle" },
      { r: 1, c: 16, shape: "circle" }, { r: 2, c: 16, shape: "circle" }, { r: 3, c: 16, shape: "circle" }, { r: 4, c: 16, shape: "circle" }, { r: 5, c: 16, shape: "circle" }, { r: 6, c: 16, shape: "circle" }, { r: 7, c: 16, shape: "circle" }, { r: 8, c: 16, shape: "circle" },
      { r: 2, c: 17, shape: "circle" }, { r: 3, c: 17, shape: "circle" }, { r: 4, c: 17, shape: "circle" }, { r: 5, c: 17, shape: "circle" }, { r: 6, c: 17, shape: "circle" }, { r: 7, c: 17, shape: "circle" },
      { r: 3, c: 18, shape: "circle" }, { r: 4, c: 18, shape: "circle" }, { r: 5, c: 18, shape: "circle" }, { r: 6, c: 18, shape: "circle" },
      { r: 4, c: 19, shape: "circle" }, { r: 5, c: 19, shape: "circle" },
      { r: 0, c: 4, shape: "circle" }, { r: 9, c: 4, shape: "circle" }, { r: 0, c: 17, shape: "circle" }, { r: 9, c: 17, shape: "circle" },
      { r: 1, c: 3, shape: "circle" }, { r: 8, c: 3, shape: "circle" }, { r: 1, c: 18, shape: "circle" }, { r: 8, c: 18, shape: "circle" },
      { r: 2, c: 2, shape: "circle" }, { r: 7, c: 2, shape: "circle" }, { r: 2, c: 19, shape: "circle" }, { r: 7, c: 19, shape: "circle" },
      { r: 5, c: 0, shape: "circle" }
    ],
    "dica": "O estádio é formado por formas conhecidas que se unem. Tente identificar o espaço de cada parte antes de somar."
  },
];

const database = {
  1: level1Challenges,
  2: level2Challenges,
  3: level3Challenges,
  4: level4Challenges,
  5: level5Challenges,
  6: level6Challenges,
  7: level7Challenges,
  8: level8Challenges
};
