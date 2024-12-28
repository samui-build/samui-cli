import { Command, Flags } from '@oclif/core'
import { spawn } from 'node:child_process'

export default class Validator extends Command {
  static override description = 'Run a Solana validator in a Docker container'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> ghcr.io/beeman/solana-test-validator:latest',
  ]

  static override flags = {
    'dry-run': Flags.boolean({ char: 'd', description: 'Dry run, print the command that would be executed.' }),
    env: Flags.string({ char: 'e', description: 'Set environment variables.' }),
    image: Flags.string({
      char: 'i',
      default: 'ghcr.io/samui-build/samui-test-validator:latest',
      description: 'Docker image to run',
      env: 'SAMUI_VALIDATOR_IMAGE',
    }),
    name: Flags.string({ char: 'n', default: 'samui-test-validator', description: 'name of the Docker container' }),
    ports: Flags.string({ char: 'p', default: '8899:8899,8900:8900', description: 'ports to expose' }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Validator)

    const { env, image, name, ports } = flags

    if (!image) {
      throw new Error('Missing image')
    }

    if (!name) {
      throw new Error('Missing name')
    }

    if (!ports) {
      throw new Error('Missing ports')
    }

    const command = getDockerCommand({ env, image, name, ports })
    if (flags['dry-run']) {
      this.log(`Dry run:\n${command}`)
      return
    }

    await runCommand({ command })
  }
}

function getDockerCommand(input: { env?: string; image: string; name: string; ports: string }) {
  const ports = input.ports
    .split(',')
    .map((port) => `-p ${port}`)
    .join(' ')

  const env = input.env ? `--env ${input.env}` : ''

  return (
    `docker run -it --rm --name ${input.name} ${ports} ${env} ${input.image}`
      // remove any double spaces
      .replaceAll(/  +/g, ' ')
  )
}

async function runCommand({ command }: { command: string }) {
  const [cmd, ...args] = command.split(' ')

  const proc = spawn(cmd, args, { stdio: 'inherit' })

  proc.on('close', (code) => {
    if (code === 0) {
      console.log('Docker container exited successfully.')
    } else {
      console.error(`Docker container exited with code ${code}`)
    }
  })

  proc.on('error', (err) => {
    console.error(`Failed to start Docker process: ${err.message}`)
  })
}
