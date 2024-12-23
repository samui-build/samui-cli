import {
  type CollectionV1,
  deserializeCollectionV1,
  getCollectionV1GpaBuilder,
  Key,
} from '@metaplex-foundation/mpl-core'
import { publicKey } from '@metaplex-foundation/umi'
import type { SolanaConfig } from '../../solana/index.ts'
import { getSolanaContext } from '../../solana/index.ts'
import { getUmi } from '../lib/get-umi.ts'

export async function mplCoreCollectionListHandler(authority: string, options: SolanaConfig) {
  const { config, explorerUrl, signer } = await getSolanaContext(options)
  const umi = getUmi({ config })

  authority = authority ?? signer.address

  try {
    const accounts = await getCollectionV1GpaBuilder(umi).whereField('updateAuthority', publicKey(authority))
      .whereField('key', Key.CollectionV1).get()
    // TODO use getDeserialized() instead of the following temporary workaround for devnet breaking changes
    const collections = accounts.map((account) => {
      try {
        return deserializeCollectionV1(account)
      } catch (e) {
        return null
      }
    }).filter((a) => a) as CollectionV1[]

    for (const item of collections) {
      console.log(`Collection: ${item.name} ${item.publicKey} `)
      console.log(` => Minted ${item.numMinted}`)
      console.log(` => Current Size ${item.currentSize}`)
      console.log(` => Explorer ${explorerUrl(item.publicKey)}`)
      console.log(` => Metadata ${item.uri}`)
    }
    if (collections.length === 0) {
      console.log(`No collections found for authority ${authority}`)
    }
  } catch (error) {
    console.error(`Error fetching collection: ${error}`)
  }
}
