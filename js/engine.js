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

         let needsDrag = ["arrastar_bloco", "arrastar_e_responder", "arrastar_medidas", "ladrilhador_inverso", "problema_natural", "tres_salas", "estimativa", "construcao_livre"].includes(type);
         let needsClick = ["pintar_area", "desenhar_quadrado", "desenhar_retangulo", "desenhar_L", "calcular_area_destacada", "clique_rapido", "area_distributiva", "conversao_area"].includes(type);

         if (e.target.classList.contains('grid-cell')) {
            if (needsDrag) {
               // Check limits (If reached target elements drawn, clear logic begins if they click again)
               let limit = this.currentChallenge.targetCount || this.currentChallenge.numBlocks || (["pintar_area", "desenhar_L", "construcao_livre", "conversao_area"].includes(type) ? 10 : 1);
               if (this.blocksDrawn.length >= limit) {
                  board.querySelectorAll('.painted').forEach(el => el.classList.remove('painted'));
                  this.blocksDrawn = [];
               }

               this.isDragging = true;
               this.dragAnchor = { r: parseInt(e.target.dataset.r), c: parseInt(e.target.dataset.c) };
               this.tempSelection = [];
               board.querySelectorAll('.selected-temp').forEach(el => el.classList.remove('selected-temp'));
               this.updateTempSelection(e.target);
            } else if (needsClick) {
               if (this.level === 5) {
                  // Ciclo de cores para "Cirurgião de Formas" (Decomposição)
                  if (!e.target.classList.contains('painted') && !e.target.classList.contains('painted-yellow')) {
                     e.target.classList.add('painted');
                  } else if (e.target.classList.contains('painted')) {
                     e.target.classList.remove('painted');
                     e.target.classList.add('painted-yellow');
                  } else {
                     e.target.classList.remove('painted-yellow');
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
      document.querySelectorAll('.painted').forEach(el => {
         el.classList.add('blink-fast');
         setTimeout(() => el.classList.remove('blink-fast'), 300);
      });
      if (navigator.vibrate) navigator.vibrate(20);
   }

   updatePerimeterVisuals() {
      const board = document.getElementById('grid-board');
      if (!board) return;

      // Clear old highlights
      board.querySelectorAll('.border-top-p, .border-right-p, .border-bottom-p, .border-left-p, .area-highlight').forEach(el => {
         el.classList.remove('border-top-p', 'border-right-p', 'border-bottom-p', 'border-left-p', 'area-highlight');
      });

      const paintedCells = board.querySelectorAll('.painted');
      paintedCells.forEach(cell => cell.classList.add('area-highlight'));

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

   updateLiveStats() {
      const stats = document.getElementById('live-stats');
      if (!stats) return;

      const painted = document.querySelectorAll('.grid-cell.painted').length;
      const peri = this.calculatePerimeter();

      stats.innerHTML = `<span class="area">Área: ${painted}m²</span> | <span class="peri">Perímetro: ${peri}m</span>`;
   }

   calculatePerimeter() {
      const painted = Array.from(document.querySelectorAll('.grid-cell.painted'));
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

      let isCalcular = ["calcular_area_destacada", "clique_rapido", "area_distributiva", "malha_fantasma", "problema_natural", "arrastar_medidas", "arrastar_e_responder", "quiz_multiplo", "quiz_duas_figuras", "estimativa", "conversao_area"].includes(challenge.tipo);

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
         inputEl.id = 'answer-input';
         inputEl.className = 'w-full bg-white border-2 border-[#383830] p-4 font-black text-2xl rounded-2xl shadow-[6px_6px_0px_#383830] text-center mb-4 transition-all focus:shadow-[2px_2px_0px_#383830] focus:translate-x-[2px] focus:translate-y-[2px] outline-none';
         inputEl.placeholder = challenge.inputPlaceholder || 'Área=?';
         inputContainer.appendChild(inputEl);
      }

      inputContainer.style.display = isCalcular ? 'flex' : 'none';
      inputContainer.style.flexDirection = 'column';
      inputContainer.style.alignItems = 'center';
      inputContainer.style.gap = '10px';

      if (challenge.tipo === "construcao_livre") {
         // Construcao_livre mostra input apenas se pede resposta numerica
         inputContainer.style.display = (challenge.targetAnswer !== undefined) ? 'flex' : 'none';
      }

      if (title) title.innerText = challenge.pergunta;

      // Live Stats
      const existingStats = document.getElementById('live-stats');
      if (existingStats) existingStats.remove();
      if (challenge.tipo === "construcao_livre") {
         const statsRow = document.createElement('div');
         statsRow.id = 'live-stats';
         statsRow.className = 'live-stats';
         title.parentNode.insertBefore(statsRow, title.nextSibling);
         this.updateLiveStats();
      }

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
         if (challenge.tipo === "quiz_multiplo" || challenge.tipo === "quiz_duas_figuras") {
            board.style.gridTemplateColumns = '1fr';
            board.style.gridTemplateRows = 'auto';
            board.classList.remove('fantasma-board');
            board.style.backgroundColor = 'transparent';
            board.style.border = 'none';

            if (challenge.tipo === "quiz_multiplo") {
               board.innerHTML = `<h2 style="color:#2e7300; padding: 50px 20px; font-size:1.8rem; text-align:center;">🤔 Questão Rápida!</h2>`;
            } else {
               let gridA = Array.from({ length: challenge.figA.w * challenge.figA.h }).map(() => '<div style="border: 1px dashed rgba(0,0,0,0.3); width: 100%; height: 100%; box-sizing: border-box;"></div>').join('');
               let gridB = Array.from({ length: challenge.figB.w * challenge.figB.h }).map(() => '<div style="border: 1px dashed rgba(0,0,0,0.3); width: 100%; height: 100%; box-sizing: border-box;"></div>').join('');

               board.innerHTML = `
                 <div style="display:flex; justify-content:space-around; align-items:center; width:100%; min-height:220px; padding: 20px 0;">
                    <div style="text-align:center; display: flex; flex-direction: column; align-items: center; justify-content: flex-end;">
                       <div style="width:${challenge.figA.w * 35}px; height:${challenge.figA.h * 35}px; background:#60a5fa; border:3px solid var(--border-color); box-shadow: 4px 4px 0 var(--border-color); margin:0 auto 15px; display: grid; grid-template-columns: repeat(${challenge.figA.w}, 1fr); grid-template-rows: repeat(${challenge.figA.h}, 1fr);">
                          ${gridA}
                       </div>
                       <div>
                          <b style="color:#383830">Figura A</b><br><span style="color:#383830; font-size:0.9rem; font-weight:bold">${challenge.figA.label || ''}</span>
                       </div>
                    </div>
                    <div style="text-align:center; display: flex; flex-direction: column; align-items: center; justify-content: flex-end;">
                       <div style="width:${challenge.figB.w * 35}px; height:${challenge.figB.h * 35}px; background:#facc15; border:3px solid var(--border-color); box-shadow: 4px 4px 0 var(--border-color); margin:0 auto 15px; display: grid; grid-template-columns: repeat(${challenge.figB.w}, 1fr); grid-template-rows: repeat(${challenge.figB.h}, 1fr);">
                          ${gridB}
                       </div>
                       <div>
                          <b style="color:#383830">Figura B</b><br><span style="color:#383830; font-size:0.9rem; font-weight:bold">${challenge.figB.label || ''}</span>
                       </div>
                    </div>
                 </div>
              `;
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

            for (let r = 0; r < challenge.rows; r++) {
               for (let c = 0; c < challenge.cols; c++) {
                  let cell = document.createElement('div');
                  cell.className = 'grid-cell';
                  cell.dataset.r = r;
                  cell.dataset.c = c;

                  if (challenge.prePaintedFull || challenge.tipo === "malha_fantasma") {
                     cell.classList.add('painted');
                  } else if (challenge.prePaintedCoords && challenge.prePaintedCoords.some(coord => coord[0] === r && coord[1] === c)) {
                     cell.classList.add('painted');
                  } else if (challenge.tipo === "area_distributiva") {
                     if (challenge.colorSplit.cA !== undefined) {
                        if (c < challenge.colorSplit.cA) cell.classList.add('painted-blue');
                        else cell.classList.add('painted-yellow');
                     } else if (challenge.colorSplit.rA !== undefined) {
                        if (r < challenge.colorSplit.rA) cell.classList.add('painted-blue');
                        else cell.classList.add('painted-yellow');
                     }
                  }

                  if (challenge.tipo === "malha_fantasma") {
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

                     if (r === 1 && c === 0) cell.classList.add('ref-square-blue'); // blue piece to compare
                  }

                  if (challenge.tipo === "conversao_area") {
                     if (challenge.elementos_visuais) {
                        // Guarda contra alvo ausente (ex: tapete, mosaico)
                        if (challenge.elementos_visuais.alvo?.shape === 'credit-card') {
                           if (r === 1 && c === 1) {
                              cell.classList.add('credit-card-target');
                              cell.classList.remove('grid-cell');
                           } else if (r >= 1 && r <= 3 && c >= 1 && c <= 5) {
                              cell.style.display = 'none';
                           }
                        }
                        // Pinta os prePaintedCoords mesmo quando há elementos_visuais
                        if (challenge.prePaintedCoords && challenge.prePaintedCoords.some(coord => coord[0] === r && coord[1] === c)) {
                           cell.classList.add('painted');
                        }
                        // Exibe badge de referência sobre a malha (não dentro de célula)
                     } else {
                        // Sem elementos_visuais: pinturas normais
                        if (challenge.prePaintedCoords && challenge.prePaintedCoords.some(coord => coord[0] === r && coord[1] === c)) {
                           cell.classList.add('painted');
                        }
                     }
                  }

                  board.appendChild(cell);
               }
            }
         }
      }

      // Dynamic Hint System (After 15s)
      this.idleTimeout = setTimeout(() => {
         if (!this.hasErrorsThisChallenge) {
            let hint = document.createElement('div');
            hint.id = 'hint-display';
            hint.className = 'hint-text';
            let hasHint = false;

            // Priority: Specific hint from DB
            if (challenge.dica) {
               hint.innerHTML = `💡 Dica: ${challenge.dica}`;
               hasHint = true;
            } else if (challenge.unidade === 2) {
               hint.innerHTML = `💡 Dica: 1 linha horizontal tem ${challenge.cols || ''} quadrados... pense nisso!`;
               hasHint = true;
            } else if (challenge.unidade === 3) {
               hint.innerHTML = `💡 Dica: O Perímetro é apenas o contorno por FORA. A Área é a pintura por DENTRO!`;
               hasHint = true;
            }
            if (hasHint) board.parentNode.insertBefore(hint, inputContainer.nextSibling);
         }
      }, 15000);
   }

   normalizeText(str) {
      if (typeof str !== 'string' && typeof str !== 'number') return "";
      return str.toString().trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
   }

   checkAnswer(isTimeUp = false) {
      // Impede múltiplos cliques enquanto o feedback está na tela
      if (this.isProcessing) return;
      this.isProcessing = true;

      clearInterval(this.timerInterval);
      clearTimeout(this.idleTimeout);

      let isCorrect = false;
      let ch = this.currentChallenge;
      const type = (ch.tipo || "").trim();
      const input = document.getElementById('answer-input');

      // Safety contra NaN e undefined
      let parsedInput = parseFloat(input?.value);
      const inputVal = isNaN(parsedInput) ? null : parsedInput;
      const rawVal = input ? input.value : "";

      // Aliasing robusto: separa o ALVO DA IMAGEM do ALVO DO INPUT
      // target_val_image: quantos quadradinhos devem estar pintados
      const tgtImage = ch.targetArea !== undefined ? ch.targetArea : (ch.target !== undefined ? ch.target : ch.targetAnswer);
      // target_val_input: qual valor deve estar na caixa de texto
      const tgtInput = ch.targetAnswer !== undefined ? ch.targetAnswer : (ch.target !== undefined ? ch.target : ch.targetArea);

      const noBonus = isTimeUp || this.timeWasUp;

      if (type === "quiz_multiplo" || type === "quiz_duas_figuras") {
         if (tgtInput !== undefined && rawVal !== "") {
            let val = this.normalizeText(rawVal);
            let tgt = this.normalizeText(tgtInput);
            isCorrect = (val === tgt);
         }
      }
      else if (type === "arrastar_bloco") {
         let painted = document.querySelectorAll('.grid-cell.painted, .grid-cell.painted-yellow').length;
         isCorrect = (painted === tgtImage);
      }

      else if (type === "arrastar_e_responder") {
         let painted = document.querySelectorAll('.grid-cell.painted, .grid-cell.painted-yellow').length;
         let areaCorrect = (painted === tgtImage);


         if (tgtInput !== undefined && rawVal !== "") {
            let val = this.normalizeText(rawVal);
            let answerCorrect = false;
            if (typeof tgtInput === 'number') {
               answerCorrect = (parseFloat(val) === tgtInput);
            } else {
               let tgt = this.normalizeText(tgtInput);
               answerCorrect = (val === tgt);
            }
            isCorrect = areaCorrect && answerCorrect;
         } else {
            isCorrect = areaCorrect;
         }
      }
      else if (type === "arrastar_medidas") {
         let painted = document.querySelectorAll('.grid-cell.painted, .grid-cell.painted-yellow').length;
         isCorrect = (painted === (ch.target || (ch.cols * ch.rows)) && inputVal === tgtInput);
      }

      else if (type === "clique_rapido" || type === "area_distributiva" || type === "malha_fantasma" || type === "calcular_area_destacada") {
         isCorrect = (inputVal === tgtInput);
      }
      else if (type === "ladrilhador_inverso") {
         isCorrect = this.blocksDrawn.some(b => b.area === tgtImage);
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
         let painted = document.querySelectorAll('.grid-cell.painted, .grid-cell.painted-yellow').length;
         let needsDrawing = (ch.targetArea !== undefined);

         let areaCorrect = needsDrawing ? (painted === tgtImage) : true;
         isCorrect = areaCorrect && (inputVal === tgtInput);
      }
      else if (type === "construcao_livre") {
         let area = document.querySelectorAll('.grid-cell.painted, .grid-cell.painted-yellow').length;
         let peri = this.calculatePerimeter();

         let targetP = ch.targetPerimeter !== undefined ? ch.targetPerimeter : ch.targetAnswer;
         isCorrect = (area === ch.targetArea && peri === targetP);
         if (ch.targetAnswer !== undefined && inputVal !== null) {
            isCorrect = isCorrect && (inputVal === ch.targetAnswer);
         }
      }
      else if (type === "tres_salas") {
         if (this.blocksDrawn.length === ch.targetCount) {
            let allMatchArea = this.blocksDrawn.every(b => b.area === ch.targetArea);
            let uniqueFormats = new Set(this.blocksDrawn.map(b => `${Math.min(b.w, b.h)}x${Math.max(b.w, b.h)}`));
            isCorrect = allMatchArea && (uniqueFormats.size === ch.targetCount);
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
   validateRectangle(coords, w, h) {
      if (!coords || coords.length === 0 || coords.length !== w * h) return false;
      let minR = Math.min(...coords.map(c => c.r)), maxR = Math.max(...coords.map(c => c.r));
      let minC = Math.min(...coords.map(c => c.c)), maxC = Math.max(...coords.map(c => c.c));
      return ((maxR - minR + 1) === h && (maxC - minC + 1) === w) || ((maxR - minR + 1) === w && (maxC - minC + 1) === h);
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
         if (this.challengeSeconds <= 10) p = 10;
         else if (this.challengeSeconds <= 20) p = 8;
         else if (this.challengeSeconds <= 30) p = 6;

         // Reduz bônus se o tempo acabou
         if (isBonusLost) p = Math.max(1, Math.round(p / 2));

         if (this.currentChallenge.tipo === "clique_rapido" && !isBonusLost) {
            p += 5; // Bônus Rápido Extra apenas se dentro do tempo!
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
         let isPerimeterConfusion = (ch.targetAnswer && inputVal === currentPeri && inputVal !== ch.targetAnswer);

         let feedbackText = "";
         if (isPerimeterConfusion) {
            feedbackText = `Você digitou o Perímetro, mas eu pedi a ÁREA!`;
            this.triggerRopeAnimation();
         } else if (isBonusLost) {
            feedbackText = `O tempo acabou para o bônus!`;
         } else {
            feedbackText = `Sua resposta não está correta.`;
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

         // Avança para o próximo desafio mesmo com erro
         this.sessionCompleted.push(this.currentChallenge.id);
         this.saveProgress();
         this.playedThisSession++;

         setTimeout(() => {
            overlay.style.display = 'none';
            this.isProcessing = false;
            this.loadNextChallenge();
         }, 5000); // 5 segundos para leitura
      }
   }

   finishSession() {
      // Hidden standard overlay
      const overlayOrig = document.getElementById('feedback-overlay');
      if (overlayOrig) overlayOrig.style.display = 'none';

      // Create or show Summary Screen
      let summaryScreen = document.getElementById('summary-screen');
      if (!summaryScreen) {
         summaryScreen = document.createElement('div');
         summaryScreen.id = 'summary-screen';
         summaryScreen.className = 'summary-screen';
         document.body.appendChild(summaryScreen);
      }

      const avgTime = (this.sessionTotalTime / this.totalToPlay).toFixed(1);
      const accuracy = Math.round((this.sessionCorrect / this.totalToPlay) * 100);

      let starsCount = 1;
      if (this.sessionErrors === 0) starsCount = 3;
      else if (this.sessionErrors === 1) starsCount = 2; // Para total de 3 desafios

      // Persiste as estrelas e desbloqueia a próxima fase
      const prevStars = parseInt(localStorage.getItem(`geomaster_stars_N${this.level}`)) || 0;
      const newStars = Math.max(prevStars, starsCount); // Guarda o melhor resultado
      localStorage.setItem(`geomaster_stars_N${this.level}`, newStars);

      const currentUnlocked = parseInt(localStorage.getItem('geomaster_unlocked_level')) || 1;
      if (this.level >= currentUnlocked) {
         localStorage.setItem('geomaster_unlocked_level', this.level + 1);
      }

      let starsHtml = `<div style="display:flex; justify-content:center; gap:8px; margin-bottom:15px;">`;
      for (let i = 1; i <= 3; i++) {
         let c = i <= starsCount ? "#facc15" : "#e5e7eb";
         let p = i <= starsCount ? "drop-shadow(2px 2px 0px #000)" : "";
         let fill = i <= starsCount ? 1 : 0;
         starsHtml += `<span class="material-symbols-outlined" style="color:${c}; font-size:4rem; filter:${p}; font-variation-settings: 'FILL' ${fill};">star</span>`;
      }
      starsHtml += `</div>`;

      summaryScreen.style.display = 'flex';
      summaryScreen.className = 'fixed inset-0 z-[10000] bg-[#fffdf0] flex flex-col items-center justify-center p-6 text-center animate-in scale-in duration-300';
      summaryScreen.innerHTML = `
      <div class="bg-white rounded-3xl p-8 border-b-8 border-r-8 border-[#383830] shadow-[0_24px_48px_rgba(0,0,0,0.1)] w-full max-w-md">
        <h1 class="text-4xl font-headline font-black text-[#2e7300] mb-2">Missão Cumprida!</h1>
        ${starsHtml}
        
        <div class="grid grid-cols-2 gap-4 mb-8">
          <div class="bg-[#84fb42] border-2 border-[#383830] p-4 rounded-3xl shadow-[4px_4px_0px_#383830]">
             <span class="block text-3xl font-black">💎 ${this.sessionPoints}</span>
             <span class="text-[10px] font-bold uppercase tracking-widest opacity-70">Diamantes</span>
          </div>
          <div class="bg-[#a3d8ff] border-2 border-[#383830] p-4 rounded-3xl shadow-[4px_4px_0px_#383830]">
             <span class="block text-3xl font-black">${accuracy}%</span>
             <span class="text-[10px] font-bold uppercase tracking-widest opacity-70">Precisão</span>
          </div>
          <div class="bg-surface-container border-2 border-[#383830] p-4 rounded-3xl shadow-[4px_4px_0px_#383830]">
             <span class="block text-3xl font-black">${avgTime}s</span>
             <span class="text-[10px] font-bold uppercase tracking-widest opacity-70">Média</span>
          </div>
          <div class="bg-[#ff9810] border-2 border-[#383830] p-4 rounded-3xl shadow-[4px_4px_0px_#383830]">
             <span class="block text-3xl font-black">${this.sessionFastest === Infinity ? 0 : this.sessionFastest}s</span>
             <span class="text-[10px] font-bold uppercase tracking-widest opacity-70">Recorde</span>
          </div>
        </div>

        <div class="flex flex-col gap-4">
           <button class="w-full bg-[#2e7300] text-white font-black py-5 rounded-2xl text-xl shadow-[0_6px_0px_#1a4700] active:translate-y-1 active:shadow-[0_2px_0px_#1a4700] flex items-center justify-center gap-2" onclick="window.location.reload()">
              <span class="material-symbols-outlined">refresh</span> REFAZER
           </button>
           <button class="w-full bg-[#84fb42] text-[#1a4700] font-black py-5 rounded-2xl text-xl shadow-[0_6px_0px_#296700]" onclick="window.location.href='game.html?level=${this.level + 1}'">►► Fase</button>
           <button class="font-bold text-[#383830] opacity-60 hover:opacity-100 transition-opacity" onclick="window.location.href='index.html'">Voltar ao Menu</button>
        </div>
      </div>
    `;

      if (navigator.vibrate) navigator.vibrate([100, 100, 100, 100]);
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
