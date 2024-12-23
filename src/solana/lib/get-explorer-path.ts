import { isAddress, isSignature } from '@solana/web3.js'

export function getExplorerPath(input: string) {
  if (input.includes('/')) {
    return input
  } else if (isAddress(input)) {
    return `/address/${input}`
  } else if (isSignature(input)) {
    return `/tx/${input}`
  } else {
    const parsed = parseInt(input)
    if (typeof parsed === 'number') {
      // Estimate if the number is a block or epoch to avoid making an async request
      if (parsed < 1_000) {
        return `/epoch/${parsed}`
      } else {
        return `/block/${parsed}`
      }
    }
    return input
  }
}
