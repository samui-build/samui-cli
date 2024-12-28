import { Args } from '@oclif/core'
import { getBalanceFormatted, requestAirdrop } from '@samui/solana'

import { BaseCommand } from '../../base-command.js'

export default class SolanaEnsureBalance extends BaseCommand<typeof SolanaEnsureBalance> {
  static override args = {
    amount: Args.string({ description: 'amount of SOL to airdrop', required: true }),
    receiver: Args.string({ description: 'receiver of the airdrop, defaults to the signer address' }),
  }

  static override description = 'Ensure that an address has a minimum balance of SOL'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  public async run(): Promise<void> {
    const { args } = await this.parse(SolanaEnsureBalance)

    const amount = args.amount ?? '0'
    if (Number.isNaN(Number(amount)) || Number(amount) < 0) {
      throw new RangeError(`Invalid amount: ${amount}. Must be a finite number.`)
    }

    const { client, explorerUrl, signer } = this.getSolanaContext()

    const address = args.receiver ?? signer.address
    const balance = (await getBalanceFormatted({ address, client })) || '0'

    if (Number.parseFloat(balance) >= Number.parseFloat(amount)) {
      console.log(`Balance of ${address} is ${balance} SOL\n${explorerUrl(address)}`)
      return
    }

    const airdropAmount = Number.parseFloat(amount) - Number.parseFloat(balance)
    const tx = await requestAirdrop({ address, amount: airdropAmount, client })
    const newBalance = await getBalanceFormatted({ address, client })
    console.log(`Airdropped ${airdropAmount} SOL to ${address}, balance is ${newBalance} SOL\n${explorerUrl(tx)}`)
  }
}
