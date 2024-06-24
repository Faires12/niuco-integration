export function maskEmail(email: string): string {
  // Verifica se o e-mail é válido
  if (!email.includes('@')) {
    throw new Error('Email inválido')
  }

  // Separa o e-mail em duas partes
  const [localPart, domainPart] = email.split('@')

  // Mascarar a parte local do e-mail
  const maskedLocalPart = localPart
    .split('')
    .map((char, index) =>
      index > 0 && index < localPart.length - 1 ? '*' : char,
    )
    .join('')

  // Reunir e retornar o e-mail mascarado
  return `${maskedLocalPart}@${domainPart}`
}
