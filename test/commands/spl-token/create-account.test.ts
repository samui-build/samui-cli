import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('spl-token/create-account', () => {
  it('runs spl-token/create-account cmd', async () => {
    const {stdout} = await runCommand('spl-token/create-account')
    expect(stdout).to.contain('hello world')
  })

  it('runs spl-token/create-account --name oclif', async () => {
    const {stdout} = await runCommand('spl-token/create-account --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
