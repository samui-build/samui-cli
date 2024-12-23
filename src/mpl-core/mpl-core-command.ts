import { cli } from '../cli-command.ts'

import { mplCoreAssetBurnHandler } from './handlers/mpl-core-asset-burn-handler.ts'
import { mplCoreAssetCreateHandler } from './handlers/mpl-core-asset-create-handler.ts'
import { mplCoreAssetGetHandler } from './handlers/mpl-core-asset-get-handler.ts'
import { mplCoreAssetListHandler } from './handlers/mpl-core-asset-list-handler.ts'
import { mplCoreCollectionBurnHandler } from './handlers/mpl-core-collection-burn-handler.ts'
import { mplCoreCollectionCreateHandler } from './handlers/mpl-core-collection-create-handler.ts'
import { mplCoreCollectionGetHandler } from './handlers/mpl-core-collection-get-handler.ts'
import { mplCoreCollectionListHandler } from './handlers/mpl-core-collection-list-handler.ts'

export const mplCoreCommand = cli.baseCommand('mpl-core')
  .alias('mc')
  .description('Metaplex Core commands')
  .action(() => mplCoreCommand.help())

export const mplCoreAssetCommand = mplCoreCommand.baseCommand('asset')
  .alias('a')
  .description('Metaplex Core asset commands')
  .action(() => mplCoreAssetCommand.help())

mplCoreAssetCommand
  .baseCommand('burn')
  .alias('b')
  .description('Burn an asset')
  .withSolanaConfigOptions()
  .argument('<asset>', 'Asset address')
  .action(mplCoreAssetBurnHandler)

mplCoreAssetCommand
  .baseCommand('create')
  .alias('c')
  .description('Create a asset')
  .withSolanaConfigOptions()
  .requiredOption('-n, --name <NAME>', 'Asset name')
  .requiredOption('-u, --uri <URI>', 'Asset Metadata URI')
  .argument('<collection>', 'Collection address')
  .action(mplCoreAssetCreateHandler)

mplCoreAssetCommand
  .baseCommand('get')
  .alias('g')
  .description('Get a asset')
  .withSolanaConfigOptions()
  .argument('<asset>', 'Asset address')
  .action(mplCoreAssetGetHandler)

mplCoreAssetCommand
  .baseCommand('list')
  .alias('l')
  .description('List assets by collection')
  .withSolanaConfigOptions()
  .argument('<collection>', 'Collection address')
  .action(mplCoreAssetListHandler)

export const mplCoreCollectionCommand = mplCoreCommand.baseCommand('collection')
  .alias('c')
  .description('Metaplex Core collection commands')
  .action(() => mplCoreCollectionCommand.help())

mplCoreCollectionCommand
  .baseCommand('burn')
  .alias('b')
  .description('Burn a collection')
  .withSolanaConfigOptions()
  .argument('<collection>', 'Collection address')
  .action(mplCoreCollectionBurnHandler)

mplCoreCollectionCommand
  .baseCommand('create')
  .alias('c')
  .description('Create a collection')
  .withSolanaConfigOptions()
  .argument('<name>', 'Collection name')
  .argument('<uri>', 'Collection Metadata URI')
  .action(mplCoreCollectionCreateHandler)

mplCoreCollectionCommand
  .baseCommand('get')
  .alias('g')
  .description('Get a collection')
  .withSolanaConfigOptions()
  .argument('<collection>', 'Collection address')
  .action(mplCoreCollectionGetHandler)

mplCoreCollectionCommand
  .baseCommand('list')
  .alias('l')
  .description('List collections by authority')
  .withSolanaConfigOptions()
  .argument('[authority]', 'Authority address')
  .action(mplCoreCollectionListHandler)
