export function buildCode(code: string) {
  const value = code
    .replaceAll(' ', '')
    .replaceAll('-', '')
    .replaceAll('.', '')
    .replaceAll('á', 'a')
    .replaceAll('é', 'e')
    .replaceAll('í', 'i')
    .replaceAll('ó', 'o')
    .replaceAll('ú', 'u')
    .replaceAll('*', '')
    .replace('@', '')

  return value.toUpperCase()
}

export function buildTable(project: string, form: string) {
  return `DIG_${project}_${form}`
}

export function ErrorHandler(error: Error | unknown, business?: boolean) {
  console.log(error, business)
}
