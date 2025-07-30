import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProdutoDetalhes.css";
import GaleriaImagens from "../components/ProdutoDetalhes/GaleriaImagens";
import InformacoesProduto from "../components/ProdutoDetalhes/InformacoesProduto";
import DescricaoProduto from "../components/ProdutoDetalhes/DescricaoProduto";

export default function ProdutoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantidade, setQuantidade] = useState(1);

  // Simulando dados do produto baseado no ID
  const produtos = [
    {
      id: 1,
      nome: "WAVE TEE",
      preco: "$59.00",
      precoOriginal: "$79.00",
      imagens: [
        "https://picsum.photos/600/800?random=1",
        "https://picsum.photos/600/800?random=2",
        "https://picsum.photos/600/800?random=3",
        "https://picsum.photos/600/800?random=4",
      ],
      descricao: "Tech Jersey",
      descricaoCompleta:
        "Our fan favourite, this asymmetrical T-shirt silhouette is designed in our soft and functional Tech Tee fabric to be an elevated version of your favourite basic. This feminine style drapes in all the right places. The only question is how many colours do you need?",
      especificacoes: [
        "Material: Tech Jersey",
        "Fit: Relaxed",
        "Care: Machine wash cold",
        "Made in: Portugal",
        "Sustainably made",
      ],
      estoque: 15,
      categoria: "Bestsellers",
    },
    {
      id: 2,
      nome: "Notebook Dell Inspiron",
      preco: "R$ 3.299,00",
      precoOriginal: "R$ 3.799,00",
      imagens: [
        "https://picsum.photos/600/800?random=5",
        "https://picsum.photos/600/800?random=6",
        "https://picsum.photos/600/800?random=7",
        "https://picsum.photos/600/800?random=8",
      ],
      descricao: "Notebook para trabalho e estudos com processador Intel i5",
      descricaoCompleta:
        "O Dell Inspiron é perfeito para trabalho e estudos. Equipado com processador Intel Core i5 de 11ª geração, 8GB de RAM DDR4, SSD de 256GB e tela de 15.6 polegadas Full HD. Sistema operacional Windows 11 Home incluído. Design elegante e leve, ideal para uso diário.",
      especificacoes: [
        "Processador: Intel Core i5-1135G7",
        "RAM: 8GB DDR4",
        "Armazenamento: SSD 256GB",
        'Tela: 15.6" Full HD',
        "Sistema: Windows 11 Home",
        "Peso: 1.8kg",
        "Bateria: Até 8 horas",
      ],
      estoque: 8,
      categoria: "Notebooks",
    },
    {
      id: 3,
      nome: "Fone de Ouvido Sony WH-1000XM4",
      preco: "R$ 1.899,00",
      precoOriginal: "R$ 2.199,00",
      imagens: [
        "https://picsum.photos/600/800?random=9",
        "https://picsum.photos/600/800?random=10",
        "https://picsum.photos/600/800?random=11",
        "https://picsum.photos/600/800?random=12",
      ],
      descricao: "Fone wireless com cancelamento de ruído ativo",
      descricaoCompleta:
        "O Sony WH-1000XM4 é o fone de ouvido com melhor cancelamento de ruído do mercado. Equipado com tecnologia de cancelamento de ruído ativo, bateria de até 30 horas de uso, conectividade Bluetooth 5.0 e aplicativo Sony Headphones Connect para personalização completa do som.",
      especificacoes: [
        "Tipo: Over-ear wireless",
        "Cancelamento de ruído: Ativo",
        "Bateria: Até 30 horas",
        "Bluetooth: 5.0",
        "Peso: 254g",
        "Dobrável: Sim",
        "Microfone integrado: Sim",
      ],
      estoque: 25,
      categoria: "Áudio",
    },
    {
      id: 4,
      nome: 'Smart TV Samsung 55"',
      preco: "R$ 2.799,00",
      precoOriginal: "R$ 3.299,00",
      imagens: [
        "https://picsum.photos/600/800?random=13",
        "https://picsum.photos/600/800?random=14",
        "https://picsum.photos/600/800?random=15",
        "https://picsum.photos/600/800?random=16",
      ],
      descricao: "Smart TV 4K com sistema Android TV integrado",
      descricaoCompleta:
        "Smart TV Samsung de 55 polegadas com resolução 4K Ultra HD. Sistema operacional Tizen, conectividade Wi-Fi e Bluetooth, múltiplas entradas HDMI e USB. Compatível com Netflix, YouTube, Prime Video e outros serviços de streaming. Design elegante com bordas finas.",
      especificacoes: [
        'Tela: 55" 4K Ultra HD',
        "Sistema: Tizen OS",
        "HDR: Sim",
        "Entradas: 3 HDMI, 2 USB",
        "Wi-Fi: Sim",
        "Bluetooth: Sim",
        "Resolução: 3840x2160",
      ],
      estoque: 12,
      categoria: "TVs",
    },
    {
      id: 5,
      nome: "Tablet iPad Air",
      preco: "R$ 4.199,00",
      precoOriginal: "R$ 4.799,00",
      imagens: [
        "https://picsum.photos/600/800?random=17",
        "https://picsum.photos/600/800?random=18",
        "https://picsum.photos/600/800?random=19",
        "https://picsum.photos/600/800?random=20",
      ],
      descricao: "Tablet Apple com chip M1 e tela Retina",
      descricaoCompleta:
        "O iPad Air com chip M1 oferece performance excepcional para trabalho criativo e entretenimento. Tela Liquid Retina de 10.9 polegadas, câmera traseira de 12MP e frontal de 7MP. Compatível com Apple Pencil e Magic Keyboard. Sistema operacional iPadOS 15.",
      especificacoes: [
        'Tela: 10.9" Liquid Retina',
        "Chip: Apple M1",
        "Armazenamento: 256GB",
        "Câmera: 12MP traseira, 7MP frontal",
        "Sistema: iPadOS 15",
        "Apple Pencil: Compatível",
        "Bateria: Até 10 horas",
      ],
      estoque: 6,
      categoria: "Tablets",
    },
    {
      id: 6,
      nome: "Console PlayStation 5",
      preco: "R$ 3.999,00",
      precoOriginal: "R$ 4.499,00",
      imagens: [
        "https://picsum.photos/600/800?random=21",
        "https://picsum.photos/600/800?random=22",
        "https://picsum.photos/600/800?random=23",
        "https://picsum.photos/600/800?random=24",
      ],
      descricao: "Console de nova geração para jogos 4K",
      descricaoCompleta:
        "O PlayStation 5 é o console mais poderoso da Sony. Equipado com processador AMD Zen 2, GPU AMD RDNA 2, SSD ultra-rápido de 825GB e suporte a jogos 4K com até 120fps. Inclui controle DualSense com feedback háptico e gatilhos adaptativos.",
      especificacoes: [
        "Processador: AMD Zen 2",
        "GPU: AMD RDNA 2",
        "Armazenamento: SSD 825GB",
        "Resolução: Até 4K",
        "FPS: Até 120fps",
        "Ray Tracing: Sim",
        "Controle: DualSense incluído",
      ],
      estoque: 3,
      categoria: "Games",
    },
  ];

  const produto = produtos.find((p) => p.id === parseInt(id));

  if (!produto) {
    return (
      <div className="produto-nao-encontrado">
        <h2>Produto não encontrado</h2>
        <button onClick={() => navigate("/")}>Voltar para Home</button>
      </div>
    );
  }

  const handleComprar = () => {
    alert(`Produto "${produto.nome}" adicionado ao carrinho!`);
  };

  const handleQuantidadeChange = (novaQuantidade) => {
    if (novaQuantidade >= 1 && novaQuantidade <= produto.estoque) {
      setQuantidade(novaQuantidade);
    }
  };

  return (
    <div className="produto-detalhes-container">
      <div className="produto-detalhes">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate("/")}>Home</span>
          <span> / </span>
          <span>{produto.categoria}</span>
          <span> / </span>
          <span>{produto.nome}</span>
        </div>

        <div className="produto-content">
          {/* Galeria de Imagens */}
          <GaleriaImagens
            imagens={produto.imagens}
            nomeProduto={produto.nome}
          />

          {/* Informações do Produto */}
          <InformacoesProduto
            produto={produto}
            quantidade={quantidade}
            onQuantidadeChange={handleQuantidadeChange}
            onComprar={handleComprar}
          />
        </div>

        {/* Descrição do Produto */}
        <DescricaoProduto descricaoCompleta={produto.descricaoCompleta} />
      </div>
    </div>
  );
}
