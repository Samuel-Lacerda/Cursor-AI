import React, { useState } from "react";
import * as yup from "yup";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import CampoTexto from "./CampoTexto";
import CampoEmail from "./CampoEmail";
import CampoTelefone from "./CampoTelefone";
import CampoMensagem from "./CampoMensagem";

/**
 * Schema de validação para o formulário de contato
 * Define as regras de validação para cada campo usando Yup
 */
const schema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório"),
  email: yup
    .string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório"),
  telefone: yup
    .string()
    .matches(
      /^\(\d{2}\) \d{4,5}-\d{4}$/,
      "Telefone deve estar no formato (11) 99999-9999"
    )
    .required("O telefone é obrigatório"),
  mensagem: yup.string().required("A mensagem é obrigatória"),
});

/**
 * Componente FormularioContato
 *
 * Gerencia o estado e validação do formulário de contato.
 * Utiliza componentes filhos para cada tipo de campo específico.
 *
 * @returns {JSX.Element} Formulário de contato completo com validação
 */
export default function FormularioContato() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });
  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);

  /**
   * Atualiza o valor de um campo específico no estado do formulário
   * @param {string} name - Nome do campo
   * @param {string} value - Novo valor do campo
   */
  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  /**
   * Processa o envio do formulário
   * Valida todos os campos usando Yup e exibe erros se houver
   * @param {Event} e - Evento de submit do formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await schema.validate(form, { abortEarly: false });
      setEnviado(true);
    } catch (err) {
      if (err.inner) {
        const formErrors = {};
        err.inner.forEach((error) => {
          formErrors[error.path] = error.message;
        });
        setErrors(formErrors);
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Contato</h1>

          {enviado ? (
            <Alert variant="success">
              Obrigado pelo contato! Responderemos em breve.
            </Alert>
          ) : (
            <Form onSubmit={handleSubmit} noValidate>
              <CampoTexto
                label="Nome"
                name="nome"
                value={form.nome}
                onChange={(value) => handleChange("nome", value)}
                error={errors.nome}
                required
              />

              <CampoEmail
                label="Email"
                name="email"
                value={form.email}
                onChange={(value) => handleChange("email", value)}
                error={errors.email}
                required
              />

              <CampoTelefone
                label="Telefone"
                name="telefone"
                value={form.telefone}
                onChange={(value) => handleChange("telefone", value)}
                error={errors.telefone}
                required
              />

              <CampoMensagem
                label="Mensagem"
                name="mensagem"
                value={form.mensagem}
                onChange={(value) => handleChange("mensagem", value)}
                error={errors.mensagem}
                required
              />

              <Button variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}
