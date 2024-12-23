import { address, assertIsAddress } from '@solana/web3.js'
import type { SolanaConfig } from '../../solana/index.ts'
import { getSolanaContext, handleSolanaError } from '../../solana/index.ts'
import { closeMint } from '../lib/close-mint.ts'

export async function splTokenCloseMintHandler(
  mint: string,
  options: SolanaConfig,
) {
  assertIsAddress(mint)
  const { client, signer, explorerUrl } = await getSolanaContext(options)

  try {
    const tx = await closeMint({ account: address(mint), client, payer: signer })

    console.log(`Closed mint ${mint}\n${explorerUrl(tx)}`)
  } catch (error) {
    handleSolanaError(error)
  }
}
