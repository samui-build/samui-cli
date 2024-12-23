import { cli } from '../cli-command.ts'

import {
  solanaAirdropHandler,
  solanaBalanceHandler,
  solanaEnsureBalanceHandler,
  solanaExplorerHandler,
  solanaGenesisHashHandler,
  solanaVersionHandler,
} from './handlers/index.ts'

export const solanaCommand = cli.baseCommand('solana')
  .alias('s')
  .description('Solana commands')
  .action(() => solanaCommand.help())

solanaCommand
  .baseCommand('airdrop')
  .alias('a')
  .withSolanaConfigOptions()
  .description('Request airdrop')
  .argument('amount', 'Amount to airdrop')
  .argument('[receiver]', 'Address of airdrop receiver')
  .action(solanaAirdropHandler)

solanaCommand
  .baseCommand('balance')
  .alias('b')
  .withSolanaConfigOptions()
  .description('Get account balance')
  .argument('[address]', 'Account balance to check')
  .action(solanaBalanceHandler)

solanaCommand
  .baseCommand('ensure-balance')
  .alias('eb')
  .withSolanaConfigOptions()
  .description('Ensure minimum balance')
  .argument('amount', 'Minimum amount to ensure')
  .argument('[receiver]', 'Address of airdrop receiver')
  .action(solanaEnsureBalanceHandler)

solanaCommand
  .baseCommand('genesis-hash')
  .alias('gh')
  .withSolanaConfigOptions()
  .description('Get Solana Genesis Hash')
  .action(solanaGenesisHashHandler)

solanaCommand
  .baseCommand('version')
  .alias('v')
  .withSolanaConfigOptions()
  .description('Get Solana version')
  .action(solanaVersionHandler)

cli
  .baseCommand('explorer')
  .alias('e')
  .withSolanaConfigOptions()
  .description('Get explorer url')
  .argument('[path]', 'Path to show in explorer')
  // TODO: Add an option to open the link in the browser
  // .option("-o, --open", "Open the link in the browser")
  .action(solanaExplorerHandler)
