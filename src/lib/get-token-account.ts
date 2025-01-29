import { Address } from '@solana/web3.js'
import { TOKEN_2022_PROGRAM_ADDRESS, findAssociatedTokenPda } from '@solana-program/token-2022'

export async function getTokenAccount({ mint, owner }: { mint: Address; owner: Address }) {
  const [pda] = await findAssociatedTokenPda({ mint, owner, tokenProgram: TOKEN_2022_PROGRAM_ADDRESS })

  return pda
}
