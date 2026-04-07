const fs = require('fs');
let src = fs.readFileSync('debug/js/data.js', 'utf8');

// Match only debugChallenges and database
const m1 = src.match(/const debugChallenges = \[[\s\S]*?\];/);
const finalContent = '/* DEBUG DATABASE EXCLUSIVO */\n\n' + 
  m1[0] + '\n\n' +
  'const database = {\n  1: debugChallenges,\n  2: debugChallenges,\n  3: debugChallenges,\n  4: debugChallenges,\n  5: debugChallenges,\n  6: debugChallenges,\n  7: debugChallenges,\n  8: debugChallenges\n};';

fs.writeFileSync('debug/js/data.js', finalContent, 'utf8');

// Also update engine.js
let eng = fs.readFileSync('debug/js/engine.js', 'utf8');
eng = eng.replace('this.totalToPlay = 3;', 'this.totalToPlay = 22;');
fs.writeFileSync('debug/js/engine.js', eng, 'utf8');
