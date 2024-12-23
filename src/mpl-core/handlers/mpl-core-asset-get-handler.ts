import { collectionAddress, fetchAssetV1, fetchCollectionV1 } from '@metaplex-foundation/mpl-core'
import { publicKey } from '@metaplex-foundation/umi'
import type { SolanaConfig } from '../../solana/index.ts'
import { getSolanaContext } from '../../solana/index.ts'
import { getUmi } from '../lib/get-umi.ts'

export async function mplCoreAssetGetHandler(assetAddress: string, options: SolanaConfig) {
  const { config, explorerUrl } = await getSolanaContext(options)
  const umi = getUmi({ config })

  try {
    const asset = await fetchAssetV1(umi, publicKey(assetAddress))
    // TODO: Make fetching collection optional
    const assetCollectionAddress = collectionAddress(asset)

    if (assetCollectionAddress) {
      const collection = await fetchCollectionV1(umi, assetCollectionAddress)
      console.log(' => Collection:', collection)
      console.log(` => View Collection: ${explorerUrl(collection.publicKey)}`)
    }

    console.log(` => Asset:`, asset)
    console.log(` => View Asset: ${explorerUrl(asset.publicKey)}`)
  } catch (error) {
    console.error(`Error fetching asset: ${error}`)
  }
}
