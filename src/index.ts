import { Wallet, WalletUnlocked } from "fuels";
import dayjs from "dayjs";
import { join } from "path";
import fs from "fs";

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