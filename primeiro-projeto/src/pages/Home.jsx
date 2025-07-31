import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import UltimasNoticias from "../components/Home/UltimasNoticias";

export default function Home() {
  const produtos = [
    {
      id: 1,
      nome: "Smartphone Galaxy S23",
      preco: "R$ 2.499,00",
      imagem: "https://picsum.photos/300/200?random=1",
      descricao: "Smartphone de última geração com câmera de 108MP",
    },
    {
      id: 2,
      nome: "Notebook Dell Inspiron",
      preco: "R$ 3.299,00",
      imagem: "https://picsum.photos/300/200?random=2",
      descricao: "Notebook para trabalho e estudos com processador Intel i5",
    },
    {
      id: 3,
      nome: "Fone de Ouvido Sony WH-1000XM4",
      preco: "R$ 1.899,00",
      imagem: "https://picsum.photos/300/200?random=3",
      descricao: "Fone wireless com cancelamento de ruído ativo",
    },
    {
      id: 4,
      nome: 'Smart TV Samsung 55"',
      preco: "R$ 2.799,00",
      imagem: "https://picsum.photos/300/200?random=4",
      descricao: "Smart TV 4K com sistema Android TV integrado",
    },
    {
      id: 5,
      nome: "Tablet iPad Air",
      preco: "R$ 4.199,00",
      imagem: "https://picsum.photos/300/200?random=5",
      descricao: "Tablet Apple com chip M1 e tela Retina",
    },
    {
      id: 6,
      nome: "Console PlayStation 5",
      preco: "R$ 3.999,00",
      imagem: "https://picsum.photos/300/200?random=6",
      descricao: "Console de nova geração para jogos 4K",
    },
  ];

  return (
    <div className="home-container">
      {/* Banner Principal */}
      <section className="banner">
        <div className="banner-content">
          <h1>TechStore - Sua Loja de Eletrônicos</h1>
          <p>As melhores marcas e os preços mais baixos do mercado!</p>
          <div className="banner-features">
            <div className="feature">
              <span className="feature-icon">🚚</span>
              <span>Entrega Grátis</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🛡️</span>
              <span>Garantia Estendida</span>
            </div>
            <div className="feature">
              <span className="feature-icon">💳</span>
              <span>Parcelamento</span>
            </div>
          </div>
          <button className="cta-button">Ver Ofertas</button>
        </div>
        <div className="banner-image">
          <img
            src="https://picsum.photos/400/300?random=10"
            alt="TechStore Banner"
          />
        </div>
      </section>

      {/* Seção de Produtos */}
      <section className="produtos-section">
        <h2>Produtos em Destaque</h2>
        <div className="produtos-grid">
          {produtos.map((produto) => (
            <div key={produto.id} className="produto-card">
              <Link to={`/produto/${produto.id}`} className="produto-link">
                <div className="produto-imagem">
                  <img src={produto.imagem} alt={produto.nome} />
                </div>
                <div className="produto-info">
                  <h3>{produto.nome}</h3>
                  <p className="produto-descricao">{produto.descricao}</p>
                  <p className="produto-preco">{produto.preco}</p>
                </div>
              </Link>
              <button className="comprar-button">Adicionar ao Carrinho</button>
            </div>
          ))}
        </div>
      </section>

      {/* Componente de Últimas Notícias */}
      <UltimasNoticias />
    </div>
  );
}
