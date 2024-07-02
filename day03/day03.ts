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

async function main() {
    const sender = getKeypairFromEnvironment("SECRET_KEY");
    console.log("Sender: " + sender.publicKey.toBase58());

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    console.log("Connection Established!");

    const receiver = new PublicKey("86UvDCizz6cfGQuR9fNpNct76VKV5wXRGwvtFNhVh9SQ");
    console.log("Receiver: " + receiver);

    const balance = await connection.getBalance(receiver);
    console.log(`Receiver balance ${balance / LAMPORTS_PER_SOL} SOL`);

    const transaction = new Transaction();
    const transferInstrunction = SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: receiver,
        lamports: 0.1 * LAMPORTS_PER_SOL,
    });
    transaction.add(transferInstrunction);

    const memo = "Hagi titular :cry:";
    const memoInstruction = createMemoInstruction(memo);
    transaction.add(memoInstruction);

    const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);
    console.log(`Transaction confirmed. Signature: ${signature}`);

}

main().catch(err => {
    console.error(err);
});