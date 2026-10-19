// Live agent monitor: node .claude/monitor/server.mjs  ->  http://localhost:4111
import { createServer } from 'node:http'
import { readFileSync, writeFileSync, existsSync, watchFile, statSync, createReadStream } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const dir = dirname(fileURLToPath(import.meta.url))
const log = join(dir, 'events.jsonl')
if (!existsSync(log)) writeFileSync(log, '')
const clients = new Set()
let offset = statSync(log).size

watchFile(log, { interval: 150 }, (cur) => {
  if (cur.size < offset) offset = 0
  if (cur.size === offset) return
  const s = createReadStream(log, { start: offset, end: cur.size - 1, encoding: 'utf8' })
  let buf = ''
  s.on('data', (c) => (buf += c))
  s.on('end', () => {
    offset = cur.size
    for (const line of buf.split('\n').filter(Boolean)) for (const r of clients) r.write(`data: ${line}\n\n`)
  })
})

createServer((req, res) => {
  if (req.url === '/stream') {
    res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-cache', connection: 'keep-alive' })
    const recent = readFileSync(log, 'utf8').split('\n').filter(Boolean).slice(-400)
    for (const line of recent) res.write(`data: ${line}\n\n`)
    clients.add(res)
    req.on('close', () => clients.delete(res))
  } else if (req.url === '/clear') {
    writeFileSync(log, ''); offset = 0; res.end('ok')
  } else {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.end(readFileSync(join(dir, 'index.html')))
  }
}).listen(4111, '127.0.0.1', () => console.log('Agent monitor: http://localhost:4111'))
