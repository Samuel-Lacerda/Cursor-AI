/**
 * Correção do Drag and Drop
 * Versão simplificada e funcional
 */

// Substituir o método reorderTasks por esta versão corrigida
function reorderTasks(draggedElement, targetElement) {
  const draggedTaskId = draggedElement.dataset.taskId;
  const targetTaskId = targetElement.dataset.taskId;

  console.log("Reordenando:", { draggedTaskId, targetTaskId });

  // Encontrar índices das tarefas no array original
  const draggedIndex = this.tasks.findIndex(
    (task) => task.id === draggedTaskId
  );
  const targetIndex = this.tasks.findIndex((task) => task.id === targetTaskId);

  if (draggedIndex === -1 || targetIndex === -1) {
    console.log("Tarefa não encontrada:", { draggedTaskId, targetTaskId });
    return;
  }

  // Obter a posição do mouse em relação ao elemento alvo
  const rect = targetElement.getBoundingClientRect();
  const mouseY = this.lastMouseY || rect.top + rect.height / 2;
  const targetCenter = rect.top + rect.height / 2;

  // Determinar se deve inserir antes ou depois do elemento alvo
  let newIndex;
  if (mouseY < targetCenter) {
    // Inserir antes do elemento alvo
    newIndex = targetIndex;
  } else {
    // Inserir depois do elemento alvo
    newIndex = targetIndex + 1;
  }

  // Ajustar índice se a tarefa arrastada está sendo movida para baixo
  if (draggedIndex < newIndex) {
    newIndex--;
  }

  // Verificar se a nova posição é diferente da atual
  if (draggedIndex === newIndex) {
    console.log("Mesma posição, não há necessidade de reordenar");
    return;
  }

  console.log("Reordenando tarefa:", {
    draggedIndex,
    targetIndex,
    newIndex,
    draggedTaskId,
    targetTaskId,
  });

  // Reordenar array
  const [draggedTask] = this.tasks.splice(draggedIndex, 1);
  this.tasks.splice(newIndex, 0, draggedTask);

  // Salvar e re-renderizar
  this.saveTasks();
  this.renderTasks();
  this.updateStats();

  this.showNotification("Ordem das tarefas atualizada!", "success");
}

// Versão simplificada do setupDragAndDrop
function setupDragAndDrop() {
  // Event listener para quando uma tarefa começa a ser arrastada
  document.addEventListener("dragstart", (e) => {
    const taskItem = e.target.closest(".task-item");

    if (taskItem) {
      console.log("Drag start:", taskItem.dataset.taskId);
      this.draggedTask = taskItem;
      taskItem.classList.add("dragging");

      // Definir dados de transferência
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", taskItem.outerHTML);

      // Adicionar classe visual
      setTimeout(() => {
        taskItem.style.opacity = "0.5";
      }, 0);
    }
  });

  // Event listener para quando uma tarefa está sendo arrastada sobre outra
  document.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    // Armazenar a posição do mouse para usar no drop
    this.lastMouseY = e.clientY;

    const taskItem = e.target.closest(".task-item");
    if (taskItem && taskItem !== this.draggedTask) {
      this.dragOverTask = taskItem;

      // Adicionar indicador visual
      const rect = taskItem.getBoundingClientRect();
      const mouseY = e.clientY;
      const taskCenter = rect.top + rect.height / 2;

      // Remover classes anteriores
      taskItem.classList.remove("drag-over-top", "drag-over-bottom");

      // Adicionar classe baseada na posição do mouse
      if (mouseY < taskCenter) {
        taskItem.classList.add("drag-over-top");
      } else {
        taskItem.classList.add("drag-over-bottom");
      }
    }
  });

  // Event listener para quando uma tarefa é solta
  document.addEventListener("drop", (e) => {
    e.preventDefault();

    console.log("Drop event triggered");

    const taskItem = e.target.closest(".task-item");
    if (taskItem && this.draggedTask && taskItem !== this.draggedTask) {
      console.log("Reordering tasks:", {
        dragged: this.draggedTask.dataset.taskId,
        target: taskItem.dataset.taskId,
      });
      this.reorderTasks(this.draggedTask, taskItem);
    } else {
      console.log("Drop conditions not met:", {
        hasTaskItem: !!taskItem,
        hasDraggedTask: !!this.draggedTask,
        isDifferent: taskItem !== this.draggedTask,
      });
    }

    this.clearDragState();
  });

  // Event listener para quando o drag é cancelado
  document.addEventListener("dragend", (e) => {
    console.log("Drag end");
    this.clearDragState();
  });
}
