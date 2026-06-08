// run: node generate.js
const fs = require('fs');

const jsonPath = 'servicos.json';
const outPath = 'servicos-data.js';

const raw = fs.readFileSync(jsonPath, { encoding: 'utf8' });
const data = JSON.parse(raw);

// Write with explicit utf8 and BOM to ensure Windows reads it correctly
const output = 'var SERVICOS_DATA = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(outPath, '\uFEFF' + output, { encoding: 'utf8' });

console.log('servicos-data.js gerado com sucesso! Itens:', data.length);
