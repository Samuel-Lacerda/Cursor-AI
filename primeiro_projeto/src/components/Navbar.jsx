import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

/**
 * Componente de navegação principal da aplicação
 *
 * Este componente renderiza uma barra de navegação responsiva com:
 * - Logo da empresa
 * - Links de navegação principais
 * - Menu mobile com hambúrguer
 * - Indicador visual da página ativa
 *
 * @returns {JSX.Element} Componente de navegação estilizado
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  /**
   * Alterna o estado do menu mobile
   *
   * Esta função controla a abertura e fechamento do menu mobile
   * quando o usuário clica no botão hambúrguer
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Fecha o menu mobile
   *
   * Esta função é chamada quando o usuário clica em um link
   * para fechar automaticamente o menu mobile
   */
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  /**
   * Verifica se um link está ativo baseado na rota atual
   *
   * @param {string} path - Caminho da rota a ser verificada
   * @returns {boolean} True se o link estiver ativo, false caso contrário
   */
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu}>
            <span className="logo-text">TechStore</span>
            <span className="logo-icon">🛍️</span>
          </Link>
        </div>

        {/* Menu Desktop */}
        <div className="navbar-menu desktop-menu">
          <Link
            to="/"
            className={`nav-link ${isActiveLink("/") ? "active" : ""}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/sobre"
            className={`nav-link ${isActiveLink("/sobre") ? "active" : ""}`}
            onClick={closeMenu}
          >
            Sobre a Empresa
          </Link>
          <Link
            to="/contato"
            className={`nav-link ${isActiveLink("/contato") ? "active" : ""}`}
            onClick={closeMenu}
          >
            Contato
          </Link>
        </div>

        {/* Botão do Menu Mobile */}
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? "active" : ""}`}></span>
          <span className={`hamburger ${isMenuOpen ? "active" : ""}`}></span>
          <span className={`hamburger ${isMenuOpen ? "active" : ""}`}></span>
        </div>

        {/* Menu Mobile */}
        <div
          className={`navbar-menu mobile-menu ${isMenuOpen ? "active" : ""}`}
        >
          <Link
            to="/"
            className={`nav-link ${isActiveLink("/") ? "active" : ""}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/sobre"
            className={`nav-link ${isActiveLink("/sobre") ? "active" : ""}`}
            onClick={closeMenu}
          >
            Sobre a Empresa
          </Link>
          <Link
            to="/contato"
            className={`nav-link ${isActiveLink("/contato") ? "active" : ""}`}
            onClick={closeMenu}
          >
            Contato
          </Link>
        </div>
      </div>
    </nav>
  );
}
