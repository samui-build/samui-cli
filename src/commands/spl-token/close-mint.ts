import { Args } from '@oclif/core'
import { handleSolanaError } from '@samui/solana'
import { address, assertIsAddress } from '@solana/web3.js'

import { BaseCommand } from '../../base-command.js'
import { splTokenCloseMint } from '../../lib/spl-token-close-mint.js'

export default class SplTokenCloseMint extends BaseCommand<typeof SplTokenCloseMint> {
  static override args = {
    mint: Args.string({ description: 'Mint to close', required: true }),
  }

  static override description = 'Close a SPL token mint'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  public async run(): Promise<void> {
    const { args } = await this.parse(SplTokenCloseMint)

    const { mint } = args

    assertIsAddress(mint)
    const { client, explorerUrl, signer } = this.getSolanaContext()

    try {
      const tx = await splTokenCloseMint({ account: address(mint), client, owner: signer })

      console.log(`Closed mint ${mint}\n${explorerUrl(tx)}`)
    } catch (error) {
      handleSolanaError(error)
    }
  }
}
