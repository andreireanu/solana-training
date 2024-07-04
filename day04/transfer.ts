import "dotenv/config";
import {
    Connection,
    PublicKey,
    clusterApiUrl,
    sendAndConfirmTransaction
} from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { transfer, getAccount, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

async function main() {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    console.log("Connection Established!");

    const user = getKeypairFromEnvironment("SECRET_KEY");
    const receiverPubKey = new PublicKey("ENJKFtXkFG6Cj4oJAXYdw5d8qF1pyokeB6XtwGs7PJ1m");
    const tokenAccountPubKey = new PublicKey("FAwgukZzP3Ln2NcHu8Vdqf71wK9MsutFKTMGCxKZFB3f");

    const userTokenAccount = await getAccount(connection, tokenAccountPubKey);
    const receiverTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        user,
        userTokenAccount.mint,
        receiverPubKey
    );

    const tx = await transfer(
        connection,
        user,
        userTokenAccount.address,
        receiverTokenAccount.address,
        user,
        10 * 10 ** 2,
    );
    console.log(`Tx: ${tx}`);
}

main().catch(err => {
    console.error(err);
});
