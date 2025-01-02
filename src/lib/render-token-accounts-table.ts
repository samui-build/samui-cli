import { cliui } from '@poppinss/cliui'
import { Address } from '@solana/web3.js'

export function renderTokenAccountsTable({ rows }: { rows: [string, Address, Address, string][] }) {
  const ui = cliui()
  const table = ui.table()

  table.head(['Program', 'Token', 'Account', 'Balance'])

  for (const row of rows) {
    table.row(row)
  }

  table.render()
}
