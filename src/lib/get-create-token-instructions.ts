import { SolanaClient } from '@samui/solana'
import { Address, IInstruction, type TransactionSigner } from '@solana/web3.js'
import { getCreateAccountInstruction } from '@solana-program/system'
import {
  ExtensionArgs,
  TOKEN_2022_PROGRAM_ADDRESS,
  getInitializeAccountInstruction,
  getTokenSize,
} from '@solana-program/token-2022'

export async function getCreateTokenInstructions(input: {
  client: SolanaClient
  extensions?: ExtensionArgs[]
  mint: Address
  owner: Address
  payer: TransactionSigner
  programAddress?: Address
  token: TransactionSigner
}): Promise<[IInstruction, IInstruction]> {
  const space = getTokenSize(input.extensions)
  const rent = await input.client.rpc.getMinimumBalanceForRentExemption(BigInt(space)).send()
  return [
    getCreateAccountInstruction({
      lamports: rent,
      newAccount: input.token,
      payer: input.payer,
      programAddress: input.programAddress ?? TOKEN_2022_PROGRAM_ADDRESS,
      space,
    }),
    getInitializeAccountInstruction({
      account: input.token.address,
      mint: input.mint,
      owner: input.owner,
    }),
  ]
}
