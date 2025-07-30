import React from "react";

/**
 * Componente DescricaoProduto
 *
 * Exibe a descrição detalhada do produto com título e texto explicativo.
 *
 * @param {Object} props - Propriedades do componente
 * @param {string} props.descricaoCompleta - Descrição completa do produto
 *
 * @returns {JSX.Element} Seção de descrição do produto
 */
export default function DescricaoProduto({ descricaoCompleta }) {
  return (
    <div className="descricao-produto">
      <h2 className="descricao-titulo">
        DESCRIPTION <span className="edit-icon">✏️</span>
      </h2>
      <p className="descricao-texto">{descricaoCompleta}</p>
    </div>
  );
}
