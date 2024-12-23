import { type Address, address, airdropFactory, lamports } from '@solana/web3.js'
import type { SolanaClient } from './get-solana-client.ts'

export const LAMPORTS_PER_SOL = 10 ** 9

export function requestAirdrop(options: { address: Address | string; amount: number; client: SolanaClient }) {
  if (typeof options.amount !== 'number' || isNaN(options.amount)) {
    throw new RangeError(`Invalid amount: ${options.amount}. Must be a finite number.`)
  }

  const airdrop = airdropFactory(options.client)
  const lamportsAmount = BigInt(
    Math.round(options.amount * Number(LAMPORTS_PER_SOL)),
  )

  return airdrop({
    commitment: 'confirmed',
    lamports: lamports(lamportsAmount),
    recipientAddress: address(options.address),
  })
}
