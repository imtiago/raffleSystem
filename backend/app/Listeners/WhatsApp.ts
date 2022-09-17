import { create, SocketState, Whatsapp } from "venom-bot";

export interface QRCode {
  base64Qr: string;
}
export default class WhatsApp {
  private cliente: Whatsapp;
  // private connected: boolean;
  // private qrCode: QRCode;

  constructor(sessionName: string) {
    create(sessionName,
      //  this.updateQRCode,
        // this.updateStatus
        )
      .then(async (client) => {
        this.cliente = client;
        await this.cliente.sendText("68984241179","vá para o google https://www.google.com")
        client.onStateChange(state=>{
            // this.connected = state === SocketState.CONNECTED
        })
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  // get getQrCode(): QRCode {
  //   return this.qrCode;
  // }
  // get getConneted(): boolean {
  //   return this.connected;
  // }

  // private updateStatus(statusSession: string): void {
  //   this.connected = ["isLogged", "qrReadSuccess", "chatsAvailable"].includes(
  //     statusSession
  //   );
  // }

  // private updateQRCode(qr: string): void {
  //   // private updateQRCode({}:QRCode): void{
  //   this.qrCode.base64Qr = qr;
  // }
  async sendText(to: string, body: string) {
    // if (!this.connected) return;
    const numberToSend = `55${to}@c.us`;
    await this.cliente.sendText(numberToSend, body);
  }
}
