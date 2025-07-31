import React from "react";
import { Form } from "react-bootstrap";

/**
 * Componente CampoMensagem
 *
 * Renderiza um campo de texto multilinha (textarea) para mensagens.
 * Ideal para campos de comentários, mensagens, descrições longas.
 *
 * @param {Object} props - Propriedades do componente
 * @param {string} props.label - Label do campo
 * @param {string} props.name - Nome do campo (atributo name)
 * @param {string} props.value - Valor atual do campo
 * @param {Function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.error - Mensagem de erro (opcional)
 * @param {boolean} props.required - Se o campo é obrigatório
 * @param {string} props.placeholder - Texto placeholder (opcional)
 * @param {number} props.rows - Número de linhas visíveis (padrão: 4)
 * @param {string} props.id - ID do campo (opcional)
 *
 * @returns {JSX.Element} Campo de mensagem (textarea) com validação
 */
export default function CampoMensagem({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder = "Digite sua mensagem aqui...",
  rows = 4,
  id = "",
}) {
  /**
   * Manipula a mudança no valor do campo
   * @param {Event} e - Evento de mudança
   */
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <Form.Group className="mb-3" controlId={id || `form${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        name={name}
        value={value}
        onChange={handleChange}
        isInvalid={!!error}
        required={required}
        rows={rows}
        placeholder={placeholder}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}
