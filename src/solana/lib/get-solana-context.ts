import type { KeyPairSigner } from '@solana/web3.js'
import type { DetectedSolanaCluster } from './detect-solana-cluster.ts'
import { detectSolanaCluster } from './detect-solana-cluster.ts'
import { getExplorerUrl } from './get-explorer-url.ts'
import { getKeypairSignerFromFile } from './get-keypair-signer-from-file.ts'
import { getSolanaClient, type SolanaClient } from './get-solana-client.ts'
import { parseSolanaConfig, type SolanaConfig } from './parse-solana-config.ts'

export interface SolanaContext {
  client: SolanaClient
  cluster: DetectedSolanaCluster
  config: SolanaConfig
  genesisHash: string
  explorerUrl: (path: string) => string
  signer: KeyPairSigner
}

export async function getSolanaContext(options: SolanaConfig): Promise<SolanaContext> {
  const config = parseSolanaConfig(options)
  const client = getSolanaClient(config)
  const { cluster, genesisHash } = await detectSolanaCluster({ client, config })
  const signer = await getKeypairSignerFromFile(config.keypairPath)

  return {
    client,
    cluster,
    config,
    genesisHash,
    explorerUrl: (path: string) => getExplorerUrl(path, cluster),
    signer,
  }
}
