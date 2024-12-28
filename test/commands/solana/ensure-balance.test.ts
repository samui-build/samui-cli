import { runCommand } from '@oclif/test'
import { getKeypairSignerGenerated } from '@samui/solana'
import { expect } from 'chai'
import { join } from 'node:path'

const keypairPath = join(process.cwd(), 'test', 'fixtures', 'TESTjVk7ucobK84rve4GokiahksbLvNoRK2tiWznm5v.json')

describe('solana ensure-balance', () => {
  before(async () => {
    process.env.SAMUI_KEYPAIR_PATH = keypairPath
    process.env.SAMUI_RPC_URL = 'http://localhost:8899'
    // Make sure we have a balance
    await runCommand('solana airdrop 1')
  })

  it('should run the solana ensure-balance cmd', async () => {
    // ARRANGE
    // ACT
    const { stderr, stdout } = await runCommand('solana ensure-balance 1')

    // ASSERT
    expect(stderr).to.be.empty
    const lines = stdout.trim().split('\n')

    expect(lines).to.have.length(2)
    expect(lines[0]).to.contain('Balance of TESTjVk7ucobK84rve4GokiahksbLvNoRK2tiWznm5v')
    expect(lines[1]).to.contain('https://explorer.solana.com/address/TESTjVk7ucobK84rve4GokiahksbLvNoRK2tiWznm5v')
  })

  it('should run the solana ensure-balance cmd with a custom receiver', async () => {
    // ARRANGE
    const keypairSigner = await getKeypairSignerGenerated()

    // ACT
    const { error, stdout } = await runCommand(`solana ensure-balance 10 ${keypairSigner.address}`)

    // ASSERT
    expect(error).to.be.undefined
    const lines = stdout.trim().split('\n')
    expect(lines).to.have.length(2)
    expect(lines[0]).to.contain(`Airdropped 10 SOL to ${keypairSigner.address}, balance is 10 SOL`)
    expect(lines[1]).to.contain('https://explorer.solana.com/tx/')
  })
})
