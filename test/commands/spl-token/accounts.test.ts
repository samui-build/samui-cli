import { runCommand } from '@oclif/test'
import { expect } from 'chai'
import { join } from 'node:path'

const owner = 'FeeSoLT7WdoZVXsBPSZc7WKEuhVDVA1TKrNQoHacvxYm'
const keypairPath = join(process.cwd(), 'test', 'fixtures', `${owner}.json`)

describe('spl-token accounts', () => {
  before(async () => {
    process.env.SAMUI_KEYPAIR_PATH = keypairPath
    process.env.SAMUI_RPC_URL = 'http://localhost:8899'
  })

  it('runs spl-token accounts cmd', async () => {
    const { stdout } = await runCommand('spl-token accounts')
    const lines = stdout.trim().split('\n')
    expect(lines.length).to.equal(2)
    expect(lines[0]).to.eq(`=> Accounts for ${owner} on cluster local`)
    expect(lines[1]).to.eq('No accounts found')
  })

  it('runs spl-token accounts cmd for alice', async () => {
    const { stdout } = await runCommand('spl-token accounts ALiceWVGfrWkFr3UkJPoDVQvUjkWgRGwVJqUGpw5CZrz')
    const lines = stdout.trim().split('\n')
    expect(lines.length).to.equal(2)
    expect(lines[0]).to.eq(`=> Accounts for ALiceWVGfrWkFr3UkJPoDVQvUjkWgRGwVJqUGpw5CZrz on cluster local`)
    expect(lines[1]).to.eq('No accounts found')
  })
})
