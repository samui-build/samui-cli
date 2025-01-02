import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('spl-token/balance', () => {
  it('runs spl-token/balance cmd', async () => {
    const {stdout} = await runCommand('spl-token/balance')
    expect(stdout).to.contain('hello world')
  })

  it('runs spl-token/balance --name oclif', async () => {
    const {stdout} = await runCommand('spl-token/balance --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
