# samui-cli

Open Source Solana toolbox for builders.

> This project is in early development and is not ready for production use.
> The CLI is not yet published to npm or any other package registry so you can only use it locally.

## Commands

- [x] `solana`
    - [x] `airdrop`
    - [x] `balance`
    - [x] `ensure-balance`
    - [x] `genesis-hash`
    - [x] `version`
- [x] `spl-token`
    - [x] `mint`
        - [x] `create`
        - [x] `close`
        - [ ] Mint Metadata
    - [ ] `token-account`
        - [ ] Token Account commands
        - [ ] Token Account Metadata
- [x] `mpl-core`
    - [x] `asset`
        - [x] `burn <asset>`
        - [x] `create <collection>`
        - [x] `get <asset>`
        - [x] `list <collection>`
    - [x] `collection`
        - [x] `burn <collection>`
        - [x] `create <name> <uri>`
        - [x] `get <collection>`
        - [x] `list [authority]`
    - [ ] `candy-machine`
    - [ ] `candy-machine-guard`

## Roadmap

New features roughly in order of priority:

- [ ] Add support for MPL-Core Candy Machine abd Guards
- [ ] Add support for MPL-404
- [ ] Add `mpl-meta` subcommand to interact with Metaplex Metadata
    - [ ] Fetch metadata account from Solana
    - [ ] Fetch metadata uri
    - [ ] Create, Update, Delete metadata account
    - [ ] Format metadata based on input
    - [ ] Validate metadata input
- [ ] Add `das` subcommand to interact with the DAS Api
- [ ] Add `asset` subcommand to generate assets

## Requirements

- [Deno](https://deno.land/) v2.0.0 or higher

## Clone repository

```bash
git clone https://github.com/samui-build/samui-cli.git
cd samui-cli
```

## Install dependencies

```bash
deno cache --reload main.ts
```

## Run Samui cli

Using the deno task runner:

```bash
deno task cli
```

Or using the deno cli:

```bash
deno run -REN --allow-ffi --allow-sys --allow-run=docker main.ts
```

## Run Samui validator

```bash
deno task cli validator
```

# Credits

- Uses core from [ts-sugar](https://github.com/cryptorrivem/ts-sugar)
  by [cryptorrivem](https://github.com/cryptorrivem).

# License

MIT
