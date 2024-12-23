import {
  getPostInitializeInstructionsForMintExtensions,
  getPreInitializeInstructionsForMintExtensions,
} from '@solana-program/token-2022'
import { generateKeyPairSigner, type Signature, type TransactionSigner } from '@solana/web3.js'
import { sendAndConfirmInstructions } from '../../solana/index.ts'
import { getCreateMintInstructions } from './get-create-mint-instructions.ts'

export async function createMint(
  input:
    & Omit<
      Parameters<typeof getCreateMintInstructions>[0],
      'authority' | 'mint'
    >
    & {
      authority: TransactionSigner
      mint?: TransactionSigner
    },
): Promise<Signature> {
  const mint = input.mint ?? (await generateKeyPairSigner())
  const [createAccount, initMint] = await getCreateMintInstructions({
    ...input,
    authority: input.authority.address,
    mint,
  })
  return await sendAndConfirmInstructions(input.client, input.payer, [
    createAccount,
    ...getPreInitializeInstructionsForMintExtensions(
      mint.address,
      input.extensions ?? [],
    ),
    initMint,
    ...getPostInitializeInstructionsForMintExtensions(
      mint.address,
      input.authority,
      input.extensions ?? [],
    ),
  ])
}
