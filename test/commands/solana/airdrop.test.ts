import { runCommand } from '@oclif/test'
import { getKeypairSignerGenerated } from '@samui/solana'
import { expect } from 'chai'
import { join } from 'node:path'

const keypairPath = join(process.cwd(), 'test', 'fixtures', 'TESTjVk7ucobK84rve4GokiahksbLvNoRK2tiWznm5v.json')

describe('solana airdrop', () => {
  before(async () => {
    process.env.SAMUI_KEYPAIR_PATH = keypairPath
    process.env.SAMUI_RPC_URL = 'http://localhost:8899'
  })

  it('runs solana airdrop cmd', async () => {
    // ARRANGE
    // ACT
    const { error, stdout } = await runCommand('solana airdrop 2')

    // ASSERT
    expect(error).to.be.undefined
    const lines = stdout.trim().split('\n')
    expect(lines).to.have.length(2)
    expect(lines[0]).to.contain(`Airdropped 2 SOL to TESTjVk7ucobK84rve4GokiahksbLvNoRK2tiWznm5v`)
    expect(lines[1]).to.contain('https://explorer.solana.com/tx/')
  })

  it('runs solana airdrop to a specific address', async () => {
    // ARRANGE
    const keypairSigner = await getKeypairSignerGenerated()

    // ACT
    const { error, stdout } = await runCommand(`solana airdrop 10 ${keypairSigner.address}`)

    // ASSERT
    expect(error).to.be.undefined
    const lines = stdout.trim().split('\n')
    expect(lines).to.have.length(2)
    expect(lines[0]).to.contain(`Airdropped 10 SOL to ${keypairSigner.address}:`)
    expect(lines[1]).to.contain('https://explorer.solana.com/tx/')
  })
})
