import type { SolanaConfig } from '../lib/index.ts'
import { getSolanaContext, requestAirdrop } from '../lib/index.ts'

export async function solanaAirdropHandler(amount: string, receiver: string, options: SolanaConfig) {
  const { client, signer } = await getSolanaContext(options)

  const address = receiver ?? signer.address
  await requestAirdrop({ address, amount: parseFloat(amount), client })

  console.log(`Requested airdrop for ${address} (${amount} SOL)`)
}
