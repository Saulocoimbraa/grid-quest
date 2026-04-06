// js/data.js
const level1Challenges = [
  { id: "N1_D1", unidade: 1, tipo: "pintar_area", pergunta: "Pinte exatos 4 quadrinhos de área.", target: 4, cols: 4, rows: 4 },
  { id: "N1_D2", unidade: 1, tipo: "pintar_area", pergunta: "Pinte 7 quadrinhos quaisquer.", target: 7, cols: 5, rows: 4 },
  { id: "N1_D3", unidade: 1, tipo: "calcular_area_destacada", pergunta: "Qual a área da figura abaixo?", target: 6, cols: 4, rows: 4, prePaintedCoords: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]] },
  { id: "N1_D4", unidade: 1, tipo: "calcular_area_destacada", pergunta: "Quantos quadrados formam a figura?", target: 5, cols: 5, rows: 5, prePaintedCoords: [[0, 2], [1, 1], [1, 2], [1, 3], [2, 2]] },
  { id: "N1_D5", unidade: 1, tipo: "desenhar_quadrado", pergunta: "Desenhe um quadrado 3x3.", target: 3, cols: 5, rows: 5 },
  { id: "N1_D6", unidade: 1, tipo: "desenhar_quadrado", pergunta: "Construa um quadrado de lado 2.", target: 2, cols: 4, rows: 4 },
  { id: "N1_D7", unidade: 1, tipo: "desenhar_retangulo", pergunta: "Crie um retângulo de 2 por 4.", targetX: 2, targetY: 4, cols: 6, rows: 5 },
  { id: "N1_D8", unidade: 1, tipo: "desenhar_retangulo", pergunta: "Construa um retângulo de 3 por 1.", targetX: 3, targetY: 1, cols: 5, rows: 4 },
  { id: "N1_D9", unidade: 1, tipo: "desenhar_L", pergunta: "Desenhe um 'L' com 4 blocos de altura e 2 de base (total 5).", target: 5, cols: 5, rows: 5 },
  { id: "N1_D10", unidade: 1, tipo: "desenhar_L", pergunta: "Desenhe um 'L' pequeno com 3 blocos de altura e 2 de base (total 4).", target: 4, cols: 5, rows: 5 },

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
  { id: "N2_D1", unidade: 2, tipo: "arrastar_e_responder", pergunta: "O Tapete Estreito: Arraste para cobrir a malha inteira. Qual o total de quadrados da área?", targetArea: 5, targetAnswer: 5, inputType: "number", inputPlaceholder: "Total?", cols: 5, rows: 1, feedbackAghy: "Você usou 1 linha de 5 quadrados!", dica: "Arraste do primeiro ao último quadrado e conte-os." },
  { id: "N2_D2", unidade: 2, tipo: "arrastar_e_responder", pergunta: "Duplicando a Linha: Cubra tudo. Qual a forma geométrica formada?", targetArea: 6, targetAnswer: "retângulo", inputType: "options", inputOptions: ["Triângulo", "Retângulo", "Círculo"], cols: 3, rows: 2, dica: "Observe o formato final após pintar os 6 quadrados." },
  { id: "N2_D3", unidade: 2, tipo: "arrastar_bloco", pergunta: "O Quadrado Perfeito: Preencha toda a área de 3x3 arrastando até o fim da malha.", targetArea: 9, numBlocks: 1, cols: 3, rows: 3 },

  // Fase B: A Descoberta da Fórmula
  { id: "N2_D4", unidade: 2, tipo: "arrastar_medidas", pergunta: "A Sala de Estar: 4 linhas de 5 quadrados... Pinte a sala toda e responda qual o total na caixa:", target: 20, cols: 5, rows: 4, dica: "Multiplique a base (5) pela altura (4)." },
  { id: "N2_D5", unidade: 2, tipo: "clique_rapido", pergunta: "Desafio Rápido (6 linhas por 2 colunas): Digite a área antes que o tempo acabe!", timeLimit: 10, target: 12, cols: 6, rows: 2, prePaintedFull: true },
  { id: "N2_D6", unidade: 2, tipo: "ladrilhador_inverso", pergunta: "O Arquiteto: Desenhe qualquer RETÂNGULO que tenha exatamente 12 quadrados de área.", targetArea: 12, targetCount: 1, cols: 6, rows: 4, dica: "Pode ser 3x4, 2x6 ou até 1x12!" },
  { id: "N2_D7", unidade: 2, tipo: "area_distributiva", pergunta: "Caminho das Cores: Qual a área total somando a parte Azul com a Amarela?", target: 25, cols: 5, rows: 5, colorSplit: { cA: 2 }, dica: "A área total é a soma das duas partes coloridas." },

  // Fase C: Abstração e Autonomia
  { id: "N2_D8", unidade: 2, tipo: "malha_fantasma", pergunta: "A Malha Fantasma (7 quadrados por 3 quadrados de altura): Digite o valor da área total.", target: 21, cols: 7, rows: 3 },
  { id: "N2_D9", unidade: 2, tipo: "problema_natural", pergunta: "O Armazém: Um armazém tem 4 fileiras com 5 caixas. Desenhe o formato (4x5) e responda a área na caixa:", target: 20, targetH: 4, targetW: 5, cols: 6, rows: 6 },
  { id: "N2_D10", unidade: 2, tipo: "tres_salas", pergunta: "Desafio do Mestre: Crie duas salas de área 12 em locais diferentes (sem sobrepor).", targetArea: 12, targetCount: 2, cols: 8, rows: 6 },

  // --- VARIAÇÕES FASE A: Percepção de Agrupamento ---
  { id: "N2_D11", unidade: 2, tipo: "arrastar_e_responder", pergunta: "A Coluna Alta: Arraste de cima a baixo. Quantos quadrados formam essa coluna?", targetArea: 4, targetAnswer: 4, inputType: "number", cols: 1, rows: 4, dica: "É uma linha em pé! Conte os blocos um a um." },
  { id: "N2_D12", unidade: 2, tipo: "arrastar_e_responder", pergunta: "O Dobro do Espaço: Preencha o grid. Qual o formato final desta área de 8 blocos?", targetArea: 8, targetAnswer: "retângulo", inputType: "options", inputOptions: ["Quadrado", "Retângulo", "Triângulo"], cols: 4, rows: 2, dica: "Lembre-se: se os lados são diferentes, é um retângulo." },
  { id: "N2_D13", unidade: 2, tipo: "arrastar_bloco", pergunta: "O Quadrado de Lado 2: Arraste para preencher todo o espaço 2x2.", targetArea: 4, numBlocks: 1, cols: 2, rows: 2 },
  { id: "N2_D14", unidade: 2, tipo: "arrastar_bloco", pergunta: "Bloco Gigante: Arraste o seletor para preencher a malha de 2x5.", targetArea: 10, numBlocks: 1, cols: 5, rows: 2 },

  // --- VARIAÇÕES FASE B: A Descoberta da Fórmula ---
  { id: "N2_D15", unidade: 2, tipo: "arrastar_medidas", pergunta: "Campo de Papiro: 3 linhas com 6 quadrados cada. Pinte tudo e calcule o total:", target: 18, cols: 6, rows: 3, dica: "Pense em 6 + 6 + 6 ou 3 vezes 6." },
  { id: "N2_D16", unidade: 2, tipo: "arrastar_medidas", pergunta: "Mosaico Grego: 2 linhas de 10 quadrados. Qual a área total desta faixa?", target: 20, cols: 10, rows: 2, dica: "Base 10 x Altura 2." },
  { id: "N2_D17", unidade: 2, tipo: "clique_rapido", pergunta: "Relâmpago: Grid de 3x3. Digite a área antes do tempo acabar!", timeLimit: 7, target: 9, cols: 3, rows: 3, prePaintedFull: true },
  { id: "N2_D18", unidade: 2, tipo: "clique_rapido", pergunta: "Flash: 5 linhas por 2 colunas. Qual a área total?", timeLimit: 8, target: 10, cols: 5, rows: 2, prePaintedFull: true },
  { id: "N2_D19", unidade: 2, tipo: "ladrilhador_inverso", pergunta: "O Arquiteto de Vilas: Desenhe qualquer retângulo com área de 10 quadrados.", targetArea: 10, targetCount: 1, cols: 6, rows: 4, dica: "2x5 ou 1x10, você escolhe!" },
  { id: "N2_D20", unidade: 2, tipo: "ladrilhador_inverso", pergunta: "O Designer: Crie qualquer retângulo que resulte em 16 de área.", targetArea: 16, targetCount: 1, cols: 6, rows: 6, dica: "Pode ser 4x4, 2x8 ou 8x2!" },
  { id: "N2_D21", unidade: 2, tipo: "area_distributiva", pergunta: "Tapete Colorido: Parte Azul (2x3) + Parte Verde (2x3). Qual a área total?", target: 12, cols: 4, rows: 3, colorSplit: { cA: 2 }, dica: "Some as duas metades ou calcule o total 4x3." },
  { id: "N2_D22", unidade: 2, tipo: "area_distributiva", pergunta: "Jardim Dividido: Lado A (4x2) e Lado B (4x3). Qual a área total?", target: 20, cols: 4, rows: 5, colorSplit: { rA: 2 }, dica: "Imagine o jardim inteiro como um 4x5." },

  // --- VARIAÇÕES FASE C: Abstração e Autonomia ---
  { id: "N2_D23", unidade: 2, tipo: "malha_fantasma", pergunta: "O Lote Invisível: 8 colunas e 2 linhas de altura. Qual a área total?", target: 16, cols: 8, rows: 2 },
  { id: "N2_D24", unidade: 2, tipo: "malha_fantasma", pergunta: "O Tabuleiro Fantasma: 4 de largura por 4 de altura. Digite a área:", target: 16, cols: 4, rows: 4 },
  { id: "N2_D25", unidade: 2, tipo: "problema_natural", pergunta: "A Biblioteca: 3 prateleiras com 8 livros cada. Desenhe o formato (3x8) e diga a área:", target: 24, targetH: 3, targetW: 8, cols: 9, rows: 4 },
  { id: "N2_D26", unidade: 2, tipo: "problema_natural", pergunta: "Caixa de Bombom: 2 fileiras de 6 doces. Desenhe a caixa (2x6) e responda a área:", target: 12, targetH: 2, targetW: 6, cols: 7, rows: 3 },
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
  { "id": "N3_D1", "unidade": 3, "tipo": "quiz_duas_figuras", "pergunta": "Mesma área (6 blocos). Qual tem o MAIOR contorno (Perímetro)?", "figA": { "w": 2, "h": 3, "label": "Figura A (2x3)" }, "figB": { "w": 1, "h": 6, "label": "Figura B (1x6)" }, "targetAnswer": "Figura B", "inputType": "options", "inputOptions": ["Figura A", "Figura B"], "dica": "O perímetro é a soma de todos os lados externos. Conte os pauzinhos da borda!" },
  { "id": "N3_D2", "unidade": 3, "tipo": "arrastar_e_responder", "pergunta": "Desenhe um retângulo 4x2. Qual a ÁREA total (quadrados pintados)?", "targetArea": 8, "targetAnswer": 8, "inputType": "number", "cols": 6, "rows": 4, "dica": "A área é o total de quadradinhos dentro da forma desenhada." },
  { "id": "N3_D3", "unidade": 3, "tipo": "clique_rapido", "pergunta": "Observe o retângulo 4x2 destacado. Qual o valor total do seu PERÍMETRO?", "target": 12, "targetAnswer": 12, "timeLimit": 15, "cols": 6, "rows": 4, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [1, 4], [2, 1], [2, 2], [2, 3], [2, 4]], "dica": "Perímetro é a soma de todos os lados: 4 + 2 + 4 + 2." },
  { "id": "N3_D4", "unidade": 3, "tipo": "arrastar_e_responder", "pergunta": "Campo de Futebol: Cada quadrado tem 10m de lado. Pinte uma área de 50m x 20m. Quantos m² no total?", "targetArea": 10, "targetAnswer": 1000, "inputType": "number", "cols": 6, "rows": 5, "feedbackAghy": "Uau! Áreas grandes de m² são usadas em estádios!", "dica": "50m x 20m = 1000m². Na malha, cada bloco de 10m x 10m é 100m²." },
  { "id": "N3_D5", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "Qual unidade usar para medir a área total de um Telefone?", "targetAnswer": "cm²", "inputType": "options", "inputOptions": ["m²", "km²", "cm²"], "dica": "Pense no tamanho do objeto: pequeno (cm²), médio (m²) ou gigante (km²)." },
  { "id": "N3_D6", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "Para medir a área de uma Floresta Amazônica completa, usamos:", "targetAnswer": "km²", "inputType": "options", "inputOptions": ["m²", "km²", "cm²"], "dica": "Florestas são áreas extensas, use a maior unidade." },
  { "id": "N3_D7", "unidade": 3, "tipo": "quiz_duas_figuras", "pergunta": "Com 12m de cerca, qual formato garante MAIS ÁREA INTERNA?", "figA": { "w": 1, "h": 5, "label": "Retângulo 1x5" }, "figB": { "w": 3, "h": 3, "label": "Quadrado 3x3" }, "targetAnswer": "Quadrado 3x3", "inputType": "options", "inputOptions": ["Retângulo 1x5", "Quadrado 3x3"], "dica": "Calcule a área de cada um (base x altura) e compare." },
  { "id": "N3_D8", "unidade": 3, "tipo": "conversao_area", "pergunta": "Este cartão cobre 15 quadrados mágicos. Se cada quadrado vale 3cm², qual a área total do cartão?", "targetAnswer": 45, "inputType": "number", "cols": 6, "rows": 5, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5]], "elementos_visuais": { "referencia": { "label": "1 quadrado = 3cm²" } }, "feedbackAghy": "Incrível! Você usou a lógica: 15 quadrados x 3cm² cada = 45cm².", "dica": "Multiplique a quantidade de quadrados (15) pelo valor de cada um (3)." },
  { "id": "N3_D9", "unidade": 3, "tipo": "construcao_livre", "pergunta": "Use 16m de perímetro (borda amarela) para criar a maior área possível.", "targetArea": 16, "targetPerimeter": 16, "cols": 6, "rows": 6, "dica": "Tente formar um quadrado 4x4." },
  { "id": "N3_D10", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "O tamanho de um Chip de Celular (SIM Card) é cerca de 2...?", "targetAnswer": "cm²", "inputType": "options", "inputOptions": ["m²", "km²", "cm²"] },

  // --- ÁREA VS PERÍMETRO (N3_D11 a N3_D20) ---
  { "id": "N3_D11", "unidade": 3, "tipo": "quiz_duas_figuras", "pergunta": "Ambas têm perímetro 12. Qual delas tem a MENOR área interna?", "figA": { "w": 3, "h": 3, "label": "Quadrado 3x3" }, "figB": { "w": 5, "h": 1, "label": "Retângulo 5x1" }, "targetAnswer": "Figura B", "inputType": "options", "inputOptions": ["Figura A", "Figura B"], "dica": "Calcule 3x3 e 5x1. Qual resultado é menor?" },
  { "id": "N3_D12", "unidade": 3, "tipo": "arrastar_e_responder", "pergunta": "Desenhe um retângulo 5x2. Qual o PERÍMETRO (soma de todos os lados)?", "targetArea": 10, "targetAnswer": 14, "inputType": "number", "cols": 7, "rows": 4, "dica": "Some: 5 + 2 + 5 + 2." },
  { "id": "N3_D13", "unidade": 3, "tipo": "clique_rapido", "pergunta": "Um quadrado de lado 3. Digite rápido a ÁREA dele!", "target": 9, "timeLimit": 10, "cols": 5, "rows": 5, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]] },
  { "id": "N3_D14", "unidade": 3, "tipo": "clique_rapido", "pergunta": "O mesmo quadrado de lado 3. Digite agora o PERÍMETRO!", "target": 12, "timeLimit": 10, "cols": 5, "rows": 5, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]] },
  { "id": "N3_D15", "unidade": 3, "tipo": "quiz_duas_figuras", "pergunta": "Um Quadrado e uma Linha. Ambos têm área 4. O Perímetro é igual?", "figA": { "w": 2, "h": 2, "label": "Quadrado 2x2" }, "figB": { "w": 4, "h": 1, "label": "Linha 4x1" }, "targetAnswer": "Não, o 4x1 é maior", "inputType": "options", "inputOptions": ["Sim, são iguais", "Não, o 4x1 é maior"], "dica": "O Perímetro do quadrado 2x2 é 8. O da linha 4x1 é 10!" },
  { "id": "N3_D16", "unidade": 3, "tipo": "construcao_livre", "pergunta": "Crie um retângulo de área 6 que tenha o MENOR perímetro possível.", "targetArea": 6, "targetPerimeter": 10, "cols": 5, "rows": 5, "dica": "Tente o formato 3x2 em vez de 6x1." },
  { "id": "N3_D17", "unidade": 3, "tipo": "arrastar_e_responder", "pergunta": "Desenhe um quadrado de lado 5. Qual a área total?", "targetArea": 25, "targetAnswer": 25, "inputType": "number", "cols": 6, "rows": 6 },
  { "id": "N3_D18", "unidade": 3, "tipo": "quiz_duas_figuras", "pergunta": "Quem vence? Um retângulo 4x3 ou um quadrado 4x4 em PERÍMETRO?", "figA": { "w": 4, "h": 3, "label": "Retângulo 4x3" }, "figB": { "w": 4, "h": 4, "label": "Quadrado 4x4" }, "targetAnswer": "Quadrado 4x4", "inputType": "options", "inputOptions": ["Retângulo 4x3", "Quadrado 4x4"] },
  { "id": "N3_D19", "unidade": 3, "tipo": "construcao_livre", "pergunta": "Use 10m de perímetro para cercar uma área de 6m².", "targetArea": 6, "targetPerimeter": 10, "cols": 5, "rows": 5, "dica": "Um retângulo 3x2 resolve esse mistério!" },
  { "id": "N3_D20", "unidade": 3, "tipo": "clique_rapido", "pergunta": "Retângulo 10x1. Qual o Perímetro?", "target": 22, "timeLimit": 12, "cols": 10, "rows": 1, "prePaintedFull": true },

  // --- UNIDADES DE MEDIDA E CONVERSÃO (N3_D21 a N3_D30) ---
  { "id": "N3_D21", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "Qual a melhor unidade para medir um campo de futebol?", "targetAnswer": "m²", "inputType": "options", "inputOptions": ["cm²", "m²", "km²"] },
  { "id": "N3_D22", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "A tela de um relógio de pulso mede cerca de 6...?", "targetAnswer": "cm²", "inputType": "options", "inputOptions": ["cm²", "m²", "km²"] },
  { "id": "N3_D23", "unidade": 3, "tipo": "conversao_area", "pergunta": "O mosaico abaixo usa 10 peças. Se cada peça vale 5cm², qual a área total do mosaico?", "targetAnswer": 50, "inputType": "number", "cols": 6, "rows": 4, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5]], "elementos_visuais": { "referencia": { "label": "1 peça = 5cm²" } }, "dica": "10 peças x 5cm² cada." },
  { "id": "N3_D24", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "A cidade de Olinda tem sua área medida em:", "targetAnswer": "km²", "inputType": "options", "inputOptions": ["m²", "km²", "cm²"] },
  { "id": "N3_D25", "unidade": 3, "tipo": "conversao_area", "pergunta": "Abaixo vemos a região de um lago. Cada quadrado no mapa vale 2km². Qual a área do lago?", "targetAnswer": 16, "inputType": "number", "cols": 5, "rows": 5, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2]], "dica": "8 quadrados x 2km²." },
  { "id": "N3_D26", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "Uma folha de papel A4 tem aproximadamente 600...?", "targetAnswer": "cm²", "inputType": "options", "inputOptions": ["cm²", "m²", "km²"] },
  { "id": "N3_D27", "unidade": 3, "tipo": "conversao_area", "pergunta": "O tapete abaixo tem 4 quadrados. Se cada quadrado vale 0,5m², qual a área total do tapete?", "targetAnswer": 2, "inputType": "number", "cols": 4, "rows": 4, "prePaintedCoords": [[1, 1], [1, 2], [2, 1], [2, 2]], "elementos_visuais": { "referencia": { "label": "1 quadrado = 0,5m²" } }, "dica": "0,5 + 0,5 + 0,5 + 0,5 ou 4 x 0,5." },
  { "id": "N3_D28", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "A área de uma moeda é medida em:", "targetAnswer": "cm²", "inputType": "options", "inputOptions": ["cm²", "m²", "km²"] },
  { "id": "N3_D29", "unidade": 3, "tipo": "arrastar_e_responder", "pergunta": "Pinte 4 blocos. Se cada bloco vale 10cm², qual a área pintada?", "targetArea": 4, "targetAnswer": 40, "inputType": "number", "cols": 4, "rows": 4 },
  { "id": "N3_D30", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "A superfície de uma mesa de jantar mede cerca de 2...?", "targetAnswer": "m²", "inputType": "options", "inputOptions": ["cm²", "m²", "km²"] },

  // --- DESAFIOS DE MAESTRIA (N3_D31 a N3_D40) ---
  { "id": "N3_D31", "unidade": 3, "tipo": "quiz_duas_figuras", "pergunta": "Qual destas cercas de 14m guarda a MAIOR área de horta?", "figA": { "w": 6, "h": 1, "label": "6x1 (Área 6)" }, "figB": { "w": 4, "h": 3, "label": "4x3 (Área 12)" }, "targetAnswer": "Figura B", "inputType": "options", "inputOptions": ["Figura A", "Figura B"] },
  { "id": "N3_D32", "unidade": 3, "tipo": "construcao_livre", "pergunta": "Crie um quadrado onde a ÁREA e o PERÍMETRO tenham o mesmo número!", "targetArea": 16, "targetPerimeter": 16, "cols": 5, "rows": 5, "dica": "Tente o lado 4. 4x4=16 e 4+4+4+4=16!" },
  { "id": "N3_D33", "unidade": 3, "tipo": "conversao_area", "pergunta": "Um pixel gigante vale 4cm². Desenhe um 'L' com 2 blocos de altura e 2 de base (total 3). Qual a área total?", "targetArea": 3, "targetAnswer": 12, "inputType": "number", "cols": 3, "rows": 3 },
  { "id": "N3_D34", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "O Brasil tem 8,5 milhões de...?", "targetAnswer": "km²", "inputType": "options", "inputOptions": ["m²", "km²", "cm²"] },
  { "id": "N3_D35", "unidade": 3, "tipo": "arrastar_e_responder", "pergunta": "Pinte um retângulo 3x4. Qual o Perímetro?", "targetArea": 12, "targetAnswer": 14, "inputType": "number", "cols": 5, "rows": 5 },
  { "id": "N3_D36", "unidade": 3, "tipo": "clique_rapido", "pergunta": "Área de um retângulo 2x5?", "target": 10, "timeLimit": 5, "cols": 5, "rows": 2, "prePaintedFull": true },
  { "id": "N3_D37", "unidade": 3, "tipo": "clique_rapido", "pergunta": "Perímetro de um retângulo 2x5?", "target": 14, "timeLimit": 8, "cols": 5, "rows": 2, "prePaintedFull": true },
  { "id": "N3_D38", "unidade": 3, "tipo": "construcao_livre", "pergunta": "Desenhe uma linha de 5 blocos (horizontal ou vertical). Qual o seu perímetro?", "targetArea": 5, "targetPerimeter": 12, "targetAnswer": 12, "inputType": "number", "cols": 6, "rows": 6, "dica": "Para qualquer linha de 5 blocos emendados, o perímetro será 12." },
  { "id": "N3_D39", "unidade": 3, "tipo": "quiz_duas_figuras", "pergunta": "Um quadrado 2x2 e um retângulo 4x1. Quem tem mais borda?", "figA": { "w": 2, "h": 2, "label": "Quadrado (Perím. 8)" }, "figB": { "w": 4, "h": 1, "label": "Retângulo (Perím. 10)" }, "targetAnswer": "Retângulo 4x1", "inputType": "options", "inputOptions": ["Quadrado 2x2", "Retângulo 4x1"] },
  { "id": "N3_D40", "unidade": 3, "tipo": "arrastar_e_responder", "pergunta": "🔥 DESAFIO DO MESTRE: Desenhe um retângulo com área de 24m² onde um dos lados seja 6m. Qual o PERÍMETRO dele?", "targetArea": 24, "targetAnswer": 20, "inputType": "number", "cols": 8, "rows": 6, "dica": "Se a área é 24 e um lado é 6, o outro é 4 (6x4=24). Agora some: 6+4+6+4." }
];

// --- NÍVEL 4 (Unidade 3 - Parte 2: Escalas e Dimensões Avançadas) ---
const level4Challenges = [
  { "id": "N4_D1", "unidade": 3, "tipo": "conversao_area", "pergunta": "Se duplicarmos os lados de um quadrado de 1m², qual será sua nova área?", "targetAnswer": 4, "inputType": "number", "cols": 4, "rows": 4, "prePaintedCoords": [[1,1]], "dica": "Lado era 1 (área 1). Agora o lado é 2. 2x2 = ?" },
  { "id": "N4_D2", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "Um retângulo tem área 20m² e um lado mede 5m. Quanto mede o outro lado?", "targetAnswer": "4m", "inputType": "options", "inputOptions": ["4m", "5m", "15m"] },
  { "id": "N4_D3", "unidade": 3, "tipo": "construcao_livre", "pergunta": "Desenhe um retângulo com área de 12 unidades e perímetro de 14 unidades.", "targetArea": 12, "targetPerimeter": 14, "cols": 6, "rows": 6, "dica": "Tente um retângulo de 3x4 ou 2x6. Verifique o perímetro!" },
  { "id": "N4_D4", "unidade": 3, "tipo": "conversao_area", "pergunta": "Um terreno retangular tem 10m por 5m. Qual sua área total?", "targetAnswer": 50, "inputType": "number", "cols": 10, "rows": 5, "prePaintedCoords": [[0,0]], "dica": "Base vezes altura." },
  { "id": "N4_D5", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "Se um quadrado tem perímetro de 12m, qual é sua área?", "targetAnswer": "9m²", "inputType": "options", "inputOptions": ["12m²", "9m²", "16m²"], "dica": "Se o perímetro é 12, cada lado mede 3 (12/4)." },
  { "id": "N4_D6", "unidade": 3, "tipo": "construcao_livre", "pergunta": "Desenhe duas figuras diferentes que tenham 8 unidades de área cada.", "targetArea": 8, "cols": 8, "rows": 8, "dica": "Podem ser retângulos 2x4 ou formas irregulares!" },
  { "id": "N4_D7", "unidade": 3, "tipo": "conversao_area", "pergunta": "Um tile de cerâmica mede 10cm x 10cm (100cm²). Quantos tiles preciso para cobrir 1000cm²?", "targetAnswer": 10, "inputType": "number", "cols": 5, "rows": 2, "dica": "Divida a área total pela área de um tile." },
  { "id": "N4_D8", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "Qual figura tem maior área: um quadrado de lado 4m ou um retângulo de 5m x 3m?", "targetAnswer": "Quadrado (16m²)", "inputType": "options", "inputOptions": ["Quadrado (16m²)", "Retângulo (15m²)", "São iguais"] },
  { "id": "N4_D9", "unidade": 3, "tipo": "construcao_livre", "pergunta": "Desenhe um quadrado de área 1 e um retângulo de área 4 ao lado.", "targetArea": 5, "cols": 6, "rows": 4, "dica": "Pinte 1 bloco e depois um bloco 4x1 ou 2x2." },
  { "id": "N4_D10", "unidade": 3, "tipo": "boss_challenge", "pergunta": "Boss Challenge: Construa um retângulo de 10m² e calcule seu perímetro.", "targetArea": 10, "targetAnswer": 14, "cols": 10, "rows": 5, "dica": "Use 5x2. Perímetro = 5+5+2+2." }
];

// --- NÍVEL 5 (Unidade 4: Cirurgião de Formas - Decomposição) ---
const level5Challenges = [
  { "id": "N5_D1", "unidade": 4, "tipo": "conversao_area", "pergunta": "Fatie mentalmente esta figura em dois retângulos. Qual a área total?", "targetAnswer": 12, "inputType": "number", "cols": 6, "rows": 6, "prePaintedCoords": [[1,1], [1,2], [1,3], [2,1], [2,2], [2,3], [3,1], [4,1]], "dica": "Divida em um retângulo 3x2 e uma perna de 2x1." },
  { "id": "N5_D2", "unidade": 4, "tipo": "quiz_multiplo", "pergunta": "Podemos calcular a área de um 'L' somando dois retângulos menores?", "targetAnswer": "Sim", "inputType": "options", "inputOptions": ["Sim", "Não", "Apenas se for quadrado"] },
  { "id": "N5_D3", "unidade": 4, "tipo": "conversao_area", "pergunta": "Qual a área desta forma em 'U'?", "targetAnswer": 10, "inputType": "number", "cols": 5, "rows": 5, "prePaintedCoords": [[1,1], [2,1], [3,1], [3,2], [3,3], [3,4], [2,4], [1,4]], "dica": "Decomponha em 3 retângulos ou conte os blocos." },
  { "id": "N5_D4", "unidade": 4, "tipo": "arrastar_e_responder", "pergunta": "Pinte uma forma em 'L' com área de 7 unidades.", "targetArea": 7, "cols": 5, "rows": 5 },
  { "id": "N5_D5", "unidade": 4, "tipo": "quiz_multiplo", "pergunta": "Ao decompor uma figura complexa em retângulos, o que acontece com a área total?", "targetAnswer": "Permanece a mesma", "inputType": "options", "inputOptions": ["Aumenta", "Diminui", "Permanece a mesma"] },
  { "id": "N5_D6", "unidade": 4, "tipo": "conversao_area", "pergunta": "Calcule a área desta 'escada'.", "targetAnswer": 6, "inputType": "number", "cols": 4, "rows": 4, "prePaintedCoords": [[1,1], [2,1], [2,2], [3,1], [3,2], [3,3]], "dica": "1 + 2 + 3 blocos em cada degrau." },
  { "id": "N5_D7", "unidade": 4, "tipo": "construcao_livre", "pergunta": "Desenhe um retângulo de 3x2 e retire 1 bloco do canto. Qual a área restante?", "targetAnswer": 5, "targetArea": 5, "cols": 4, "rows": 4, "dica": "Pinte o 3x2 (6) e apague um clique se a engine permitir, ou apenas pinte 5 em formato de L." },
  { "id": "N5_D8", "unidade": 4, "tipo": "quiz_multiplo", "pergunta": "Decompor figuras é útil para:", "targetAnswer": "Facilitar o cálculo usando fórmulas simples", "inputType": "options", "inputOptions": ["Gastar mais tempo", "Facilitar o cálculo usando fórmulas simples", "Mudar a forma da figura"] },
  { "id": "N5_D9", "unidade": 4, "tipo": "conversao_area", "pergunta": "Uma cruz é formada por 5 quadrados de 2m² cada. Qual a área total?", "targetAnswer": 10, "inputType": "number", "cols": 5, "rows": 5, "prePaintedCoords": [[2,2], [1,2], [3,2], [2,1], [2,3]], "dica": "5 blocos x 2m² cada." },
  { "id": "N5_D10", "unidade": 4, "tipo": "boss_challenge", "pergunta": "Boss Challenge: Construa uma figura composta por dois retângulos unidos (área total 15).", "targetArea": 15, "cols": 8, "rows": 8, "dica": "Ex: um 3x3 (9) encostado em um 2x3 (6)." }
];

const database = {
  1: level1Challenges,
  2: level2Challenges,
  3: level3Challenges,
  4: level4Challenges,
  5: level5Challenges
};
