export const EnumTypeMessage = {
  error: { type: 'error', label: 'Falha' },
  warning: { type: 'warning', label: 'atenção' },
  info: { type: 'info', label: 'informacao' },
  success: { type: 'success', label: 'Sucesso' },
};

export const EnumStatusOrder = {
  AWAITING_PAYMENT: { status: 'AWAITING_PAYMENT', label: 'PENDENTE' },
  PAYMENT_RECEIVED: { status: 'PAYMENT_RECEIVED', label: 'RECEBIDO' },
};

export const EnumStatusUser = {
  inactive: { status: 'INATIVO', label: 'inativo' },
  active: { status: 'ATIVO', label: 'ativo' },
};

export const EnumStatusRaffle = {
  canceled: { status: 'CANCELED', label: 'cancelada' },
  accomplished: { status: 'ACCOMPLISHED', label: 'realizada' },
  pending: { status: 'PENDING', label: 'pendente' },
  postponed: { status: 'POSTPONED', label: 'adiada' },
};
