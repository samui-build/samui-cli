import { getExplorerPath } from './get-explorer-path.ts'

export const explorerClusters = ['custom', 'devnet', 'mainnet', 'testnet'] as const

export type ExplorerUrlCluster = (typeof explorerClusters)[number]

export function getExplorerUrl(path: string, cluster: ExplorerUrlCluster | string) {
  path = getExplorerPath(path)

  const suffix = cluster === 'mainnet' ? '' : `?cluster=${cluster.replace('local', 'custom')}`

  // TODO: Add support 'solana' | 'solana-fm' | 'solscan' | 'custom'
  // Should be configurable through env vars and cli option
  const explorerUrl = 'https://explorer.solana.com'

  return `${explorerUrl}${path.startsWith('/') ? path : `/${path}`}${suffix}`
}
