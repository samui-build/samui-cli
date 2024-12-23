import type { SolanaClient } from './get-solana-client.ts'

export function getVersion({ client }: { client: SolanaClient }) {
  return client.rpc.getVersion().send()
}
