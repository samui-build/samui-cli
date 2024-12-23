import { createSignerFromKeypair, signerIdentity } from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'

import { getKeypairBytesFromFile, type SolanaConfig } from '../../solana/index.ts'

export function getUmi({ config }: { config: SolanaConfig }) {
  const umi = createUmi(config.rpcUrl, { commitment: 'confirmed' })
  const keypairBuffer = getKeypairBytesFromFile(config.keypairPath)
  const signer = createSignerFromKeypair(umi, umi.eddsa.createKeypairFromSecretKey(keypairBuffer))
  umi.use(signerIdentity(signer))
  return umi
}

export type Umi = ReturnType<typeof getUmi>
