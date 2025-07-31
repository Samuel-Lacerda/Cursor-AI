# 📝 To-Do List - Aplicação Completa

Uma aplicação moderna e responsiva de gerenciamento de tarefas desenvolvida com HTML, CSS e JavaScript puro.

## ✨ Funcionalidades

### 🎯 Funcionalidades Principais

- **Adicionar Tarefas**: Interface intuitiva para adicionar novas tarefas
- **Marcar como Concluída**: Clique no checkbox para marcar/desmarcar tarefas
- **Editar Tarefas**: Edição inline com duplo clique ou botão de editar
- **Excluir Tarefas**: Remoção individual de tarefas
- **Filtros**: Visualizar todas, pendentes ou concluídas
- **Estatísticas**: Contador de total, pendentes e concluídas
- **Persistência**: Dados salvos no localStorage do navegador

### 🎨 Interface Moderna

- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Gradientes e Animações**: Interface visualmente atrativa
- **Ícones Font Awesome**: Ícones intuitivos para melhor UX
- **Notificações**: Feedback visual para todas as ações
- **Estado Vazio**: Mensagem amigável quando não há tarefas

### 🔧 Funcionalidades Avançadas

- **Validação de Input**: Previne tarefas vazias
- **Escape HTML**: Proteção contra XSS
- **Confirmações**: Diálogos de confirmação para ações destrutivas
- **Acessibilidade**: Suporte a navegação por teclado
- **Performance**: Renderização otimizada

## 🚀 Como Usar

### Instalação

1. Clone ou baixe os arquivos do projeto
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Comece a usar imediatamente!

### Uso Básico

1. **Adicionar Tarefa**: Digite no campo de texto e pressione Enter ou clique em "Adicionar"
2. **Marcar como Concluída**: Clique no círculo ao lado da tarefa
3. **Editar**: Clique no botão de editar (ícone de lápis)
4. **Excluir**: Clique no botão de excluir (ícone de lixeira)
5. **Filtrar**: Use os botões "Todas", "Pendentes" ou "Concluídas"

### Funcionalidades Avançadas

- **Limpar Concluídas**: Remove todas as tarefas marcadas como concluídas
- **Limpar Todas**: Remove todas as tarefas (com confirmação)
- **Atalhos de Teclado**:
  - `Enter`: Adicionar tarefa
  - `Enter`: Salvar edição
  - `Escape`: Cancelar edição

## 📁 Estrutura do Projeto

```
to-do/
├── index.html          # Estrutura HTML principal
├── styles.css          # Estilos CSS responsivos
├── script.js           # Lógica JavaScript completa
└── README.md           # Documentação do projeto
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**:
  - Flexbox e Grid para layout
  - Gradientes e animações
  - Media queries para responsividade
  - Variáveis CSS para consistência
- **JavaScript ES6+**:
  - Classes e métodos modernos
  - localStorage para persistência
  - Event listeners e manipulação DOM
  - Programação orientada a objetos

## 🎨 Características do Design

### Paleta de Cores

- **Primária**: Gradiente azul ciano/teal (#0ea5e9 → #0891b2 → #0e7490)
- **Acentos**: Branco (#ffffff) para ícones e decorações
- **Sucesso**: Azul ciano (#0ea5e9) para elementos concluídos
- **Erro**: Vermelho (#f44336)
- **Aviso**: Laranja (#ff9800)
- **Info**: Azul (#2196F3)

### Responsividade

- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Adaptação para telas médias
- **Mobile**: Layout otimizado para telas pequenas

## 🔧 Funcionalidades Técnicas

### Classe Task

```javascript
/**
 * Representa uma tarefa individual
 * @param {string} text - Texto da tarefa
 * @param {boolean} completed - Status de conclusão
 * @param {string} id - ID único (gerado automaticamente)
 * @param {Date} createdAt - Data de criação
 */
```

### Classe TodoApp

```javascript
/**
 * Gerencia toda a aplicação de To-Do List
 * Responsável por todas as operações CRUD
 * Gerencia localStorage e interface
 */
```

### Métodos Principais

- `addTask()`: Adiciona nova tarefa
- `deleteTask(id)`: Remove tarefa específica
- `toggleTask(id)`: Alterna status de conclusão
- `editTask(id)`: Permite edição inline
- `setFilter(filter)`: Filtra tarefas por status
- `saveTasks()`: Persiste dados no localStorage
- `loadTasks()`: Carrega dados do localStorage

## 📱 Compatibilidade

### Navegadores Suportados

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### Dispositivos

- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablet (iOS, Android)
- ✅ Mobile (iOS, Android)

## 🚀 Melhorias Futuras

### Funcionalidades Planejadas

- [ ] Categorias para tarefas
- [ ] Data de vencimento
- [ ] Prioridades (Alta, Média, Baixa)
- [ ] Exportar/Importar dados
- [ ] Temas claro/escuro
- [ ] Sincronização com nuvem
- [ ] Notificações push
- [ ] Modo offline

### Melhorias Técnicas

- [ ] Service Workers para PWA
- [ ] IndexedDB para mais dados
- [ ] Compressão de dados
- [ ] Backup automático
- [ ] Histórico de ações

## 🤝 Contribuição

Sinta-se à vontade para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ para demonstrar habilidades em desenvolvimento web front-end.

---

**⭐ Se este projeto foi útil para você, considere dar uma estrela!**
