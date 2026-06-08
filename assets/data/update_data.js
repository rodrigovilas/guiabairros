const fs = require('fs');

const data = JSON.parse(fs.readFileSync('servicos.json', 'utf-8'));

const bairro_map = {
    "Jardim ABC": "Taboão",
    "Jardim das Nações": "Taboão",
    "Paineiras": "Centro",
    "Parque Reid": "Centro",
    "Promissão": "Inamar",
    "Parque Real": "Conceição",
    "Jardim Ruyce": "Conceição",
    "Jardim Sapopema": "Serraria",
    "Vila São José": "Centro",
    "Vila Santa Dirce": "Centro",
    "Vila Nogueira": "Vila Nogueira"
};

const official_bairros = ["Centro", "Conceição", "Eldorado", "Inamar", "Serraria", "Vila Nogueira", "Piraporinha", "Casa Grande", "Canhema", "Campanário", "Taboão"];

data.forEach(item => {
    if (bairro_map[item.bairro]) {
        item.bairro = bairro_map[item.bairro];
    } else if (!official_bairros.includes(item.bairro)) {
        item.bairro = "Centro";
    }
});

const new_edu_items = [
    {"bairro": "Centro", "nome": "EMEB Heitor Villa-Lobos", "subcategoria": "Escolas Municipais"},
    {"bairro": "Centro", "nome": "EMEB Anita Catarina Malfatti", "subcategoria": "Escolas Municipais"},
    {"bairro": "Centro", "nome": "Biblioteca Municipal Olíria de Campos Barros", "subcategoria": "Bibliotecas Públicas"},
    {"bairro": "Centro", "nome": "Secretaria Municipal de Educação", "subcategoria": "Centros Educacionais"},
    {"bairro": "Centro", "nome": "Unifesp - Campus Diadema", "subcategoria": "Centros Educacionais"},

    {"bairro": "Conceição", "nome": "EMEBs da região Conceição", "subcategoria": "Escolas Municipais"},
    {"bairro": "Conceição", "nome": "Creches Municipais - Conceição", "subcategoria": "Creches Municipais"},
    {"bairro": "Conceição", "nome": "Programas de Educação Infantil", "subcategoria": "Programas Educacionais"},

    {"bairro": "Eldorado", "nome": "EMEB Annete Melchioretto", "subcategoria": "Escolas Municipais"},
    {"bairro": "Eldorado", "nome": "EMEB Átila Ferreira Vaz", "subcategoria": "Escolas Municipais"},
    {"bairro": "Eldorado", "nome": "Unifesp Campus Eldorado", "subcategoria": "Centros Educacionais"},
    {"bairro": "Eldorado", "nome": "Creches Municipais - Eldorado", "subcategoria": "Creches Municipais"},

    {"bairro": "Inamar", "nome": "EMEB Carolina Maria de Jesus", "subcategoria": "Escolas Municipais"},
    {"bairro": "Inamar", "nome": "Escolas Municipais da região Inamar", "subcategoria": "Escolas Municipais"},
    {"bairro": "Inamar", "nome": "Creches Municipais - Inamar", "subcategoria": "Creches Municipais"},

    {"bairro": "Serraria", "nome": "EMEB Albino Freitas", "subcategoria": "Escolas Municipais"},
    {"bairro": "Serraria", "nome": "EMEB Joaquim José da Silva Xavier (Tiradentes)", "subcategoria": "Escolas Municipais"},
    {"bairro": "Serraria", "nome": "Creches Municipais - Serraria", "subcategoria": "Creches Municipais"},
    {"bairro": "Serraria", "nome": "Etec Juscelino Kubitschek", "subcategoria": "ETECs"},

    {"bairro": "Vila Nogueira", "nome": "EMEB Freitas Nobre", "subcategoria": "Escolas Municipais"},
    {"bairro": "Vila Nogueira", "nome": "Escolas Municipais da região Vila Nogueira", "subcategoria": "Escolas Municipais"},

    {"bairro": "Piraporinha", "nome": "Escolas Municipais da região Piraporinha", "subcategoria": "Escolas Municipais"},
    {"bairro": "Piraporinha", "nome": "Creches Municipais - Piraporinha", "subcategoria": "Creches Municipais"},

    {"bairro": "Casa Grande", "nome": "EMEB Cândido Portinari", "subcategoria": "Escolas Municipais"},
    {"bairro": "Casa Grande", "nome": "EMEB Carlos Drummond de Andrade", "subcategoria": "Escolas Municipais"},
    {"bairro": "Casa Grande", "nome": "EMEB Aurélio Buarque de Holanda Ferreira", "subcategoria": "Escolas Municipais"},

    {"bairro": "Canhema", "nome": "Escolas Municipais da região Canhema", "subcategoria": "Escolas Municipais"},
    {"bairro": "Canhema", "nome": "Creches Municipais - Canhema", "subcategoria": "Creches Municipais"},

    {"bairro": "Campanário", "nome": "EMEB Rachel de Queiroz", "subcategoria": "Escolas Municipais"},
    {"bairro": "Campanário", "nome": "Escolas Municipais da região Campanário", "subcategoria": "Escolas Municipais"},

    {"bairro": "Taboão", "nome": "Escolas Municipais da região Taboão", "subcategoria": "Escolas Municipais"},
    {"bairro": "Taboão", "nome": "Creches Municipais - Taboão", "subcategoria": "Creches Municipais"}
];

new_edu_items.forEach((edu, idx) => {
    const item_id = `edu-${edu.bairro.toLowerCase().replace(/\s+/g, '-')}-${idx}`;
    data.push({
        id: item_id,
        nome: edu.nome,
        descricao: `${edu.nome} localizada no bairro ${edu.bairro}, oferecendo serviços educacionais de qualidade para a população de Diadema.`,
        endereco: `Endereço na região do ${edu.bairro}, Diadema - SP`,
        telefone: "(11) 4051-0000",
        email: "educacao@diadema.sp.gov.br",
        horario: "Segunda a Sexta, 07h às 17h",
        bairro: edu.bairro,
        categoria_slug: "educacao",
        categoria_nome: "Educação",
        subcategoria: edu.subcategoria,
        mapa_url: "https://maps.google.com/",
        avaliacao: 4.5,
        fotos: ["https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"]
    });
});

fs.writeFileSync('servicos.json', JSON.stringify(data, null, 2), 'utf-8');
console.log('Data updated successfully');
