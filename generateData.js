const fs = require('fs');

const complete_frases = [
  // NÍVEL 1
  { id: "F1", nivel: 1, tipo: "completar_frase", categoria: "conceito_area", pergunta: "A área mede o tamanho da ________ de uma figura.", opcoes: ["superfície", "altura", "linha"], resposta: "superfície" },
  { id: "F2", nivel: 1, tipo: "completar_frase", categoria: "contagem", pergunta: "Ao contar quadradinhos, estamos medindo a ________.", opcoes: ["área", "altura", "largura"], resposta: "área" },
  { id: "F3", nivel: 1, tipo: "completar_frase", categoria: "area_vs_perimetro", pergunta: "A área está relacionada ao espaço ________ da figura.", opcoes: ["interno", "externo", "lado"], resposta: "interno" },

  // NÍVEL 2
  { id: "F4", nivel: 2, tipo: "completar_frase", categoria: "contagem", pergunta: "Se uma figura tem 6 quadradinhos, sua área é ________.", opcoes: ["6", "12", "3"], resposta: "6" },
  { id: "F5", nivel: 2, tipo: "completar_frase", categoria: "figuras", pergunta: "Um quadrado possui lados de mesma ________.", opcoes: ["medida", "área", "cor"], resposta: "medida" },
  { id: "F6", nivel: 2, tipo: "completar_frase", categoria: "area_vs_perimetro", pergunta: "O perímetro mede o ________ da figura.", opcoes: ["contorno", "interior", "centro"], resposta: "contorno" },

  // NÍVEL 3
  { id: "F7", nivel: 3, tipo: "completar_frase", categoria: "proporcionalidade", pergunta: "Se aumentamos a base, mantendo a altura a área tende a ________.", opcoes: ["aumentar", "diminuir", "sumir"], resposta: "aumentar" },
  { id: "F8", nivel: 3, tipo: "completar_frase", categoria: "proporcionalidade", pergunta: "Dobrar o tamanho de uma figura pode ________ sua área.", opcoes: ["aumentar", "diminuir", "manter"], resposta: "aumentar" },
  { id: "F9", nivel: 3, tipo: "completar_frase", categoria: "ladrilhamento", pergunta: "Cobrir uma superfície sem deixar espaços vazios é chamado de ________.", opcoes: ["ladrilhamento", "perímetro", "divisão"], resposta: "ladrilhamento" },
  { id: "F10", nivel: 3, tipo: "completar_frase", categoria: "conceito_area", pergunta: "O número de quadradinhos indica a ________ da figura.", opcoes: ["área", "cor", "posição"], resposta: "área" },

  // NÍVEL 4
  { id: "F11", nivel: 4, tipo: "completar_frase", categoria: "formula", pergunta: "Para calcular a área do retângulo, usamos base vezes ________.", opcoes: ["altura", "lado", "perímetro"], resposta: "altura" },
  { id: "F12", nivel: 4, tipo: "completar_frase", categoria: "formula", pergunta: "A área do quadrado é lado vezes ________.", opcoes: ["lado", "altura", "perímetro"], resposta: "lado" },
  { id: "F13", nivel: 4, tipo: "completar_frase", categoria: "multiplicacao", pergunta: "Multiplicar linhas por colunas é o método de encontrar a ________.", opcoes: ["área", "altura", "largura"], resposta: "área" },
  { id: "F14", nivel: 4, tipo: "completar_frase", categoria: "multiplicacao", pergunta: "Somar todos os lados de um polígono é o procedimento para encontrar o ________.", opcoes: ["lado", "cateto", "perímetro"], resposta: "perímetro" },
  { id: "F15", nivel: 4, tipo: "completar_frase", categoria: "calculo", pergunta: "Um retângulo de 2 por 5 tem área igual a ________.", opcoes: ["10", "7", "3"], resposta: "10" },

  // NÍVEL 5
  { id: "F16", nivel: 5, tipo: "completar_frase", categoria: "calculo", pergunta: "Um retângulo de 4 m por 3 m possui área ________.", opcoes: ["12 m²", "7 m", "1 m²"], resposta: "12 m²" },
  { id: "F17", nivel: 5, tipo: "completar_frase", categoria: "calculo", pergunta: "Um retângulo de 4 cm por 3 cm possui perímetro ________.", opcoes: ["14 cm", "12 cm", "7 cm"], resposta: "14 cm" },
  { id: "F18", nivel: 5, tipo: "completar_frase", categoria: "equivalencia", pergunta: "Figuras diferentes podem ter a mesma ________ (em m²).", opcoes: ["área", "forma", "cor"], resposta: "área" },
  { id: "F19", nivel: 5, tipo: "completar_frase", categoria: "decomposicao", pergunta: "Somar partes de uma figura dá a área ________.", opcoes: ["total", "menor", "externa"], resposta: "total" },

  // NÍVEL 6
  { id: "F20", nivel: 6, tipo: "completar_frase", categoria: "unidades", pergunta: "A área é medida em unidades ________.", opcoes: ["quadradas", "lineares", "simples"], resposta: "quadradas" },
  { id: "F21", nivel: 6, tipo: "completar_frase", categoria: "unidades", pergunta: "Para objetos pequenos usamos ________.", opcoes: ["cm²", "km", "m"], resposta: "cm²" },
  { id: "F22", nivel: 6, tipo: "completar_frase", categoria: "unidades", pergunta: "Para áreas maiores usamos ________.", opcoes: ["m²", "cm", "mm"], resposta: "m²" },
  { id: "F23", nivel: 6, tipo: "completar_frase", categoria: "unidades", pergunta: "O km² mede áreas muito ________.", opcoes: ["grandes", "pequenas", "finas"], resposta: "grandes" },

  // NÍVEL 7
  { id: "F24", nivel: 7, tipo: "completar_frase", categoria: "equivalencia", pergunta: "Um retângulo 1 m x 10 m e 2 m x 5 m têm a mesma área: ________.", opcoes: ["10 m²", "formas iguais", "perímetro igual"], resposta: "10 m²" },
  { id: "F25", nivel: 7, tipo: "completar_frase", categoria: "figuras", pergunta: "Um quadrado é um tipo especial de ________.", opcoes: ["retângulo", "círculo", "triângulo"], resposta: "retângulo" },
  { id: "F26", nivel: 7, tipo: "completar_frase", categoria: "calculo", pergunta: "Um quadrado 4 m x 4 m possui área ________.", opcoes: ["16 m²", "8 m²", "12 m²"], resposta: "16 m²" },

  // NÍVEL 8
  { id: "F27", nivel: 8, tipo: "completar_frase", categoria: "proporcionalidade", pergunta: "Dobrar a altura de um retângulo faz a área ________.", opcoes: ["dobrar", "diminuir", "sumir"], resposta: "dobrar" },
  { id: "F28", nivel: 8, tipo: "completar_frase", categoria: "formula", pergunta: "A área do retângulo depende da base e da ________.", opcoes: ["altura", "cor", "forma"], resposta: "altura" },
  { id: "F29", nivel: 8, tipo: "completar_frase", categoria: "conceito_area", pergunta: "A multiplicação é uma forma rápida de calcular a ________.", opcoes: ["área", "cor", "forma"], resposta: "área" },
  { id: "F30", nivel: 8, tipo: "completar_frase", categoria: "propriedades", pergunta: "A área é sempre um valor ________.", opcoes: ["positivo", "negativo", "infinito"], resposta: "positivo" }
];

let generatedLevels = {1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[]};

// Insert Complete as Frases converting to standard engine options
complete_frases.forEach(f => {
  generatedLevels[f.nivel].push({
    id: f.id,
    unidade: f.nivel,
    nivel: f.nivel,
    tipo: "completar_frase",
    pergunta: f.pergunta,
    inputType: "options",
    inputOptions: f.opcoes,
    targetAnswer: f.resposta
  });
});

let challengeCount = 100;

function addVariations(templateObj, variations) {
  let lvl = templateObj.nivel;
  variations.forEach((v, idx) => {
    challengeCount++;
    generatedLevels[lvl].push({
      ...templateObj,
      ...v,
      id: "G_" + challengeCount,
      unidade: lvl,
      nivel: lvl
    });
  });
}

// Nível 1
addVariations({ tipo: "pintar_area", nivel: 1 }, [
  { pergunta: "Pinte exatos 4 quadrinhos de área.", target: 4, cols: 4, rows: 4 },
  { pergunta: "Pinte exatos 6 quadrinhos de área.", target: 6, cols: 4, rows: 4 },
  { pergunta: "Pinte exatos 9 quadrinhos de área.", target: 9, cols: 5, rows: 5 },
  { pergunta: "Pinte exatos 12 quadrinhos de área.", target: 12, cols: 5, rows: 5 }
]);
addVariations({ tipo: "calcular_area_destacada", nivel: 1 }, [
  { pergunta: "Qual a área da figura abaixo?", target: 6, cols: 4, rows: 4, prePaintedCoords: [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2]] },
  { pergunta: "Conte quantos azulejos a figura possui.", target: 8, cols: 5, rows: 4, prePaintedCoords: [[1,1],[1,2],[2,1],[2,2],[1,3],[2,3],[1,4],[2,4]] },
  { pergunta: "Ache a área destacada na tela.", target: 5, cols: 4, rows: 4, prePaintedCoords: [[1,1],[1,2],[1,3],[2,2],[3,2]] },
  { pergunta: "Qual a área total realçada?", target: 4, cols: 3, rows: 3, prePaintedCoords: [[0,0],[0,1],[1,0],[1,1]] }
]);
addVariations({ tipo: "arrastar_e_responder", nivel: 1, inputType: "number", inputPlaceholder: "Total?", feedbackAghy: "Excelente! Você cobriu todo o espaço.", dica: "Arraste do primeiro ao último quadrado e conte-os um por um." }, [
  { pergunta: "O Tapete Estreito: Arraste para cobrir o grid inteiro. Quantos quadrados você pintou?", targetArea: 5, targetAnswer: 5, cols: 5, rows: 1 },
  { pergunta: "O Corredor: Arraste para cobrir o chão inteiro. Qual a área?", targetArea: 6, targetAnswer: 6, cols: 6, rows: 1 },
  { pergunta: "A Passarela: Preencha a malha e responda as unidades de área.", targetArea: 4, targetAnswer: 4, cols: 4, rows: 1 },
  { pergunta: "A Parede Curta: Cubra arrastando do início ao fim e conte.", targetArea: 7, targetAnswer: 7, cols: 7, rows: 1 }
]);

// Nível 2
addVariations({ tipo: "arrastar_bloco", nivel: 2 }, [
  { pergunta: "O Quadrado Médio: Preencha todo o espaço arrastando do início ao fim da malha.", targetArea: 9, numBlocks: 1, cols: 3, rows: 3 },
  { pergunta: "O Retângulo Largo: Preencha 10 blocos cobrindo a grid inteira.", targetArea: 10, numBlocks: 1, cols: 5, rows: 2 },
  { pergunta: "A Laje: Feche toda a malha arrastando da quina superior.", targetArea: 12, numBlocks: 1, cols: 4, rows: 3 },
  { pergunta: "O Pátio: Arraste pela área 4x4 cobrindo-a completamente.", targetArea: 16, numBlocks: 1, cols: 4, rows: 4 }
]);
addVariations({ tipo: "arrastar_medidas", nivel: 2, dica: "Você pode contar um por um ou perceber que existem fileiras repetidas." }, [
  { pergunta: "A Sala de Estar: Pinte a sala toda e responda quantos quadrados ela possui:", target: 20, cols: 5, rows: 4 },
  { pergunta: "O Quarto: Preencha a grade e diga a área total.", target: 15, cols: 5, rows: 3 },
  { pergunta: "A Cozinha: Arraste por tudo e responda o total:", target: 12, cols: 4, rows: 3 },
  { pergunta: "O Refeitório: Cubra os tiles 6x3 e some tudo.", target: 18, cols: 6, rows: 3 }
]);
addVariations({ tipo: "desenhar_quadrado", nivel: 2 }, [
  { pergunta: "Desenhe um quadrado 3x3.", target: 3, cols: 5, rows: 5 },
  { pergunta: "Crie um quadrado mágico de 2x2.", target: 2, cols: 4, rows: 4 },
  { pergunta: "Faça um quadrado exato de 4x4.", target: 4, cols: 6, rows: 6 },
  { pergunta: "Forme um quadrado 5x5 no centro.", target: 5, cols: 6, rows: 6 }
]);

// Nível 3
addVariations({ tipo: "desenhar_retangulo", nivel: 3 }, [
  { pergunta: "Crie um retângulo de 2 por 4.", targetX: 2, targetY: 4, cols: 6, rows: 5 },
  { pergunta: "Desenhe um retângulo de 3 de base por 2 de altura.", targetX: 3, targetY: 2, cols: 5, rows: 4 },
  { pergunta: "Faça uma piscina retangular de 5 por 3.", targetX: 5, targetY: 3, cols: 7, rows: 5 },
  { pergunta: "Crie um bloco de lado 1 por 6.", targetX: 1, targetY: 6, cols: 7, rows: 7 }
]);
addVariations({ tipo: "desenhar_L", nivel: 3 }, [
  { pergunta: "Desenhe um 'L' de exatos 5 blocos.", target: 5, cols: 5, rows: 5 },
  { pergunta: "Faça um L simples usando 3 quadrados.", target: 3, cols: 4, rows: 4 },
  { pergunta: "Crie uma forma de 'L' maciça com 7 unidades.", target: 7, cols: 6, rows: 6 },
  { pergunta: "Desenhe um tetraminó 'L' de 4 unidades.", target: 4, cols: 4, rows: 4 }
]);
addVariations({ tipo: "clique_rapido", nivel: 3, prePaintedFull: true }, [
  { pergunta: "Desafio Rápido: Qual a área total deste retângulo?", timeLimit: 10, target: 12, cols: 6, rows: 2 },
  { pergunta: "Mais rápido! Qual a área desta grade?", timeLimit: 8, target: 8, cols: 4, rows: 2 },
  { pergunta: "Conte e responda rapidamente!", timeLimit: 12, target: 20, cols: 5, rows: 4 },
  { pergunta: "Pressão total! Qual a área deste telhado?", timeLimit: 10, target: 16, cols: 8, rows: 2 }
]);

// Nível 4
addVariations({ tipo: "malha_fantasma", nivel: 4, dica: "Você pode multiplicar base x altura!" }, [
  { pergunta: "Determine a área de um retângulo de base 7 e altura 3.", target: 21, cols: 7, rows: 3 },
  { pergunta: "Veja a malha piscando. Qual a área se ela tem 5x5?", target: 25, cols: 5, rows: 5 },
  { pergunta: "Qual a área destas fileiras fantasmas 6x4?", target: 24, cols: 6, rows: 4 },
  { pergunta: "Adivinhe contando as réguas: 4 colunas e 4 linhas.", target: 16, cols: 4, rows: 4 }
]);
addVariations({ tipo: "problema_natural", nivel: 4, dica: "Crie um retângulo e conte o total de blocos." }, [
  { pergunta: "O Armazém: Estoque retangular de 5 blocos de base por 4 de altura. Desenhe e responda o total:", target: 20, targetH: 4, targetW: 5, cols: 6, rows: 6 },
  { pergunta: "A Oficina: Um galpão de 3m de base e 6m de profundidade. Desenhe-o.", target: 18, targetH: 6, targetW: 3, cols: 7, rows: 7 },
  { pergunta: "A Horta: Formada por 4 filas ricas de 4 blocos. Construa-a.", target: 16, targetH: 4, targetW: 4, cols: 5, rows: 5 },
  { pergunta: "A Quadra: 2 blocos de altura e 7 cruzando o campo. Qual o total?", target: 14, targetH: 2, targetW: 7, cols: 8, rows: 4 }
]);

// Nível 5
addVariations({ tipo: "ladrilhador_inverso", nivel: 5, targetCount: 1 }, [
  { pergunta: "O Arquiteto: Desenhe qualquer RETÂNGULO que tenha exatamente 12 quadrados de área.", targetArea: 12, cols: 6, rows: 4, dica: "Pense em dois números que multiplicados resultam em 12." },
  { pergunta: "O Criador: Crie uma forma retangular de área 10.", targetArea: 10, cols: 6, rows: 5, dica: "2x5 é uma boa escolha." },
  { pergunta: "O Construtor: Faça um pátio de exatos 16 quadradinhos retangulares.", targetArea: 16, cols: 8, rows: 4, dica: "Pode ser um quadrado grande 4x4 ou esticado 2x8." },
  { pergunta: "O Pedreiro: Preencha 8 blocos na forma geométrica retangular.", targetArea: 8, cols: 5, rows: 5, dica: "2x4?" }
]);
addVariations({ tipo: "area_distributiva", nivel: 5 }, [
  { pergunta: "Caminho das Cores: Qual a área total somando as duas partes coloridas?", target: 25, cols: 5, rows: 5, colorSplit: { cA: 2 }, dica: "A área total é a união dos blocos de cores diferentes." },
  { pergunta: "União Divisória: Some os blocos horizontais.", target: 20, cols: 5, rows: 4, colorSplit: { rA: 2 }, dica: "Calcule a parte de cima e de baixo, depois some!" },
  { pergunta: "Áreas Compostas: Qual a área desta fusão de cores?", target: 18, cols: 6, rows: 3, colorSplit: { cA: 3 }, dica: "São dois blocos 3x3 grudados." },
  { pergunta: "Faixa Superior: Qual a área maciça?", target: 24, cols: 6, rows: 4, colorSplit: { rA: 1 }, dica: "A área é o total de elementos pintados." }
]);
addVariations({ tipo: "quiz_multiplo", nivel: 5, inputType: "options" }, [
  { pergunta: "Qual unidade usar para medir a área total de um Telefone?", targetAnswer: "cm²", inputOptions: ["m²", "km²", "cm²"], dica: "Pense no tamanho do objeto: pequeno, médio ou gigante." },
  { pergunta: "Para medir a área de um Estado ou País escolhemos:", targetAnswer: "km²", inputOptions: ["mm²", "cm²", "km²"], dica: "Cidades e estados usam as maiores unidades de área." },
  { pergunta: "Qual a unidade ideal para uma Cama de 2 metros?", targetAnswer: "m²", inputOptions: ["m²", "cm²", "km²"], dica: "Equipamentos de mobília usam medidas humanas normais." },
  { pergunta: "O chão da cozinha seria bem medido usando:", targetAnswer: "m²", inputOptions: ["m²", "km²", "cm²"], dica: "Casas são loteadas e medidas em metros quadrados." }
]);

// Nível 6
addVariations({ tipo: "conversao_area", nivel: 6, inputType: "number" }, [
  { pergunta: "O Cartão cobre vários quadrados. Qual a área total dele se 1 quadrado equivale a 3cm²?", targetAnswer: 45, cols: 6, rows: 5, prePaintedCoords: [[1,1],[1,2],[1,3],[1,4],[1,5],[2,1],[2,2],[2,3],[2,4],[2,5],[3,1],[3,2],[3,3],[3,4],[3,5]], elementos_visuais: { referencia: { label: "1 quadrado = 3cm²" } } },
  { pergunta: "A Moeda gigante. Se 1 quad = 2cm², responda a área total pintada.", targetAnswer: 8, cols: 5, rows: 4, prePaintedCoords: [[1,1],[1,2],[2,1],[2,2]], elementos_visuais: { referencia: { label: "1 quadradinho = 2cm²" } } },
  { pergunta: "Mini-Jardim. Se 1 quadrado no grid = 5 metros quadrados (5m²). Qual a área verde de um canteiro 2x3?", targetAnswer: 30, cols: 5, rows: 5, prePaintedCoords: [[1,1],[1,2],[1,3],[2,1],[2,2],[2,3]], elementos_visuais: { referencia: { label: "1 unidade = 5m²" } } },
  { pergunta: "Lote Mágico: 1 quadrinho = 10m². Ache a área total preenchida abaixo:", targetAnswer: 50, cols: 5, rows: 4, prePaintedCoords: [[1,1],[1,2],[1,3],[1,4],[1,5]], elementos_visuais: { referencia: { label: "1 quad = 10m²" } } }
]);
addVariations({ tipo: "quiz_duas_figuras", nivel: 6, inputType: "options" }, [
  { pergunta: "Ambas possuem a mesma área. Qual delas possui o MAIOR contorno (Perímetro)?", figA: { w: 2, h: 3, label: "Figura A" }, figB: { w: 1, h: 6, label: "Figura B" }, targetAnswer: "Figura B", inputOptions: ["Figura A", "Figura B", "Iguais"] },
  { pergunta: "Qual figura tem MAIOR área pintada?", figA: { w: 4, h: 4, label: "Retângulo A" }, figB: { w: 2, h: 7, label: "Retângulo B" }, targetAnswer: "Retângulo A", inputOptions: ["Retângulo A", "Retângulo B"] },
  { pergunta: "Observando os terrenos, qual usa MENOS muro (Perímetro) para a mesma área?", figA: { w: 3, h: 4, label: "Terreno 3x4" }, figB: { w: 2, h: 6, label: "Terreno 2x6" }, targetAnswer: "Terreno 3x4", inputOptions: ["Terreno 3x4", "Terreno 2x6"] },
  { pergunta: "Qual polígono parece ter a maior altura linear?", figA: { w: 5, h: 2, label: "Forma Baixa" }, figB: { w: 2, h: 8, label: "Torre" }, targetAnswer: "Torre", inputOptions: ["Forma Baixa", "Torre"] }
]);

// Nível 7
addVariations({ tipo: "quiz_com_figura", nivel: 7, inputType: "number" }, [
  { pergunta: "Uma cerâmica mede 10cm x 10cm (100cm²). Quantas cerâmicas preciso para cobrir 1000cm²?", targetAnswer: 10, inputPlaceholder: "Qtd?", fig: { w: 3, h: 3, label: "Cerâmica (100cm²)", labelBottom: "10cm", labelSide: "10cm" } },
  { pergunta: "Um azulejo médio absorve 25cm². Num corredor de 250cm², quantos uso?", targetAnswer: 10, inputPlaceholder: "Quantos?", fig: { w: 2, h: 2, label: "Azulejo", labelBottom: "5cm", labelSide: "5cm" } },
  { pergunta: "Um piso é 2x2. Para assoalhar 20 quadradinhos de área real, quantos pisos instalo?", targetAnswer: 5, inputPlaceholder: "Total", fig: { w: 4, h: 4, label: "Piso (Área = 4)", labelBottom: "2", labelSide: "2" } },
  { pergunta: "As peças de Dominó (2x1) cobrem a mesa. Quantas peças tapam a área de 16?", targetAnswer: 8, inputPlaceholder: "Nº", fig: { w: 1, h: 2, label: "Dominó 2x1", labelSide: "2", labelBottom: "1" } }
]);
addVariations({ tipo: "tres_salas", nivel: 7, targetCount: 2 }, [
  { pergunta: "Desafio do Mestre: Crie DUAS salas de área 12 em locais diferentes (sem sobrepor e formas únicas).", targetArea: 12, cols: 8, rows: 6 },
  { pergunta: "Construa 2 currais diferentes que retenham 8 blocos de área.", targetArea: 8, cols: 8, rows: 6 },
  { pergunta: "O Rei Mandou: Construa 2 muralhas contendo espaço para 10 de área.", targetArea: 10, cols: 9, rows: 6 },
  { pergunta: "A Fazenda: Monte 2 plantações rigorosamente diferentes medindo área 16.", targetArea: 16, cols: 10, rows: 6 }
]);

// Nível 8
addVariations({ tipo: "construcao_livre", nivel: 8 }, [
  { pergunta: "Construa um retângulo com perímetro de 16 e a maior área possível.", targetArea: 16, targetPerimeter: 16, cols: 6, rows: 6 },
  { pergunta: "Pinte um quadrado de Perímetro 12.", targetArea: 9, targetPerimeter: 12, cols: 5, rows: 5 },
  { pergunta: "Faça uma calçada livre com área 10 e perímetro máximo possível (como uma reta).", targetArea: 10, targetPerimeter: 22, cols: 12, rows: 4 },
  { pergunta: "Construa a forma sólida mais enxuta com área 25.", targetArea: 25, targetPerimeter: 20, cols: 7, rows: 7 }
]);
addVariations({ tipo: "boss_challenge", nivel: 8 }, [
  { pergunta: "🔥 BOSS: Construa um retângulo de exatos 10m² e CALCULE e responda seu Perímetro.", targetArea: 10, targetAnswer: 14, cols: 10, rows: 5 },
  { pergunta: "☠️ BOSS: Modele um tapete 4x3 (12m²). Quantos blocos ficam ao redor (Perímetro)?", targetArea: 12, targetAnswer: 14, cols: 8, rows: 6 },
  { pergunta: "🔥 DESTRUCTOR: Faça um campo achatado de área 8! (Sua base e altura geram que perímetro?)", targetArea: 8, targetAnswer: 18, cols: 10, rows: 3, dica: "Um corredor 1x8 tem alto perímetro (18)!" },
  { pergunta: "👑 MESTRE: Erga o quadrado exato de 16m². Qual a soma das extremidades?", targetArea: 16, targetAnswer: 16, cols: 7, rows: 7 }
]);
addVariations({ tipo: "cirurgia_area", nivel: 8 }, [
  { phase1: { pergunta: "Desenhe um retângulo 3x4. Qual a área?", targetW: 3, targetH: 4, targetAnswer: 12 }, phase2: { pergunta: "A largura dobrou! Qual a nova área?", extraW: 3, targetAnswer: 24 }, cols: 10, rows: 8 },
  { phase1: { pergunta: "Plante 2 filas por 5 colunas. Área?", targetW: 5, targetH: 2, targetAnswer: 10 }, phase2: { pergunta: "A altura triplicou! Expansão concluída. Área total?", extraH: 4, targetAnswer: 30 }, cols: 10, rows: 8 },
  { phase1: { pergunta: "Construa a fundação 4x4. Resposta:", targetW: 4, targetH: 4, targetAnswer: 16 }, phase2: { pergunta: "Evolução do prédio: Subiram 2 painéis vizinhos na lateral, base ampliou! Qual o total?", extraW: 2, targetAnswer: 24 }, cols: 10, rows: 8 },
  { phase1: { pergunta: "Mureta simples: 1 de altura por 7 de comprimento.", targetW: 7, targetH: 1, targetAnswer: 7 }, phase2: { pergunta: "O Muro cresceu 2 andares acima. Some a fortaleza:", extraH: 2, targetAnswer: 21 }, cols: 10, rows: 8 }
]);

let finalStr = "// BANCO DE DESAFIOS GERADO PROCEDURALMENTE (114 DESAFIOS!)\n\n" +
  "const level1Challenges = " + JSON.stringify(generatedLevels[1], null, 2) + ";\n" +
  "const level2Challenges = " + JSON.stringify(generatedLevels[2], null, 2) + ";\n" +
  "const level3Challenges = " + JSON.stringify(generatedLevels[3], null, 2) + ";\n" +
  "const level4Challenges = " + JSON.stringify(generatedLevels[4], null, 2) + ";\n" +
  "const level5Challenges = " + JSON.stringify(generatedLevels[5], null, 2) + ";\n" +
  "const level6Challenges = " + JSON.stringify(generatedLevels[6], null, 2) + ";\n" +
  "const level7Challenges = " + JSON.stringify(generatedLevels[7], null, 2) + ";\n" +
  "const level8Challenges = " + JSON.stringify(generatedLevels[8], null, 2) + ";\n" +
  "\nconst database = {\n  1: level1Challenges,\n  2: level2Challenges,\n  3: level3Challenges,\n  4: level4Challenges,\n  5: level5Challenges,\n  6: level6Challenges,\n  7: level7Challenges,\n  8: level8Challenges\n};\n";

fs.writeFileSync('js/data.js', finalStr, 'utf8');
