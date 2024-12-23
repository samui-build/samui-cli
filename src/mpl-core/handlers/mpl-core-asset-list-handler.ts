import { deserializeAssetV1, getAssetV1GpaBuilder, Key, updateAuthority } from '@metaplex-foundation/mpl-core'
import { publicKey } from '@metaplex-foundation/umi'
import type { SolanaConfig } from '../../solana/index.ts'
import { getSolanaContext } from '../../solana/index.ts'
import { getUmi } from '../lib/get-umi.ts'

export async function mplCoreAssetListHandler(collection: string, options: SolanaConfig) {
  const { config, explorerUrl } = await getSolanaContext(options)
  const umi = getUmi({ config })

  try {
    const assets = await getAssetV1GpaBuilder(umi)
      .whereField('updateAuthority', updateAuthority('Collection', [publicKey(collection)]))
      .whereField('key', Key.AssetV1).get()

    if (!assets.length) {
      console.log(`No assets found in collection ${collection}`)
      return
    }

    const items = assets.map((account) => {
      try {
        return deserializeAssetV1(account)
      } catch (error) {
        console.error(`Error deserializing asset: ${error}`)
        return null
      }
    })

    for (const item of items) {
      if (!item) {
        continue
      }
      console.log(`Asset: ${item.name} ${item.publicKey} `)
      console.log(` => Explorer ${explorerUrl(item.publicKey)}`)
      console.log(` => Metadata ${item.uri}`)
    }
  } catch (error) {
    console.error(`Error fetching collection: ${error}`)
  }
}
