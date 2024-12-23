import { isSolanaError } from '@solana/web3.js'

export function handleSolanaError(error: unknown) {
  if (isSolanaError(error)) {
    console.error(`${error.message}:`, error.context)
  } else {
    console.error(error)
  }
}
