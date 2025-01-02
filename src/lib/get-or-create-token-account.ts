import { SolanaClient, sendAndConfirmInstructions } from '@samui/solana'
import { Address, Signature, type TransactionSigner } from '@solana/web3.js'
import { getCreateAssociatedTokenInstructionAsync } from '@solana-program/token-2022'

export async function getOrCreateTokenAccount(
  input: {
    client: SolanaClient
    tokenAccount: Address
  } & {
    owner: TransactionSigner
  } & Omit<Parameters<typeof getCreateAssociatedTokenInstructionAsync>[0], 'owner' | 'token'>,
): Promise<Signature | undefined> {
  const found = await input.client.rpc.getAccountInfo(input.tokenAccount, { encoding: 'jsonParsed' }).send()

  if (!found.value) {
    const createAta = await getCreateAssociatedTokenInstructionAsync({
      mint: input.mint,
      owner: input.owner.address,
      payer: input.owner,
    })

    return sendAndConfirmInstructions(input.client, input.payer, [createAta])
  }
}
