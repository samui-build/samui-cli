import { fetchCollectionV1 } from '@metaplex-foundation/mpl-core'
import { publicKey } from '@metaplex-foundation/umi'
import type { SolanaConfig } from '../../solana/index.ts'
import { getSolanaContext } from '../../solana/index.ts'
import { getUmi } from '../lib/get-umi.ts'

export async function mplCoreCollectionGetHandler(collection: string, options: SolanaConfig) {
  const { config, explorerUrl } = await getSolanaContext(options)
  const umi = getUmi({ config })

  try {
    const result = await fetchCollectionV1(umi, publicKey(collection))
    console.log(result)
    console.log(` => View Collection: ${explorerUrl(collection)}`)
  } catch (error) {
    console.error(`Error fetching collection: ${error}`)
  }
}
