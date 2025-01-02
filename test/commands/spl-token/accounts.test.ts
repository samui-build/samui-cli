import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('spl-token/accounts', () => {
  it('runs spl-token/accounts cmd', async () => {
    const {stdout} = await runCommand('spl-token/accounts')
    expect(stdout).to.contain('hello world')
  })

  it('runs spl-token/accounts --name oclif', async () => {
    const {stdout} = await runCommand('spl-token/accounts --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
