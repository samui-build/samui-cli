import { getGenesisHash } from '@samui/solana'

import { BaseCommand } from '../../base-command.js'

export default class SolanaGenesisHash extends BaseCommand<typeof SolanaGenesisHash> {
  static override description = 'Show the genesis hash of the Solana cluster'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  public async run(): Promise<void> {
    const { client, cluster } = this.getSolanaContext()

    const genesisHash = await getGenesisHash({ client })
    this.log(`Genesis hash for ${cluster}: ${genesisHash}`)
  }
}
