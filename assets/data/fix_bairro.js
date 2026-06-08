const fs = require('fs');

const path = 'c:\\xampp\\htdocs\\guiadigital\\assets\\data\\servicos.json';
const data = JSON.parse(fs.readFileSync(path, 'utf-8'));

data.forEach(item => {
    if (item.id === 'ubs-promissao') {
        item.bairro = 'Casa Grande';
        item.descricao = item.descricao.replace('Inamar', 'Casa Grande');
        item.endereco = item.endereco.replace('Inamar', 'Casa Grande');
    }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
console.log('Fixed UBS Promissao bairro');
