import { environmentCommand } from './environment/index.ts'
import { mplCoreCommand } from './mpl-core/index.ts'
import { solanaCommand } from './solana/index.ts'
import { splTokenCommand } from './spl-token/index.ts'
import { validatorCommand } from './validator/index.ts'

export default [
  environmentCommand,
  mplCoreCommand,
  solanaCommand,
  splTokenCommand,
  validatorCommand,
]
