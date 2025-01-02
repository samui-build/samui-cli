import { Args } from '@oclif/core'
import { handleSolanaError } from '@samui/solana'
import { Address, assertIsAddress } from '@solana/web3.js'
import { TOKEN_2022_PROGRAM_ADDRESS, findAssociatedTokenPda } from '@solana-program/token-2022'

import { BaseCommand } from '../../base-command.js'
import { createTokenWithAmount } from '../../lib/create-token-with-amount.js'
import { getOrCreateTokenAccount } from '../../lib/get-or-create-token-account.js'

export default class SplTokenMint extends BaseCommand<typeof SplTokenMint> {
  static override args = {
    mint: Args.string({ description: 'The token to mint', required: true }),
    // eslint-disable-next-line perfectionist/sort-objects
    amount: Args.string({ description: 'The amount to mint', required: true }),
    'recipient-token-account': Args.string({ description: 'The token account of the recipient' }),
  }

  static override description = 'Mint new tokens'

  static override examples = ['<%= config.bin %> <%= command.id %> <mint> <amount>']

  static override flags = {}

  public async run(): Promise<void> {
    const { args } = await this.parse(SplTokenMint)
    const { client, explorerUrl, signer } = this.getSolanaContext()

    const { mint } = args
    assertIsAddress(mint)

    const { amount } = args
    if (Number.isNaN(Number(amount))) {
      throw new RangeError(`Invalid amount: ${amount}. Must be a finite number.`)
    }

    const tokenAccount = args['recipient-token-account'] ?? (await getTokenAccount({ mint, owner: signer.address }))

    assertIsAddress(tokenAccount)

    try {
      const createTx = await getOrCreateTokenAccount({
        client,
        mint,
        owner: signer,
        payer: signer,
        tokenAccount,
      })
      if (createTx) {
        console.log(`Created token account ${tokenAccount}\n${explorerUrl(createTx)}`)
      }

      const tx = await createTokenWithAmount({
        amount: Number(amount),
        client,
        mint,
        mintAuthority: signer,
        payer: signer,
        tokenAccount,
      })

      console.log(`Minted ${amount} tokens to ${tokenAccount ?? signer.address}\n${explorerUrl(tx)}`)
    } catch (error) {
      handleSolanaError(error)
    }
  }
}

async function getTokenAccount({ mint, owner }: { mint: Address; owner: Address }) {
  const [pda] = await findAssociatedTokenPda({ mint, owner, tokenProgram: TOKEN_2022_PROGRAM_ADDRESS })

  return pda
}
