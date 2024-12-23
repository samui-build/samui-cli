import type { SolanaClient } from './get-solana-client.ts'

export function getGenesisHash({ client }: { client: SolanaClient }) {
  return client.rpc.getGenesisHash().send()
}
