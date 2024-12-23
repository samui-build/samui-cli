import { z } from 'zod'

const schema = z.object({
  keypairPath: z.string().min(1),
  rpcUrl: z.string().url(),
  rpcUrlSubscriptions: z.string().url(),
})

export type SolanaConfig = z.infer<typeof schema>

export function parseSolanaConfig(params: Record<string, string>): SolanaConfig {
  return schema.parse(params)
}
