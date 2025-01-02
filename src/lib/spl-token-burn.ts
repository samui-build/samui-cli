import { SolanaClient, sendAndConfirmInstructions } from '@samui/solana'
import { Signature, TransactionSigner } from '@solana/web3.js'

import { getBurnTokenInstructions } from './get-burn-token-instructions.js'

export async function splTokenBurn(
  input: {
    client: SolanaClient
    payer: TransactionSigner
  } & Parameters<typeof getBurnTokenInstructions>[0],
): Promise<Signature> {
  const burnTx = await getBurnTokenInstructions({
    account: input.account,
    amount: input.amount,
    authority: input.authority,
    decimals: input.decimals,
    mint: input.mint,
  })

  return sendAndConfirmInstructions(input.client, input.payer, [burnTx])
}
