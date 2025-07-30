import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import ProdutoDetalhes from "./pages/ProdutoDetalhes";
import "./App.css";

function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <Link to="/">Home</Link>
        <Link to="/sobre">Sobre a Empresa</Link>
        <Link to="/contato">Contato</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/produto/:id" element={<ProdutoDetalhes />} />
      </Routes>
    </Router>
  );
}

export default App;
