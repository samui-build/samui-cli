import type { SolanaConfig } from '../lib/index.ts'
import { getSolanaContext } from '../lib/index.ts'

export async function solanaExplorerHandler(path: string, options: SolanaConfig) {
  const { explorerUrl, signer } = await getSolanaContext(options)

  console.log(`${explorerUrl(path ?? signer.address)}`)
}
