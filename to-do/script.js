/**
 * To-Do List Application
 * Aplicação completa de gerenciamento de tarefas com localStorage
 *
 * @author Seu Nome
 * @version 1.0.0
 */

// Elementos do DOM
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const tasksList = document.getElementById("tasksList");
const emptyState = document.getElementById("emptyState");
const filterBtns = document.querySelectorAll(".filter-btn");
const difficultyFilterBtns = document.querySelectorAll(
  ".difficulty-filter-btn"
);
const filtersToggleBtn = document.getElementById("filtersToggleBtn");
const filtersSection = document.getElementById("filtersSection");
const filtersContainer = document.querySelector(".filters-container");
const closeFiltersBtn = document.getElementById("closeFiltersBtn");
const difficultyDropdown = document.getElementById("difficultyDropdown");
const closeDifficultyBtn = document.getElementById("closeDifficultyBtn");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const difficultySelect = document.getElementById("difficultySelect");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");

// Elementos de estatísticas
const totalTasksEl = document.getElementById("totalTasks");
const pendingTasksEl = document.getElementById("pendingTasks");
const completedTasksEl = document.getElementById("completedTasks");

// Elementos dos modais
const clearCompletedModal = document.getElementById("clearCompletedModal");
const clearAllModal = document.getElementById("clearAllModal");
const modalOverlay = document.querySelector(".modal-overlay");
const completedCountEl = document.getElementById("completedCount");
const totalCountEl = document.getElementById("totalCount");
const cancelClearCompletedBtn = document.getElementById("cancelClearCompleted");
const confirmClearCompletedBtn = document.getElementById(
  "confirmClearCompleted"
);
const cancelClearAllBtn = document.getElementById("cancelClearAll");
const confirmClearAllBtn = document.getElementById("confirmClearAll");

// Estado da aplicação
let tasks = [];
let currentFilter = "all";

/**
 * Classe Task - Representa uma tarefa individual
 *
 * @class Task
 * @description Classe que define a estrutura de uma tarefa com propriedades e métodos
 */
class Task {
  /**
   * Construtor da classe Task
   *
   * @param {string} text - O texto da tarefa
   * @param {string} difficulty - Nível de dificuldade da tarefa (easy, medium, hard)
   * @param {boolean} completed - Status de conclusão da tarefa (padrão: false)
   * @param {string} id - ID único da tarefa (gerado automaticamente se não fornecido)
   * @param {Date} createdAt - Data de criação da tarefa (gerada automaticamente se não fornecida)
   */
  constructor(
    text,
    difficulty = "medium",
    completed = false,
    id = null,
    createdAt = null
  ) {
    this.id = id || this.generateId();
    this.text = text;
    this.difficulty = difficulty;
    this.completed = completed;
    this.createdAt = createdAt || new Date();
  }

  /**
   * Gera um ID único para a tarefa
   *
   * @returns {string} ID único baseado em timestamp e número aleatório
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Alterna o status de conclusão da tarefa
   *
   * @returns {boolean} Novo status de conclusão
   */
  toggle() {
    this.completed = !this.completed;
    return this.completed;
  }

  /**
   * Atualiza o texto da tarefa
   *
   * @param {string} newText - Novo texto para a tarefa
   * @returns {string} Texto atualizado
   */
  updateText(newText) {
    this.text = newText.trim();
    return this.text;
  }
}

/**
 * Classe TodoApp - Gerencia toda a aplicação de To-Do List
 *
 * @class TodoApp
 * @description Classe principal que controla todas as funcionalidades da aplicação
 */
class TodoApp {
  constructor() {
    this.tasks = [];
    this.currentFilter = "all";
    this.currentDifficultyFilter = "all";
    this.searchTerm = "";
    this.currentEditingTaskId = null;
    this.init();
  }

  /**
   * Inicializa a aplicação
   *
   * @description Carrega tarefas do localStorage, configura event listeners e renderiza a interface
   */
  init() {
    this.loadTasks();
    this.setupEventListeners();
    this.renderTasks();
    this.updateStats();
    this.updateEmptyState();
  }

  /**
   * Configura todos os event listeners da aplicação
   *
   * @description Adiciona listeners para botões, inputs e interações do usuário
   */
  setupEventListeners() {
    // Adicionar nova tarefa
    addTaskBtn.addEventListener("click", () => this.addTask());
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.addTask();
    });

    // Filtros por status
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.setFilter(e.target.dataset.filter);
      });
    });

    // Filtros por dificuldade
    difficultyFilterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.setDifficultyFilter(e.target.dataset.difficulty);
      });
    });

    // Toggle dos filtros
    filtersToggleBtn.addEventListener("click", () => {
      this.toggleFilters();
    });

    // Fechar filtros
    closeFiltersBtn.addEventListener("click", () => {
      this.hideFilters();
    });

    // Fechar filtros ao clicar fora
    document.addEventListener("click", (e) => {
      if (
        !filtersContainer.contains(e.target) &&
        filtersSection.classList.contains("show")
      ) {
        this.hideFilters();
      }
    });

    // Dropdown de dificuldade
    closeDifficultyBtn.addEventListener("click", () => {
      this.hideDifficultyDropdown();
    });

    // Fechar dropdown de dificuldade ao clicar fora
    document.addEventListener("click", (e) => {
      if (
        !difficultyDropdown.contains(e.target) &&
        !e.target.closest(".task-difficulty") &&
        difficultyDropdown.classList.contains("show")
      ) {
        this.hideDifficultyDropdown();
      }
    });

    // Event listener para cliques na dificuldade das tarefas
    document.addEventListener("click", (e) => {
      if (e.target.closest(".task-difficulty")) {
        const taskDifficultyElement = e.target.closest(".task-difficulty");
        const taskId = taskDifficultyElement.dataset.taskId;
        this.showDifficultyDropdown(taskId, taskDifficultyElement);
      }
    });

    // Event listeners para opções de dificuldade
    document.addEventListener("click", (e) => {
      if (e.target.closest(".difficulty-option")) {
        const difficulty =
          e.target.closest(".difficulty-option").dataset.difficulty;
        this.changeTaskDifficulty(difficulty);
      }
    });

    // Botões de limpeza com modais
    clearCompletedBtn.addEventListener("click", () =>
      this.showClearCompletedModal()
    );
    clearAllBtn.addEventListener("click", () => this.showClearAllModal());

    // Event listeners dos modais
    this.setupModalEventListeners();

    // Event listeners da pesquisa
    this.setupSearchEventListeners();
  }

  /**
   * Configura event listeners específicos dos modais
   *
   * @description Adiciona listeners para abrir, fechar e confirmar ações dos modais
   */
  setupModalEventListeners() {
    // Fechar modais ao clicar no overlay
    modalOverlay.addEventListener("click", () => this.closeAllModals());

    // Fechar modais com ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeAllModals();
    });

    // Botões do modal de limpar concluídas
    cancelClearCompletedBtn.addEventListener("click", () =>
      this.closeAllModals()
    );
    confirmClearCompletedBtn.addEventListener("click", () =>
      this.confirmClearCompleted()
    );

    // Botões do modal de limpar todas
    cancelClearAllBtn.addEventListener("click", () => this.closeAllModals());
    confirmClearAllBtn.addEventListener("click", () => this.confirmClearAll());
  }

  /**
   * Configura event listeners específicos da pesquisa
   *
   * @description Adiciona listeners para pesquisa e limpeza do campo de busca
   */
  setupSearchEventListeners() {
    // Pesquisa em tempo real
    searchInput.addEventListener("input", (e) => {
      this.searchTerm = e.target.value.toLowerCase();
      this.renderTasks();
      this.updateEmptyState();
      this.toggleClearSearchButton();
    });

    // Limpar pesquisa
    clearSearchBtn.addEventListener("click", () => {
      this.clearSearch();
    });

    // Limpar pesquisa com ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && searchInput.value) {
        this.clearSearch();
      }
    });
  }

  /**
   * Adiciona uma nova tarefa à lista
   *
   * @description Valida o input, cria uma nova tarefa e atualiza a interface
   */
  addTask() {
    const text = taskInput.value.trim();
    const difficulty = difficultySelect.value;

    if (!text) {
      this.showNotification("Por favor, digite uma tarefa!", "error");
      return;
    }

    const task = new Task(text, difficulty);
    this.tasks.push(task);

    this.saveTasks();
    this.renderTasks();
    this.updateStats();
    this.updateEmptyState();

    taskInput.value = "";
    taskInput.focus();

    this.showNotification("Tarefa adicionada com sucesso!", "success");
  }

  /**
   * Remove uma tarefa da lista
   *
   * @param {string} taskId - ID da tarefa a ser removida
   * @description Remove a tarefa do array e atualiza a interface
   */
  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks();
    this.renderTasks();
    this.updateStats();
    this.updateEmptyState();

    this.showNotification("Tarefa removida!", "info");
  }

  /**
   * Alterna o status de conclusão de uma tarefa
   *
   * @param {string} taskId - ID da tarefa a ser alternada
   * @description Alterna o status completed da tarefa e atualiza a interface
   */
  toggleTask(taskId) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.toggle();
      this.saveTasks();
      this.renderTasks();
      this.updateStats();

      const status = task.completed ? "concluída" : "desmarcada";
      this.showNotification(`Tarefa ${status}!`, "success");
    }
  }

  /**
   * Edita o texto de uma tarefa
   *
   * @param {string} taskId - ID da tarefa a ser editada
   * @description Permite edição inline do texto da tarefa
   */
  editTask(taskId) {
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    const taskTextElement = taskElement.querySelector(".task-text");
    const currentText = taskTextElement.textContent;

    // Criar input de edição
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.className = "edit-input";
    input.style.cssText = `
            flex: 1;
            padding: 8px 12px;
            border: 2px solid #667eea;
            border-radius: 6px;
            font-size: 1rem;
            margin-right: 10px;
        `;

    // Substituir texto por input
    taskTextElement.style.display = "none";
    taskTextElement.parentNode.insertBefore(input, taskTextElement);
    input.focus();
    input.select();

    // Função para salvar edição
    const saveEdit = () => {
      const newText = input.value.trim();
      if (newText && newText !== currentText) {
        const task = this.tasks.find((t) => t.id === taskId);
        if (task) {
          task.updateText(newText);
          this.saveTasks();
          this.renderTasks();
          this.showNotification("Tarefa atualizada!", "success");
        }
      }
      taskTextElement.style.display = "block";
      input.remove();
    };

    // Event listeners para salvar
    input.addEventListener("blur", saveEdit);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") saveEdit();
    });
    input.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        taskTextElement.style.display = "block";
        input.remove();
      }
    });
  }

  /**
   * Define o filtro atual para exibir tarefas
   *
   * @param {string} filter - Tipo de filtro ('all', 'pending', 'completed')
   * @description Atualiza o filtro e re-renderiza as tarefas
   */
  setFilter(filter) {
    this.currentFilter = filter;

    // Atualizar botões de filtro
    filterBtns.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.dataset.filter === filter) {
        btn.classList.add("active");
      }
    });

    this.renderTasks();
  }

  /**
   * Define o filtro de dificuldade atual
   *
   * @param {string} difficulty - Nível de dificuldade ('all', 'easy', 'medium', 'hard')
   * @description Atualiza o filtro de dificuldade e re-renderiza as tarefas
   */
  setDifficultyFilter(difficulty) {
    this.currentDifficultyFilter = difficulty;

    // Atualizar botões de filtro de dificuldade
    difficultyFilterBtns.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.dataset.difficulty === difficulty) {
        btn.classList.add("active");
      }
    });

    this.renderTasks();
  }

  /**
   * Alterna a exibição da seção de filtros
   *
   * @description Mostra ou oculta a seção de filtros com animação
   */
  toggleFilters() {
    const isVisible = filtersSection.classList.contains("show");

    if (isVisible) {
      this.hideFilters();
    } else {
      this.showFilters();
    }
  }

  /**
   * Mostra a seção de filtros
   *
   * @description Exibe a seção de filtros com animação
   */
  showFilters() {
    filtersSection.classList.add("show");
    filtersToggleBtn.classList.add("active");
  }

  /**
   * Oculta a seção de filtros
   *
   * @description Esconde a seção de filtros com animação
   */
  hideFilters() {
    filtersSection.classList.remove("show");
    filtersToggleBtn.classList.remove("active");
  }

  /**
   * Mostra o dropdown de dificuldade
   *
   * @param {string} taskId - ID da tarefa para alterar dificuldade
   * @param {HTMLElement} taskElement - Elemento da tarefa clicada
   * @description Exibe o dropdown para alterar a dificuldade de uma tarefa
   */
  showDifficultyDropdown(taskId, taskElement) {
    this.currentEditingTaskId = taskId;

    // Posicionar o dropdown próximo ao elemento clicado
    const rect = taskElement.getBoundingClientRect();
    const dropdown = difficultyDropdown;

    dropdown.style.position = "absolute";
    dropdown.style.top = `${rect.bottom + window.scrollY}px`;
    dropdown.style.left = `${rect.right - 250}px`; // Alinhar à direita

    dropdown.classList.add("show");
  }

  /**
   * Oculta o dropdown de dificuldade
   *
   * @description Esconde o dropdown de dificuldade
   */
  hideDifficultyDropdown() {
    difficultyDropdown.classList.remove("show");
    this.currentEditingTaskId = null;
  }

  /**
   * Altera a dificuldade de uma tarefa
   *
   * @param {string} difficulty - Nova dificuldade ('easy', 'medium', 'hard')
   * @description Atualiza a dificuldade da tarefa e re-renderiza
   */
  changeTaskDifficulty(difficulty) {
    if (!this.currentEditingTaskId) return;

    const task = this.tasks.find((t) => t.id === this.currentEditingTaskId);
    if (task) {
      task.difficulty = difficulty;
      this.saveTasks();
      this.renderTasks();
      this.hideDifficultyDropdown();
      this.showNotification(
        `Dificuldade alterada para ${this.getDifficultyText(difficulty)}!`,
        "success"
      );
    }
  }

  /**
   * Renderiza as tarefas na interface
   *
   * @description Cria elementos HTML para cada tarefa baseado no filtro atual
   */
  renderTasks() {
    tasksList.innerHTML = "";

    const filteredTasks = this.getFilteredTasks();

    filteredTasks.forEach((task) => {
      const taskElement = this.createTaskElement(task);
      tasksList.appendChild(taskElement);
    });
  }

  /**
   * Cria um elemento HTML para uma tarefa
   *
   * @param {Task} task - Objeto tarefa
   * @returns {HTMLElement} Elemento HTML da tarefa
   */
  createTaskElement(task) {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;
    li.dataset.taskId = task.id;

    const difficultyText = this.getDifficultyText(task.difficulty);
    const difficultyClass = `difficulty-${task.difficulty}`;

    li.innerHTML = `
            <div class="task-checkbox ${
              task.completed ? "checked" : ""
            }" onclick="todoApp.toggleTask('${task.id}')"></div>
            <span class="task-text">${this.escapeHtml(task.text)}</span>
            <div class="task-difficulty ${difficultyClass}" data-task-id="${
      task.id
    }">
                <i class="fas ${this.getDifficultyIcon(task.difficulty)}"></i>
                ${difficultyText}
            </div>
            <div class="task-actions">
                <button class="action-btn edit-btn" onclick="todoApp.editTask('${
                  task.id
                }')" title="Editar tarefa">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" onclick="todoApp.deleteTask('${
                  task.id
                }')" title="Excluir tarefa">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

    return li;
  }

  /**
   * Obtém tarefas filtradas baseado no filtro atual, filtro de dificuldade e termo de pesquisa
   *
   * @returns {Array} Array de tarefas filtradas
   */
  getFilteredTasks() {
    let filteredTasks = [];

    // Aplicar filtro por status
    switch (this.currentFilter) {
      case "pending":
        filteredTasks = this.tasks.filter((task) => !task.completed);
        break;
      case "completed":
        filteredTasks = this.tasks.filter((task) => task.completed);
        break;
      default:
        filteredTasks = this.tasks;
    }

    // Aplicar filtro por dificuldade
    if (this.currentDifficultyFilter !== "all") {
      filteredTasks = filteredTasks.filter(
        (task) => task.difficulty === this.currentDifficultyFilter
      );
    }

    // Aplicar pesquisa se houver termo de busca
    if (this.searchTerm) {
      filteredTasks = filteredTasks.filter((task) => {
        const textMatch = task.text.toLowerCase().includes(this.searchTerm);
        const difficultyMatch = this.getDifficultyText(task.difficulty)
          .toLowerCase()
          .includes(this.searchTerm);
        return textMatch || difficultyMatch;
      });
    }

    return filteredTasks;
  }

  /**
   * Atualiza as estatísticas na interface
   *
   * @description Calcula e exibe total, pendentes e concluídas
   */
  updateStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((task) => task.completed).length;
    const pending = total - completed;

    totalTasksEl.textContent = total;
    pendingTasksEl.textContent = pending;
    completedTasksEl.textContent = completed;
  }

  /**
   * Atualiza o estado vazio da interface
   *
   * @description Mostra ou esconde a mensagem de estado vazio
   */
  updateEmptyState() {
    const filteredTasks = this.getFilteredTasks();

    if (filteredTasks.length === 0) {
      emptyState.classList.add("show");
      tasksList.style.display = "none";
    } else {
      emptyState.classList.remove("show");
      tasksList.style.display = "flex";
    }
  }

  /**
   * Mostra o modal para limpar tarefas concluídas
   *
   * @description Exibe modal com confirmação para remover tarefas concluídas
   */
  showClearCompletedModal() {
    const completedCount = this.tasks.filter((task) => task.completed).length;

    if (completedCount === 0) {
      this.showNotification("Não há tarefas concluídas para remover!", "info");
      return;
    }

    completedCountEl.textContent = completedCount;
    clearCompletedModal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  /**
   * Mostra o modal para limpar todas as tarefas
   *
   * @description Exibe modal com confirmação para remover todas as tarefas
   */
  showClearAllModal() {
    if (this.tasks.length === 0) {
      this.showNotification("Não há tarefas para remover!", "info");
      return;
    }

    totalCountEl.textContent = this.tasks.length;
    clearAllModal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  /**
   * Fecha todos os modais
   *
   * @description Remove a classe show de todos os modais e restaura scroll
   */
  closeAllModals() {
    clearCompletedModal.classList.remove("show");
    clearAllModal.classList.remove("show");
    document.body.style.overflow = "";
  }

  /**
   * Confirma a remoção de tarefas concluídas
   *
   * @description Executa a remoção após confirmação no modal
   */
  confirmClearCompleted() {
    const completedCount = this.tasks.filter((task) => task.completed).length;

    this.tasks = this.tasks.filter((task) => !task.completed);
    this.saveTasks();
    this.renderTasks();
    this.updateStats();
    this.updateEmptyState();

    this.closeAllModals();
    this.showNotification(
      `${completedCount} tarefa(s) concluída(s) removida(s)!`,
      "success"
    );
  }

  /**
   * Confirma a remoção de todas as tarefas
   *
   * @description Executa a remoção de todas as tarefas após confirmação no modal
   */
  confirmClearAll() {
    const totalCount = this.tasks.length;

    this.tasks = [];
    this.saveTasks();
    this.renderTasks();
    this.updateStats();
    this.updateEmptyState();

    this.closeAllModals();
    this.showNotification(`${totalCount} tarefa(s) removida(s)!`, "success");
  }

  /**
   * Salva tarefas no localStorage
   *
   * @description Converte array de tarefas para JSON e salva localmente
   */
  saveTasks() {
    try {
      localStorage.setItem("todoTasks", JSON.stringify(this.tasks));
    } catch (error) {
      console.error("Erro ao salvar tarefas:", error);
      this.showNotification("Erro ao salvar tarefas!", "error");
    }
  }

  /**
   * Carrega tarefas do localStorage
   *
   * @description Recupera tarefas salvas e converte de volta para objetos Task
   */
  loadTasks() {
    try {
      const savedTasks = localStorage.getItem("todoTasks");
      if (savedTasks) {
        const tasksData = JSON.parse(savedTasks);
        this.tasks = tasksData.map((taskData) => {
          return new Task(
            taskData.text,
            taskData.difficulty || "medium", // Fallback para tarefas antigas
            taskData.completed,
            taskData.id,
            new Date(taskData.createdAt)
          );
        });
      }
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      this.showNotification("Erro ao carregar tarefas salvas!", "error");
    }
  }

  /**
   * Obtém o texto da dificuldade
   *
   * @param {string} difficulty - Nível de dificuldade
   * @returns {string} Texto da dificuldade
   */
  getDifficultyText(difficulty) {
    const texts = {
      easy: "Fácil",
      medium: "Médio",
      hard: "Difícil",
    };
    return texts[difficulty] || "Médio";
  }

  /**
   * Obtém o ícone da dificuldade
   *
   * @param {string} difficulty - Nível de dificuldade
   * @returns {string} Classe do ícone
   */
  getDifficultyIcon(difficulty) {
    const icons = {
      easy: "fa-star",
      medium: "fa-star-half-alt",
      hard: "fa-fire",
    };
    return icons[difficulty] || "fa-star-half-alt";
  }

  /**
   * Limpa a pesquisa
   *
   * @description Limpa o campo de pesquisa e re-renderiza as tarefas
   */
  clearSearch() {
    searchInput.value = "";
    this.searchTerm = "";
    this.renderTasks();
    this.updateEmptyState();
    this.toggleClearSearchButton();
    searchInput.focus();
  }

  /**
   * Alterna a visibilidade do botão de limpar pesquisa
   *
   * @description Mostra ou esconde o botão baseado no conteúdo do campo
   */
  toggleClearSearchButton() {
    if (searchInput.value) {
      clearSearchBtn.classList.add("show");
    } else {
      clearSearchBtn.classList.remove("show");
    }
  }

  /**
   * Escapa HTML para prevenir XSS
   *
   * @param {string} text - Texto a ser escapado
   * @returns {string} Texto escapado
   */
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Exibe notificação para o usuário
   *
   * @param {string} message - Mensagem a ser exibida
   * @param {string} type - Tipo da notificação ('success', 'error', 'info', 'warning')
   * @description Cria e exibe uma notificação temporária na tela
   */
  showNotification(message, type = "info") {
    // Remover notificações existentes
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach((notification) => notification.remove());

    // Criar nova notificação
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Estilos da notificação
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;

    // Cores baseadas no tipo
    const colors = {
      success: "#4CAF50",
      error: "#f44336",
      info: "#2196F3",
      warning: "#ff9800",
    };

    notification.style.backgroundColor = colors[type] || colors.info;

    // Adicionar ao DOM
    document.body.appendChild(notification);

    // Remover após 3 segundos
    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Adicionar estilos CSS para animações de notificação
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Inicializar a aplicação
const todoApp = new TodoApp();

// Expor para uso global (para os onclick nos elementos HTML)
window.todoApp = todoApp;
