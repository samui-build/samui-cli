import { getGenesisHash } from './get-genesis-hash.ts'
import type { SolanaClient } from './get-solana-client.ts'
import { SolanaConfig } from "./parse-solana-config.ts";

export type DetectedSolanaCluster = 'devnet' | 'local' | 'testnet' | 'mainnet' | 'custom'

const clusters: Record<string, DetectedSolanaCluster> = {
  'EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG': 'devnet',
  '4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY': 'testnet',
  '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d': 'mainnet',
}

export async function detectSolanaCluster(
  { client, config }: { client: SolanaClient; config: SolanaConfig },
): Promise<{ genesisHash: string; cluster: DetectedSolanaCluster }> {
  const genesisHash = await getGenesisHash({ client })

  if (clusters[genesisHash]) {
    return { genesisHash, cluster: clusters[genesisHash] }
  }

  return { genesisHash, cluster: config.rpcUrl.toString().includes('localhost') ? 'local' : 'custom' }
}
