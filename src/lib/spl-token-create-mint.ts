import { sendAndConfirmInstructions } from '@samui/solana'
import { type Signature, type TransactionSigner, generateKeyPairSigner } from '@solana/web3.js'
import {
  extension,
  getInitializeMintCloseAuthorityInstruction,
  getPostInitializeInstructionsForMintExtensions,
  getPreInitializeInstructionsForMintExtensions,
} from '@solana-program/token-2022'

import { getCreateMintInstructions } from './get-create-mint-instructions.js'

export async function splTokenCreateMint(
  input: {
    authority: TransactionSigner
    mint?: TransactionSigner
  } & Omit<Parameters<typeof getCreateMintInstructions>[0], 'authority' | 'mint'>,
): Promise<Signature> {
  const mint = input.mint ?? (await generateKeyPairSigner())

  const mintCloseAuthorityExtension = extension('MintCloseAuthority', {
    closeAuthority: input.authority.address,
  })
  const extensions = [mintCloseAuthorityExtension, ...(input.extensions ?? [])]
  const [createAccount, initMint] = await getCreateMintInstructions({
    ...input,
    authority: input.authority.address,
    extensions,
    mint,
  })

  return sendAndConfirmInstructions(input.client, input.payer, [
    createAccount,
    // eslint-disable-next-line no-warning-comments
    // TODO: Remove when this is merged: https://github.com/solana-program/token-2022/pull/54
    getInitializeMintCloseAuthorityInstruction({
      closeAuthority: input.authority.address,
      mint: mint.address,
    }),
    ...getPreInitializeInstructionsForMintExtensions(mint.address, extensions ?? []),
    initMint,
    ...getPostInitializeInstructionsForMintExtensions(mint.address, input.authority, extensions ?? []),
  ])
}
