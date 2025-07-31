/**
 * Arquivo Preload do Electron
 * Ponte segura entre o processo principal e o renderer process
 *
 * @description Este arquivo expõe APIs seguras do processo principal
 * para o renderer process, permitindo comunicação bidirecional
 * sem comprometer a segurança da aplicação
 */

const { contextBridge, ipcRenderer } = require("electron");

/**
 * Configura a ponte de contexto para comunicação segura
 *
 * @description Expõe APIs específicas do Electron para o renderer process
 * de forma segura, seguindo as melhores práticas de segurança
 */
contextBridge.exposeInMainWorld("electronAPI", {
  /**
   * Obtém a versão da aplicação
   *
   * @returns {Promise<string>} Versão da aplicação
   */
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),

  /**
   * Obtém o nome da aplicação
   *
   * @returns {Promise<string>} Nome da aplicação
   */
  getAppName: () => ipcRenderer.invoke("get-app-name"),

  /**
   * Salva dados em um arquivo
   *
   * @param {Object} data - Dados a serem salvos
   * @returns {Promise<Object>} Resultado da operação
   */
  saveDataToFile: (data) => ipcRenderer.invoke("save-data-to-file", data),

  /**
   * Carrega dados de um arquivo
   *
   * @returns {Promise<Object>} Dados carregados
   */
  loadDataFromFile: () => ipcRenderer.invoke("load-data-from-file"),

  /**
   * Event listener para nova tarefa
   *
   * @param {Function} callback - Função a ser executada quando o evento for disparado
   */
  onNewTask: (callback) => {
    ipcRenderer.on("new-task", callback);
  },

  /**
   * Event listener para salvar dados
   *
   * @param {Function} callback - Função a ser executada quando o evento for disparado
   */
  onSaveData: (callback) => {
    ipcRenderer.on("save-data", callback);
  },

  /**
   * Minimiza a janela da aplicação
   */
  minimizeWindow: () => ipcRenderer.invoke("minimize-window"),

  /**
   * Maximiza a janela da aplicação
   */
  maximizeWindow: () => ipcRenderer.invoke("maximize-window"),

  /**
   * Fecha a janela da aplicação
   */
  closeWindow: () => ipcRenderer.invoke("close-window"),

  /**
   * Remove todos os event listeners
   *
   * @description Limpa todos os listeners para evitar vazamentos de memória
   */
  removeAllListeners: () => {
    ipcRenderer.removeAllListeners("new-task");
    ipcRenderer.removeAllListeners("save-data");
  },
});

/**
 * Configuração de segurança adicional
 *
 * @description Remove acesso a APIs potencialmente perigosas
 */
window.addEventListener("DOMContentLoaded", () => {
  // Remove acesso a APIs do Node.js no renderer process
  delete window.require;
  delete window.exports;
  delete window.module;

  // Remove acesso ao processo global
  delete window.process;
});
