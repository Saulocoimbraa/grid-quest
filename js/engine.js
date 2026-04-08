// js/engine.js
class GameEngine {
   constructor(level, db) {
      this.level = parseInt(level);
      this.db = db;
      this.sessionCompleted = JSON.parse(localStorage.getItem(`completed_N${level}`)) || [];
      this.availableChallenges = [];
      this.currentChallenge = null;

      this.consecutiveErrors = 0;
      this.totalToPlay = 3;
      this.playedThisSession = 0;

      // Novos controles Nível 2
      this.isDragging = false;
      this.dragAnchor = null;
      this.tempSelection = [];
      this.blocksDrawn = [];
      this.timerInterval = null;
      this.globalTimerInterval = null;
      this.idleTimeout = null;
      this.hasErrorsThisChallenge = false;
      this.dragEvtsBound = false;
      this.challengeSeconds = 0;
      this.sessionPoints = 0;
      this.sessionTotalTime = 0;
      this.sessionFastest = Infinity;
      this.sessionCorrect = 0;
      this.sessionErrors = 0;

      // Otimização para evitar re-renderizações desnecessárias
      this.lastTarget = null;
      
      this.challengePhase = 1;
      this.boardEl = document.getElementById('grid-board');
   }

   init() {
      this.bindGlobalEvents();
      this.loadChallenges();
      this.loadNextChallenge();
   }

   bindGlobalEvents() {
      const board = document.getElementById('grid-board');
      if (!board) return;

      board.addEventListener('pointerdown', (e) => {
         if (!this.currentChallenge) return;
         let type = this.currentChallenge.tipo;

         let needsDrag = ["arrastar_bloco", "arrastar_e_responder", "arrastar_medidas", "ladrilhador_inverso", "problema_natural", "tres_salas", "estimativa", "cirurgia_area", "construcao_livre", "boss_challenge", "desenhar_quadrado", "desenhar_retangulo"].includes(type);
         let needsClick = ["pintar_area", "desenhar_L", "clique_rapido", "area_distributiva", "conversao_area"].includes(type);

         if (e.target.classList.contains('grid-cell')) {
            // Prioridade 1: Se a célula já estiver pintada de qualquer cor, desmarcar ao clicar (Togle universal)
            if (e.target.classList.contains('painted') || e.target.classList.contains('painted-yellow') || e.target.classList.contains('painted-blue') || e.target.classList.contains('painted-green') || e.target.classList.contains('painted-orange')) {
               const r = parseInt(e.target.dataset.r);
               const c = parseInt(e.target.dataset.c);
               
               // Acha o bloco que contém essa célula
               const blockIndex = this.blocksDrawn.findIndex(b => r >= b.r && r < b.r + b.h && c >= b.c && c < b.c + b.w);
               
               if (blockIndex !== -1) {
                  const b = this.blocksDrawn[blockIndex];
                  // Limpa visualmente TODA a área do bloco
                  for (let _r = b.r; _r < b.r + b.h; _r++) {
                     for (let _c = b.c; _c < b.c + b.w; _c++) {
                        const cell = board.querySelector(`[data-r="${_r}"][data-c="${_c}"]`);
                        if (cell) cell.classList.remove('painted', 'painted-yellow', 'painted-blue', 'painted-green', 'painted-orange', 'area-highlight', 'border-top-p', 'border-right-p', 'border-bottom-p', 'border-left-p');
                     }
                  }
                  // Remove do array
                  this.blocksDrawn.splice(blockIndex, 1);
               } else {
                  // Se não estiver em um bloco (modo pintura simples), remove apenas a célula
                  e.target.classList.remove('painted', 'painted-yellow', 'painted-blue', 'painted-green', 'painted-orange', 'area-highlight', 'border-top-p', 'border-right-p', 'border-bottom-p', 'border-left-p');
               }
               return;
            }

            if (needsDrag) {
               this.isDragging = true;
               this.dragAnchor = { r: parseInt(e.target.dataset.r), c: parseInt(e.target.dataset.c) };
               this.tempSelection = [];
               board.querySelectorAll('.selected-temp').forEach(el => el.classList.remove('selected-temp'));
               this.updateTempSelection(e.target);
            } else if (needsClick) {
               if (this.level === 5) {
                  // Ciclo de cores para "Cirurgião de Formas" (Decomposição)
                  if (!e.target.classList.contains('painted') && !e.target.classList.contains('painted-yellow') && !e.target.classList.contains('painted-blue') && !e.target.classList.contains('painted-green') && !e.target.classList.contains('painted-orange')) {
                     e.target.classList.add('painted');
                  } else if (e.target.classList.contains('painted')) {
                     e.target.classList.remove('painted');
                     e.target.classList.add('painted-yellow');
                  } else if (e.target.classList.contains('painted-yellow')) {
                     e.target.classList.remove('painted-yellow');
                     e.target.classList.add('painted-blue');
                  } else if (e.target.classList.contains('painted-blue')) {
                     e.target.classList.remove('painted-blue');
                     e.target.classList.add('painted-green');
                  } else if (e.target.classList.contains('painted-green')) {
                     e.target.classList.remove('painted-green');
                     e.target.classList.add('painted-orange');
                  } else {
                     e.target.classList.remove('painted-orange');
                  }
               } else {
                  e.target.classList.toggle('painted');
               }
            }
         }
      });

      board.addEventListener('pointermove', (e) => {
         if (!this.isDragging || !this.dragAnchor) return;
         let target = document.elementFromPoint(e.clientX, e.clientY);
         if (target && target.classList.contains('grid-cell')) {
            this.updateTempSelection(target);
         }
      });

      document.body.addEventListener('pointerup', () => {
         if (this.isDragging) {
            this.isDragging = false;
            this.commitTempSelection();
         }
      });
   }

   updateTempSelection(targetCell) {
      if (!this.boardEl) return;

      const current = { r: parseInt(targetCell.dataset.r), c: parseInt(targetCell.dataset.c) };
      const minR = Math.min(this.dragAnchor.r, current.r);
      const maxR = Math.max(this.dragAnchor.r, current.r);
      const minC = Math.min(this.dragAnchor.c, current.c);
      const maxC = Math.max(this.dragAnchor.c, current.c);

      // OPTIMIZATION: Only update if the target changed or selection is new
      if (this.lastTarget === `${minR},${maxR},${minC},${maxC}`) return;
      this.lastTarget = `${minR},${maxR},${minC},${maxC}`;

      this.boardEl.querySelectorAll('.selected-temp').forEach(el => el.classList.remove('selected-temp'));
      this.tempSelection = [];

      // Query only necessary range of cells instead of ALL cells
      for (let r = minR; r <= maxR; r++) {
         for (let c = minC; c <= maxC; c++) {
            const cell = this.boardEl.querySelector(`[data-r="${r}"][data-c="${c}"]`);
            if (cell && !cell.classList.contains('painted')) {
               cell.classList.add('selected-temp');
               this.tempSelection.push({ r, c, el: cell });
            }
         }
      }
   }

   commitTempSelection() {
      if (this.tempSelection.length === 0) return;

      this.tempSelection.forEach(item => {
         item.el.classList.remove('selected-temp');
         item.el.classList.add('painted');
      });

      let minR = Math.min(...this.tempSelection.map(i => i.r));
      let maxR = Math.max(...this.tempSelection.map(i => i.r));
      let minC = Math.min(...this.tempSelection.map(i => i.c));
      let maxC = Math.max(...this.tempSelection.map(i => i.c));

      let block = {
         r: minR, c: minC,
         w: maxC - minC + 1,
         h: maxR - minR + 1,
         area: this.tempSelection.length
      };

      this.blocksDrawn.push(block);
      this.tempSelection = [];

      this.updatePerimeterVisuals();
      this.updateLiveStats();

      // Auto blink animation on drop (Neuroscience micro-reward)
      document.querySelectorAll('.painted, .painted-yellow, .painted-blue, .painted-green, .painted-orange').forEach(el => {
         el.classList.add('blink-fast');
         setTimeout(() => el.classList.remove('blink-fast'), 300);
      });
      if (navigator.vibrate) navigator.vibrate(20);
   }

   updatePerimeterVisuals() {
      const board = document.getElementById('grid-board');
      if (!board) return;

      const challenge = this.currentChallenge;
      if (!challenge) return;

      // Detecta o foco da questão baseado no texto da pergunta
      const qText = challenge.pergunta || (challenge.phase1 && challenge.phase1.pergunta) || "";
      const isPerimeterRequested = qText.toLowerCase().includes('perímetro') || challenge.targetPerimeter !== undefined;
      const isAreaRequested = qText.toLowerCase().includes('área') || challenge.targetArea !== undefined;

      // Limpa os destaques antigos
      board.querySelectorAll('.border-top-p, .border-right-p, .border-bottom-p, .border-left-p, .area-highlight').forEach(el => {
         el.classList.remove('border-top-p', 'border-right-p', 'border-bottom-p', 'border-left-p', 'area-highlight');
      });

      const paintedCells = board.querySelectorAll('.grid-cell.painted, .grid-cell.painted-yellow, .grid-cell.painted-blue, .grid-cell.painted-green, .grid-cell.painted-orange');
      
      // Destaque de Área (Preenchimento Sólido)
      if (isAreaRequested) {
         paintedCells.forEach(cell => cell.classList.add('area-highlight'));
      }

      // Destaque de Perímetro (Borda Amarela Tracejada)
      if (isPerimeterRequested) {
         const coords = new Set(Array.from(paintedCells).map(c => `${c.dataset.r},${c.dataset.c}`));
         paintedCells.forEach(cell => {
            const r = parseInt(cell.dataset.r);
            const c = parseInt(cell.dataset.c);

            if (!coords.has(`${r - 1},${c}`)) cell.classList.add('border-top-p');
            if (!coords.has(`${r + 1},${c}`)) cell.classList.add('border-bottom-p');
            if (!coords.has(`${r},${c - 1}`)) cell.classList.add('border-left-p');
            if (!coords.has(`${r},${c + 1}`)) cell.classList.add('border-right-p');
         });
      }
   }

   updateLiveStats() {
      // Metodo desativado: O estudante deve contar manualmente para evitar distração
      const stats = document.getElementById('live-stats');
      if (stats) stats.remove();
   }

   calculatePerimeter() {
      const painted = Array.from(document.querySelectorAll('.grid-cell.painted, .grid-cell.painted-yellow, .grid-cell.painted-blue, .grid-cell.painted-green, .grid-cell.painted-orange'));
      if (painted.length === 0) return 0;

      const coords = new Set(painted.map(c => `${c.dataset.r},${c.dataset.c}`));
      let p = 0;

      for (const c of painted) {
         const r = parseInt(c.dataset.r);
         const cVal = parseInt(c.dataset.c);
         if (!coords.has(`${r - 1},${cVal}`)) p++;
         if (!coords.has(`${r + 1},${cVal}`)) p++;
         if (!coords.has(`${r},${cVal - 1}`)) p++;
         if (!coords.has(`${r},${cVal + 1}`)) p++;
      }
      return p;
   }

   loadChallenges() {
      let pool = this.db[this.level];
      if (!pool) {
         const b = document.querySelector('.game-container');
         if (b) b.innerHTML = "<h1>Nível ainda não implementado!</h1>";
         return;
      }

      let available = pool.filter(c => !this.sessionCompleted.includes(c.id));

      if (available.length < this.totalToPlay) {
         available = [...pool];
         this.sessionCompleted = [];
         this.saveProgress();
      }

      for (let i = available.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [available[i], available[j]] = [available[j], available[i]];
      }

      this.availableChallenges = available;
   }

   saveProgress() {
      localStorage.setItem(`completed_N${this.level}`, JSON.stringify(this.sessionCompleted));
   }

   loadNextChallenge() {
      if (this.playedThisSession >= this.totalToPlay) {
         this.finishSession();
         return;
      }

      this.currentChallenge = this.availableChallenges.shift();
      this.renderChallenge(this.currentChallenge);
      this.updateProgress();
   }

   updateProgress() {
      const progressFill = document.getElementById('progress-fill');
      if (progressFill) {
         let percent = (this.playedThisSession / this.totalToPlay) * 100;
         progressFill.style.width = `${percent}%`;
      }
   }

   renderChallenge(challenge) {
      const title = document.getElementById('question-title');
      const board = document.getElementById('grid-board');
      if (!board) return;

      // Resets
      this.challengePhase = 1;
      this.blocksDrawn = [];
      this.tempSelection = [];
      this.hasErrorsThisChallenge = false;
      this.timeWasUp = false;
      clearTimeout(this.idleTimeout);
      clearInterval(this.timerInterval);
      clearInterval(this.globalTimerInterval);

      this.challengeSeconds = 0;
      const stopwatchDisplay = document.getElementById('global-stopwatch');
      if (stopwatchDisplay) stopwatchDisplay.innerText = `⏱️ 0s`;

      this.globalTimerInterval = setInterval(() => {
         this.challengeSeconds++;
         if (stopwatchDisplay) stopwatchDisplay.innerText = `⏱️ ${this.challengeSeconds}s`;
      }, 1000);

      const existingTimer = document.getElementById('timer-display');
      if (existingTimer) existingTimer.remove();
      const existingHint = document.getElementById('hint-display');
      if (existingHint) existingHint.remove();

      let isCalcular = ["calcular_area_destacada", "clique_rapido", "area_distributiva", "malha_fantasma", "problema_natural", "arrastar_medidas", "arrastar_e_responder", "quiz_multiplo", "quiz_duas_figuras", "quiz_com_figura", "estimativa", "conversao_area", "cirurgia_area", "completar_frase"].includes(challenge.tipo);

      // Container de Input Numérico
      let inputContainer = document.getElementById('input-container');
      if (!inputContainer) {
         inputContainer = document.createElement('div');
         inputContainer.id = 'input-container';
         inputContainer.style.marginTop = '15px';
         inputContainer.style.textAlign = 'center';
         board.parentNode.insertBefore(inputContainer, board.nextSibling);
      }

      // Recria dinamicamente
      inputContainer.innerHTML = '';
      if (challenge.inputType === 'options') {
         const choiceCont = document.createElement('div');
         choiceCont.className = 'flex flex-col gap-3 w-full max-w-[280px] mt-4';
         choiceCont.id = 'answer-choice-container';

         const hiddenInput = document.createElement('input');
         hiddenInput.type = 'hidden';
         hiddenInput.id = 'answer-input';
         choiceCont.appendChild(hiddenInput);

         challenge.inputOptions.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'w-full bg-white border-2 border-[#383830] p-4 font-bold text-lg rounded-2xl shadow-[4px_4px_0px_#383830] transition-all hover:bg-[#f6f4e5] active:translate-y-[2px] active:shadow-[2px_2px_0px_#383830]';
            btn.innerText = opt;
            btn.onclick = () => {
               choiceCont.querySelectorAll('button').forEach(b => {
                  b.classList.remove('bg-[#84fb42]', 'text-[#245c00]');
                  b.classList.add('bg-white');
               });
               btn.classList.add('bg-[#84fb42]', 'text-[#245c00]');
               btn.classList.remove('bg-white');
               hiddenInput.value = opt;
            };
            choiceCont.appendChild(btn);
         });
         inputContainer.appendChild(choiceCont);
      } else {
         const inputEl = document.createElement('input');
         inputEl.type = challenge.inputType || 'number';
         if (inputEl.type === 'number') inputEl.step = 'any';
         inputEl.id = 'answer-input';
         inputEl.className = 'w-full bg-white border-2 border-[#383830] p-4 font-black text-2xl rounded-2xl shadow-[6px_6px_0px_#383830] text-center mb-4 transition-all focus:shadow-[2px_2px_0px_#383830] focus:translate-x-[2px] focus:translate-y-[2px] outline-none';
         const qText = challenge.pergunta || (challenge.phase1 && challenge.phase1.pergunta) || "";
         const isPerim = qText.toLowerCase().includes('perímetro');
         inputEl.placeholder = challenge.inputPlaceholder || (isPerim ? '📏 Perímetro=?' : '📐 Área=?');
         inputContainer.appendChild(inputEl);
      }

      inputContainer.style.display = isCalcular ? 'flex' : 'none';
      inputContainer.style.flexDirection = 'column';
      inputContainer.style.alignItems = 'center';
      inputContainer.style.gap = '10px';

      if (challenge.tipo === "construcao_livre" || challenge.tipo === "boss_challenge") {
         // Esses tipos mostram input apenas se pede resposta numérica
         inputContainer.style.display = (challenge.targetAnswer !== undefined || challenge.target !== undefined) ? 'flex' : 'none';
      }

      if (title) {
         title.innerText = challenge.pergunta || (challenge.phase1 && challenge.phase1.pergunta) || "";
      }

      // Live Stats (Desativado conforme solicitação: o estudante deve contar manualmente)
      const existingStats = document.getElementById('live-stats');
      if (existingStats) existingStats.remove();

      // Badge de referência para desafios de conversão de área
      const existingBadge = document.getElementById('unit-badge');
      if (existingBadge) existingBadge.remove();
      if (challenge.tipo === 'conversao_area' && challenge.elementos_visuais?.referencia?.label) {
         const badge = document.createElement('div');
         badge.id = 'unit-badge';
         badge.style.cssText = 'display:inline-block; background:#facc15; color:#1e3a8a; font-weight:900; font-size:1rem; border:3px solid #000; border-radius:12px; padding:8px 18px; box-shadow:4px 4px 0 #000; margin:8px auto; text-align:center;';
         badge.innerHTML = `📐 ${challenge.elementos_visuais.referencia.label}`;
         title.parentNode.insertBefore(badge, title.nextSibling);
      }


      if (challenge.tipo === "clique_rapido") {
         let timerDiv = document.createElement('div');
         timerDiv.id = 'timer-display';
         timerDiv.className = 'timer-text';
         let timeLeft = challenge.timeLimit;
         timerDiv.innerText = `⏳ ${timeLeft}s`;
         board.parentNode.insertBefore(timerDiv, board);

         this.timerInterval = setInterval(() => {
            timeLeft--;
            timerDiv.innerText = `⏳ ${timeLeft}s`;
            if (timeLeft <= 0) {
               clearInterval(this.timerInterval);
               timerDiv.innerHTML = `<span style="color:#ef4444; font-weight:900">⏰ Tempo esgotado!</span>`;
               this.timeWasUp = true; // Marca que o bônus foi perdido
               // Não chama checkAnswer(true) mais, deixa o player terminar.
            }
         }, 1000);
      }

      if (board) {
         if (challenge.tipo === "quiz_multiplo" || challenge.tipo === "quiz_duas_figuras" || challenge.tipo === "quiz_com_figura" || challenge.tipo === "completar_frase") {
            board.style.gridTemplateColumns = '1fr';
            board.style.gridTemplateRows = 'auto';
            board.classList.remove('fantasma-board');
            board.style.backgroundColor = 'transparent';
            board.style.border = 'none';

            if (challenge.tipo === "completar_frase") {
               board.innerHTML = `<h2 style="color:#2e7300; padding: 50px 20px; font-size:1.8rem; text-align:center;">🧩 Complete a Frase!</h2>`;
            } else if (challenge.tipo === "quiz_multiplo" || challenge.tipo === "quiz_duas_figuras" || challenge.tipo === "quiz_com_figura") {
               board.innerHTML = `<h2 style="color:#2e7300; padding: 50px 20px; font-size:1.8rem; text-align:center;">🤔 Questão Rápida!</h2>`;
                const renderShape = (fig, color) => {
                  let style = `width:${fig.w * 35}px; height:${fig.h * 35}px; background:${color}; border:3px solid var(--border-color); box-shadow: 4px 4px 0 var(--border-color); position:relative; display:grid; grid-template-columns: repeat(${fig.w}, 1fr); grid-template-rows: repeat(${fig.h}, 1fr);`;
                  let innerGrid = Array.from({ length: fig.w * fig.h }).map(() => '<div style="border: 0.5px solid rgba(255,255,255,0.1); width:100%; height:100%;"></div>').join('');
                  
                  if (fig.shapeType === 'triangulo') style += `clip-path: polygon(0 100%, 50% 0, 100% 100%);`;
                  if (fig.shapeType === 'trapezio') style += `clip-path: polygon(20% 0, 80% 0, 100% 100%, 0 100%);`;
                  if (fig.shapeType === 'circulo') style += `border-radius: 50%; overflow:hidden;`;
                  if (fig.shapeType === 'semicirculo') style += `border-radius: 100% 100% 0 0 / 200% 200% 0 0;`;

                  return `
                     <div style="text-align:center; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap:10px;">
                        <div style="${style}">
                           ${innerGrid}
                           <span style="position:absolute; top:-25px; left:50%; transform:translateX(-50%); font-size:0.7rem; font-weight:900; background:white; padding:2px 5px; border:1px solid #333; z-index:10; color:#000">${fig.labelTop || ''}</span>
                           <span style="position:absolute; bottom:-10px; left:50%; transform:translateX(-50%); font-size:0.7rem; font-weight:900; background:white; padding:2px 5px; border:1px solid #333; z-index:10; color:#000">${fig.labelBottom || ''}</span>
                           <span style="position:absolute; right:-25px; top:50%; transform:translateY(-50%); font-size:0.7rem; font-weight:900; background:white; padding:2px 5px; border:1px solid #333; z-index:10; color:#000">${fig.labelSide || ''}</span>
                        </div>
                        <div>
                           <b style="color:#1e3a8a; font-size:1.1rem">${fig.label || ''}</b>
                        </div>
                     </div>
                  `;
                };

                if (challenge.figA && challenge.figB) {
                   board.innerHTML = `
                     <div style="display:flex; justify-content:space-around; align-items:center; width:100%; min-height:220px; padding: 20px 0;">
                        ${renderShape(challenge.figA, '#60a5fa')}
                        <div style="font-size:1.5rem; font-weight:900; color:#1e3a8a">VS</div>
                        ${renderShape(challenge.figB, '#facc15')}
                     </div>
                  `;
                } else if (challenge.fig) {
                   board.innerHTML = `
                     <div style="display:flex; justify-content:center; align-items:center; width:100%; min-height:220px; padding: 20px 0;">
                        ${renderShape(challenge.fig, '#60a5fa')}
                     </div>
                  `;
                }
             }
         } else {
            board.innerHTML = '';
            // Define colunas dinamicamente baseado em fracionários (1fr) para caber na tela sem barra
            board.style.gridTemplateColumns = `repeat(${challenge.cols}, 1fr)`;
            board.style.gridTemplateRows = `repeat(${challenge.rows}, 1fr)`;
            board.style.width = '100%';
            // Limita a largura máxima da malha baseado na quantidade de colunas (Ex: máx 55px por célula)
            board.style.maxWidth = `min(100%, ${challenge.cols * 55}px)`;
            board.style.backgroundColor = 'var(--border-color)';
            board.style.border = 'var(--border-width) solid var(--border-color)';

             if (challenge.tipo === "malha_fantasma") board.classList.add('fantasma-board');
            else board.classList.remove('fantasma-board');

            // Verifica se há formas geométricas especiais no desafio
            const hasGeometricShapes = challenge.prePaintedCoords && challenge.prePaintedCoords.some(coord => 
               (typeof coord === 'object' && coord.shape)
            );
            if (hasGeometricShapes) {
               board.classList.add('has-shapes');
            }

            for (let r = 0; r < challenge.rows; r++) {
               for (let c = 0; c < challenge.cols; c++) {
                  let cell = document.createElement('div');
                  cell.className = 'grid-cell';
                  cell.dataset.r = r;
                  cell.dataset.c = c;

                  // Função helper para verificar coordenadas
                  const isPaintedCoord = (coord) => {
                     if (Array.isArray(coord)) return coord[0] === r && coord[1] === c;
                     if (typeof coord === 'object' && coord.r !== undefined) return coord.r === r && coord.c === c;
                     return false;
                  };

                  // Verifica se há forma geométrica nesta célula
                  let geometricShape = null;
                  if (challenge.prePaintedCoords) {
                     const target = challenge.prePaintedCoords.find(coord => isPaintedCoord(coord));
                     if (target) {
                        if (typeof target === 'object' && target.shape) {
                           geometricShape = target.shape;
                           cell.classList.add(`cell-${target.shape}`);
                        } else {
                           cell.classList.add('painted');
                        }
                     }
                  }

                  if (challenge.prePaintedFull || challenge.tipo === "malha_fantasma") {
                     if (!geometricShape) cell.classList.add('painted');
                  } else if (challenge.prePaintedCoords && !geometricShape && challenge.prePaintedCoords.some(coord => isPaintedCoord(coord))) {
                     // Já processado acima
                  } else if (challenge.tipo === "area_distributiva") {
                     if (!geometricShape) {
                        if (challenge.colorSplit.cA !== undefined) {
                           if (c < challenge.colorSplit.cA) cell.classList.add('painted-blue');
                           else cell.classList.add('painted-yellow');
                        } else if (challenge.colorSplit.rA !== undefined) {
                           if (r < challenge.colorSplit.rA) cell.classList.add('painted-blue');
                           else cell.classList.add('painted-yellow');
                        }
                     }
                  }

                  if (challenge.tipo === "malha_fantasma" && !geometricShape) {
                     cell.classList.add('malha-fantasma');
                  }
                  if (challenge.tipo === "estimativa") {
                     if (challenge.elementos_visuais && challenge.elementos_visuais.alvo.shape === 'credit-card') {
                        // Render Card
                        if (r === 1 && c === 1) {
                           cell.classList.add('credit-card-target');
                           cell.classList.remove('grid-cell');
                        } else if (r >= 1 && r <= 3 && c >= 1 && c <= 5) {
                           cell.style.display = 'none'; // hide cells covered by card
                        }
                     } else {
                        if (r >= 1 && r <= 3 && c >= 1 && c <= 4) cell.classList.add('room-gray');
                     }

                     if (r === 1 && c === 0) cell.classList.add('ref-square-blue');
                  }

                  if (challenge.tipo === "conversao_area" && !geometricShape) {
                     if (challenge.elementos_visuais) {
                        if (challenge.elementos_visuais.alvo?.shape === 'credit-card') {
                           if (r === 1 && c === 1) {
                              cell.classList.add('credit-card-target');
                              cell.classList.remove('grid-cell');
                           } else if (r >= 1 && r <= 3 && c >= 1 && c <= 5) {
                              cell.style.display = 'none';
                           }
                        }
                     }
                  }

                  // Renderização de figuras para quiz_duas_figuras (Nível 8)
                  if (challenge.tipo === "quiz_duas_figuras" || challenge.tipo === "quiz_multiplo" || challenge.tipo === "quiz_com_figura") {
                     const renderShapeFigure = (fig) => {
                        if (!fig) return '';
                        const shape = fig.shapeType;
                        let cellClass = 'grid-cell';
                        
                        if (shape === 'triangulo') cellClass += ' cell-triangulo';
                        else if (shape === 'circulo') cellClass += ' cell-circle';
                        else if (shape === 'semicirculo') cellClass += ' cell-semic-t';
                        else if (shape === 'trapezio') cellClass += ' cell-trapezio';
                        
                        return cellClass;
                     };
                  }

                  board.appendChild(cell);
               }
            }
         }
      }

      // Dynamic Hint System (After 15s standard, or 1s for Level 5 Decomposition)
      const hintDelay = (challenge.decompositionGroups) ? 1000 : 15000;

      this.idleTimeout = setTimeout(() => {
         if (!this.hasErrorsThisChallenge) {
            let hint = document.getElementById('hint-display');
            if (!hint) {
               hint = document.createElement('div');
               hint.id = 'hint-display';
               hint.className = 'hint-text';
               board.parentNode.insertBefore(hint, inputContainer.nextSibling);
            }

            // Priority: Specific hint from DB
            if (challenge.dica) {
               hint.innerHTML = `💡 Dica: ${challenge.dica}`;
            } else if (challenge.unidade === 2) {
               hint.innerHTML = `💡 Dica: 1 linha horizontal tem ${challenge.cols || ''} quadrados... pense nisso!`;
            } else if (challenge.unidade === 3) {
               hint.innerHTML = `💡 Dica: O Perímetro é apenas o contorno por FORA. A Área é a pintura por DENTRO!`;
            }

            // Decomposição Visual (Level 5)
            if (challenge.decompositionGroups) {
               const colors = ['painted-blue', 'painted-orange', 'painted-green', 'painted-yellow'];
               challenge.decompositionGroups.forEach((group, index) => {
                  const colorClass = colors[index % colors.length];
                  group.forEach(coord => {
                     const cell = board.querySelector(`[data-r="${coord[0]}"][data-c="${coord[1]}"]`);
                     if (cell) {
                        cell.classList.remove('painted', 'painted-blue', 'painted-yellow', 'painted-green', 'painted-orange');
                        cell.classList.add(colorClass);
                        cell.classList.add('blink-fast');
                        setTimeout(() => cell.classList.remove('blink-fast'), 500);
                     }
                  });
               });
            }
         }
      }, hintDelay);
   }

   normalizeText(str) {
      if (typeof str !== 'string' && typeof str !== 'number') return "";
      // Usamos NFKD para converter ² em 2, etc, facilitando a comparação de unidades
      let s = str.toString().trim().toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
      return s.replace(',', '.');
   }

   checkAnswer(isTimeUp = false) {
      if (this.isDragging) {
          this.isDragging = false;
          this.commitTempSelection();
      }

      // Impede múltiplos cliques enquanto o feedback está na tela
      if (this.isProcessing) return;
      this.isProcessing = true;
      this.customFeedback = null;

      clearInterval(this.timerInterval);
      clearTimeout(this.idleTimeout);

      let isCorrect = false;
      let ch = this.currentChallenge;
      const type = (ch.tipo || "").trim();
      const input = document.getElementById('answer-input');

      const rawVal = input ? input.value : "";
      
      // Safety contra NaN, undefined e floats com vírgula padrão BR
      let robustVal = rawVal.replace(',', '.');
      let parsedInput = parseFloat(robustVal);
      const inputVal = isNaN(parsedInput) ? null : parsedInput;

      // Aliasing robusto: separa o ALVO DA IMAGEM do ALVO DO INPUT
      // target_val_image: quantos quadradinhos devem estar pintados
      const tgtImage = ch.targetArea !== undefined ? ch.targetArea : (ch.target !== undefined ? ch.target : ch.targetAnswer);
      // target_val_input: qual valor deve estar na caixa de texto
      const tgtInput = ch.targetAnswer !== undefined ? ch.targetAnswer : (ch.target !== undefined ? ch.target : ch.targetArea);

      const noBonus = isTimeUp || this.timeWasUp;

      if (type === "quiz_multiplo" || type === "quiz_duas_figuras" || type === "quiz_com_figura" || type === "completar_frase") {
         if (tgtInput !== undefined && rawVal !== "") {
            let val = this.normalizeText(rawVal);
            let tgt = this.normalizeText(tgtInput);
            isCorrect = (val === tgt);
            
            // Fallback para comparação direta caso a normalização falhe em algum char especial
            if (!isCorrect) {
               isCorrect = (rawVal.toString().trim() === tgtInput.toString().trim());
            }
         }
      }
      else if (type === "arrastar_bloco") {
         let painted = document.querySelectorAll('.grid-cell.painted, .grid-cell.painted-yellow, .grid-cell.painted-blue, .grid-cell.painted-green, .grid-cell.painted-orange').length;
         isCorrect = (painted === tgtImage);
      }

      else if (type === "arrastar_e_responder") {
         let paintedCells = document.querySelectorAll('.grid-cell.painted, .grid-cell.painted-yellow, .grid-cell.painted-blue, .grid-cell.painted-green, .grid-cell.painted-orange');
         let painted = paintedCells.length;
         let areaCorrect = (painted === tgtImage);
         
         if (ch.targetW && ch.targetH) {
             let coords = Array.from(paintedCells).map(c => ({ r: parseInt(c.dataset.r), c: parseInt(c.dataset.c) }));
             let isRectValid = this.validateRectangle(coords, ch.targetW, ch.targetH, ch.targetArea);
             areaCorrect = areaCorrect && isRectValid;
         }

         if (tgtInput !== undefined) {
             if (rawVal !== "") {
                let val = this.normalizeText(rawVal);
                let answerCorrect = false;
                if (typeof tgtInput === 'number') {
                   answerCorrect = (parseFloat(val) === tgtInput);
                } else {
                   let tgt = this.normalizeText(tgtInput);
                   answerCorrect = (val === tgt);
                }
                isCorrect = areaCorrect && answerCorrect;
                
                if (answerCorrect && !areaCorrect) {
                     this.customFeedback = `Você acertou o valor digitado 👍, mas o desenho na malha está incorreto!`;
                } else if (!answerCorrect && areaCorrect) {
                     this.customFeedback = `O desenho está correto 👍, mas o valor digitado está incorreto!`;
                }
             } else {
                isCorrect = false;
                this.customFeedback = `Não esqueça de digitar a resposta na caixa de texto!`;
             }
         } else {
            isCorrect = areaCorrect;
         }
      }
      else if (type === "arrastar_medidas") {
         let painted = document.querySelectorAll('.grid-cell.painted, .grid-cell.painted-yellow, .grid-cell.painted-blue, .grid-cell.painted-green, .grid-cell.painted-orange').length;
         isCorrect = (painted === (ch.target || (ch.cols * ch.rows)) && inputVal === tgtInput);
      }

      else if (type === "clique_rapido" || type === "area_distributiva" || type === "malha_fantasma" || type === "calcular_area_destacada") {
         isCorrect = (inputVal === tgtInput);
      }
      else if (type === "ladrilhador_inverso") {
         let paintedCells = document.querySelectorAll('.grid-cell.painted, .grid-cell.painted-yellow, .grid-cell.painted-blue, .grid-cell.painted-green, .grid-cell.painted-orange');
         let coords = Array.from(paintedCells).map(c => ({ r: parseInt(c.dataset.r), c: parseInt(c.dataset.c) }));
         isCorrect = this.validateRectangle(coords, null, null, tgtImage);
      }
      else if (type === "problema_natural") {
         let blockValid = this.blocksDrawn.some(b =>
            (b.w === ch.targetW && b.h === ch.targetH) ||
            (b.h === ch.targetW && b.w === ch.targetH)
         );
         isCorrect = (blockValid && inputVal === tgtInput);
      }
      else if (type === "estimativa") {
         isCorrect = (inputVal >= ch.targetRange[0] && inputVal <= ch.targetRange[1]);
      }
      else if (type === "conversao_area") {
         let painted = document.querySelectorAll('.grid-cell.painted, .grid-cell.painted-yellow, .grid-cell.painted-blue, .grid-cell.painted-green, .grid-cell.painted-orange').length;
         let needsDrawing = (ch.targetArea !== undefined);

         let areaCorrect = needsDrawing ? (painted === tgtImage) : true;
         isCorrect = areaCorrect && (inputVal === tgtInput);
      }
      else if (type === "construcao_livre") {
         let area = document.querySelectorAll('.grid-cell.painted, .grid-cell.painted-yellow, .grid-cell.painted-blue, .grid-cell.painted-green, .grid-cell.painted-orange').length;
         let peri = this.calculatePerimeter();

         // Validação de Área (Sempre obrigatória)
         let areaCorrect = (area === ch.targetArea);

         // Validação de Perímetro (Opcional)
         let periCorrect = true;
         const targetP = ch.targetPerimeter;
         if (targetP !== undefined) {
            periCorrect = (peri === targetP);
         }

         // Validação de Resposta numérica (Opcional - ex: "Qual o perímetro?")
         let answerCorrect = true;
         if (ch.targetAnswer !== undefined && typeof ch.targetAnswer === 'number') {
            answerCorrect = (inputVal === ch.targetAnswer);
         }

         isCorrect = areaCorrect && periCorrect && answerCorrect;
      }
      else if (type === "tres_salas") {
         if (this.blocksDrawn.length === ch.targetCount) {
            let allMatchArea = this.blocksDrawn.every(b => b.area === ch.targetArea);
            let uniqueFormats = new Set(this.blocksDrawn.map(b => `${Math.min(b.w, b.h)}x${Math.max(b.w, b.h)}`));
            isCorrect = allMatchArea && (uniqueFormats.size === ch.targetCount);
         }
      }
      else if (type === "cirurgia_area") {
         if (this.challengePhase === 1) {
            let block = this.blocksDrawn.find(b => 
               (b.w === ch.phase1.targetW && b.h === ch.phase1.targetH) || 
               (b.h === ch.phase1.targetW && b.w === ch.phase1.targetH)
            );
            
            if (block && (inputVal === ch.phase1.targetAnswer)) {
               // Determine layout orientation for expansion
               let isRotated = (block.w === ch.phase1.targetH); // User drew targetH as width
               
               this.challengePhase = 2;
               
               // Piscar o desenho atual
               document.querySelectorAll('.grid-cell.painted-orange, .grid-cell.painted').forEach(el => {
                   el.classList.add('blink-fast');
                   setTimeout(() => el.classList.remove('blink-fast'), 1000);
               });

               // Efeito de Ampliação
               setTimeout(() => {
                  let extraW = ch.phase2.extraW || 0;
                  let extraH = ch.phase2.extraH || 0;
                  
                  // Se rodado, troca as ampliações para bater com a geometria do usuário
                  if (isRotated) {
                     let temp = extraW;
                     extraW = extraH;
                     extraH = temp;
                  }
                  
                  for (let r = block.r; r < block.r + block.h + extraH; r++) {
                     for (let c = block.c; c < block.c + block.w + extraW; c++) {
                        const cell = this.boardEl.querySelector(`[data-r="${r}"][data-c="${c}"]`);
                        if (cell && !cell.classList.contains('painted-orange')) {
                           cell.classList.add('painted-orange');
                           cell.classList.add('blink-fast');
                           setTimeout(() => cell.classList.remove('blink-fast'), 500);
                        }
                     }
                  }
                  
                  const title = document.getElementById('question-title');
                  if (title) title.innerText = ch.phase2.pergunta;
                  const input = document.getElementById('answer-input');
                  if (input) {
                     input.value = '';
                     input.focus();
                  }
                  this.updateLiveStats();
                  if (navigator.vibrate) navigator.vibrate(50);
               }, 1200);
               
               this.isProcessing = false; // Permite o próximo clique no botão Confirmar
               return; 
            } else {
               isCorrect = false;
            }
         } else {
            // Fase 2: Apenas valida a área final
            isCorrect = (inputVal === ch.phase2.targetAnswer);
         }
      }
      else if (type === "boss_challenge") {
         let paintedCells = document.querySelectorAll('.grid-cell.painted, .grid-cell.painted-yellow, .grid-cell.painted-blue, .grid-cell.painted-green, .grid-cell.painted-orange');
         let area = paintedCells.length;
         let areaCorrect = (area === (ch.targetArea || ch.target));
         
         // Se a pergunta menciona "retângulo" ou "quadrado", valida a forma
         let needsShape = ch.pergunta.toLowerCase().includes("retangulo") || ch.pergunta.toLowerCase().includes("quadrado");
         let shapeValid = true;
         if (needsShape) {
            let coords = Array.from(paintedCells).map(c => ({ r: parseInt(c.dataset.r), c: parseInt(c.dataset.c) }));
            shapeValid = this.validateRectangle(coords, null, null, area);
         }

         let currentPeri = this.calculatePerimeter();
         // Aceita tanto o valor fixo no JSON quanto o perímetro calculado do desenho do usuário
         let inputCorrect = (inputVal !== null) ? (inputVal === tgtInput || inputVal === currentPeri) : true;
         
         isCorrect = areaCorrect && shapeValid && inputCorrect;
         
         if (!isCorrect && areaCorrect && !shapeValid) {
            this.customFeedback = `A área está correta (${area}), mas você deve construir um RETÂNGULO perfeito!`;
         } else if (!isCorrect && areaCorrect && shapeValid && !inputCorrect) {
            this.customFeedback = `O desenho está perfeito! Mas o valor digitado (${inputVal}) não é o perímetro desta figura (${currentPeri}).`;
         }
      }
      else {
         let paintedCells = document.querySelectorAll('.grid-cell.painted, .grid-cell.painted-yellow');
         let cellsCount = paintedCells.length;

         let coords = Array.from(paintedCells).map(c => ({ r: parseInt(c.dataset.r), c: parseInt(c.dataset.c) }));
         if (type === "pintar_area") isCorrect = (cellsCount === tgtImage);
         if (type === "calcular_area_destacada") isCorrect = (inputVal === tgtInput);
         if (type === "desenhar_quadrado") isCorrect = this.validateRectangle(coords, tgtImage, tgtImage);
         if (type === "desenhar_retangulo") isCorrect = this.validateRectangle(coords, ch.targetX, ch.targetY) || this.validateRectangle(coords, ch.targetY, ch.targetX);
         if (type === "desenhar_L") isCorrect = this.validateLShape(coords, tgtImage);
      }

      this.showFeedback(isCorrect, noBonus, inputVal);
   }

   // Fallback validadores
   validateRectangle(coords, w, h, targetArea) {
      if (!coords || coords.length === 0) return false;
      const totalBlocks = coords.length;

      // Se passou targetArea, a contagem de blocos deve bater
      if (targetArea !== undefined && targetArea !== null && totalBlocks !== targetArea) return false;
      // Se não passou targetArea, deve bater com w * h
      if ((targetArea === undefined || targetArea === null) && totalBlocks !== w * h) return false;

      let minR = Math.min(...coords.map(c => c.r)), maxR = Math.max(...coords.map(c => c.r));
      let maxR_val = Math.max(...coords.map(c => c.r));
      let minC = Math.min(...coords.map(c => c.c)), maxC = Math.max(...coords.map(c => c.c));

      let rectH = maxR - minR + 1;
      let rectW = maxC - minC + 1;

      // Verifica se é um retângulo sólido (sem buracos)
      if (rectH * rectW !== totalBlocks) return false;

      // Se só validamos a área, já está correto
      if (targetArea !== undefined && targetArea !== null) return true;

      // Valida dimensões específicas (aceita rotação)
      return (rectW === w && rectH === h) || (rectW === h && rectH === w);
   }

   validateLShape(coords, targetBlocks) {
      if (coords.length !== targetBlocks) return false;
      let minR = Math.min(...coords.map(c => c.r)), maxR = Math.max(...coords.map(c => c.r));
      let minC = Math.min(...coords.map(c => c.c)), maxC = Math.max(...coords.map(c => c.c));
      let h = maxR - minR + 1, w = maxC - minC + 1;
      if (h <= 1 || w <= 1 || (h + w - 1 !== targetBlocks)) return false;
      const isL = (aR, aC) => coords.every(p => p.r === aR || p.c === aC);
      return isL(minR, minC) || isL(minR, maxC) || isL(maxR, minC) || isL(maxR, maxC);
   }

   showFeedback(isCorrect, isBonusLost, inputVal) {
      const overlay = document.getElementById('feedback-overlay');
      const msg = document.getElementById('feedback-msg');
      overlay.className = 'feedback-overlay ' + (isCorrect ? 'success' : 'error');
      overlay.style.display = 'flex'; // FORCE DISPLAY FLEX

      if (isCorrect) {
         clearInterval(this.globalTimerInterval);

         let p = 4;
         
         if (this.currentChallenge.tipo === "cirurgia_area") {
            if (this.challengeSeconds <= 15) p = 15; 
            else if (this.challengeSeconds <= 30) p = 10;
            else p = 5;
         } else {
            if (this.challengeSeconds <= 10) p = 10;
            else if (this.challengeSeconds <= 20) p = 8;
            else if (this.challengeSeconds <= 30) p = 6;
         }

         // Reduz bônus se o tempo acabou
         if (isBonusLost) p = Math.max(1, Math.round(p / 2));

         if (this.currentChallenge.tipo === "clique_rapido" && !isBonusLost) {
            p += 5; // Bônus Rápido Extra
         }

         this.sessionPoints += p;
         this.sessionTotalTime += this.challengeSeconds;
         if (this.challengeSeconds < this.sessionFastest) this.sessionFastest = this.challengeSeconds;
         this.sessionCorrect++;

         let totalScore = parseInt(localStorage.getItem('geomaster_score')) || 0;
         localStorage.setItem('geomaster_score', totalScore + p);

         let bonusText = isBonusLost ? " (Bônus esgotado)" : "";
         msg.innerHTML = `<b>Excelente!</b> ${this.currentChallenge.feedbackAghy || ""}<br><span style="color:#059669; font-size:1.1rem">💎 +${p} pontos${bonusText}</span>`;
         if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
         this.playSound(600, 'sine');

         this.sessionCompleted.push(this.currentChallenge.id);
         this.saveProgress();
         this.consecutiveErrors = 0;
         this.playedThisSession++;

         setTimeout(() => {
            overlay.style.display = 'none';
            this.isProcessing = false; // Libera para a próxima
            this.loadNextChallenge();
         }, 2000);
      } else {
         clearInterval(this.globalTimerInterval);
         this.consecutiveErrors++;
         this.sessionErrors++;
         this.hasErrorsThisChallenge = true;

         // Penalização na pontuação
         const penalti = 2;
         this.sessionPoints = Math.max(0, this.sessionPoints - penalti);
         let totalScore = parseInt(localStorage.getItem('geomaster_score')) || 0;
         localStorage.setItem('geomaster_score', Math.max(0, totalScore - penalti));

         let ch = this.currentChallenge;
         let currentPeri = this.calculatePerimeter();
         
         let asksPerimeter = (ch.pergunta + " " + (ch.dica || "")).toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").includes("perimetro");
         let isPerimeterConfusion = (!asksPerimeter && ch.targetAnswer && inputVal === currentPeri && inputVal !== ch.targetAnswer);

         let feedbackText = "";
         if (isPerimeterConfusion) {
            feedbackText = `Você digitou o Perímetro, mas eu pedi a ÁREA!`;
            this.triggerRopeAnimation();
         } else if (isBonusLost) {
            feedbackText = `O tempo acabou para o bônus!`;
         } else {
            feedbackText = this.customFeedback || `Sua resposta não está correta.`;
         }

         if (ch.dica) {
            feedbackText += `<br><span style="font-size: 0.9em; display:block; margin-top: 5px; color: #1e3a8a;"><b>Dica:</b> ${ch.dica}</span>`;
         }

         if (ch.targetAnswer !== undefined) {
            feedbackText += `<br><span style="font-size: 0.95em; display:block; margin-top: 5px; color:#991b1b;">A resposta correta era: <b>${ch.targetAnswer}</b></span>`;
         } else if (ch.target !== undefined) {
            feedbackText += `<br><span style="font-size: 0.95em; display:block; margin-top: 5px; color:#991b1b;">A resposta correta era: <b>${ch.target}</b></span>`;
         } else if (ch.targetArea !== undefined) {
            feedbackText += `<br><span style="font-size: 0.95em; display:block; margin-top: 5px; color:#991b1b;">A área correta era: <b>${ch.targetArea}</b></span>`;
         } else {
            feedbackText += `<br><span style="font-size: 0.95em; display:block; margin-top: 5px; color:#991b1b;">Verifique o desenho e a área novamente.</span>`;
         }

         msg.innerHTML = `<b>Ops!</b> ${feedbackText}<br><span style="color:#be2d06; font-size:1.1rem; font-weight:bold; margin-top: 10px; display:block;">💔 -${penalti} pontos</span>`;

         document.body.classList.add('shake');
         if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
         this.playSound(150, 'sawtooth');
         setTimeout(() => document.body.classList.remove('shake'), 400);

         this.sessionCompleted.push(this.currentChallenge.id);
         this.saveProgress();
         this.playedThisSession++;

         setTimeout(() => {
            overlay.style.display = 'none';
            this.isProcessing = false;
            this.loadNextChallenge();
         }, 3000); // 3 segundos para leitura
      }
   }

   finishSession() {
       const overlayOrig = document.getElementById('feedback-overlay');
       if (overlayOrig) overlayOrig.style.display = 'none';

       let summaryScreen = document.getElementById('summary-screen');
       if (!summaryScreen) {
          summaryScreen = document.createElement('div');
          summaryScreen.id = 'summary-screen';
          summaryScreen.className = 'summary-screen';
          document.body.appendChild(summaryScreen);
       }

       const accuracy = Math.round((this.sessionCorrect / this.totalToPlay) * 100);
       let starsCount = 1;
       if (this.sessionErrors === 0) starsCount = 3;
       else if (this.sessionErrors === 1) starsCount = 2;

       localStorage.setItem(`geomaster_stars_N${this.level}`, Math.max(starsCount, parseInt(localStorage.getItem(`geomaster_stars_N${this.level}`)) || 0));

       if (starsCount >= 2) {
          const currentUnlocked = parseInt(localStorage.getItem('geomaster_unlocked_level')) || 1;
          if (this.level >= currentUnlocked) {
             localStorage.setItem('geomaster_unlocked_level', this.level + 1);
          }
       }

       // --- SURPRISE: Celebrate! ---
       if (starsCount === 3 && typeof confetti === 'function') {
          confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
       }

       let starsHtml = `<div class="flex justify-center gap-3 mb-6 scale-110">`;
       for (let i = 1; i <= 3; i++) {
          let filled = i <= starsCount;
          starsHtml += `<span class="material-symbols-outlined text-5xl transition-all duration-700" style="color:${filled ? '#fbbf24' : '#e2e8f0'}; font-variation-settings:'FILL' ${filled ? 1 : 0}">${filled ? 'star' : 'star'}</span>`;
       }
       starsHtml += `</div>`;

       summaryScreen.style.display = 'flex';
       summaryScreen.className = 'fixed inset-0 z-[10000] bg-white/95 backdrop-blur-3xl flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-500';
       
       const nextLevelUnlocked = starsCount >= 2;

       summaryScreen.innerHTML = `
       <div class="bg-white rounded-[3.5rem] p-12 border border-white shadow-[0_40px_80px_rgba(0,0,0,0.1)] w-full max-w-lg transform scale-100 transition-all relative overflow-hidden">
         <!-- Top Action Bar -->
         <div class="flex justify-between items-center mb-8">
            <a href="index.html" class="p-3 rounded-full hover:bg-surface-variant text-on-surface/40 transition-colors">
               <span class="material-symbols-outlined">arrow_back</span>
            </a>
            <div class="px-4 py-1 rounded-full bg-secondary-container text-on-surface text-xs font-black uppercase tracking-widest">
               Nível ${this.level} Concluído
            </div>
            <div class="w-10"></div>
         </div>

         <h1 class="text-4xl font-headline font-black text-on-surface mb-6 uppercase tracking-tight">
            ${starsCount === 3 ? '🎉 PERFEITO!' : (starsCount === 2 ? '👏 MUITO BEM!' : '💪 QUASE LÁ!')}
         </h1>

         ${starsHtml}
         
         <div class="grid grid-cols-2 gap-4 mb-10">
           <div class="bg-primary/5 p-5 rounded-[2.5rem] transition-all hover:bg-primary/10">
              <span class="block text-4xl font-black text-primary">💎 ${this.sessionPoints}</span>
              <span class="text-[10px] font-black uppercase tracking-widest opacity-50">Pontos Ganhos</span>
           </div>
           <div class="bg-secondary/5 p-5 rounded-[2.5rem] transition-all hover:bg-secondary/10">
              <span class="block text-4xl font-black text-[#d97706]">${accuracy}%</span>
              <span class="text-[10px] font-black uppercase tracking-widest opacity-50">Precisão Final</span>
           </div>
         </div>

         <div class="flex flex-col gap-5 mt-4">
            ${nextLevelUnlocked ? `
            <button class="w-full bg-secondary text-white font-black py-7 rounded-[2.5rem] text-2xl shadow-[0_10px_0px_#d97706] active:translate-y-[8px] active:shadow-[0_2px_0px] flex items-center justify-center gap-2 mb-2" 
                    onclick="window.location.href='game.html?level=${this.level + 1}'">
               <span class="material-symbols-outlined font-black">fast_forward</span>
               PRÓXIMA MISSÃO
            </button>
            ` : ''}
            
            <div class="flex gap-4">
               <button class="flex-1 bg-white border-2 border-primary/20 text-primary font-black p-[10px] rounded-[30px] text-lg hover:bg-primary/5 transition-all flex items-center justify-center gap-2" onclick="window.location.reload()">
                  <span class="material-symbols-outlined">refresh</span> REFAZER
               </button>
               <button class="flex-1 bg-white border-2 border-on-surface/10 text-on-surface/60 font-black p-[10px] rounded-[30px] text-lg hover:bg-on-surface/5 transition-all flex items-center justify-center gap-2" onclick="window.location.href='index.html'">
                  <span class="material-symbols-outlined">home</span> INÍCIO
               </button>
            </div>
         </div>
       </div>
       `;

       if (navigator.vibrate) navigator.vibrate([100, 100]);
       this.playSound(800, 'sine');
    }

    showGameCompleteScreen() {
       clearInterval(this.globalTimerInterval);
       const overlayOrig = document.getElementById('feedback-overlay');
       if (overlayOrig) overlayOrig.style.display = 'none';

       let summaryScreen = document.getElementById('summary-screen');
       if (!summaryScreen) {
          summaryScreen = document.createElement('div');
          summaryScreen.id = 'summary-screen';
          summaryScreen.className = 'summary-screen';
          document.body.appendChild(summaryScreen);
       }

       const accuracy = Math.round((this.sessionCorrect / this.totalToPlay) * 100);
       localStorage.setItem(`geomaster_stars_N8`, 3);

       // --- SURPRISE EXTREME celebration ---
       if (typeof confetti === 'function') {
          var duration = 5 * 1000;
          var animationEnd = Date.now() + duration;
          var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 20000 };
          function randomInRange(min, max) { return Math.random() * (max - min) + min; }
          var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            var particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
          }, 250);
       }

       summaryScreen.style.display = 'flex';
       summaryScreen.className = 'fixed inset-0 z-[10000] bg-white/95 backdrop-blur-3xl flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-500';
       
       summaryScreen.innerHTML = `
       <div class="bg-white rounded-[4.5rem] p-14 border border-white shadow-[0_50px_100px_rgba(0,0,0,0.15)] w-full max-w-xl transform scale-100 relative overflow-hidden">
         <div class="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-secondary via-primary to-tertiary opacity-40"></div>
         
         <div class="text-8xl mb-10 animate-bounce">🥇</div>
         <h1 class="text-6xl font-headline font-black text-on-surface mb-4 uppercase tracking-tighter">MESTRE SUPREMO!</h1>
         <p class="text-2xl font-bold text-primary mb-12 opacity-80">Você completou toda a trilha das áreas!</p>
         
         <div class="grid grid-cols-2 gap-8 mb-14">
           <div class="bg-primary/5 p-8 rounded-[3rem] border border-primary/10">
              <span class="block text-5xl font-black text-primary">💎 ${this.sessionPoints}</span>
              <span class="text-xs font-black uppercase tracking-widest opacity-40">Score da Sessão</span>
           </div>
           <div class="bg-tertiary/5 p-8 rounded-[3rem] border border-tertiary/10">
              <span class="block text-5xl font-black text-tertiary">🏆 100%</span>
              <span class="text-xs font-black uppercase tracking-widest opacity-40">Trilha Concluída</span>
           </div>
         </div>

          <div class="flex flex-col gap-6 mt-6">
            <div class="flex gap-4">
               <button class="flex-1 bg-white border-2 border-primary/20 text-primary font-black p-[10px] rounded-[30px] text-xl hover:bg-primary/5 transition-all flex items-center justify-center gap-2" onclick="window.location.reload()">
                  <span class="material-symbols-outlined">refresh</span> REFAZER
               </button>
               <button class="flex-1 bg-primary text-white font-black p-[10px] rounded-[30px] text-xl shadow-[0_8px_0px_#1e3a8a] active:translate-y-[6px] active:shadow-[0_2px_0px] flex items-center justify-center gap-3 transition-all" onclick="window.location.href='index.html'">
                  <span class="material-symbols-outlined">home</span> INÍCIO
               </button>
            </div>
            <p class="text-on-surface/40 font-bold mb-4">Você é incrível! Em breve novas unidades.</p>
          </div>
       </div>
       `;
       this.playSound(800, 'sine');
    }

    playSound(freq, type) {
      try {
         const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
         const oscillator = audioCtx.createOscillator();
         const gainNode = audioCtx.createGain();
         oscillator.type = type;
         oscillator.frequency.value = freq;
         oscillator.connect(gainNode);
         gainNode.connect(audioCtx.destination);
         oscillator.start();
         gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.3);
         oscillator.stop(audioCtx.currentTime + 0.3);
      } catch (e) { }
   }

   triggerRopeAnimation() {
      const board = document.getElementById('grid-board');
      if (!board) return;
      const rope = document.createElement('div');
      rope.className = 'perimeter-rope';
      rope.style.top = '50%';
      rope.style.left = '50%';
      board.appendChild(rope);
      setTimeout(() => rope.remove(), 2000);
   }
}
