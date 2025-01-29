import { GetSecretKeyInput, GetSecretKeySource, getSecretKey } from './get-secret-key.js'

export async function ensureSecretKey(input: GetSecretKeyInput): Promise<[Uint8Array, GetSecretKeySource]> {
  try {
    const [secretKey, source] = await getSecretKey(input)
    const parsed = JSON.parse(secretKey)

    return [new Uint8Array(parsed), source]
  } catch (error) {
    throw new Error(`Failed to parse secret key: ${error}`)
  }
}
