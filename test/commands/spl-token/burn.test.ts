import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('spl-token/burn', () => {
  it('runs spl-token/burn cmd', async () => {
    const {stdout} = await runCommand('spl-token/burn')
    expect(stdout).to.contain('hello world')
  })

  it('runs spl-token/burn --name oclif', async () => {
    const {stdout} = await runCommand('spl-token/burn --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
