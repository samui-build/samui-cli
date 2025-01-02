import { sendAndConfirmInstructions } from '@samui/solana'
import { Address, Signature, TransactionSigner } from '@solana/web3.js'
import { getMintToInstruction } from '@solana-program/token-2022'

import { getCreateTokenInstructions } from './get-create-token-instructions.js'
import { getMint } from './get-mint.js'

export async function createTokenWithAmount(
  input: {
    amount: bigint | number
    mintAuthority: TransactionSigner
    tokenAccount: Address
  } & Omit<Parameters<typeof getCreateTokenInstructions>[0], 'owner' | 'token'>,
): Promise<Signature> {
  const mintInfo = await getMint({ client: input.client, mint: input.mint })
  const { decimals } = mintInfo.data
  const amount = BigInt(input.amount) * BigInt(10 ** decimals)

  const mintIx = getMintToInstruction({
    amount,
    mint: input.mint,
    mintAuthority: input.mintAuthority,
    token: input.tokenAccount,
  })

  return sendAndConfirmInstructions(input.client, input.payer, [mintIx])
}
