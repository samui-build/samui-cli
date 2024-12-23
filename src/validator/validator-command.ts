import { cli } from '../cli-command.ts'

export const validatorCommand = cli.baseCommand('validator')
  .alias('v')
  .description('Run validator')
  .action(runDockerContainer)

export async function runDockerContainer() {
  const containerName = 'samui-test-validator'
  const containerParams = '-it -p 8899:8899 -p 8900:8900 --rm'
  // TODO: Add support for custom validator user and repo
  const dockerUser = 'ghcr.io/samui-build'
  const dockerRepo = 'samui-test-validator'
  // TODO: Add support for custom validator tag
  const dockerTag = 'latest'
  const command = `docker run ${containerParams} --name ${containerName} ${dockerUser}/${dockerRepo}:${dockerTag}`

  // Create and spawn the Docker command
  const dockerProcess = new Deno.Command('docker', {
    args: command.split(' ').slice(1), // Split and pass the arguments excluding "docker"
    stdin: 'inherit',
    stdout: 'inherit',
    stderr: 'inherit',
  })

  // Run the command
  const status = await dockerProcess.spawn().status

  // Handle the status
  if (status.success) {
    console.log('Docker container exited successfully.')
  } else {
    console.error(`Docker container exited with code ${status.code}`)
  }
}
