import { runCommand } from '@oclif/test'
import { expect } from 'chai'
import { join } from 'node:path'

const owner = 'FeeSoLT7WdoZVXsBPSZc7WKEuhVDVA1TKrNQoHacvxYm'
const keypairPath = join(process.cwd(), 'test', 'fixtures', `${owner}.json`)
const mint = 'DEVxFh43yes4evNGegdTKGad1jLiKA9oFCffkkYMX3Zb'
const mintKeypairPath = join(process.cwd(), 'test', 'fixtures', `${mint}.json`)

describe('spl-token supply', () => {
  before(async () => {
    process.env.SAMUI_KEYPAIR_PATH = keypairPath
    process.env.SAMUI_RPC_URL = 'http://localhost:8899'
    await runCommand(`spl-token create-mint --secret-key ${mintKeypairPath}`)
  })
  after(async () => {
    await runCommand(`spl-token delete-mint --secret-key ${mintKeypairPath}`)
  })

  it('runs spl-token supply cmd', async () => {
    // ARRANGE
    // ACT
    const { stderr, stdout } = await runCommand('spl-token supply')

    // ASSERT
    const lines = stdout.trim().split('\n')
    expect(stderr).to.be.empty
    expect(lines).to.have.length(2)
    expect(lines[0]).to.contain(`=> Total supply for ${mint} on cluster local`)
    expect(lines[1]).to.contain('=> Total: 0 tokens')
  })
})
