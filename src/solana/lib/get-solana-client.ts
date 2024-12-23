import {
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  type Rpc,
  type RpcSubscriptions,
  type SolanaRpcApi,
  type SolanaRpcSubscriptionsApi,
} from '@solana/web3.js'
import type { SolanaConfig } from './parse-solana-config.ts'

export type SolanaClient = {
  rpc: Rpc<SolanaRpcApi>
  rpcSubscriptions: RpcSubscriptions<SolanaRpcSubscriptionsApi>
}

export function getSolanaClient(config: SolanaConfig): SolanaClient {
  const rpc = createSolanaRpc(config.rpcUrl)
  const rpcSubscriptions = createSolanaRpcSubscriptions(config.rpcUrlSubscriptions)

  return { rpc, rpcSubscriptions }
}
