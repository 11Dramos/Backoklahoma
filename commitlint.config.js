export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Los mensajes van en espanol: permitimos cualquier mayuscula/minuscula en el asunto.
    'subject-case': [0],
    'header-max-length': [2, 'always', 100],
  },
}
