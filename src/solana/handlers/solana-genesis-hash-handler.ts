import type { SolanaConfig } from '../lib/index.ts'
import { getGenesisHash, getSolanaContext } from '../lib/index.ts'

export async function solanaGenesisHashHandler(options: SolanaConfig) {
  const { client, cluster } = await getSolanaContext(options)

  const genesisHash = await getGenesisHash({ client })
  console.log(`Genesis hash: ${genesisHash}, cluster: ${cluster}`)
}
