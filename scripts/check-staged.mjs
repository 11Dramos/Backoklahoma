// Compuerta de malas practicas antes de cada commit (la ejecuta Husky).
// Bloquea: archivos que nunca deben subirse, archivos enormes y secretos en el diff.
import { execSync } from 'node:child_process'
import fs from 'node:fs'

const sh = (cmd) => execSync(cmd, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
const staged = sh('git diff --cached --name-only --diff-filter=ACM').split('\n').filter(Boolean)
const problems = []

const FORBIDDEN_PATHS = [
  [/(^|\/)\.env(\.(?!example$).+)?$/, 'archivo .env (guarda secretos; usa .env.example)'],
  [/(^|\/)node_modules\//, 'node_modules'],
  [/(^|\/)(dist|build)\//, 'carpeta de build (se genera en el pipeline)'],
  [/\.(pem|key|pfx|p12)$/i, 'llave o certificado privado'],
]
const MAX_BYTES = 1024 * 1024

for (const file of staged) {
  for (const [re, why] of FORBIDDEN_PATHS) {
    if (re.test(file)) problems.push(`${file}: no se puede commitear (${why})`)
  }
  if (fs.existsSync(file) && fs.statSync(file).size > MAX_BYTES) {
    problems.push(`${file}: pesa mas de 1 MB (usa un servicio de archivos, no git)`)
  }
}

const SECRET_PATTERNS = [
  [/mongodb(\+srv)?:\/\/[^:\s'"]+:[^@\s'"]+@/i, 'cadena de conexion de MongoDB con usuario y clave'],
  [/APP_USR-[0-9a-f-]{16,}/i, 'token de Mercado Pago'],
  [/-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/, 'llave privada'],
  [/AKIA[0-9A-Z]{16}/, 'llave de acceso AWS'],
  [/(password|passwd|secret|token|api[_-]?key)\s*[:=]\s*['"][^'"\s]{8,}['"]/i, 'posible credencial escrita en el codigo'],
]

const diff = sh('git diff --cached -U0 --diff-filter=ACM -- . ":(exclude)package-lock.json" ":(exclude)scripts/check-staged.mjs"')
let current = ''
for (const line of diff.split('\n')) {
  if (line.startsWith('+++ b/')) current = line.slice(6)
  else if (line.startsWith('+') && !line.startsWith('+++')) {
    for (const [re, why] of SECRET_PATTERNS) {
      if (re.test(line)) problems.push(`${current}: ${why}`)
    }
  }
}

if (problems.length) {
  console.error('\nHusky bloqueo el commit por malas practicas:\n')
  for (const p of new Set(problems)) console.error('  x ' + p)
  console.error('\nCorrigelo y vuelve a intentar. Si algo es un falso positivo, avisame y ajustamos la regla.\n')
  process.exit(1)
}
