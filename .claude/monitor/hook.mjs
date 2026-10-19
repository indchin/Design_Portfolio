// Claude Code hook: appends one compact event per call to events.jsonl. Never blocks.
// Besides the raw activity it records WHO did it (actor) and WHO it was aimed at (target),
// so the monitor can draw task assignments (manager -> agent) and peer messages (agent -> agent).
import { appendFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const file = join(dirname(fileURLToPath(import.meta.url)), 'events.jsonl')
let raw = ''
process.stdin.on('data', (c) => (raw += c))
process.stdin.on('end', () => {
  try {
    const d = JSON.parse(raw || '{}')
    const ti = d.tool_input || {}
    const isDispatch = d.tool_name === 'Agent' || d.tool_name === 'Task'
    const isMessage = d.tool_name === 'SendMessage'
    const msg = typeof ti.message === 'string' ? ti.message : ti.message ? JSON.stringify(ti.message) : ''
    const detail =
      ti.description || ti.file_path || ti.command || ti.pattern || ti.prompt || ti.subagent_type || ''
    const ev = {
      t: Date.now(),
      event: d.hook_event_name,
      session: d.session_id,
      agent: d.agent_type || ti.subagent_type || null,
      agentId: d.agent_id || null,
      // who is acting (null = the main session / manager)
      actor: d.agent_type || null,
      // who the action is aimed at: dispatched subagent type, or message recipient (name or id)
      target: isDispatch ? ti.subagent_type || null : isMessage ? ti.to || null : null,
      tool: d.tool_name || null,
      detail: String(detail).slice(0, 140),
      // short human title for the assignment, and a longer brief for the side panel
      task: isDispatch ? String(ti.description || '').slice(0, 80) : undefined,
      brief: isDispatch ? String(ti.prompt || '').slice(0, 400) : undefined,
      message: isMessage ? msg.slice(0, 400) : undefined,
      prompt: d.hook_event_name === 'UserPromptSubmit' ? String(d.prompt || '').slice(0, 140) : undefined,
    }
    appendFileSync(file, JSON.stringify(ev) + '\n')
  } catch {}
  process.exit(0)
})
