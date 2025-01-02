import { Flags } from '@oclif/core'
import { handleSolanaError } from '@samui/solana'
import { createKeyPairSignerFromBytes } from '@solana/web3.js'

import { BaseCommand } from '../../base-command.js'
import { ensureSecretKey } from '../../lib/ensure-secret-key.js'
import { splTokenCreateMint } from '../../lib/spl-token-create-mint.js'

export default class SplTokenCreateMint extends BaseCommand<typeof SplTokenCreateMint> {
  static override description = 'Create a SPL token mint'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  static override flags = {
    decimals: Flags.integer({ char: 'd', default: 9, description: 'Number of decimals' }),
    // eslint-disable-next-line no-warning-comments
    // TODO: Add support for metadata URI and name using Token Metadata Program
    // 'metadata-uri': Flags.url({ char: 'm', description: 'Metadata URI for the SPL mint to create' }),
    // name: Flags.string({ char: 'n', description: 'Name of the SPL mint to create' }),
    'secret-key': Flags.string({
      char: 's',
      default: 'generated',
      description:
        'You can provide the path to a file or and environment variable using the syntax ENV:SAMUI_<env-variable-name>',
      summary: 'Secret key for the SPL mint to create.',
    }),
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(SplTokenCreateMint)

    const [secretKeyBytes, source] = await ensureSecretKey(flags['secret-key'])
    const mint = await createKeyPairSignerFromBytes(secretKeyBytes)
    const decimals = flags.decimals ?? 9

    const { client, explorerUrl, signer } = this.getSolanaContext()

    try {
      const tx = await splTokenCreateMint({
        authority: signer,
        client,
        decimals,
        extensions: [],
        mint,
        payer: signer,
      })

      console.log(`Created mint ${mint.address} (${source}) with ${decimals} decimals \n${explorerUrl(tx)}`)
    } catch (error) {
      handleSolanaError(error)
    }
  }
}
