/*
 * Extract the private and public key bytes from a keypair, making it compatible with @solana/web3.js v1
 */
export async function extractKeypairBytes(): Promise<Uint8Array> {
  // Generate a keypair
  const keypair = await crypto.subtle.generateKey('Ed25519', true, ['sign', 'verify'])

  // Export public key as raw bytes
  const publicKeyBytes = new Uint8Array(await crypto.subtle.exportKey('raw', keypair.publicKey))

  // Export private key as JWK
  const privateKeyJwk = await crypto.subtle.exportKey('jwk', keypair.privateKey)

  // The 'd' parameter in JWK contains the base64 private key
  const privateKeyBase64 = privateKeyJwk.d
  if (!privateKeyBase64) throw new Error('Failed to get private key bytes')

  // Decode base64url to get the raw 32 bytes private key
  const privateKeyBytes = new Uint8Array(Buffer.from(privateKeyBase64, 'base64'))

  return new Uint8Array([...privateKeyBytes, ...publicKeyBytes])
}
