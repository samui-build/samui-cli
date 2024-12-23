import {
  type CloseAccountInput,
  getCloseAccountInstruction,
  TOKEN_2022_PROGRAM_ADDRESS
} from '@solana-program/token-2022'
import type { Address, Signature, TransactionSigner } from '@solana/web3.js'

import { sendAndConfirmInstructions, type SolanaClient } from '../../solana/index.ts'
import { getMint } from './get-mint.ts'

export async function closeMint(
  options: {
    client: SolanaClient
    account: Address
    payer: TransactionSigner
  },
): Promise<Signature> {
  const found = await getMint({ client: options.client, mint: options.account })

  if (!found) {
    throw new Error(`Account ${options.account} not found`)
  }

  if (Number(found.data.supply) > 0) {
    throw new Error(`Account ${options.account} has non-zero supply`)
  }

  const input: CloseAccountInput = {
    account: options.account,
    destination: options.payer.address,
    owner: options.payer,
  }

  const closeAccount = getCloseAccountInstruction(input, { programAddress: TOKEN_2022_PROGRAM_ADDRESS })

  return await sendAndConfirmInstructions(options.client, options.payer, [
    closeAccount,
  ])
}
