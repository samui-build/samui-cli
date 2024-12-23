export * from './src/environment/index.ts'
export * from './src/mpl-core/index.ts'
export * from './src/solana/index.ts'
export * from './src/spl-token/index.ts'
export * from './src/validator/index.ts'

if (import.meta.main) {
  await import('./src/cli.ts').then(({ cli }) => cli.parse())
}
