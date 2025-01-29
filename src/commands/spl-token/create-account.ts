import { Args } from '@oclif/core'
import { handleSolanaError } from '@samui/solana'
import { assertIsAddress } from '@solana/web3.js'

import { BaseCommand } from '../../base-command.js'
import { getOrCreateTokenAccount } from '../../lib/get-or-create-token-account.js'
import { getTokenAccount } from '../../lib/get-token-account.js'

export default class SplTokenCreateAccount extends BaseCommand<typeof SplTokenCreateAccount> {
  static override args = {
    mint: Args.string({ description: 'The mint to create the token account for', required: true }),
    'token-account-owner': Args.string({ description: 'The owner of the token account' }),
  }

  static override description = 'Create a token account'

  static override examples = ['<%= config.bin %> <%= command.id %> <mint> [token-account-owner]']

  static override flags = {}

  public async run(): Promise<void> {
    const { args } = await this.parse(SplTokenCreateAccount)
    const { client, explorerUrl, signer } = this.getSolanaContext()

    const { mint } = args
    assertIsAddress(mint)

    const tokenAccount = args['token-account-owner'] ?? (await getTokenAccount({ mint, owner: signer.address }))

    assertIsAddress(tokenAccount)

    try {
      const createTx = await getOrCreateTokenAccount({
        client,
        mint,
        owner: signer,
        payer: signer,
        tokenAccount,
      })
      if (createTx) {
        console.log(`Created token account ${tokenAccount}\n${explorerUrl(createTx)}`)
      } else {
        console.log(`Token account ${tokenAccount} already exists`)
      }
    } catch (error) {
      handleSolanaError(error)
    }
  }
}
