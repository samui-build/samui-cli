import { Args } from '@oclif/core'
import { address } from '@solana/web3.js'

import { BaseCommand } from '../../base-command.js'
import { getMint } from '../../lib/get-mint.js'
import { getTokenAccounts } from '../../lib/get-token-accounts.js'

export default class SplTokenBalance extends BaseCommand<typeof SplTokenBalance> {
  static override args = {
    mint: Args.string({ description: 'Mint to get the balance for', required: true }),
    owner: Args.string({ description: 'owner of the account to get, defaults to the signer address' }),
  }

  static override description = 'Get the balance of a SPL token mint'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  public async run(): Promise<void> {
    const { args } = await this.parse(SplTokenBalance)

    const { client, cluster, signer } = this.getSolanaContext()

    const mint = address(args.mint)
    const owner = address(args.owner ?? signer.address)

    const mintInfo = await getMint({ client, mint })
    const accounts = await getTokenAccounts({
      client,
      mint,
      owner,
      programId: mintInfo.programAddress,
    })

    let balance = BigInt(0)

    this.log(` => Balance for ${owner} on cluster ${cluster}`)
    for (const { account, pubkey } of accounts.filter(({ account }) => account)) {
      const { tokenAmount } = account.data.parsed.info
      balance += BigInt(tokenAmount.amount)
      this.log(`    ${tokenAmount.uiAmountString} on ${pubkey}`)
    }

    this.log(` => Total: ${Number(balance) / 10 ** mintInfo.data.decimals} tokens`)
  }
}
