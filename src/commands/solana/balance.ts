import { Args } from '@oclif/core'
import { getBalanceFormatted } from '@samui/solana'

import { BaseCommand } from '../../base-command.js'

export default class SolanaBalance extends BaseCommand<typeof SolanaBalance> {
  static override args = {
    address: Args.string({ description: 'address to get the balance for, defaults to the signer address' }),
  }

  static override description = 'Get the balance of a Solana account'

  static override examples = ['<%= config.bin %> <%= command.id %>', '<%= config.bin %> <%= command.id %> <address>']

  public async run(): Promise<void> {
    const { client, signer } = this.getSolanaContext()
    const { args } = await this.parse(SolanaBalance)

    const address = args.address ?? signer.address

    this.log(`Balance for ${address}`)
    const balance = await getBalanceFormatted({ address, client })
    this.log(`${balance} SOL`)
  }
}
