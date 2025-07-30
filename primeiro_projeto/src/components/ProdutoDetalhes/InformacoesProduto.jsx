import React, { useState } from "react";

/**
 * Componente InformacoesProduto
 *
 * Exibe as informações principais do produto, incluindo preços, avaliações,
 * seleção de cores, tamanhos e botões de ação.
 *
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.produto - Objeto com dados do produto
 * @param {number} props.quantidade - Quantidade selecionada
 * @param {Function} props.onQuantidadeChange - Função para alterar quantidade
 * @param {Function} props.onComprar - Função executada ao comprar
 *
 * @returns {JSX.Element} Seção de informações do produto
 */
export default function InformacoesProduto({
  produto,
  quantidade,
  onQuantidadeChange,
  onComprar,
}) {
  const [corSelecionada, setCorSelecionada] = useState("Black");
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("XXS");

  /**
   * Calcula a porcentagem de desconto
   * @returns {number} Porcentagem de desconto
   */
  const calcularDesconto = () => {
    const precoOriginal = parseFloat(
      produto.precoOriginal.replace(/[^\d,]/g, "").replace(",", ".")
    );
    const precoAtual = parseFloat(
      produto.preco.replace(/[^\d,]/g, "").replace(",", ".")
    );
    return Math.round(((precoOriginal - precoAtual) / precoOriginal) * 100);
  };

  /**
   * Calcula o valor das parcelas
   * @returns {string} Valor das parcelas
   */
  const calcularParcelas = () => {
    const preco = parseFloat(
      produto.preco.replace(/[^\d,]/g, "").replace(",", ".")
    );
    const valorParcela = (preco / 4).toFixed(2);
    return valorParcela.replace(".", ",");
  };

  return (
    <div className="informacoes-produto">
      {/* Nome e Tipo */}
      <h1 className="produto-nome">{produto.nome}</h1>
      <p className="produto-tipo">Tech Jersey</p>

      {/* Preços */}
      <div className="produto-precos">
        <span className="preco-atual">{produto.preco}</span>
        <span className="preco-original">{produto.precoOriginal}</span>
        <span className="desconto">{calcularDesconto()}% OFF</span>
      </div>

      {/* Opções de Pagamento */}
      <div className="opcoes-pagamento">
        <span>
          4 interest-free payments of ${calcularParcelas()} CAD with{" "}
          <a href="#" className="link-klarna">
            Klarna.
          </a>{" "}
          or{" "}
          <a href="#" className="link-afterpay">
            afterpay
          </a>
          <span className="info-icon">ℹ️</span>
        </span>
      </div>

      {/* Avaliações */}
      <div className="avaliacoes">
        <div className="estrelas">
          <span className="estrela">★</span>
          <span className="estrela">★</span>
          <span className="estrela">★</span>
          <span className="estrela">★</span>
          <span className="estrela">★</span>
        </div>
        <span className="numero-avaliacoes">122 reviews</span>
      </div>

      {/* Seleção de Cor */}
      <div className="selecao-cor">
        <label>Color: {corSelecionada}</label>
        <div className="cores-disponiveis">
          <button
            className={`cor-opcao ${
              corSelecionada === "Black" ? "selecionada" : ""
            }`}
            onClick={() => setCorSelecionada("Black")}
            style={{ backgroundColor: "#000" }}
          ></button>
          <button
            className={`cor-opcao ${
              corSelecionada === "White" ? "selecionada" : ""
            }`}
            onClick={() => setCorSelecionada("White")}
            style={{ backgroundColor: "#fff", border: "1px solid #ddd" }}
          ></button>
        </div>
      </div>

      {/* Seleção de Tamanho */}
      <div className="selecao-tamanho">
        <label>Size:</label>
        <div className="tamanhos-disponiveis">
          {["XXS", "XS", "S", "M", "L", "XL"].map((tamanho) => (
            <button
              key={tamanho}
              className={`tamanho-opcao ${
                tamanhoSelecionado === tamanho ? "selecionado" : ""
              } ${tamanho !== "XXS" ? "indisponivel" : ""}`}
              onClick={() =>
                tamanho === "XXS" && setTamanhoSelecionado(tamanho)
              }
              disabled={tamanho !== "XXS"}
            >
              {tamanho}
            </button>
          ))}
        </div>
        <a href="#" className="guia-tamanho">
          Size Guide <span className="ruler-icon">📏</span>
        </a>
      </div>

      {/* Promoção */}
      <div className="promocao">
        <span className="promocao-texto">
          • 50% Off Archive Sales. Discount applied in cart.
        </span>
      </div>

      {/* Controle de Quantidade */}
      <div className="controle-quantidade">
        <button
          className="btn-quantidade"
          onClick={() => onQuantidadeChange(quantidade - 1)}
          disabled={quantidade <= 1}
        >
          -
        </button>
        <span className="quantidade-atual">{quantidade}</span>
        <button
          className="btn-quantidade"
          onClick={() => onQuantidadeChange(quantidade + 1)}
          disabled={quantidade >= produto.estoque}
        >
          +
        </button>
      </div>

      {/* Botão de Comprar */}
      <button
        className="btn-comprar"
        onClick={onComprar}
        disabled={produto.estoque <= 0}
      >
        SELECT SIZE
      </button>
    </div>
  );
}
