import { z } from 'zod'

const schema = z.object({
  keypairPath: z.string().min(1),
  rpcUrl: z.string().url(),
  rpcUrlSubscriptions: z.string().url(),
})

export type Env = z.infer<typeof schema>

export function getEnvironment(params: Record<string, string>): Env {
  return schema.parse(params)
}
