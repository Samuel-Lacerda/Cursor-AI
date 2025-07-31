# To-Do List - Aplicação Electron

Uma aplicação moderna e elegante para gerenciamento de tarefas, desenvolvida com Electron para funcionar como aplicação desktop nativa.

## 🚀 Funcionalidades

- **Interface Moderna**: Design responsivo e intuitivo
- **Gerenciamento de Tarefas**: Adicionar, editar, excluir e marcar tarefas como concluídas
- **Sistema de Dificuldade**: Classificar tarefas por nível de dificuldade (Fácil, Médio, Difícil)
- **Filtros Avançados**: Filtrar por status e dificuldade
- **Pesquisa em Tempo Real**: Buscar tarefas instantaneamente
- **Estatísticas**: Visualizar total, pendentes e concluídas
- **Persistência de Dados**: Salvar automaticamente no localStorage
- **Modo Desktop**: Funcionalidades específicas do Electron
  - Menu nativo do sistema
  - Atalhos de teclado
  - Importar/Exportar dados
  - Salvar em arquivos JSON

## 🛠️ Tecnologias Utilizadas

- **Electron**: Framework para aplicações desktop
- **HTML5**: Estrutura da aplicação
- **CSS3**: Estilização moderna com animações
- **JavaScript ES6+**: Lógica da aplicação
- **Font Awesome**: Ícones

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/todo-electron-app.git
   cd todo-electron-app
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Execute a aplicação**

   ```bash
   # Modo desenvolvimento (com DevTools)
   npm run dev

   # Modo produção
   npm start
   ```

## 🏗️ Scripts Disponíveis

- `npm start`: Executa a aplicação em modo produção
- `npm run dev`: Executa a aplicação em modo desenvolvimento
- `npm run build`: Gera executável da aplicação
- `npm run pack`: Empacota a aplicação para distribuição
- `npm run dist`: Cria instalador da aplicação

## 📱 Funcionalidades do Electron

### Menu Nativo

- **Arquivo**: Nova Tarefa (Ctrl+N), Salvar Dados (Ctrl+S), Sobre, Sair
- **Editar**: Desfazer, Refazer, Recortar, Copiar, Colar, Selecionar Tudo
- **Visualizar**: Recarregar, Ferramentas de Desenvolvedor, Zoom, Tela Cheia
- **Ajuda**: Documentação, Reportar Bug

### Atalhos de Teclado

- `Ctrl+N`: Nova tarefa
- `Ctrl+S`: Salvar dados
- `Ctrl+Q`: Sair da aplicação
- `F11`: Tela cheia
- `F12`: Ferramentas de desenvolvedor

### Operações de Arquivo

- **Exportar Dados**: Salvar todas as tarefas em arquivo JSON
- **Importar Dados**: Carregar tarefas de arquivo JSON
- **Backup Automático**: Dados salvos automaticamente no localStorage

## 🎨 Interface

A aplicação possui uma interface moderna com:

- **Gradientes**: Design com gradientes azuis modernos
- **Animações**: Transições suaves e animações CSS
- **Responsividade**: Adaptável a diferentes tamanhos de tela
- **Modo Escuro**: Suporte a temas (em desenvolvimento)
- **Ícones**: Font Awesome para melhor experiência visual

## 📊 Estrutura do Projeto

```
todo-electron-app/
├── main.js              # Processo principal do Electron
├── preload.js           # Ponte segura entre processos
├── index.html           # Interface principal
├── styles.css           # Estilos da aplicação
├── script.js            # Lógica da aplicação
├── package.json         # Configurações do projeto
├── assets/              # Ícones e recursos
└── README.md           # Documentação
```

## 🔧 Desenvolvimento

### Estrutura de Classes

#### Task

```javascript
/**
 * Representa uma tarefa individual
 * @param {string} text - Texto da tarefa
 * @param {string} difficulty - Nível de dificuldade
 * @param {boolean} completed - Status de conclusão
 */
```

#### TodoApp

```javascript
/**
 * Classe principal que gerencia toda a aplicação
 * Responsável por: renderização, persistência, filtros, etc.
 */
```

### Funcionalidades Principais

1. **Gerenciamento de Estado**: Controle centralizado do estado da aplicação
2. **Persistência**: Salvamento automático no localStorage
3. **Filtros**: Sistema de filtros por status e dificuldade
4. **Pesquisa**: Busca em tempo real
5. **Notificações**: Sistema de notificações visuais
6. **Integração Electron**: Funcionalidades específicas do desktop

## 🚀 Build e Distribuição

### Gerar Executável

```bash
# Para Windows
npm run build -- --win

# Para macOS
npm run build -- --mac

# Para Linux
npm run build -- --linux
```

### Configurações de Build

O arquivo `package.json` contém configurações para:

- **Windows**: Instalador NSIS
- **macOS**: DMG
- **Linux**: AppImage

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**

- GitHub: [@seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- Electron team pela excelente framework
- Font Awesome pelos ícones
- Comunidade open source

---

**Desenvolvido com ❤️ usando Electron**
