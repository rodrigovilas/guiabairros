const fs = require('fs');

const path = 'c:\\xampp\\htdocs\\guiadigital\\assets\\data\\servicos.json';
const data = JSON.parse(fs.readFileSync(path, 'utf-8'));

const newItems = [
  {
    "id": "ginasio-mane-garrincha",
    "nome": "Ginásio Poliesportivo Mané Garrincha",
    "descricao": "Ginásio municipal utilizado para treinamentos, campeonatos e atividades esportivas da comunidade.",
    "endereco": "Endereço na região do Centro, Diadema - SP",
    "telefone": "(11) 4056-0000",
    "email": "esporte@diadema.sp.gov.br",
    "horario": "Segunda a Domingo",
    "bairro": "Centro",
    "categoria_slug": "esporte",
    "categoria_nome": "Esporte",
    "subcategoria": "Ginásio Poliesportivo",
    "mapa_url": "https://maps.google.com/",
    "avaliacao": 5.0,
    "fotos": ["https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"]
  },
  {
    "id": "campo-serraria",
    "nome": "Campo Serraria",
    "descricao": "Campo municipal utilizado para campeonatos amadores e atividades esportivas.",
    "endereco": "Endereço na região da Serraria, Diadema - SP",
    "telefone": "(11) 4056-0000",
    "email": "esporte@diadema.sp.gov.br",
    "horario": "Segunda a Domingo",
    "bairro": "Serraria",
    "categoria_slug": "esporte",
    "categoria_nome": "Esporte",
    "subcategoria": "Campo de Futebol",
    "mapa_url": "https://maps.google.com/",
    "avaliacao": 5.0,
    "fotos": ["https://images.unsplash.com/photo-1518605368461-1e1e38ce8f43?auto=format&fit=crop&w=800&q=80"]
  },
  {
    "id": "campo-jardim-abc",
    "nome": "Campo Jardim ABC",
    "descricao": "Campo de futebol público destinado ao esporte e lazer da comunidade.",
    "endereco": "Endereço na região da Conceição, Diadema - SP",
    "telefone": "(11) 4056-0000",
    "email": "esporte@diadema.sp.gov.br",
    "horario": "Segunda a Domingo",
    "bairro": "Conceição",
    "categoria_slug": "esporte",
    "categoria_nome": "Esporte",
    "subcategoria": "Campo de Futebol",
    "mapa_url": "https://maps.google.com/",
    "avaliacao": 5.0,
    "fotos": ["https://images.unsplash.com/photo-1518605368461-1e1e38ce8f43?auto=format&fit=crop&w=800&q=80"]
  },
  {
    "id": "campo-ouro-verde",
    "nome": "Campo Ouro Verde",
    "descricao": "Espaço esportivo utilizado para jogos, treinos e campeonatos locais.",
    "endereco": "Endereço na região do Eldorado, Diadema - SP",
    "telefone": "(11) 4056-0000",
    "email": "esporte@diadema.sp.gov.br",
    "horario": "Segunda a Domingo",
    "bairro": "Eldorado",
    "categoria_slug": "esporte",
    "categoria_nome": "Esporte",
    "subcategoria": "Campo de Futebol",
    "mapa_url": "https://maps.google.com/",
    "avaliacao": 5.0,
    "fotos": ["https://images.unsplash.com/photo-1518605368461-1e1e38ce8f43?auto=format&fit=crop&w=800&q=80"]
  },
  {
    "id": "parque-ecologico-eldorado",
    "nome": "Parque Ecológico Eldorado",
    "descricao": "Parque municipal com áreas para caminhada, corrida, lazer e atividades esportivas ao ar livre.",
    "endereco": "Endereço na região do Eldorado, Diadema - SP",
    "telefone": "(11) 4056-0000",
    "email": "esporte@diadema.sp.gov.br",
    "horario": "Diariamente",
    "bairro": "Eldorado",
    "categoria_slug": "esporte",
    "categoria_nome": "Esporte",
    "subcategoria": "Parque",
    "mapa_url": "https://maps.google.com/",
    "avaliacao": 5.0,
    "fotos": ["https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80"]
  },
  {
    "id": "campo-piraporinha",
    "nome": "Campo Piraporinha",
    "descricao": "Campo municipal utilizado para futebol de campo e projetos esportivos.",
    "endereco": "Endereço na região de Piraporinha, Diadema - SP",
    "telefone": "(11) 4056-0000",
    "email": "esporte@diadema.sp.gov.br",
    "horario": "Segunda a Domingo",
    "bairro": "Piraporinha",
    "categoria_slug": "esporte",
    "categoria_nome": "Esporte",
    "subcategoria": "Campo de Futebol",
    "mapa_url": "https://maps.google.com/",
    "avaliacao": 5.0,
    "fotos": ["https://images.unsplash.com/photo-1518605368461-1e1e38ce8f43?auto=format&fit=crop&w=800&q=80"]
  },
  {
    "id": "campo-casa-grande",
    "nome": "Campo Casa Grande",
    "descricao": "Espaço esportivo municipal voltado para práticas esportivas e eventos comunitários.",
    "endereco": "Endereço na região de Casa Grande, Diadema - SP",
    "telefone": "(11) 4056-0000",
    "email": "esporte@diadema.sp.gov.br",
    "horario": "Segunda a Domingo",
    "bairro": "Casa Grande",
    "categoria_slug": "esporte",
    "categoria_nome": "Esporte",
    "subcategoria": "Campo de Futebol",
    "mapa_url": "https://maps.google.com/",
    "avaliacao": 5.0,
    "fotos": ["https://images.unsplash.com/photo-1518605368461-1e1e38ce8f43?auto=format&fit=crop&w=800&q=80"]
  },
  {
    "id": "campo-taperinha",
    "nome": "Campo Taperinha",
    "descricao": "Campo de futebol utilizado por equipes locais e projetos esportivos da região.",
    "endereco": "Endereço na região de Canhema, Diadema - SP",
    "telefone": "(11) 4056-0000",
    "email": "esporte@diadema.sp.gov.br",
    "horario": "Segunda a Domingo",
    "bairro": "Canhema",
    "categoria_slug": "esporte",
    "categoria_nome": "Esporte",
    "subcategoria": "Campo de Futebol",
    "mapa_url": "https://maps.google.com/",
    "avaliacao": 5.0,
    "fotos": ["https://images.unsplash.com/photo-1518605368461-1e1e38ce8f43?auto=format&fit=crop&w=800&q=80"]
  },
  {
    "id": "arena-inamar",
    "nome": "Arena Inamar",
    "descricao": "Complexo esportivo para prática de diversas modalidades e realização de eventos esportivos.",
    "endereco": "Endereço na região de Inamar, Diadema - SP",
    "telefone": "(11) 4056-0000",
    "email": "esporte@diadema.sp.gov.br",
    "horario": "Segunda a Domingo",
    "bairro": "Inamar",
    "categoria_slug": "esporte",
    "categoria_nome": "Esporte",
    "subcategoria": "Arena Esportiva",
    "mapa_url": "https://maps.google.com/",
    "avaliacao": 5.0,
    "fotos": ["https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"]
  }
];

data.push(...newItems);

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
console.log('Added sports items');
