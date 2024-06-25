import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const keypair_secret_key = getKeypairFromEnvironment("SECRET_KEY");
console.log(
    `✅ Finished! We've loaded our keypair securely, using an env file! Our public key is: ${keypair_secret_key.publicKey.toBase58()}`
);