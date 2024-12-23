import type { Address } from '@solana/web3.js'
import { getBalance } from './get-balance.ts'
import type { SolanaClient } from './get-solana-client.ts'
import { LAMPORTS_PER_SOL } from './request-airdrop.ts'

export async function getBalanceFormatted(options: { address: Address | string; client: SolanaClient }) {
  const balance = await getBalance(options)
  const formatted = (Number(balance) / Number(LAMPORTS_PER_SOL)).toString()

  return formatted.includes('.') ? formatted.replace(/\.?0+$/, '') : formatted
}
