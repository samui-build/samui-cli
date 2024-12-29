import { runCommand } from '@oclif/test'
import { createKeyPairSignerFromBytes } from '@solana/web3.js'
import { expect } from 'chai'
import { join } from 'node:path'

const keypairPath = join(process.cwd(), 'test', 'fixtures', 'FeeSoLT7WdoZVXsBPSZc7WKEuhVDVA1TKrNQoHacvxYm.json')

describe('spl-token close-mint', () => {
  beforeEach(() => {
    process.env.SAMUI_KEYPAIR_PATH = keypairPath
    process.env.SAMUI_RPC_URL = 'http://localhost:8899'
  })

  it('should run the spl-token close-mint cmd', async () => {
    // ARRANGE
    const mintKeypair = await extractKeypairBytes()
    process.env.SAMUI_MINT_KEYPAIR_SECRET = `[${[...mintKeypair]}]`
    const mintKeyPairSigner = await createKeyPairSignerFromBytes(mintKeypair)
    await runCommand('spl-token create-mint --secret-key ENV:SAMUI_MINT_KEYPAIR_SECRET')

    // ACT
    const { error, stdout } = await runCommand(`spl-token close-mint ${mintKeyPairSigner?.address} `)

    // ASSERT
    expect(error).to.be.undefined
    const lines = stdout.trim().split('\n')
    expect(lines).to.have.length(2)
    expect(lines[0]).to.contain(`Closed mint ${mintKeyPairSigner?.address}`)
    expect(lines[1]).to.contain('https://explorer.solana.com/tx/')
  })
})

// This lives elsewhere in the project but somehow importing doesn't work as expected. TypeScript snafu in the opinionated oclif template.
// eslint-disable-next-line no-warning-comments
// TODO: Fix this. Urgency is low
export async function extractKeypairBytes(): Promise<Uint8Array> {
  const keypair = await crypto.subtle.generateKey('Ed25519', true, ['sign', 'verify'])
  const publicKeyBytes = new Uint8Array(await crypto.subtle.exportKey('raw', keypair.publicKey))
  const privateKeyJwk = await crypto.subtle.exportKey('jwk', keypair.privateKey)

  const privateKeyBase64 = privateKeyJwk.d
  if (!privateKeyBase64) throw new Error('Failed to get private key bytes')

  const privateKeyBytes = new Uint8Array(Buffer.from(privateKeyBase64, 'base64'))

  return new Uint8Array([...privateKeyBytes, ...publicKeyBytes])
}
