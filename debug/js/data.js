/* DEBUG DATABASE EXCLUSIVO */

const debugChallenges = [
  { "id": "N1_D1", "unidade": 1, "tipo": "pintar_area", "pergunta": "Pinte exatos 4 quadrinhos de área.", "target": 4, "cols": 4, "rows": 4 },
  { "id": "N1_D3", "unidade": 1, "tipo": "calcular_area_destacada", "pergunta": "Qual a área da figura abaixo?", "target": 6, "cols": 4, "rows": 4, "prePaintedCoords": [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]] },
  { "id": "N1_D5", "unidade": 1, "tipo": "desenhar_quadrado", "pergunta": "Desenhe um quadrado 3x3.", "target": 3, "cols": 5, "rows": 5 },
  { "id": "N1_D7", "unidade": 1, "tipo": "desenhar_retangulo", "pergunta": "Crie um retângulo de 2 por 4.", "targetX": 2, "targetY": 4, "cols": 6, "rows": 5 },
  { "id": "N1_D9", "unidade": 1, "tipo": "desenhar_L", "pergunta": "Desenhe um 'L' de 5 blocos.", "target": 5, "cols": 5, "rows": 5 },
  { "id": "N2_D1", "unidade": 2, "tipo": "arrastar_e_responder", "pergunta": "O Tapete Estreito: Arraste para cobrir o grid inteiro. Quantos quadrados você pintou?", "targetArea": 5, "targetAnswer": 5, "inputType": "number", "inputPlaceholder": "Total?", "cols": 5, "rows": 1, "feedbackAghy": "Excelente! Você cobriu todo o espaço.", "dica": "Arraste do primeiro ao último quadrado e conte-os um por um." },
  { "id": "N2_D3", "unidade": 2, "tipo": "arrastar_bloco", "pergunta": "O Quadrado Médio: Preencha todo o espaço arrastando do início ao fim da malha.", "targetArea": 9, "numBlocks": 1, "cols": 3, "rows": 3 },
  { "id": "N2_D4", "unidade": 2, "tipo": "arrastar_medidas", "pergunta": "A Sala de Estar: Pinte a sala toda e responda quantos quadrados ela possui:", "target": 20, "cols": 5, "rows": 4, "dica": "Você pode contar um por um ou perceber que existem fileiras repetidas." },
  { "id": "N2_D5", "unidade": 2, "tipo": "clique_rapido", "pergunta": "Desafio Rápido: Qual a área total deste retângulo?", "timeLimit": 10, "target": 12, "cols": 6, "rows": 2, "prePaintedFull": true },
  { "id": "N2_D6", "unidade": 2, "tipo": "ladrilhador_inverso", "pergunta": "O Arquiteto: Desenhe qualquer RETÂNGULO que tenha exatamente 12 quadrados de área.", "targetArea": 12, "targetCount": 1, "cols": 6, "rows": 4, "dica": "Pense em dois números que multiplicados resultam em 12." },
  { "id": "N2_D7", "unidade": 2, "tipo": "area_distributiva", "pergunta": "Caminho das Cores: Qual a área total somando as duas partes coloridas?", "target": 25, "cols": 5, "rows": 5, "colorSplit": { "cA": 2 }, "dica": "A área total é a união dos blocos de cores diferentes." },
  { "id": "N2_D8", "unidade": 2, "tipo": "malha_fantasma", "pergunta": "Determine a área de um retângulo de base 7 e altura 3.", "target": 21, "cols": 7, "rows": 3, "dica": "Você pode multiplicar ou somar." },
  { "id": "N2_D9", "unidade": 2, "tipo": "problema_natural", "pergunta": "O Armazém: Várias fileiras e colunas formam um estoque retangular de 5 blocos de base por 4 de altura. Desenhe o formato e responda o total:", "target": 20, "targetH": 4, "targetW": 5, "cols": 6, "rows": 6, "dica": "Crie um retângulo e conte o total de blocos." },
  { "id": "N2_D10", "unidade": 2, "tipo": "tres_salas", "pergunta": "Desafio do Mestre: Crie duas salas de área 12 em locais diferentes (sem sobrepor).", "targetArea": 12, "targetCount": 2, "cols": 8, "rows": 6, "dica": "Lembre-se: formatos diferentes (como 2x6 e 3x4) podem ter a mesma área!" },
  { "id": "N3_D1", "unidade": 3, "tipo": "quiz_duas_figuras", "pergunta": "Ambas possuem a mesma área. Qual delas possui o MAIOR contorno (Perímetro)?", "figA": { "w": 2, "h": 3, "label": "Figura A" }, "figB": { "w": 1, "h": 6, "label": "Figura B" }, "targetAnswer": "Figura B", "inputType": "options", "inputOptions": ["Figura A", "Figura B"], "dica": "O contorno é o perímetro. Conte os lados de cada quadradinho que fica na borda externa." },
  { "id": "N3_D5", "unidade": 3, "tipo": "quiz_multiplo", "pergunta": "Qual unidade usar para medir a área total de um Telefone?", "targetAnswer": "cm²", "inputType": "options", "inputOptions": ["m²", "km²", "cm²"], "dica": "Pense no tamanho do objeto: pequeno (cm²), médio (m²) ou gigante (km²)." },
  { "id": "N3_D8", "unidade": 3, "tipo": "conversao_area", "pergunta": "Este cartão cobre vários quadrados mágicos. Use a legenda para calcular a área total do cartão:", "targetAnswer": 45, "inputType": "number", "cols": 6, "rows": 5, "prePaintedCoords": [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5]], "elementos_visuais": { "referencia": { "label": "1 quadrado = 3cm²" } }, "dica": "Conte os quadrados ocupados e use o valor unitário da legenda para descobrir o total." },
  { "id": "N3_D9", "unidade": 3, "tipo": "construcao_livre", "pergunta": "Construa um retângulo com perímetro igual a 16(borda amarela) com a maior área possível.", "targetArea": 16, "targetPerimeter": 16, "cols": 6, "rows": 6, "dica": "Tente formar um quadrado 4x4." },
  { "id": "N4_D7", "unidade": 3, "tipo": "quiz_com_figura", "pergunta": "Uma cerâmica mede 10cm x 10cm (100cm²). Quantas cerâmicas preciso para cobrir 1000cm²?", "targetAnswer": 10, "inputType": "number", "inputPlaceholder": "Qtd?", "fig": { "w": 3, "h": 3, "label": "Cerâmica (100cm²)", "labelBottom": "10cm", "labelSide": "10cm" }, "dica": "Divida a área total pela área de uma cerâmica." },
  { "id": "N4_D10", "unidade": 3, "tipo": "boss_challenge", "pergunta": "🔥 BOSS CHALLENGE: Construa um retângulo de 10m² e calcule seu perímetro total.", "targetArea": 10, "targetAnswer": 14, "cols": 10, "rows": 5, "dica": "Após desenhar a figura, conte cada segmento de reta que forma o contorno externo." },
  { "id": "N5_D7", "unidade": 4, "tipo": "cirurgia_area", "phase1": { "pergunta": "Desenhe um retângulo 3x4. Qual a área?", "targetW": 3, "targetH": 4, "targetAnswer": 12 }, "phase2": { "pergunta": "A largura dobrou! Qual a nova área?", "extraW": 3, "targetAnswer": 24 }, "cols": 10, "rows": 8, "dica": "O dobro da largura aumenta a área em 2 vezes." }
];

const database = {
  1: debugChallenges,
  2: debugChallenges,
  3: debugChallenges,
  4: debugChallenges,
  5: debugChallenges,
  6: debugChallenges,
  7: debugChallenges,
  8: debugChallenges
};