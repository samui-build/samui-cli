import { type Address, address } from '@solana/web3.js'
import type { SolanaClient } from './get-solana-client.ts'

export async function getBalance(options: { address: Address | string; client: SolanaClient }) {
  const balance = await options.client.rpc.getBalance(address(options.address))
    .send()

  return balance.value
}
