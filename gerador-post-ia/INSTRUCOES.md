# 🚀 Instruções para Executar o Projeto

## 📋 Pré-requisitos

1. **Python 3.8+** instalado
2. **Google Gemini API Key** (gratuita)
3. **Navegador web** moderno

## 🔑 Como obter a API Key do Gemini

1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada

## ⚙️ Configuração do Backend

### 1. Instalar dependências

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configurar variáveis de ambiente

```bash
# Copie o arquivo de exemplo
cp env.example .env

# Edite o arquivo .env e adicione sua API Key
GEMINI_API_KEY=sua_chave_do_gemini_aqui
```

### 3. Executar o backend

```bash
uvicorn app.main:app --reload
```

O backend estará disponível em: **http://localhost:8000**

## 🌐 Executar o Frontend

### Opção 1: Abrir diretamente no navegador

1. Abra o arquivo `frontend/index.html` no navegador
2. Navegue para a página de login
3. Crie uma conta ou faça login

### Opção 2: Usar servidor local (recomendado)

```bash
# Python 3
cd frontend
python -m http.server 8080

# Ou usando Node.js (se instalado)
npx http-server -p 8080
```

Acesse: **http://localhost:8080**

## 🎯 Como Usar

### 1. Primeiro Acesso

1. Acesse a página inicial
2. Clique em "Entrar" ou "Criar Conta"
3. Registre-se com username, email e senha
4. Faça login no sistema

### 2. Gerar Artigos

1. No dashboard, vá para "Gerar Artigo"
2. Preencha:
   - **Tópico**: Assunto principal do artigo
   - **Número de palavras**: 300, 500, 800 ou 1000
   - **Instruções**: Detalhes específicos sobre o artigo
3. Clique em "Gerar Artigo"
4. Aguarde alguns segundos para a IA gerar o conteúdo

### 3. Visualizar Histórico

1. Clique em "Histórico" no menu lateral
2. Veja todos os artigos criados
3. Clique em "Ver" para visualizar um artigo
4. Use "Exportar" para baixar em formato HTML

### 4. Gerar Variações

1. Vá para "Variações" no menu
2. Defina o tópico e prompt base
3. Escolha o número de variações (3 ou 5)
4. Clique em "Gerar Variações"

## 🔧 Funcionalidades Disponíveis

### ✅ Implementadas

- ✅ Registro e login de usuários
- ✅ Geração de artigos com IA (Gemini)
- ✅ Histórico de artigos
- ✅ Visualização de artigos
- ✅ Exportação para HTML
- ✅ Geração de variações
- ✅ Melhoria de artigos existentes
- ✅ Interface responsiva com Bootstrap

### 🚧 Em Desenvolvimento

- 📝 Editor de artigos inline
- 📊 Estatísticas detalhadas
- 🎨 Temas personalizáveis
- 📱 Aplicativo mobile

## 🐛 Solução de Problemas

### Backend não inicia

```bash
# Verifique se todas as dependências estão instaladas
pip install -r requirements.txt

# Verifique se o arquivo .env existe
ls -la backend/.env

# Verifique se a API Key está configurada
cat backend/.env
```

### Erro de conexão no frontend

1. Verifique se o backend está rodando em http://localhost:8000
2. Abra http://localhost:8000/docs para verificar a API
3. Verifique se não há bloqueio de CORS

### Erro na geração de artigos

1. Verifique se a API Key do Gemini está correta
2. Verifique se há conexão com a internet
3. Verifique os logs do backend para mais detalhes

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
│   ├── requirements.txt     # Dependências Python
│   └── env.example         # Exemplo de configuração
├── frontend/
│   ├── index.html          # Página inicial
│   ├── login.html          # Login/Registro
│   └── dashboard.html      # Dashboard principal
├── README.md              # Documentação principal
└── INSTRUCOES.md         # Este arquivo
```

## 🔒 Segurança

- ✅ Senhas criptografadas com bcrypt
- ✅ Autenticação JWT
- ✅ Validação de dados com Pydantic
- ✅ Proteção contra SQL injection
- ✅ CORS configurado

## 📊 Banco de Dados

- **Desenvolvimento**: SQLite (arquivo local)
- **Produção**: PostgreSQL ou MySQL (configurável)
- **Migração**: Alembic (preparado)

## 🚀 Deploy em Produção

### Backend

1. Configure um servidor Linux
2. Instale Python e dependências
3. Configure PostgreSQL
4. Use Gunicorn + Nginx
5. Configure variáveis de ambiente

### Frontend

1. Configure um servidor web (Apache/Nginx)
2. Faça upload dos arquivos HTML/CSS/JS
3. Configure HTTPS
4. Configure proxy reverso para API

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do backend
2. Abra o console do navegador (F12)
3. Verifique se todas as dependências estão instaladas
4. Teste a API em http://localhost:8000/docs

## 🎉 Pronto!

Agora você tem um gerador de artigos WordPress completo com IA!

**Divirta-se criando conteúdo de qualidade! 🚀**
