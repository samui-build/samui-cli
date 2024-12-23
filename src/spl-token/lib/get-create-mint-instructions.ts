import { getCreateAccountInstruction } from '@solana-program/system'
import {
  type Extension,
  type ExtensionArgs,
  getInitializeMintInstruction,
  getMintSize,
  TOKEN_2022_PROGRAM_ADDRESS,
} from '@solana-program/token-2022'
import type { Address, TransactionSigner } from '@solana/web3.js'
import type { SolanaClient } from '../../solana/index.ts'

export async function getCreateMintInstructions(input: {
  authority: Address
  client: SolanaClient
  decimals?: number
  extensions?: ExtensionArgs[]
  freezeAuthority?: Address
  mint: TransactionSigner
  payer: TransactionSigner
  programAddress?: Address
}) {
  const space = getMintSize(input.extensions)
  const postInitializeExtensions: Extension['__kind'][] = [
    'TokenMetadata',
    'TokenGroup',
    'TokenGroupMember',
  ]
  const spaceWithoutPostInitializeExtensions = input.extensions
    ? getMintSize(
      input.extensions.filter(
        (e) => !postInitializeExtensions.includes(e.__kind),
      ),
    )
    : space
  const rent = await input.client.rpc
    .getMinimumBalanceForRentExemption(BigInt(space))
    .send()
  return [
    getCreateAccountInstruction({
      payer: input.payer,
      newAccount: input.mint,
      lamports: rent,
      space: spaceWithoutPostInitializeExtensions,
      programAddress: input.programAddress ?? TOKEN_2022_PROGRAM_ADDRESS,
    }),
    getInitializeMintInstruction({
      mint: input.mint.address,
      decimals: input.decimals ?? 0,
      freezeAuthority: input.freezeAuthority,
      mintAuthority: input.authority,
    }),
  ]
}
