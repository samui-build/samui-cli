import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('spl-token/supply', () => {
  it('runs spl-token/supply cmd', async () => {
    const {stdout} = await runCommand('spl-token/supply')
    expect(stdout).to.contain('hello world')
  })

  it('runs spl-token/supply --name oclif', async () => {
    const {stdout} = await runCommand('spl-token/supply --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
