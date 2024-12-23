import { Command, Option, program as cli } from 'commander'

export { cli }

declare module 'commander' {
  interface Command {
    baseCommand: (name: string) => Command
    withSolanaConfigOptions: () => Command
    withConfigOption: () => Command
  }
}

Command.prototype.baseCommand = function (name: string) {
  return this.command(name)
}
Command.prototype.withConfigOption = function () {
  return this
    .addOption(
      new Option(
        '-c --config <CONFIG>',
        'Path to the config file',
      ).env('SAMUI_CONFIG'),
    )
}

export const optionSolanaKeypairPath = new Option(
  '-k --keypair-path <KEYPAIR_PATH>',
  'Path to the keypair file',
)
  .default('~/.config/solana/id.json')
  .env('SOLANA_KEYPAIR_PATH')

export const optionSolanaRpcUrl = new Option(
  '-r --rpc-url <RPC_URL>',
  'Solana RPC Url',
)
  .default('https://api.devnet.solana.com')
  .env('SOLANA_RPC_URL')

export const optionSolanaRpcUrlSubscriptions = new Option(
  '-s --rpc-url-subscriptions <RPC_URL_SUBSCRIPTIONS>',
  'Solana RPC Url Subscriptions',
)
  .default('wss://api.devnet.solana.com')
  .env('SOLANA_RPC_URL_SUBSCRIPTIONS')

Command.prototype.withSolanaConfigOptions = function () {
  return this
    .addOption(optionSolanaKeypairPath)
    .addOption(optionSolanaRpcUrl)
    .addOption(optionSolanaRpcUrlSubscriptions)
}
