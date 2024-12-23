import { fetchMint } from '@solana-program/token-2022'
import type { Address } from '@solana/web3.js'
import { address } from '@solana/web3.js'
import type { SolanaClient } from '../../solana/index.ts'

export async function getMint(input: { client: SolanaClient; mint: Address }) {
  return await fetchMint(input.client.rpc, address(input.mint))
}
