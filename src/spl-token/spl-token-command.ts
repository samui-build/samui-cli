import { Command, Option } from 'commander'
import { cli } from '../cli-command.ts'

import { splTokenCreateMintHandler } from './handlers/index.ts'
import { splTokenCloseMintHandler } from './handlers/spl-token-close-mint-handler.ts'

declare module 'commander' {
  interface Command {
    withMintDecimalOption: () => Command
    withMintNameOption: () => Command
    withMintSecretKeyOption: () => Command
  }
}

Command.prototype.withMintDecimalOption = function () {
  return this.addOption(
    new Option('-d, --decimals <DECIMALS>', 'Number of decimals').default('9')
      .env('SPL_TOKEN_CREATE_MINT_DECIMALS')
      .argParser(Number),
  )
}

Command.prototype.withMintNameOption = function () {
  return this.addOption(
    new Option('-n, --name <NAME>', 'Mint name')
      .env('SPL_TOKEN_MINT_NAME'),
  )
}

Command.prototype.withMintSecretKeyOption = function () {
  return this.addOption(
    new Option('--secret-key <SECRET_KEY>', 'Mint secret key')
      .env('SPL_TOKEN_MINT_SECRET_KEY').default('generated'),
  )
}

export const splTokenCommand = cli.baseCommand('spl-token')
  .alias('st')
  .description('SPL Token commands')
  .action(() => splTokenCommand.help())

const splTokenMintCommand = splTokenCommand.baseCommand('mint')
  .alias('m')
  .description('SPL Token mint commands')
  .action(() => splTokenMintCommand.help())

splTokenMintCommand
  .baseCommand('create')
  .alias('c')
  .withSolanaConfigOptions()
  .withMintDecimalOption()
  .withMintSecretKeyOption()
  .withMintNameOption()
  .description('Create a mint')
  .action(splTokenCreateMintHandler)

splTokenMintCommand
  .command('close-mint')
  .alias('cl')
  .withSolanaConfigOptions()
  .description('Close a mint')
  .argument('mint', 'Mint to close')
  .action(splTokenCloseMintHandler)
