import { getKeypairSignerFromEnv } from "./get-keypair-signer-from-env.ts";
import { getKeypairSignerFromFile } from './get-keypair-signer-from-file.ts'
import { getKeypairSignerFromSecretKey } from './get-keypair-signer-from-secret-key.ts'
import { getKeypairSignerGenerated } from './get-keypair-signer-generated.ts'

export async function getKeypairSigner(secretKey: string) {
  if (secretKey.startsWith('file:')) {
    return await getKeypairSignerFromFile(secretKey.replace('file:', ''))
  }
  if (secretKey.startsWith('env:')) {
    return await getKeypairSignerFromEnv(secretKey.replace('env:', ''))
  }
  if (secretKey === 'generated') {
    return await getKeypairSignerGenerated()
  }
  return getKeypairSignerFromSecretKey(secretKey)
}
