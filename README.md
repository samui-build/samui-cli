# samui-cli

The Samui CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/samui-cli.svg)](https://npmjs.org/package/samui-cli)
[![Downloads/week](https://img.shields.io/npm/dw/samui-cli.svg)](https://npmjs.org/package/samui-cli)

<!-- toc -->
* [samui-cli](#samui-cli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g samui-cli
$ samui-cli COMMAND
running command...
$ samui-cli (--version)
samui-cli/0.0.0 linux-x64 node-v18.20.5
$ samui-cli --help [COMMAND]
USAGE
  $ samui-cli COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`samui-cli config`](#samui-cli-config)
* [`samui-cli help [COMMAND]`](#samui-cli-help-command)
* [`samui-cli solana airdrop AMOUNT [RECEIVER]`](#samui-cli-solana-airdrop-amount-receiver)
* [`samui-cli solana balance [ADDRESS]`](#samui-cli-solana-balance-address)
* [`samui-cli solana ensure-balance AMOUNT [RECEIVER]`](#samui-cli-solana-ensure-balance-amount-receiver)
* [`samui-cli solana genesis-hash`](#samui-cli-solana-genesis-hash)
* [`samui-cli solana version`](#samui-cli-solana-version)
* [`samui-cli validator`](#samui-cli-validator)
* [`samui-cli version`](#samui-cli-version)

## `samui-cli config`

Show the configuration of the CLI

```
USAGE
  $ samui-cli config [--keypair-path <value>] [--rpc-url <value>] [--rpc-url-ws <value>]

GLOBAL FLAGS
  --keypair-path=<value>  [default: ~/.config/solana/id.json] Specify the Solana keypair path.
  --rpc-url=<value>       [default: https://api.devnet.solana.com/] Specify the Solana RPC URL.
  --rpc-url-ws=<value>    Specify the Solana RPC websocket URL, default will be inferred from the RPC URL.

DESCRIPTION
  Show the configuration of the CLI
```

_See code: [src/commands/config/index.ts](https://github.com/samui-build/samui-cli/blob/v0.0.0/src/commands/config/index.ts)_

## `samui-cli help [COMMAND]`

Display help for samui-cli.

```
USAGE
  $ samui-cli help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for samui-cli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.20/src/commands/help.ts)_

## `samui-cli solana airdrop AMOUNT [RECEIVER]`

Airdrop SOL to an address

```
USAGE
  $ samui-cli solana airdrop AMOUNT [RECEIVER] [--keypair-path <value>] [--rpc-url <value>] [--rpc-url-ws <value>]

ARGUMENTS
  AMOUNT    amount of SOL to airdrop
  RECEIVER  receiver of the airdrop, defaults to the signer address

GLOBAL FLAGS
  --keypair-path=<value>  [default: ~/.config/solana/id.json] Specify the Solana keypair path.
  --rpc-url=<value>       [default: https://api.devnet.solana.com/] Specify the Solana RPC URL.
  --rpc-url-ws=<value>    Specify the Solana RPC websocket URL, default will be inferred from the RPC URL.

DESCRIPTION
  Airdrop SOL to an address

EXAMPLES
  $ samui-cli solana airdrop
```

_See code: [src/commands/solana/airdrop.ts](https://github.com/samui-build/samui-cli/blob/v0.0.0/src/commands/solana/airdrop.ts)_

## `samui-cli solana balance [ADDRESS]`

Get the balance of a Solana account

```
USAGE
  $ samui-cli solana balance [ADDRESS] [--keypair-path <value>] [--rpc-url <value>] [--rpc-url-ws <value>]

ARGUMENTS
  ADDRESS  address to get the balance for, defaults to the signer address

GLOBAL FLAGS
  --keypair-path=<value>  [default: ~/.config/solana/id.json] Specify the Solana keypair path.
  --rpc-url=<value>       [default: https://api.devnet.solana.com/] Specify the Solana RPC URL.
  --rpc-url-ws=<value>    Specify the Solana RPC websocket URL, default will be inferred from the RPC URL.

DESCRIPTION
  Get the balance of a Solana account

EXAMPLES
  $ samui-cli solana balance

  $ samui-cli solana balance <address>
```

_See code: [src/commands/solana/balance.ts](https://github.com/samui-build/samui-cli/blob/v0.0.0/src/commands/solana/balance.ts)_

## `samui-cli solana ensure-balance AMOUNT [RECEIVER]`

Ensure that an address has a minimum balance of SOL

```
USAGE
  $ samui-cli solana ensure-balance AMOUNT [RECEIVER] [--keypair-path <value>] [--rpc-url <value>] [--rpc-url-ws
  <value>]

ARGUMENTS
  AMOUNT    amount of SOL to airdrop
  RECEIVER  receiver of the airdrop, defaults to the signer address

GLOBAL FLAGS
  --keypair-path=<value>  [default: ~/.config/solana/id.json] Specify the Solana keypair path.
  --rpc-url=<value>       [default: https://api.devnet.solana.com/] Specify the Solana RPC URL.
  --rpc-url-ws=<value>    Specify the Solana RPC websocket URL, default will be inferred from the RPC URL.

DESCRIPTION
  Ensure that an address has a minimum balance of SOL

EXAMPLES
  $ samui-cli solana ensure-balance
```

_See code: [src/commands/solana/ensure-balance.ts](https://github.com/samui-build/samui-cli/blob/v0.0.0/src/commands/solana/ensure-balance.ts)_

## `samui-cli solana genesis-hash`

Show the genesis hash of the Solana cluster

```
USAGE
  $ samui-cli solana genesis-hash [--keypair-path <value>] [--rpc-url <value>] [--rpc-url-ws <value>]

GLOBAL FLAGS
  --keypair-path=<value>  [default: ~/.config/solana/id.json] Specify the Solana keypair path.
  --rpc-url=<value>       [default: https://api.devnet.solana.com/] Specify the Solana RPC URL.
  --rpc-url-ws=<value>    Specify the Solana RPC websocket URL, default will be inferred from the RPC URL.

DESCRIPTION
  Show the genesis hash of the Solana cluster

EXAMPLES
  $ samui-cli solana genesis-hash
```

_See code: [src/commands/solana/genesis-hash.ts](https://github.com/samui-build/samui-cli/blob/v0.0.0/src/commands/solana/genesis-hash.ts)_

## `samui-cli solana version`

Show the Solana version

```
USAGE
  $ samui-cli solana version [--keypair-path <value>] [--rpc-url <value>] [--rpc-url-ws <value>]

GLOBAL FLAGS
  --keypair-path=<value>  [default: ~/.config/solana/id.json] Specify the Solana keypair path.
  --rpc-url=<value>       [default: https://api.devnet.solana.com/] Specify the Solana RPC URL.
  --rpc-url-ws=<value>    Specify the Solana RPC websocket URL, default will be inferred from the RPC URL.

DESCRIPTION
  Show the Solana version
```

_See code: [src/commands/solana/version.ts](https://github.com/samui-build/samui-cli/blob/v0.0.0/src/commands/solana/version.ts)_

## `samui-cli validator`

Run a Solana validator in a Docker container

```
USAGE
  $ samui-cli validator [-d] [-e <value>] [-i <value>] [-n <value>] [-p <value>]

FLAGS
  -d, --dry-run        Dry run, print the command that would be executed.
  -e, --env=<value>    Set environment variables.
  -i, --image=<value>  [default: ghcr.io/samui-build/samui-test-validator:latest] Docker image to run
  -n, --name=<value>   [default: samui-test-validator] name of the Docker container
  -p, --ports=<value>  [default: 8899:8899,8900:8900] ports to expose

DESCRIPTION
  Run a Solana validator in a Docker container

EXAMPLES
  $ samui-cli validator

  $ samui-cli validator ghcr.io/beeman/solana-test-validator:latest
```

_See code: [src/commands/validator.ts](https://github.com/samui-build/samui-cli/blob/v0.0.0/src/commands/validator.ts)_

## `samui-cli version`

```
USAGE
  $ samui-cli version [--json] [--verbose]

FLAGS
  --verbose  Show additional information about the CLI.

GLOBAL FLAGS
  --json  Format output as json.

FLAG DESCRIPTIONS
  --verbose  Show additional information about the CLI.

    Additionally shows the architecture, node version, operating system, and versions of plugins that the CLI is using.
```

_See code: [@oclif/plugin-version](https://github.com/oclif/plugin-version/blob/v2.2.18/src/commands/version.ts)_
<!-- commandsstop -->
