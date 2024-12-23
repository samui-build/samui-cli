import {
  createTransactionMessage,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  type TransactionSigner,
} from '@solana/web3.js'
import type { SolanaClient } from './get-solana-client.ts'

export async function createDefaultTransaction(client: SolanaClient, feePayer: TransactionSigner) {
  const { value: latestBlockhash } = await client.rpc.getLatestBlockhash().send()

  return pipe(
    createTransactionMessage({ version: 0 }),
    (tx) => setTransactionMessageFeePayerSigner(feePayer, tx),
    (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
  )
}
