import Env from "@ioc:Adonis/Core/Env";

const gerenciaNetConfig = {
  // PRODUÇÃO = false
  // HOMOLOGAÇÃO = true
  // sandbox: Env.get("GN_SANDBOX"),
  client_id: Env.get("GN_CLIENTE_ID"),
  client_secret: Env.get("GN_CLIENTE_SECRET"),
  // pix_cert: Env.get("GN_PATH_PIX_CERT"),
};

export default gerenciaNetConfig;
