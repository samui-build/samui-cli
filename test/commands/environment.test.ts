import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('environment', () => {
  it('runs environment cmd', async () => {
    const { stdout } = await runCommand('environment')
    expect(stdout).to.eq('Hi, world!\n')
  })

  it('runs environment --name oclif', async () => {
    const { stdout } = await runCommand('environment --name oclif')
    expect(stdout).to.eq('Hi, oclif!\n')
  })
})
