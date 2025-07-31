/**
 * Script de Desenvolvimento para Electron
 * Facilita o desenvolvimento da aplicação To-Do List
 *
 * @description Este script configura o ambiente de desenvolvimento
 * com hot reload, DevTools e outras ferramentas úteis
 */

const { spawn } = require("child_process");
const path = require("path");

/**
 * Classe para gerenciar o ambiente de desenvolvimento
 *
 * @class DevEnvironment
 * @description Gerencia o processo de desenvolvimento com hot reload
 */
class DevEnvironment {
  constructor() {
    this.electronProcess = null;
    this.isRunning = false;
  }

  /**
   * Inicia o ambiente de desenvolvimento
   *
   * @description Inicia o Electron em modo desenvolvimento com DevTools
   */
  start() {
    console.log("🚀 Iniciando ambiente de desenvolvimento...");

    // Verificar se o Electron está instalado
    try {
      const electronPath = require("electron");
      this.spawnElectron();
    } catch (error) {
      console.error(
        '❌ Electron não encontrado. Execute "npm install" primeiro.'
      );
      process.exit(1);
    }
  }

  /**
   * Spawn do processo Electron
   *
   * @description Cria um novo processo Electron com argumentos de desenvolvimento
   */
  spawnElectron() {
    const args = ["--dev", "--enable-logging", "--remote-debugging-port=9222"];

    this.electronProcess = spawn("npx", ["electron", ".", ...args], {
      stdio: "inherit",
      shell: true,
    });

    this.isRunning = true;

    // Event listeners para o processo
    this.electronProcess.on("close", (code) => {
      console.log(`\n📱 Processo Electron encerrado com código: ${code}`);
      this.isRunning = false;
      process.exit(code);
    });

    this.electronProcess.on("error", (error) => {
      console.error("❌ Erro ao iniciar Electron:", error);
      this.isRunning = false;
      process.exit(1);
    });

    // Graceful shutdown
    process.on("SIGINT", () => {
      console.log("\n🛑 Encerrando desenvolvimento...");
      this.stop();
    });

    process.on("SIGTERM", () => {
      console.log("\n🛑 Encerrando desenvolvimento...");
      this.stop();
    });
  }

  /**
   * Para o processo Electron
   *
   * @description Encerra o processo Electron de forma segura
   */
  stop() {
    if (this.electronProcess && this.isRunning) {
      this.electronProcess.kill("SIGTERM");
      this.isRunning = false;
    }
  }

  /**
   * Reinicia o processo Electron
   *
   * @description Para e reinicia o processo Electron
   */
  restart() {
    console.log("🔄 Reiniciando Electron...");
    this.stop();
    setTimeout(() => {
      this.spawnElectron();
    }, 1000);
  }
}

/**
 * Função principal
 *
 * @description Inicia o ambiente de desenvolvimento
 */
function main() {
  const dev = new DevEnvironment();

  console.log(`
🎯 To-Do List - Ambiente de Desenvolvimento
===========================================

📋 Funcionalidades disponíveis:
   • Hot reload automático
   • DevTools integrado
   • Debug remoto na porta 9222
   • Logs detalhados

⌨️  Atalhos úteis:
   • Ctrl+C: Encerrar desenvolvimento
   • F12: Abrir DevTools
   • Ctrl+R: Recarregar aplicação

🚀 Iniciando...
  `);

  dev.start();
}

// Executar se este arquivo for chamado diretamente
if (require.main === module) {
  main();
}

module.exports = DevEnvironment;
