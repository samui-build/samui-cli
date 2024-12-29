import type { Address, IInstruction, TransactionSigner } from '@solana/web3.js'

import { SolanaClient } from '@samui/solana'
import { getCreateAccountInstruction } from '@solana-program/system'
import {
  type Extension,
  type ExtensionArgs,
  TOKEN_2022_PROGRAM_ADDRESS,
  getInitializeMintInstruction,
  getMintSize,
} from '@solana-program/token-2022'

export async function getCreateMintInstructions(input: {
  authority: Address
  client: SolanaClient
  decimals?: number
  extensions?: ExtensionArgs[]
  freezeAuthority?: Address
  mint: TransactionSigner
  payer: TransactionSigner
  programAddress?: Address
}): Promise<IInstruction[]> {
  const space = getMintSize(input.extensions)
  // eslint-disable-next-line unicorn/prefer-set-has
  const postInitializeExtensions: Extension['__kind'][] = ['TokenMetadata', 'TokenGroup', 'TokenGroupMember']
  const spaceWithoutPostInitializeExtensions = input.extensions
    ? getMintSize(input.extensions.filter((e) => !postInitializeExtensions.includes(e.__kind)))
    : space
  const rent = await input.client.rpc.getMinimumBalanceForRentExemption(BigInt(space)).send()
  return [
    getCreateAccountInstruction({
      lamports: rent,
      newAccount: input.mint,
      payer: input.payer,
      programAddress: input.programAddress ?? TOKEN_2022_PROGRAM_ADDRESS,
      space: spaceWithoutPostInitializeExtensions,
    }),
    getInitializeMintInstruction({
      decimals: input.decimals ?? 0,
      freezeAuthority: input.freezeAuthority,
      mint: input.mint.address,
      mintAuthority: input.authority,
    }),
  ]
}
