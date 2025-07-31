import React from "react";
import { Form } from "react-bootstrap";

/**
 * Componente CampoTexto
 *
 * Renderiza um campo de texto simples com validação e feedback de erro.
 * Utilizado para campos como nome, sobrenome, etc.
 *
 * @param {Object} props - Propriedades do componente
 * @param {string} props.label - Label do campo
 * @param {string} props.name - Nome do campo (atributo name)
 * @param {string} props.value - Valor atual do campo
 * @param {Function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.error - Mensagem de erro (opcional)
 * @param {boolean} props.required - Se o campo é obrigatório
 * @param {string} props.placeholder - Texto placeholder (opcional)
 * @param {string} props.id - ID do campo (opcional)
 *
 * @returns {JSX.Element} Campo de texto com validação
 */
export default function CampoTexto({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder = "",
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
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        isInvalid={!!error}
        required={required}
        placeholder={placeholder}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}
