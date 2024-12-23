import { cli } from '../cli-command.ts'
import { getEnvironment } from './lib/get-environment.ts'

export const environmentCommand = cli.baseCommand('env')
  .description('Get cli environment options')
  .withSolanaConfigOptions()
  .action((options) => {
    const env = getEnvironment(options)
    Object.entries(env).forEach(([key, value]) => {
      console.log(`${key}=${value}`)
    })
    Deno.exit(0)
  })
