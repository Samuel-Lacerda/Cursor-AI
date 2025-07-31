/**
 * Arquivo Principal do Electron
 * Gerencia o processo principal da aplicação To-Do List
 *
 * @description Este arquivo configura a janela principal da aplicação,
 * gerencia eventos do sistema e implementa funcionalidades específicas do Electron
 * como menu, atalhos de teclado e integração com o sistema operacional
 */

const {
  app,
  BrowserWindow,
  Menu,
  shell,
  ipcMain,
  dialog,
} = require("electron");
const path = require("path");
const fs = require("fs");

/**
 * Classe principal que gerencia a aplicação Electron
 *
 * @class ElectronApp
 * @description Classe que controla o ciclo de vida da aplicação Electron,
 * configura a janela principal e gerencia eventos do sistema
 */
class ElectronApp {
  constructor() {
    this.mainWindow = null;
    this.isDev = process.argv.includes("--dev");

    this.init();
  }

  /**
   * Inicializa a aplicação Electron
   *
   * @description Configura event listeners e cria a janela principal
   */
  init() {
    // Event listener para quando a aplicação estiver pronta
    app.whenReady().then(() => {
      this.createMainWindow();
      this.setupMenu();
      this.setupEventListeners();
    });

    // Event listener para quando todas as janelas forem fechadas
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    // Event listener para ativação da aplicação (macOS)
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createMainWindow();
      }
    });
  }

  /**
   * Cria a janela principal da aplicação
   *
   * @description Configura as propriedades da janela principal incluindo
   * tamanho, posição, ícone e outras configurações visuais
   */
  createMainWindow() {
    this.mainWindow = new BrowserWindow({
      width: 900,
      height: 800,
      minWidth: 600,
      minHeight: 500,
      icon: path.join(__dirname, "assets", "icon.png"),
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        preload: path.join(__dirname, "preload.js"),
      },
      show: false,
      titleBarStyle: "hidden", // Remove a barra de título padrão
      frame: false, // Remove completamente a moldura da janela
      backgroundColor: "#0ea5e9",
      // Configurações para uma janela mais limpa
      transparent: false,
      resizable: true,
      maximizable: true,
      minimizable: true,
      closable: true,
    });

    // Carrega o arquivo HTML principal
    this.mainWindow.loadFile("index.html");

    // Mostra a janela quando estiver pronta
    this.mainWindow.once("ready-to-show", () => {
      this.mainWindow.show();

      // Foca na janela
      this.mainWindow.focus();
    });

    // Event listener para quando a janela for fechada
    this.mainWindow.on("closed", () => {
      this.mainWindow = null;
    });

    // Abre DevTools em modo de desenvolvimento
    if (this.isDev) {
      this.mainWindow.webContents.openDevTools();
    }
  }

  /**
   * Configura o menu da aplicação
   *
   * @description Cria um menu personalizado com opções de arquivo, edição e ajuda
   */
  setupMenu() {
    // Remover completamente o menu para uma interface mais limpa
    Menu.setApplicationMenu(null);

    // Alternativa: Menu minimalista apenas com funcionalidades essenciais
    // Descomente as linhas abaixo se quiser um menu básico
    /*
    const template = [
      {
        label: "Arquivo",
        submenu: [
          {
            label: "Nova Tarefa",
            accelerator: "CmdOrCtrl+N",
            click: () => {
              this.mainWindow.webContents.send("new-task");
            },
          },
          {
            label: "Salvar Dados",
            accelerator: "CmdOrCtrl+S",
            click: () => {
              this.mainWindow.webContents.send("save-data");
            },
          },
          { type: "separator" },
          {
            label: "Sobre",
            click: () => {
              this.showAboutDialog();
            },
          },
          { type: "separator" },
          {
            label: "Sair",
            accelerator: process.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
            click: () => {
              app.quit();
            },
          },
        ],
      }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    */
  }

  /**
   * Configura event listeners específicos do Electron
   *
   * @description Adiciona listeners para comunicação entre processos e eventos do sistema
   */
  setupEventListeners() {
    // Listener para comunicação do renderer process
    ipcMain.handle("get-app-version", () => {
      return app.getVersion();
    });

    ipcMain.handle("get-app-name", () => {
      return app.getName();
    });

    // Listener para salvar dados
    ipcMain.handle("save-data-to-file", async (event, data) => {
      try {
        const result = await dialog.showSaveDialog(this.mainWindow, {
          title: "Salvar Dados das Tarefas",
          defaultPath: "tarefas.json",
          filters: [
            { name: "Arquivos JSON", extensions: ["json"] },
            { name: "Todos os Arquivos", extensions: ["*"] },
          ],
        });

        if (!result.canceled) {
          fs.writeFileSync(result.filePath, JSON.stringify(data, null, 2));
          return { success: true, path: result.filePath };
        }
        return { success: false, canceled: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    // Listener para carregar dados
    ipcMain.handle("load-data-from-file", async () => {
      try {
        const result = await dialog.showOpenDialog(this.mainWindow, {
          title: "Carregar Dados das Tarefas",
          filters: [
            { name: "Arquivos JSON", extensions: ["json"] },
            { name: "Todos os Arquivos", extensions: ["*"] },
          ],
          properties: ["openFile"],
        });

        if (!result.canceled) {
          const data = fs.readFileSync(result.filePaths[0], "utf8");
          return { success: true, data: JSON.parse(data) };
        }
        return { success: false, canceled: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    // Listeners para controles de janela
    ipcMain.handle("minimize-window", () => {
      if (this.mainWindow) {
        this.mainWindow.minimize();
      }
    });

    ipcMain.handle("maximize-window", () => {
      if (this.mainWindow) {
        if (this.mainWindow.isMaximized()) {
          this.mainWindow.unmaximize();
        } else {
          this.mainWindow.maximize();
        }
      }
    });

    ipcMain.handle("close-window", () => {
      if (this.mainWindow) {
        this.mainWindow.close();
      }
    });
  }

  /**
   * Exibe o diálogo "Sobre" da aplicação
   *
   * @description Mostra informações sobre a aplicação em um diálogo nativo
   */
  showAboutDialog() {
    dialog.showMessageBox(this.mainWindow, {
      type: "info",
      title: "Sobre To-Do List",
      message: "To-Do List",
      detail: `Versão: ${app.getVersion()}\n\nUma aplicação simples e eficiente para gerenciar suas tarefas diárias.\n\nDesenvolvido com Electron e JavaScript.`,
      buttons: ["OK"],
    });
  }
}

/**
 * Inicializa a aplicação Electron
 *
 * @description Cria uma nova instância da classe ElectronApp
 */
new ElectronApp();
