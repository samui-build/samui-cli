import { SolanaClient } from '@samui/solana'
import { Address } from '@solana/web3.js'

export async function getTokenAccounts({
  client,
  mint,
  owner,
  programId,
}: {
  client: SolanaClient
  mint?: Address
  owner: Address
  programId: Address
}) {
  const accounts = await client.rpc
    .getTokenAccountsByOwner(owner, mint ? { mint } : { programId }, { encoding: 'jsonParsed' })
    .send()

  return accounts.value
}
