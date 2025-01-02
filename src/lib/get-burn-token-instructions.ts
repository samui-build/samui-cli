import { Address, IInstruction } from '@solana/web3.js'
import { getBurnCheckedInstruction } from '@solana-program/token-2022'

export async function getBurnTokenInstructions(input: {
  account: Address
  amount: bigint
  authority: Address
  decimals: number
  mint: Address
}): Promise<IInstruction> {
  return getBurnCheckedInstruction({
    account: input.account,
    amount: input.amount,
    authority: input.authority,
    decimals: input.decimals,
    mint: input.mint,
  })
}
