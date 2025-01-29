import { SolanaClient, sendAndConfirmInstructions } from '@samui/solana'
import { Address, type TransactionSigner } from '@solana/web3.js'
import { getMintToInstruction } from '@solana-program/token-2022'

export interface SplTokenMintToOptions {
  amount: number
  client: SolanaClient
  mint: Address
  mintAuthority: TransactionSigner
  payer: TransactionSigner
  token: Address
}

export async function splTokenMintTo(options: SplTokenMintToOptions) {
  const mintToInstruction = getMintToInstruction({
    amount: options.amount,
    mint: options.mint,
    mintAuthority: options.mintAuthority,
    token: options.token,
  })

  return sendAndConfirmInstructions(options.client, options.payer, [mintToInstruction])
}
