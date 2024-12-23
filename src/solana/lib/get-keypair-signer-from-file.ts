import { getKeypairSignerFromSecretKey } from './get-keypair-signer-from-secret-key.ts'
import { getKeypairBytes } from './getKeypairBytes.ts'

export async function getKeypairSignerFromFile(filePath: string) {
  filePath = filePath.startsWith(`~/`) ? filePath.replace(`~`, Deno.env.get('HOME')!) : filePath

  const keypairBytes = await Deno.readTextFile(filePath)

  return getKeypairSignerFromSecretKey(keypairBytes)
}

export function getKeypairBytesFromFile(filePath: string) {
  filePath = filePath.startsWith(`~/`) ? filePath.replace(`~`, Deno.env.get('HOME')!) : filePath

  const keypairBytes = Deno.readTextFileSync(filePath)

  return getKeypairBytes(keypairBytes)
}
