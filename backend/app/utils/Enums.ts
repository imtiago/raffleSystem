export interface IStatusProduct {
  // name: string
  id: string;
  label: string;
}
export const EnumStatusProduct = {
  canceled: { status: "CANCELED", label: "cancelada" },
  accomplished: { status: "ACCOMPLISHED", label: "realizada" },
  pending: { status: "PENDING", label: "pendente" },
  postponed: { status: "POSTPONED", label: "adiada" },
};

export const EnumStatusUser = {
  inactive: { status: "INATIVO", label: "inativo" },
  active: { status: "ATIVO", label: "ativo" },
};

export const EnumTypeMessage = {
  error: { type: "error", label: "Ocorreu um erro" },
  warning: { type: "warning", label: "atenção" },
  info: { type: "info", label: "informacao" },
  success: { type: "success", label: "sucesso" },
};
