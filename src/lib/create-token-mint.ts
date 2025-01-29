import type { IInstruction, TransactionSigner } from '@solana/web3.js'

import { SolanaClient } from '@samui/solana'
import { getCreateAccountInstruction } from '@solana-program/system'
import { TOKEN_2022_PROGRAM_ADDRESS, getMintSize } from '@solana-program/token-2022'

export async function createTokenMint({
  client,
  mint,
  signer,
}: {
  client: SolanaClient
  mint: TransactionSigner
  signer: TransactionSigner
}): Promise<IInstruction> {
  const requiredSpace = getMintSize()
  const requiredRent = await client.rpc.getMinimumBalanceForRentExemption(BigInt(requiredSpace)).send()

  return getCreateAccountInstruction({
    lamports: requiredRent,
    newAccount: mint,
    payer: signer,
    programAddress: TOKEN_2022_PROGRAM_ADDRESS,
    space: requiredSpace,
  })
}
