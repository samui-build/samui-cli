import { generateKeyPairSigner } from '@solana/web3.js'

export async function getKeypairSignerGenerated() {
  return await generateKeyPairSigner()
}
