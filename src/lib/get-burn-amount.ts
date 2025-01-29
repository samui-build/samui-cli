import { Account } from '@solana/web3.js'
import { Mint, Token } from '@solana-program/token-2022'

export function getBurnAmount({
  amount,
  mint,
  tokenAccount,
}: {
  amount: string
  mint: Account<Mint, string>
  tokenAccount: Account<Token, string>
}): bigint {
  if (amount === 'ALL') {
    return tokenAccount.data.amount
  }

  // Parse the amount as a number
  const numericAmount = Number(amount)
  if (Number.isNaN(numericAmount)) {
    throw new TypeError(`Invalid amount: ${amount}`)
  }

  // Multiply by 10^decimals and convert to BigInt
  const burnAmount = BigInt(Math.round(numericAmount * 10 ** mint.data.decimals))

  // Ensure the amount is within the token account's balance
  if (burnAmount > tokenAccount.data.amount) {
    throw new Error(`Amount ${amount} is greater than the token account's balance ${tokenAccount.data.amount}`)
  }

  return burnAmount
}
