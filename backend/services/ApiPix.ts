// import { join } from "path";
// import { fsReadAll } from "@ioc:Adonis/Core/Helpers";
// import { requireAll } from "@ioc:Adonis/Core/Helpers";
// import axios from "axios";
// import Env from "@ioc:Adonis/Core/Env";
// import Drive from "@ioc:Adonis/Core/Drive";
// import { DateTime } from "luxon";
// // import path from "path";

// const baseURL = Env.get("GN_ENDPOINT");
// const clientID = Env.get("GN_CLIENTE_ID");
// const clientSecret = Env.get("GN_CLIENTE_SECRET");
// const certPath = Env.get("GN_PATH_PIX_CERT");

// const https = require("https");

// // const cert = fs.readFileSync(
// //   path.resolve(__dirname, `../../certs/${certPath}`)
// // );
// const cert = (async () => {
//   // path.resolve(__dirname, `../../certs/${certPath}`)
//   // if (await Drive.exists(`../${certPath}`)) {

//   const t = requireAll(join(__dirname, `../certs/${certPath}`), false);

//   // fsReadAll(join(__dirname, `certs/${certPath}`));
//   // ['app.ts', 'bodyparser.ts', 'cors.ts']

//   // const t = path.resolve(__dirname, `../certs/${certPath}`);
//   console.log(t);
//   // if (await Drive.exists(t)) {
//   //   console.log("sim");
//   // const cet = await Drive.get(certPath);
//   // return cet;
//   // }
// })();

// // const agent = new https.Agent({
// //   pfx: await cert(),
// //   passphrase: "",
// // });
// interface IInforGN {
//   token: string | null;
//   hour: DateTime;
//   expiration: number;
// }
// const inforGN: IInforGN = {
//   token: null,
//   hour: DateTime.now(),
//   expiration: 0,
// };

// const configAxios = {
//   url: baseURL,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "",
//   },
//   // httpsAgent: agent,
// };

// const authenticate = async () => {
//   const credentials = Buffer.from(`${clientID}:${clientSecret}`).toString(
//     "base64"
//   );
//   configAxios.headers.Authorization = `Basic ${credentials}`;
//   try {
//     const response = await axios.create(configAxios).post("/oauth/token", {
//       grant_type: "client_credentials",
//     });
//     console.log(response.data);

//     return response.data;
//   } catch (err) {}
// };

// const GNRequest = async () => {
//   if (
//     !inforGN.token ||
//     DateTime.now().diff(inforGN.hour).seconds > inforGN.expiration
//   ) {
//     console.log(await cert);
//     // const token = await authenticate();
//     // console.log(token);
//     // inforGN.token = token.accessToken;
//     // inforGN.hour = DateTime.now();
//     // inforGN.expiration = token.expires_in;
//   } else {
//     console.log(inforGN.token);
//     console.log(inforGN.hour);
//   }
//   // if (DateTime.now().plus({seconds: inforGN.time}) || inforGN.token === null) {
//   // if (
//   //   DateTime.now().diff(DateTime.local(inforGN.hour)).seconds ||
//   //   inforGN.token === null
//   // ) {
//   //   const token = await authenticate();
//   //   inforGN.token = token.accessToken;
//   //   inforGN.hour = DateTime.now();
//   //   inforGN.time = token.expires_in;
//   // }
//   // configAxios.headers["Authorization"] = `Bearer ${inforGN.token}`;
//   // const api = axios(configAxios);
//   // return api;
//   // console.log(DateTime.now().diff(DateTime.local(inforGN.hour)).seconds);
//   return;
//   // return DateTime.now().diff(DateTime.local(inforGN.hour)).seconds;
// };

// export default GNRequest;
