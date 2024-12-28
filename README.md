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
* [`samui-cli help [COMMAND]`](#samui-cli-help-command)
* [`samui-cli version`](#samui-cli-version)

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
