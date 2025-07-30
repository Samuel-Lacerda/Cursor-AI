import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Sobre() {
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Sobre a Empresa</h1>
          <p>
            Somos uma empresa dedicada a fornecer soluções inovadoras para
            nossos clientes. Nosso compromisso é com a excelência, a ética e o
            desenvolvimento sustentável.
          </p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Missão</Card.Title>
              <Card.Text>
                Oferecer soluções tecnológicas de alta qualidade que agreguem
                valor aos nossos clientes e à sociedade.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Visão</Card.Title>
              <Card.Text>
                Ser referência em inovação e excelência no setor, promovendo o
                crescimento sustentável e a transformação digital.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Valores</Card.Title>
              <Card.Text>
                Ética, transparência, respeito, colaboração e foco no cliente
                são os pilares que sustentam nossa atuação.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Nossa Equipe</h2>
          <p>
            Contamos com um time multidisciplinar de profissionais apaixonados
            por tecnologia, inovação e resultados. Juntos, buscamos superar
            desafios e entregar sempre o melhor para nossos clientes.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
