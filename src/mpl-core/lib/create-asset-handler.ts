import { type CollectionV1, create } from '@metaplex-foundation/mpl-core'
import type { KeypairSigner } from '@metaplex-foundation/umi'
import { base58 } from '@metaplex-foundation/umi/serializers'
import type { Umi } from './get-umi.ts'

export async function createAssetHandler({ asset, collection, assetName, assetUri, umi }: {
  collection: CollectionV1
  asset: KeypairSigner
  assetName: string
  assetUri: string
  umi: Umi
}): Promise<{
  signature: string
}> {
  let tx = await create(umi, {
    asset,
    collection,
    name: assetName,
    uri: assetUri,
  }).sendAndConfirm(umi)

  const signature = base58.deserialize(tx.signature)[0]

  return { signature }
}
