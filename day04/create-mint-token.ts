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
const TOKEN_MINT_ADDRESS = "DK7QyfjRp6aqjPLhzh9ya6o17t2LBWJg9s6DqvpmTSh9";
const RECIPEINT_ADDRESS = "DpsfBmBFEyuP9egmj2ePtZA4Fsxj3iuC2Mas6H8g1WdP";

async function main() {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    console.log("Connection Established!");

    const user = getKeypairFromEnvironment("SECRET_KEY");
    const tokenMintAccount = new PublicKey(TOKEN_MINT_ADDRESS);
    const recipient = new PublicKey(RECIPEINT_ADDRESS);
    console.log("User: " + user.publicKey.toBase58());

    const tokenMint = await createMint(
        connection,
        user,
        user.publicKey,
        null,
        2
    );
    console.log(`Token mint address: ${tokenMint}`);

    // Token mint address: 6gBzK6fUY3c4qyqpyuM5rUmpw9xdJwmhFAV4BH8sjfXC 

    main().catch(err => {
        console.error(err);
    });
}
