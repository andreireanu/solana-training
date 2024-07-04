// Loaded address from Day01: 3NqWxyFg7fwZ1E4PqDNNZKaNpyYPpPqT4ABaCsmxP83E

import "dotenv/config";
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction
} from "@solana/web3.js"

import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMemoInstruction } from "@solana/spl-memo"
import { mintTo } from "@solana/spl-token";

async function main() {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    console.log("Connection Established!");

    const user = getKeypairFromEnvironment("SECRET_KEY");
    const tokenMintPubKey = new PublicKey("6gBzK6fUY3c4qyqpyuM5rUmpw9xdJwmhFAV4BH8sjfXC");
    const tokenAccountPubKey = new PublicKey("FAwgukZzP3Ln2NcHu8Vdqf71wK9MsutFKTMGCxKZFB3f");

    console.log("User: " + user.publicKey.toBase58());

    const txSign = await mintTo(
        connection,
        user,
        tokenMintPubKey,
        tokenAccountPubKey,
        user,
        100 * 10 ** 2,
    );
    console.log(`Tx: ${txSign}`);
}

main().catch(err => {
    console.error(err);
});

