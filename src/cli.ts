import '@std/dotenv/load'

import denoJson from '../deno.json' with { type: 'json' }
import { cli } from './cli-command.ts'
import './cli-commands.ts'

cli
  .name('samui')
  .version(denoJson.version)
  .description(denoJson.description)

export { cli }
