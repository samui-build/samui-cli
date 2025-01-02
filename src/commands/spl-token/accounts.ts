import { Args } from '@oclif/core'
import { Address, address } from '@solana/web3.js'
import { TOKEN_PROGRAM_ADDRESS } from '@solana-program/token'
import { TOKEN_2022_PROGRAM_ADDRESS } from '@solana-program/token-2022'

import { BaseCommand } from '../../base-command.js'
import { getTokenAccounts } from '../../lib/get-token-accounts.js'
import { renderTokenAccountsTable } from '../../lib/render-token-accounts-table.js'

export default class SplTokenAccounts extends BaseCommand<typeof SplTokenAccounts> {
  static override args = {
    owner: Args.string({ description: 'owner of the account to get, defaults to the signer address' }),
  }

  static override description = 'Get the token accounts for a given owner'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  static override flags = {}

  public async run(): Promise<void> {
    const { args } = await this.parse(SplTokenAccounts)
    const { owner } = args
    const { client, cluster, signer } = this.getSolanaContext()

    const ownerAddress = address(owner ?? signer.address)

    const [token, token2022] = await Promise.all(
      [TOKEN_PROGRAM_ADDRESS, TOKEN_2022_PROGRAM_ADDRESS].map((programId) =>
        getTokenAccounts({ client, owner: ownerAddress, programId }),
      ),
    )

    this.log(` => Accounts for ${ownerAddress} on cluster ${cluster}`)

    const accounts = [...token, ...token2022]

    if (accounts.length === 0) {
      this.log('No accounts found')
      return
    }

    const rows: [string, Address, Address, string][] = []

    for (const { account, pubkey } of accounts.filter(({ account }) => account)) {
      const { mint, tokenAmount } = account.data.parsed.info
      rows.push([this.label(account.owner), mint, pubkey, tokenAmount.uiAmountString])
    }

    renderTokenAccountsTable({ rows })
  }
}
