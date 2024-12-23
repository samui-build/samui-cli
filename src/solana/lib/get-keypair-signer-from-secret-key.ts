import { createKeyPairSignerFromBytes } from '@solana/web3.js'

export async function getKeypairSignerFromSecretKey(secretKey: string) {
  const keypairBytes = Uint8Array.from(JSON.parse(secretKey))

  return await createKeyPairSignerFromBytes(keypairBytes)
}
