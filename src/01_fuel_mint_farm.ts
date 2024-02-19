import { BN, Wallet, Contract, WalletUnlocked, Provider, ContractFactory, Address } from "fuels";
import { join } from "path";
import { readFileSync } from 'fs';


const gasPrice = 1;
const gasLimit = 100000;

const FARM_ADDRESS = '0x4c6be4ed66b783f55e44a6d36290a73970a616ba33256636cf15ad5cded228d9'

async function main() {
  const filePaht = join(__dirname, '../accounts', `wallets.json`);
  var wallets = require(filePaht);
  for (var i = 0; i < 1; i++) {
    const PRIVATE_KEY = wallets[i].privateKey;
    const provider = new Provider('https://beta-4.fuel.network/graphql');
    const wallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);
    const balance = new BN(await wallet.getBalance()).toNumber();
    console.log(`Address: ${wallets[i].address} ETH Balance: ${balance}`);
    if (balance <= 1) {
      console.log(`Address: ${wallets[i].address} Insufficient balance ${balance}`);
      continue;
    }
    try {
      if (true) {
        const abiJsonPath = join(__dirname, `./abi/farm.json`);
        const abiJSON = JSON.parse(readFileSync(abiJsonPath, 'utf8'));

        const contract: Contract = new Contract(Address.fromString(FARM_ADDRESS),
          abiJSON,
          wallet);
        const { transactionResult } = await contract.functions
          .new_player()
          .txParams({
            gasPrice,
            gasLimit,
          })
          .call();
        console.log(transactionResult.status);
      }
    } catch (err) {
      console.log("Mint FARM failed: ", err);
    }
  }
}
main().catch(console.error);

