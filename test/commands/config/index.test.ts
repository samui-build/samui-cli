import { runCommand } from '@oclif/test'
import { expect } from 'chai'
import { join } from 'node:path'

describe('config', () => {
  it('should get the default config', async () => {
    // ARRANGE
    // ACT
    const { error, stdout } = await runCommand('config')

    // ASSERT
    expect(error).to.be.undefined
    const lines = stdout.trim().split('\n')
    expect(lines).to.have.length(4)
    expect(lines[0]).to.contain('Configuration:')
    expect(lines[1]).to.contain(`keypair-path: ${process.env.HOME}/.config/solana/id.json`)
    expect(lines[2]).to.contain('rpc-url: https://api.devnet.solana.com/')
    expect(lines[3]).to.contain('rpc-url-ws: wss://api.devnet.solana.com/')
  })

  it('should get the custom config', async () => {
    // ARRANGE
    const keypairPath = join(process.cwd(), 'test', 'fixtures', 'FeeSoLT7WdoZVXsBPSZc7WKEuhVDVA1TKrNQoHacvxYm.json')
    process.env.SAMUI_KEYPAIR_PATH = keypairPath
    process.env.SAMUI_RPC_URL = 'http://localhost:8899'

    // ACT
    const { error, stdout } = await runCommand('config')
    delete process.env.SAMUI_KEYPAIR_PATH
    delete process.env.SAMUI_RPC_URL
    delete process.env.SAMUI_RPC_URL_WS

    // ASSERT
    expect(error).to.be.undefined
    const lines = stdout.trim().split('\n')
    expect(lines).to.have.length(4)
    expect(lines[0]).to.contain('Configuration:')
    expect(lines[1]).to.contain(`keypair-path: ${keypairPath}`)
    expect(lines[2]).to.contain('rpc-url: http://localhost:8899/')
    expect(lines[3]).to.contain('rpc-url-ws: ws://localhost:8900/')
  })
})
