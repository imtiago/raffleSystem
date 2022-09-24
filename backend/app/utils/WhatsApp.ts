import * as venom from "venom-bot";

export interface QRCode {
  attempts: number;
  asciiQR: string;
  base64Qrimg: string;
  urlCode: string | undefined;
}

export default class WhatsApp {
  private cliente: venom.Whatsapp;
  private connected: boolean = false;
  private qrCode: QRCode;

  constructor(sessionName: string) {
    this.initialize(sessionName);
  }
  private async initialize(sessionName: string) {
    try {
      const cliente = await venom.create(
        sessionName,
        (
          qrCode: string,
          asciiQR: string,
          attempt: number,
          urlCode?: string
        ) => {
          this.qrCode = {
            attempts: attempt,
            asciiQR: asciiQR,
            base64Qrimg: qrCode,
            urlCode: urlCode,
          };
        },
        (statusSession) => {
          this.connected = [
            "isLogged",
            "qrReadSuccess",
            "chatsAvailable",
          ].includes(statusSession);
        },
        { autoClose: 60000 }
      );
      this.cliente = cliente;
    } catch (error) {
      console.log(error);
    }
  }

  get getQrCode(): QRCode {
    return this.qrCode;
  }
  get getConneted(): boolean {
    return this.connected;
  }

  public async sendText(to: string, body: string) {
    if (!this.connected) return { status: "notConnected" };
    const numberToSend = `55${to}@c.us`;
    await this.cliente.sendText(numberToSend, body);
    return { status: "ok" };
  }

  public async sendLink(to: string, link: string, msn: string) {
    if (!this.connected) return { status: "notConnected" };
    const numberToSend = `55${to}@c.us`;
    await this.cliente.sendLinkPreview(numberToSend, link, msn);
    return { status: "ok" };
  }
}
