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
import { getOrCreateAssociatedTokenAccount, createMint } from "@solana/spl-token";

const MINOR_PER_MAJOR = Math.pow(10, 2);
const TOKEN_MINT_ADDRESS = "6gBzK6fUY3c4qyqpyuM5rUmpw9xdJwmhFAV4BH8sjfXC";
const RECIPIENT_ADDRESS = "DpsfBmBFEyuP9egmj2ePtZA4Fsxj3iuC2Mas6H8g1WdP";

async function main() {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    console.log("Connection Established!");

    const user = getKeypairFromEnvironment("SECRET_KEY");
    const tokenMintAccount = new PublicKey(TOKEN_MINT_ADDRESS);
    const recipient = new PublicKey(RECIPIENT_ADDRESS);
    console.log("User: " + user.publicKey.toBase58());

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        user,
        tokenMintAccount,
        user.publicKey,
    );
    console.log(`Token account address: ${tokenAccount.address}`);

    // Token account address: FAwgukZzP3Ln2NcHu8Vdqf71wK9MsutFKTMGCxKZFB3f
}

main().catch(err => {
    console.error(err);
});

