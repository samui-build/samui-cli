import { getCreateAccountInstruction } from '@solana-program/system'
import { getMintSize, TOKEN_2022_PROGRAM_ADDRESS } from '@solana-program/token-2022'
import type { TransactionSigner } from '@solana/web3.js'
import type { SolanaClient } from '../../solana/index.ts'

export async function createTokenMint({ client, mint, signer }: {
  client: SolanaClient
  mint: TransactionSigner
  signer: TransactionSigner
}) {
  const requiredSpace = getMintSize(undefined)
  const requiredRent = await client.rpc.getMinimumBalanceForRentExemption(
    BigInt(requiredSpace),
  ).send()

  return getCreateAccountInstruction({
    lamports: requiredRent,
    newAccount: mint,
    payer: signer,
    programAddress: TOKEN_2022_PROGRAM_ADDRESS,
    space: requiredSpace,
  })
}
