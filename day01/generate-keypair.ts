import { Keypair } from "@solana/web3.js";

const keypair_generated = Keypair.generate();
console.log(`The public key is: `, keypair_generated.publicKey.toBase58());
console.log(`The secret key is: `, keypair_generated.secretKey);
console.log(`✅ Finished!`);
