import { runCommand } from '@oclif/test'
import { expect } from 'chai'
import { join } from 'node:path'

const owner = 'FeeSoLT7WdoZVXsBPSZc7WKEuhVDVA1TKrNQoHacvxYm'
const keypairPath = join(process.cwd(), 'test', 'fixtures', `${owner}.json`)

describe('spl-token burn', () => {
  before(async () => {
    process.env.SAMUI_KEYPAIR_PATH = keypairPath
    process.env.SAMUI_RPC_URL = 'http://localhost:8899'
  })
  it('runs spl-token burn cmd', async () => {
    const { stdout } = await runCommand('spl-token burn')
    expect(stdout).to.contain('hello world')
  })
})
