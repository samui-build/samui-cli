import type { Address, IInstruction, Signature, TransactionSigner } from '@solana/web3.js'

import { SolanaClient, sendAndConfirmInstructions } from '@samui/solana'
import {
  type CloseAccountInput,
  TOKEN_2022_PROGRAM_ADDRESS,
  getCloseAccountInstruction,
} from '@solana-program/token-2022'

import { getMint } from './get-mint.js'

interface SplTokenCloseMintOptions {
  account: Address
  client: SolanaClient
  owner: TransactionSigner
}

export async function splTokenCloseMint(options: SplTokenCloseMintOptions): Promise<Signature> {
  const { account, client, owner } = options
  const found = await getMint({ client, mint: account })

  if (!found) {
    throw new Error(`Account ${account} not found`)
  }

  if (Number(found.data.supply) > 0) {
    throw new Error(`Account ${account} has non-zero supply`)
  }

  const input: CloseAccountInput = {
    account: found.address,
    destination: owner.address,
    owner,
  }

  const closeAccountIx: IInstruction = getCloseAccountInstruction(input, { programAddress: TOKEN_2022_PROGRAM_ADDRESS })

  return sendAndConfirmInstructions(client, owner, [closeAccountIx])
}
