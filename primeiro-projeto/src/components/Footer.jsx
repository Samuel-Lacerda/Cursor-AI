import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

/**
 * Componente Footer - Rodapé da aplicação
 *
 * Este componente renderiza o rodapé da aplicação com informações da empresa,
 * links de navegação, informações de contato e links para redes sociais.
 *
 * @returns {JSX.Element} Elemento JSX contendo o rodapé da aplicação
 */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Seção da Empresa */}
        <div className="footer-section">
          <h3>TechStore</h3>
          <p>
            Sua loja de eletrônicos de confiança. Oferecemos os melhores
            produtos com garantia e suporte técnico especializado.
          </p>
          <div className="social-links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-icon">📘</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-icon">📷</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-icon">🐦</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-icon">📺</span>
            </a>
          </div>
        </div>

        {/* Links Rápidos */}
        <div className="footer-section">
          <h4>Links Rápidos</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>
              <Link to="/produtos">Produtos</Link>
            </li>
            <li>
              <Link to="/sobre">Sobre Nós</Link>
            </li>
            <li>
              <Link to="/contato">Contato</Link>
            </li>
          </ul>
        </div>

        {/* Categorias */}
        <div className="footer-section">
          <h4>Categorias</h4>
          <ul className="footer-links">
            <li>
              <Link to="/categoria/smartphones">Smartphones</Link>
            </li>
            <li>
              <Link to="/categoria/notebooks">Notebooks</Link>
            </li>
            <li>
              <Link to="/categoria/tablets">Tablets</Link>
            </li>
            <li>
              <Link to="/categoria/acessorios">Acessórios</Link>
            </li>
          </ul>
        </div>

        {/* Informações de Contato */}
        <div className="footer-section">
          <h4>Contato</h4>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>
                Rua das Tecnologias, 123
                <br />
                São Paulo - SP, 01234-567
              </span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>(11) 9999-9999</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <span>contato@techstore.com.br</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕒</span>
              <span>
                Seg-Sex: 9h às 18h
                <br />
                Sáb: 9h às 14h
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Linha de Copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; 2024 TechStore. Todos os direitos reservados.</p>
          <div className="footer-bottom-links">
            <Link to="/politica-privacidade">Política de Privacidade</Link>
            <Link to="/termos-uso">Termos de Uso</Link>
            <Link to="/politica-trocas">Política de Trocas</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
