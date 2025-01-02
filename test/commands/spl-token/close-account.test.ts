import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('spl-token/close-account', () => {
  it('runs spl-token/close-account cmd', async () => {
    const {stdout} = await runCommand('spl-token/close-account')
    expect(stdout).to.contain('hello world')
  })

  it('runs spl-token/close-account --name oclif', async () => {
    const {stdout} = await runCommand('spl-token/close-account --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
