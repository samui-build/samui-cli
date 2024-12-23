import type { SolanaConfig } from '../lib/index.ts'
import { getSolanaContext, getVersion } from '../lib/index.ts'

export async function solanaVersionHandler(options: SolanaConfig) {
  const { client } = await getSolanaContext(options)

  const version = await getVersion({ client })

  console.log(
    `Version ${version['solana-core']}, Feature set ${version['feature-set']}`,
  )
}
