import type { SolanaConfig } from '../../solana/index.ts'
import { getKeypairSigner, getSolanaContext, handleSolanaError } from '../../solana/index.ts'
import { createMint } from '../lib/index.ts'

export async function splTokenCreateMintHandler(
  options: { decimals: number; secretKey: string } & SolanaConfig,
) {
  const { client, signer, explorerUrl } = await getSolanaContext(options)

  if (!options.secretKey) {
    throw new Error('Secret key is required')
  }

  const mint = await getKeypairSigner(options.secretKey)
  const decimals = options.decimals

  try {
    const tx = await createMint({
      client,
      authority: signer,
      decimals,
      mint,
      payer: signer,
    })

    console.log(
      `Created mint ${mint.address} with ${decimals} decimals \n${explorerUrl(tx)}`,
    )
  } catch (error) {
    handleSolanaError(error)
  }
}
