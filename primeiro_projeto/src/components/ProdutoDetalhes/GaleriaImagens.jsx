import React, { useState } from "react";

/**
 * Componente GaleriaImagens
 *
 * Exibe uma galeria de imagens do produto com imagem principal e thumbnails.
 * Permite navegação entre diferentes ângulos do produto.
 *
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.imagens - Array de URLs das imagens do produto
 * @param {string} props.nomeProduto - Nome do produto para alt text
 *
 * @returns {JSX.Element} Galeria de imagens com thumbnails
 */
export default function GaleriaImagens({ imagens, nomeProduto }) {
  const [imagemAtiva, setImagemAtiva] = useState(0);

  /**
   * Altera a imagem ativa quando um thumbnail é clicado
   * @param {number} index - Índice da imagem selecionada
   */
  const handleThumbnailClick = (index) => {
    setImagemAtiva(index);
  };

  return (
    <div className="galeria-imagens">
      {/* Thumbnails */}
      <div className="thumbnails-container">
        {imagens.map((imagem, index) => (
          <div
            key={index}
            className={`thumbnail ${index === imagemAtiva ? "ativo" : ""}`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img src={imagem} alt={`${nomeProduto} - Vista ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Imagem Principal */}
      <div className="imagem-principal-container">
        <img
          src={imagens[imagemAtiva]}
          alt={`${nomeProduto} - Vista principal`}
          className="imagem-principal"
        />

        {/* Pop-up de desconto */}
        <div className="popup-desconto">
          <span>Get 15% Off*</span>
          <button className="fechar-popup">×</button>
        </div>
      </div>
    </div>
  );
}
