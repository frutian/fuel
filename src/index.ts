import { Wallet, WalletUnlocked } from "fuels";
import dayjs from "dayjs";
import { join } from "path";
import fs from "fs";
//import fetch from 'node-fetch';
import Captcha from "2captcha";

const WALLETS_COUNT = 100





async function main() {
  let wallets = [];
  for (let i = 0; i < WALLETS_COUNT; i++) {
    const myWallet: WalletUnlocked = Wallet.generate();
    wallets.push({
      index: i,
      address: myWallet.address.toAddress(),
      privateKey: myWallet.privateKey
    })
  }

  const date = dayjs().format('YYYY-MM-DD');
  const basePath = join(__dirname, '../accounts', `${date}_${Date.now()}.json`);
  fs.writeFileSync(basePath, JSON.stringify(wallets, null, "    "));

}

main().catch(console.error);


// async function callFaucet() {
//   solver.recaptcha('6Ld3cEwfAAAAAMd4QTs7aO85LyKGdgj0bFsdBfre', 'https://faucet-beta-4.fuel.network/')
//     .then(async (res: any) => {
//       console.log(res);
//       //
//       const response = await fetch('https://faucet-beta-4.fuel.network/dispense', {
//         method: 'POST',
//         body: JSON.stringify({
//           address: 'fuel1ar93uv2y73jdzd80ykx2t43fxc7d04wxr0dx4hygg6prs2qzdugqddff6f',
//           captcha: res.data,
//         }),
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//       });
//     })
//     .catch((err: any) => {
//       console.log(err);
//     })
// }

// callFaucet().catch(console.error)