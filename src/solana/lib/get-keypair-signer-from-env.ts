import { getKeypairSignerFromSecretKey } from './get-keypair-signer-from-secret-key.ts'

export async function getKeypairSignerFromEnv(envVar: string) {
  const value = Deno.env.get(envVar)
  if (!value) {
    throw new Error(`Environment variable ${envVar} is not set`)
  }
  return await getKeypairSignerFromSecretKey(value)
}
