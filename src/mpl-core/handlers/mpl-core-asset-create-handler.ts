import { fetchCollection } from '@metaplex-foundation/mpl-core'
import { generateSigner, publicKey } from '@metaplex-foundation/umi'

import { getSolanaContext, type SolanaConfig } from '../../solana/index.ts'
import { createAssetHandler } from '../lib/create-asset-handler.ts'
import { getUmi } from '../lib/get-umi.ts'

export async function mplCoreAssetCreateHandler(
  collectionAddress: string,
  options: { name?: string; uri?: string } & SolanaConfig,
) {
  const { config, explorerUrl } = await getSolanaContext(options)
  const umi = getUmi({ config })

  console.log(`Signer    : ${umi.identity.publicKey}`)
  console.log(`Collection: ${collectionAddress}`)

  const collection = await fetchCollection(umi, publicKey(collectionAddress))

  // Generate the Asset KeyPair
  const asset = generateSigner(umi)
  const assetName = options.name ?? 'My Asset'
  const assetUri = options.uri ?? 'https://example.com'

  const { signature } = await createAssetHandler({ asset, assetName, assetUri, collection, umi })

  console.log(`Transaction: ${explorerUrl(signature)}`)
  console.log(`Asset: ${explorerUrl(asset.publicKey)}`)
}
