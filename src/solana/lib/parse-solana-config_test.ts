import { expect } from 'jsr:@std/expect'
import { describe, it } from 'jsr:@std/testing/bdd'
import { parseSolanaConfig } from './parse-solana-config.ts'

describe('parseSolanaConfig', () => {
  it('should parse solana config', () => {
    const items = {
      keypairPath: '~/.config/solana/id.json',
      rpcUrl: 'https://api.devnet.solana.com',
      rpcUrlSubscriptions: 'wss://api.devnet.solana.com',
    }

    const parsed = parseSolanaConfig(items)

    expect(parsed.keypairPath).toBe(items.keypairPath)
    expect(parsed.rpcUrl).toBe(items.rpcUrl)
    expect(parsed.rpcUrlSubscriptions).toBe(items.rpcUrlSubscriptions)
  })

  it('should throw error if keypair path is not provided', () => {
    const items = {
      rpcUrl: 'https://api.devnet.solana.com',
      rpcUrlSubscriptions: 'wss://api.devnet.solana.com',
    }

    expect(() => parseSolanaConfig(items)).toThrow()
  })

  it('should throw error if rpc url is not provided', () => {
    const items = {
      keypairPath: '~/.config/solana/id.json',
      rpcUrlSubscriptions: 'wss://api.devnet.solana.com',
    }

    expect(() => parseSolanaConfig(items)).toThrow()
  })

  it('should throw error if rpc url subscriptions is not provided', () => {
    const items = {
      keypairPath: '~/.config/solana/id.json',
      rpcUrl: 'https://api.devnet.solana.com',
    }

    expect(() => parseSolanaConfig(items)).toThrow()
  })
})
