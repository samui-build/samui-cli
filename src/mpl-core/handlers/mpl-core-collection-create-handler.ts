import { createCollection } from '@metaplex-foundation/mpl-core'
import { generateSigner } from '@metaplex-foundation/umi'
import { base58 } from '@metaplex-foundation/umi/serializers'

import { getSolanaContext, type SolanaConfig } from '../../solana/index.ts'
import { getUmi } from '../lib/get-umi.ts'

export async function mplCoreCollectionCreateHandler(
  name: string,
  uri: string,
  options: SolanaConfig,
) {
  const { config, explorerUrl } = await getSolanaContext(options)
  const umi = getUmi({ config })

  const collection = generateSigner(umi)

  console.log(
    ` => Collection: ${name}\n    Uri       : ${uri}\n    Address   : ${collection.publicKey}`,
  )
  console.log(` => Signer    : ${umi.identity.publicKey}`)

  const tx = await createCollection(umi, { collection, name, uri, plugins: [] }).sendAndConfirm(umi)

  const signature = base58.deserialize(tx.signature)[0]

  console.log(` => View Transaction: ${explorerUrl(signature)}`)
  console.log(` => View Collection: ${explorerUrl(collection.publicKey)}`)
}
