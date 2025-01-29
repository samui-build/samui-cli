import { Address } from '@solana/web3.js'
import { TOKEN_PROGRAM_ADDRESS } from '@solana-program/token'
import { TOKEN_2022_PROGRAM_ADDRESS } from '@solana-program/token-2022'

export const labelMap = new Map<Address, string>()
  .set(TOKEN_PROGRAM_ADDRESS, 'Token')
  .set(TOKEN_2022_PROGRAM_ADDRESS, 'Token 2022')
