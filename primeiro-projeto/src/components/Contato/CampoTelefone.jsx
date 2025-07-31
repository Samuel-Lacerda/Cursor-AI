import React from "react";
import { Form } from "react-bootstrap";

/**
 * Componente CampoTelefone
 *
 * Renderiza um campo de telefone com formatação automática.
 * Aplica formatação (XX) XXXXX-XXXX conforme o usuário digita.
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
 * @returns {JSX.Element} Campo de telefone com formatação automática
 */
export default function CampoTelefone({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder = "(11) 99999-9999",
  id = "",
}) {
  /**
   * Formata o telefone automaticamente conforme o usuário digita
   * Remove caracteres não numéricos e aplica formatação (XX) XXXXX-XXXX
   * @param {Event} e - Evento de mudança
   */
  const handleTelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito

    if (value.length <= 11) {
      if (value.length >= 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      }
      if (value.length >= 9) {
        value = value.slice(0, 9) + "-" + value.slice(9);
      }
      if (value.length >= 14) {
        value = value.slice(0, 14) + "-" + value.slice(14);
      }
    }

    onChange(value);
  };

  return (
    <Form.Group className="mb-3" controlId={id || `form${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="tel"
        name={name}
        value={value}
        onChange={handleTelefoneChange}
        placeholder={placeholder}
        isInvalid={!!error}
        required={required}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Text className="text-muted">
        Digite apenas os números, a formatação será aplicada automaticamente
      </Form.Text>
    </Form.Group>
  );
}
