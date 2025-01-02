import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('spl-token/mint', () => {
  it('runs spl-token/mint cmd', async () => {
    const { stdout } = await runCommand('spl-token/mint')
    expect(stdout).to.contain('hello world')
  })

  it('runs spl-token/mint --name oclif', async () => {
    const { stdout } = await runCommand('spl-token/mint --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
