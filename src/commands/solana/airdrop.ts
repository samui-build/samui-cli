import { Args } from '@oclif/core'
import { requestAirdrop } from '@samui/solana'

import { BaseCommand } from '../../base-command.js'

export default class SolanaAirdrop extends BaseCommand<typeof SolanaAirdrop> {
  static override args = {
    amount: Args.string({ description: 'amount of SOL to airdrop', required: true }),
    receiver: Args.string({ description: 'receiver of the airdrop, defaults to the signer address' }),
  }

  static override description = 'Airdrop SOL to an address'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  public async run(): Promise<void> {
    const { client, explorerUrl, signer } = this.getSolanaContext()
    const { args } = await this.parse(SolanaAirdrop)

    if (Number.isNaN(Number(args.amount))) {
      throw new RangeError(`Invalid amount: ${args.amount}. Must be a finite number.`)
    }

    const address = args.receiver ?? signer.address

    const tx = await requestAirdrop({ address, amount: Number(args.amount), client })
    this.log(`Airdropped ${args.amount} SOL to ${address}:\n${explorerUrl(tx)}`)
  }
}
