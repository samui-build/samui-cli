export function getKeypairBytes(secretKey: string) {
  return Uint8Array.from(JSON.parse(secretKey))
}

export async function getKeypairBytesFromFile(filePath: string) {
  filePath = filePath.startsWith(`~/`) ? filePath.replace(`~`, Deno.env.get('HOME')!) : filePath

  const keypairBytes = await Deno.readTextFile(filePath)

  return getKeypairBytes(keypairBytes)
}
