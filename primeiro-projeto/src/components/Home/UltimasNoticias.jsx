import React from "react";
import "./UltimasNoticias.css";

/**
 * Componente UltimasNoticias
 *
 * Exibe as últimas notícias do blog da TechStore em um layout de cards responsivo.
 * Cada notícia contém título, resumo, data de publicação e imagem.
 *
 * @returns {JSX.Element} Seção com as últimas notícias do blog
 */
export default function UltimasNoticias() {
  /**
   * Array com as últimas notícias do blog
   * Cada notícia contém: id, titulo, resumo, data, imagem, categoria
   */
  const noticias = [
    {
      id: 1,
      titulo: "Novos Smartphones 2024: O que esperar?",
      resumo:
        "Descubra as principais tendências e lançamentos esperados para smartphones em 2024, incluindo recursos de IA e câmeras revolucionárias.",
      data: "15/01/2024",
      imagem: "https://picsum.photos/300/200?random=20",
      categoria: "Tecnologia",
    },
    {
      id: 2,
      titulo: "Guia Completo: Como escolher o notebook ideal",
      resumo:
        "Aprenda os critérios essenciais para escolher o notebook perfeito para suas necessidades, desde processadores até armazenamento.",
      data: "12/01/2024",
      imagem: "https://picsum.photos/300/200?random=21",
      categoria: "Dicas",
    },
    {
      id: 3,
      titulo: "Gaming em 2024: Os melhores periféricos",
      resumo:
        "Conheça os headsets, mouses e teclados mais recomendados para gamers em 2024, com foco em performance e conforto.",
      data: "10/01/2024",
      imagem: "https://picsum.photos/300/200?random=22",
      categoria: "Gaming",
    },
    {
      id: 4,
      titulo: "Smart Home: Automatize sua casa com tecnologia",
      resumo:
        "Descubra como transformar sua casa em uma smart home com dispositivos inteligentes que facilitam o dia a dia.",
      data: "08/01/2024",
      imagem: "https://picsum.photos/300/200?random=23",
      categoria: "Smart Home",
    },
  ];

  /**
   * Formata a data para exibição
   * @param {string} data - Data no formato DD/MM/YYYY
   * @returns {string} Data formatada para exibição
   */
  const formatarData = (data) => {
    const [dia, mes, ano] = data.split("/");
    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return `${dia} de ${meses[parseInt(mes) - 1]} de ${ano}`;
  };

  return (
    <section className="ultimas-noticias">
      <div className="noticias-header">
        <h2>Últimas do Blog</h2>
        <p>
          Fique por dentro das novidades e tendências do mundo da tecnologia
        </p>
      </div>

      <div className="noticias-grid">
        {noticias.map((noticia) => (
          <article key={noticia.id} className="noticia-card">
            <div className="noticia-imagem">
              <img src={noticia.imagem} alt={noticia.titulo} />
              <span className="noticia-categoria">{noticia.categoria}</span>
            </div>
            <div className="noticia-conteudo">
              <div className="noticia-meta">
                <span className="noticia-data">
                  {formatarData(noticia.data)}
                </span>
              </div>
              <h3 className="noticia-titulo">{noticia.titulo}</h3>
              <p className="noticia-resumo">{noticia.resumo}</p>
              <button className="ler-mais-btn">Ler mais</button>
            </div>
          </article>
        ))}
      </div>

      <div className="noticias-footer">
        <button className="ver-todas-btn">Ver todas as notícias</button>
      </div>
    </section>
  );
}
