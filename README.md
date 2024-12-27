# samui-cli

The Samui CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/samui-cli.svg)](https://npmjs.org/package/samui-cli)
[![Downloads/week](https://img.shields.io/npm/dw/samui-cli.svg)](https://npmjs.org/package/samui-cli)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g samui-cli
$ samui-cli COMMAND
running command...
$ samui-cli (--version)
samui-cli/0.0.0 darwin-arm64 node-v22.11.0
$ samui-cli --help [COMMAND]
USAGE
  $ samui-cli COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`samui-cli hello PERSON`](#samui-cli-hello-person)
- [`samui-cli hello world`](#samui-cli-hello-world)
- [`samui-cli help [COMMAND]`](#samui-cli-help-command)
- [`samui-cli plugins`](#samui-cli-plugins)
- [`samui-cli plugins add PLUGIN`](#samui-cli-plugins-add-plugin)
- [`samui-cli plugins:inspect PLUGIN...`](#samui-cli-pluginsinspect-plugin)
- [`samui-cli plugins install PLUGIN`](#samui-cli-plugins-install-plugin)
- [`samui-cli plugins link PATH`](#samui-cli-plugins-link-path)
- [`samui-cli plugins remove [PLUGIN]`](#samui-cli-plugins-remove-plugin)
- [`samui-cli plugins reset`](#samui-cli-plugins-reset)
- [`samui-cli plugins uninstall [PLUGIN]`](#samui-cli-plugins-uninstall-plugin)
- [`samui-cli plugins unlink [PLUGIN]`](#samui-cli-plugins-unlink-plugin)
- [`samui-cli plugins update`](#samui-cli-plugins-update)

## `samui-cli hello PERSON`

Say hello

```
USAGE
  $ samui-cli hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ samui-cli hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/samui-build/samui-cli/blob/v0.0.0/src/commands/hello/index.ts)_

## `samui-cli hello world`

Say hello world

```
USAGE
  $ samui-cli hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ samui-cli hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/samui-build/samui-cli/blob/v0.0.0/src/commands/hello/world.ts)_

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

## `samui-cli plugins`

List installed plugins.

```
USAGE
  $ samui-cli plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ samui-cli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.23/src/commands/plugins/index.ts)_

## `samui-cli plugins add PLUGIN`

Installs a plugin into samui-cli.

```
USAGE
  $ samui-cli plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into samui-cli.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the SAMUI_CLI_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the SAMUI_CLI_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ samui-cli plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ samui-cli plugins add myplugin

  Install a plugin from a github url.

    $ samui-cli plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ samui-cli plugins add someuser/someplugin
```

## `samui-cli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ samui-cli plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ samui-cli plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.23/src/commands/plugins/inspect.ts)_

## `samui-cli plugins install PLUGIN`

Installs a plugin into samui-cli.

```
USAGE
  $ samui-cli plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into samui-cli.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the SAMUI_CLI_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the SAMUI_CLI_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ samui-cli plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ samui-cli plugins install myplugin

  Install a plugin from a github url.

    $ samui-cli plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ samui-cli plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.23/src/commands/plugins/install.ts)_

## `samui-cli plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ samui-cli plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ samui-cli plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.23/src/commands/plugins/link.ts)_

## `samui-cli plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ samui-cli plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ samui-cli plugins unlink
  $ samui-cli plugins remove

EXAMPLES
  $ samui-cli plugins remove myplugin
```

## `samui-cli plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ samui-cli plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.23/src/commands/plugins/reset.ts)_

## `samui-cli plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ samui-cli plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ samui-cli plugins unlink
  $ samui-cli plugins remove

EXAMPLES
  $ samui-cli plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.23/src/commands/plugins/uninstall.ts)_

## `samui-cli plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ samui-cli plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ samui-cli plugins unlink
  $ samui-cli plugins remove

EXAMPLES
  $ samui-cli plugins unlink myplugin
```

## `samui-cli plugins update`

Update installed plugins.

```
USAGE
  $ samui-cli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.23/src/commands/plugins/update.ts)_

<!-- commandsstop -->
