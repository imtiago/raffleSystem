import QRCode from 'qrcode'

const generateQR = async (url: string): Promise<string> => {
  try {
    const uriQr = await QRCode.toDataURL(url)
    return uriQr
    // console.log(    await QRCode.toString(JSON.stringify({nome:'tiago',content: text}),{type: 'terminal'}))
  } catch (err) {
    console.error(err)
    return '' 
  }
}

export default generateQR
