import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('solana genesis-hash', () => {
  before(() => {
    process.env.SAMUI_RPC_URL = 'http://localhost:8899'
  })

  it('should run the solana genesis-hash cmd', async () => {
    // ARRANGE
    // ACT
    const { stderr, stdout } = await runCommand('solana genesis-hash')

    // ASSERT
    expect(stderr).to.be.empty
    const lines = stdout.trim().split('\n')
    expect(lines).to.have.length(1)
    expect(lines[0]).to.contain('Genesis hash for local:')
  })
})
