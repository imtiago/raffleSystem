import whatsapp from "Config/whatsapp";
export default class Whatsapp {
  public async onSendLink(data) {
    const { phone, message, link} = data;

    // await whatsapp.sendLink(phone,link,message)
    console.log("mensage enviada com sucesso")
  }
  
  public async onSendText(data) {
    const { phone, message } = data;

    // await whatsapp.sendText(phone,message)
    console.log("mensage enviada com sucesso")
  }
}
