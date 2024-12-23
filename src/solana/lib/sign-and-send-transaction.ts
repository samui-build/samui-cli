import {
  type Commitment,
  type CompilableTransactionMessage,
  getSignatureFromTransaction,
  sendAndConfirmTransactionFactory,
  signTransactionMessageWithSigners,
  type TransactionMessageWithBlockhashLifetime,
} from '@solana/web3.js'
import type { SolanaClient } from './get-solana-client.ts'

export async function signAndSendTransaction(
  client: SolanaClient,
  transactionMessage: CompilableTransactionMessage & TransactionMessageWithBlockhashLifetime,
  commitment: Commitment = 'confirmed',
) {
  const signedTransaction = await signTransactionMessageWithSigners(transactionMessage)
  const signature = getSignatureFromTransaction(signedTransaction)
  await sendAndConfirmTransactionFactory(client)(signedTransaction, { commitment })
  return signature
}
