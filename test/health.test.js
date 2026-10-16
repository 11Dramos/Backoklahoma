import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import { createApp } from '../src/app.js'

const { httpServer, io } = createApp()
await new Promise((resolve) => httpServer.listen(0, resolve))
const base = `http://127.0.0.1:${httpServer.address().port}`

after(() => {
  io.close()
  httpServer.close()
})

test('GET /api/health responde ok', async () => {
  const res = await fetch(`${base}/api/health`)
  assert.equal(res.status, 200)
  assert.deepEqual(await res.json(), { ok: true })
})

test('POST /api/orders sin productos responde 400', async () => {
  const res = await fetch(`${base}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: [] }),
  })
  assert.equal(res.status, 400)
})
