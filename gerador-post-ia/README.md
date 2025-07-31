# Gerador de Artigos WordPress com IA

Um gerador de artigos para WordPress utilizando inteligência artificial (Google Gemini API).

## 🚀 Funcionalidades

- ✅ Autenticação de usuários
- ✅ Geração de artigos com IA
- ✅ Dashboard limpo e responsivo
- ✅ Histórico de artigos criados
- ✅ Exportação para formato WordPress
- ✅ Interface moderna com Bootstrap

## 🛠️ Stack Tecnológica

### Backend

- **FastAPI** - Framework web moderno e rápido
- **SQLAlchemy** - ORM para banco de dados
- **SQLite** - Banco de dados (desenvolvimento)
- **JWT** - Autenticação
- **Google Gemini API** - Geração de conteúdo com IA

### Frontend

- **HTML5 + CSS3 + JavaScript**
- **Bootstrap 5** - Componentes responsivos
- **Fetch API** - Comunicação com backend

## 📦 Instalação

### Pré-requisitos

- Python 3.8+
- Google Gemini API Key

### Backend

```bash
cd backend
pip install -r requirements.txt
```

### Configuração

1. Copie o arquivo `.env.example` para `.env`
2. Adicione sua API Key do Gemini:

```
GEMINI_API_KEY=sua_chave_aqui
```

### Executar

```bash
cd backend
uvicorn app.main:app --reload
```

O backend estará disponível em: http://localhost:8000

### Frontend

Abra o arquivo `frontend/index.html` no navegador ou use um servidor local.

## 📁 Estrutura do Projeto

```
gerador-post-ia/
├── backend/
│   ├── app/
│   │   ├── main.py          # Aplicação FastAPI
│   │   ├── models.py        # Modelos do banco
│   │   ├── schemas.py       # Schemas Pydantic
│   │   ├── auth.py          # Autenticação JWT
│   │   ├── ai_service.py    # Serviço Gemini
│   │   └── database.py      # Configuração DB
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── index.html           # Página inicial
│   ├── login.html           # Login
│   ├── dashboard.html       # Dashboard principal
│   ├── css/
│   ├── js/
│   └── assets/
└── README.md
```

## 🔑 Como obter API Key do Gemini

1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave e adicione no arquivo `.env`

## 🎯 Uso

1. Inicie o backend
2. Abra o frontend no navegador
3. Faça login ou registre-se
4. Use o dashboard para gerar artigos
5. Visualize o histórico de artigos criados

## 📝 Licença

MIT License
