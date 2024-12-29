import { runCommand } from '@oclif/test'
import { expect } from 'chai'
import { rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const keypairPath = join(process.cwd(), 'test', 'fixtures', 'FeeSoLT7WdoZVXsBPSZc7WKEuhVDVA1TKrNQoHacvxYm.json')

describe('spl-token create-mint', () => {
  before(() => {
    process.env.SAMUI_KEYPAIR_PATH = keypairPath
    process.env.SAMUI_RPC_URL = 'http://localhost:8899'
  })

  it('runs spl-token create-mint cmd', async () => {
    // ARRANGE
    // ACT
    const { error, stdout } = await runCommand('spl-token create-mint')

    // ASSERT
    expect(error).to.be.undefined
    const lines = stdout.trim().split('\n')
    expect(lines).to.have.length(2)
    expect(lines[0]).to.contain('Created mint')
    expect(lines[1]).to.contain('https://explorer.solana.com/tx/')
  })

  it('runs spl-token create-mint with a secret key from an environment variable', async () => {
    // ARRANGE
    const keypair = await extractKeypairBytes()
    process.env.SAMUI_KEYPAIR_SECRET = `[${[...keypair]}]`

    // ACT
    const { error, stdout } = await runCommand('spl-token create-mint --secret-key ENV:SAMUI_KEYPAIR_SECRET')

    // ASSERT
    expect(error).to.be.undefined
    const lines = stdout.trim().split('\n')
    expect(lines).to.have.length(2)
    expect(lines[0]).to.contain('Created mint')
    expect(lines[1]).to.contain('https://explorer.solana.com/tx/')
  })

  it('runs spl-token create-mint with a secret key from a file', async () => {
    // ARRANGE
    const tmpFile = await generateTmpKeypair()

    // ACT
    const { error, stdout } = await runCommand(`spl-token create-mint --secret-key ${tmpFile}`)

    // ASSERT
    expect(error).to.be.undefined
    const lines = stdout.trim().split('\n')
    expect(lines).to.have.length(2)
    expect(lines[0]).to.contain('Created mint')
    expect(lines[1]).to.contain('https://explorer.solana.com/tx/')

    await rm(tmpFile)
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

async function generateTmpKeypair(): Promise<string> {
  const tmpFile = `${tmpdir()}/create-mint-test-keypair-${Date.now()}.json`
  const keypair = await extractKeypairBytes()
  await writeFile(tmpFile, `[${[...keypair]}]`)
  return tmpFile
}
