import Env from "@ioc:Adonis/Core/Env";

const gerenciaNetConfig = {
  // PRODUÇÃO = false
  // HOMOLOGAÇÃO = true
  sandbox: false,
  client_id: Env.get("seuClientId"),
  client_secret: Env.get("seuClientSecret"),
  pix_cert: Env.get("caminhoAteOCertificadoPix"),
};

export default gerenciaNetConfig;
