import { Args } from '@oclif/core'
import { address } from '@solana/web3.js'
import { fetchToken } from '@solana-program/token-2022'

import { BaseCommand } from '../../base-command.js'
import { getBurnAmount } from '../../lib/get-burn-amount.js'
import { getMint } from '../../lib/get-mint.js'
import { splTokenBurn } from '../../lib/spl-token-burn.js'

export default class SplTokenBurn extends BaseCommand<typeof SplTokenBurn> {
  static override args = {
    'token-account': Args.string({ description: 'The token account to burn from', required: true }),
    // eslint-disable-next-line perfectionist/sort-objects
    amount: Args.string({ description: 'The amount to burn, in tokens; accepts keyword ALL', required: true }),
  }

  static override description = 'Burn tokens'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  public async run(): Promise<void> {
    const { args } = await this.parse(SplTokenBurn)

    const { client, explorerUrl, signer } = this.getSolanaContext()

    // Get the token account to burn from
    const tokenAccount = await fetchToken(client.rpc, address(args['token-account']))

    if (!tokenAccount) {
      throw new Error(`Token account ${args['token-account']} not found`)
    }

    if (tokenAccount.data.amount.toString() === '0') {
      throw new Error(`Token account ${args['token-account']} has zero balance`)
    }

    // Get the mint of the token account
    const mint = await getMint({ client, mint: tokenAccount.data.mint })
    if (!mint) {
      throw new Error(`Mint ${tokenAccount.data.mint} not found`)
    }

    const amount = getBurnAmount({ amount: args.amount, mint, tokenAccount })

    const tx = await splTokenBurn({
      account: tokenAccount.address,
      amount,
      authority: signer.address,
      client,
      decimals: mint.data.decimals,
      mint: tokenAccount.data.mint,
      payer: signer,
    })

    const burnAmount = Number(amount) / 10 ** mint.data.decimals
    const postBurn = await fetchToken(client.rpc, address(tokenAccount.address))
    const postAmount = Number(postBurn.data.amount) / 10 ** mint.data.decimals

    this.log(
      `Burned ${burnAmount} tokens, new balance ${postAmount} from ${tokenAccount.address} (mint ${tokenAccount.data.mint})\n${explorerUrl(tx)}`,
    )
  }
}
