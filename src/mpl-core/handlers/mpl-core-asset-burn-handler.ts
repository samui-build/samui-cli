import { burnV1, fetchAssetV1 } from '@metaplex-foundation/mpl-core'
import { publicKey } from '@metaplex-foundation/umi'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { collectionAddress } from "npm:@metaplex-foundation/mpl-core@1.1.1";
import type { SolanaConfig } from '../../solana/index.ts'
import { getSolanaContext } from '../../solana/index.ts'
import { getUmi } from '../lib/get-umi.ts'

export async function mplCoreAssetBurnHandler(assetAddress: string, options: SolanaConfig) {
  const { config, explorerUrl } = await getSolanaContext(options)
  const umi = getUmi({ config })

  const asset = await fetchAssetV1(umi, publicKey(assetAddress))
  console.log(` => Asset:`, asset)
  console.log(` => View Asset: ${explorerUrl(asset.publicKey)}`)

  try {
    const result = await burnV1(umi, { asset: asset.publicKey, collection: collectionAddress(asset) }).sendAndConfirm(
      umi,
    )
    const [signature] = base58.deserialize(result.signature)
    console.log(` => View Transaction: ${explorerUrl(signature)}`)
  } catch (error) {
    console.error(`Error fetching asset: ${error}`)
  }
}
