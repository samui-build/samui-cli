import { existsSync, readFileSync } from 'node:fs'

import { generateExtractedKeypair } from './generate-extracted-keypair.js'

export type GetSecretKeyInput = 'generated' | `ENV:${string}` | string
export type GetSecretKeySource = 'environment' | 'file' | 'generated'

export async function getSecretKey(input: GetSecretKeyInput): Promise<[string, GetSecretKeySource]> {
  if (input === 'generated') {
    const keypair = await generateExtractedKeypair()

    return [keypair, 'generated']
  }

  if (input.startsWith('ENV:')) {
    const envVariableName = input.replace('ENV:', '')
    if (!envVariableName.startsWith('SAMUI_')) {
      throw new Error(`Invalid environment variable name: ${envVariableName}`)
    }

    const secretKey = process.env[envVariableName]
    if (!secretKey) {
      throw new Error(`Environment variable ${envVariableName} not found`)
    }

    return [secretKey, 'environment']
  }

  if (existsSync(input)) {
    const secretKey = readFileSync(input, 'utf8')

    return [secretKey, 'file']
  }

  throw new Error(`Invalid secret key: ${input}`)
}
