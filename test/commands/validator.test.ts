import { runCommand } from '@oclif/test'
import { expect } from 'chai'
import { join } from 'node:path'

const keypairPath = join(process.cwd(), 'test', 'fixtures', 'FeeSoLT7WdoZVXsBPSZc7WKEuhVDVA1TKrNQoHacvxYm.json')

describe('validator', () => {
  before(() => {
    process.env.SAMUI_KEYPAIR_PATH = keypairPath
    process.env.SAMUI_RPC_URL = 'http://localhost:8899'
  })

  it('should run the validator cmd in dry run mode', async () => {
    // ARRANGE
    // ACT
    const { error, stdout } = await runCommand('validator --dry-run')
    // ASSERT
    expect(error).to.be.undefined
    const lines = stdout.trim().split('\n')
    expect(lines).to.have.length(2)
    expect(lines[0]).to.contain('Dry run:')
    expect(lines[1]).to.contain(
      'docker run -it --rm --name samui-test-validator -p 8899:8899 -p 8900:8900 ghcr.io/samui-build/samui-test-validator:latest',
    )
  })
})
