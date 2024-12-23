import { burnCollectionV1, fetchCollectionV1 } from '@metaplex-foundation/mpl-core'
import { publicKey } from '@metaplex-foundation/umi'
import { base58 } from '@metaplex-foundation/umi/serializers'
import type { SolanaConfig } from '../../solana/index.ts'
import { getSolanaContext } from '../../solana/index.ts'
import { getUmi } from '../lib/get-umi.ts'

export async function mplCoreCollectionBurnHandler(collection: string, options: SolanaConfig) {
  const { config, explorerUrl } = await getSolanaContext(options)
  const umi = getUmi({ config })

  const found = await fetchCollectionV1(umi, publicKey(collection))
  console.log(found)

  if (found.numMinted > 0 && found.currentSize > 0) {
    // TODO: Add a confirmation prompt
    console.log(`Collection ${collection} is not empty.`)
    return
  }

  try {
    const result = await burnCollectionV1(umi, { collection: publicKey(collection), compressionProof: null })
      .sendAndConfirm(umi)
    const [signature] = base58.deserialize(result.signature)
    console.log(`Collection: ${explorerUrl(collection)}`)

    console.log(` => View Transaction: ${explorerUrl(signature)}`)
  } catch (error) {
    console.error(`Error fetching collection: ${error}`)
  }
}
