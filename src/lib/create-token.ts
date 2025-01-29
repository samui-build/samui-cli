import { sendAndConfirmInstructions } from '@samui/solana'
import { Address, TransactionSigner, generateKeyPairSigner } from '@solana/web3.js'
import { getPostInitializeInstructionsForTokenExtensions } from '@solana-program/token-2022'

import { getCreateTokenInstructions } from './get-create-token-instructions.js'

export async function createToken(
  input: { owner: TransactionSigner } & Omit<Parameters<typeof getCreateTokenInstructions>[0], 'owner' | 'token'>,
): Promise<Address> {
  const token = await generateKeyPairSigner()
  const [createAccount, initToken] = await getCreateTokenInstructions({
    ...input,
    owner: input.owner.address,
    token,
  })
  await sendAndConfirmInstructions(input.client, input.payer, [
    createAccount,
    initToken,
    ...getPostInitializeInstructionsForTokenExtensions(token.address, input.owner, input.extensions ?? []),
  ])
  return token.address
}
