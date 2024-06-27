// Loaded address from Day01: 3NqWxyFg7fwZ1E4PqDNNZKaNpyYPpPqT4ABaCsmxP83E

import "dotenv/config";
import { airdropIfRequired } from "@solana-developers/helpers";
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl,
    Keypair
} from "@solana/web3.js"

import { getKeypairFromEnvironment } from "@solana-developers/helpers";

import bs58 from "bs58";

async function main() {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    console.log("Connection Established!");

    const publicKey = new PublicKey("3NqWxyFg7fwZ1E4PqDNNZKaNpyYPpPqT4ABaCsmxP83E");

    const keyFromEnv = getKeypairFromEnvironment("SECRET_KEY");
    const newKey = bs58.encode(keyFromEnv.secretKey);
    console.log(`key: ${newKey}`);

    await airdropIfRequired(
        connection,
        publicKey,
        2 * LAMPORTS_PER_SOL,
        0.5 * LAMPORTS_PER_SOL
    );

    const balanceInLamport = await connection.getBalance(publicKey);
    console.log("Balance: ", balanceInLamport / LAMPORTS_PER_SOL, "SOL");
}

main().catch(err => {
    console.error(err);
});