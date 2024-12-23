import { appendTransactionMessageInstructions, type IInstruction, pipe, type TransactionSigner } from '@solana/web3.js'
import { createDefaultTransaction } from './create-default-transaction.ts'
import type { SolanaClient } from './get-solana-client.ts'
import { signAndSendTransaction } from './sign-and-send-transaction.ts'

export async function sendAndConfirmInstructions(
  client: SolanaClient,
  payer: TransactionSigner,
  instructions: IInstruction[],
) {
  return pipe(
    await createDefaultTransaction(client, payer),
    (tx) => appendTransactionMessageInstructions(instructions, tx),
    (tx) => signAndSendTransaction(client, tx),
  )
}
