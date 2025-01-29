import { extractKeypairBytes } from './extract-keypair-bytes.js'
import { getByteArrayString } from './get-byte-array-string.js'

export async function generateExtractedKeypair(): Promise<string> {
  const keypairBytes = await extractKeypairBytes()

  return getByteArrayString(keypairBytes)
}
