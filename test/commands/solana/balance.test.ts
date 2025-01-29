import { runCommand } from '@oclif/test'
import { expect } from 'chai'
import { join } from 'node:path'

const keypairPath = join(process.cwd(), 'test', 'fixtures', 'DEVxFh43yes4evNGegdTKGad1jLiKA9oFCffkkYMX3Zb.json')

describe('solana balance', () => {
  before(async () => {
    process.env.SAMUI_KEYPAIR_PATH = keypairPath
    process.env.SAMUI_RPC_URL = 'http://localhost:8899'
    await runCommand('solana ensure-balance 420')
  })

  it('runs solana balance cmd', async () => {
    // ARRANGE
    // ACT
    const { error, stdout } = await runCommand('solana balance')

    // ASSERT
    expect(error).to.be.undefined

    const lines = stdout.trim().split('\n')
    expect(lines).to.have.length(2)
    expect(lines[0]).to.contain('Balance for DEVxFh43yes4evNGegdTKGad1jLiKA9oFCffkkYMX3Zb')
    expect(lines[1]).to.contain('420 SOL')
  })

  it('runs solana balance --name oclif', async () => {
    // ARRANGE
    // ACT
    const { error, stdout } = await runCommand('solana balance ALiceWVGfrWkFr3UkJPoDVQvUjkWgRGwVJqUGpw5CZrz')

    // ASSERT
    expect(error).to.be.undefined

    const lines = stdout.trim().split('\n')
    expect(lines).to.have.length(2)
    expect(lines[0]).to.contain('Balance for ALiceWVGfrWkFr3UkJPoDVQvUjkWgRGwVJqUGpw5CZrz')
    expect(lines[1]).to.contain('500 SOL')
  })
})
