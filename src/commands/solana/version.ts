import { getVersion } from '@samui/solana'

import { BaseCommand } from '../../base-command.js'

export default class SolanaVersion extends BaseCommand<typeof SolanaVersion> {
  static override description = 'Show the Solana version'

  public async run(): Promise<void> {
    const { client, cluster } = this.getSolanaContext()

    const version = await getVersion({ client })
    this.log(`Solana version for ${cluster}: ${version['solana-core']}, ${version['feature-set']}`)
  }
}
