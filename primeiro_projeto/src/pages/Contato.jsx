import React from "react";
import FormularioContato from "../components/Contato/FormularioContato";

/**
 * Página de Contato
 *
 * Renderiza a página de contato utilizando o componente FormularioContato.
 * Esta página agora é um wrapper simples que delega toda a lógica
 * para o componente especializado.
 *
 * @returns {JSX.Element} Página de contato com formulário
 */
export default function Contato() {
  return (
    <div>
      <p>
        Preencha o formulário abaixo para entrar em contato conosco. Sua
        opinião, dúvida ou sugestão é muito importante para que possamos
        melhorar continuamente nossos serviços e oferecer a melhor experiência
        possível!
      </p>
      <FormularioContato />
      <div style={{ marginTop: "24px", color: "#2e7d32", fontWeight: "bold" }}>
        Obrigado por dedicar seu tempo para nos enviar uma mensagem! Nossa
        equipe valoriza muito o seu contato e retornará o mais breve possível.
      </div>
    </div>
  );
}
