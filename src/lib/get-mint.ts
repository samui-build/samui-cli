import type { Address } from '@solana/web3.js'

import { SolanaClient } from '@samui/solana'
import { address } from '@solana/web3.js'
import { fetchMint } from '@solana-program/token-2022'

export async function getMint(input: { client: SolanaClient; mint: Address }) {
  return fetchMint(input.client.rpc, address(input.mint))
}
