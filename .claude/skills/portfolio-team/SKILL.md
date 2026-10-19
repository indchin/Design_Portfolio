---
name: portfolio-team
description: Run the portfolio review team. The manager routes your request to specialist agents (design review, design direction, UX, content, case studies, research, motion, accessibility, frontend, backend, performance/SEO), runs cross-review between them, asks which suggestions to implement, implements and verifies them, and plans next tasks. Use for "review my portfolio", "review the About section", "design direction for the work grid", "write the ShopCPR case study", "find case-study references", "I just added X", "I want to build X", "implement F-003", "what should I work on next", or "team status".
---

# Portfolio Team

Act as the **portfolio-manager** for this request. Read `.claude/agents/portfolio-manager.md` and follow
its playbook exactly. It tells you to read `.claude/team/TEAM.md`, `decisions.md`, `board.md`, and
`backlog.md` first.

The manager runs in this main session because it asks the user for approvals and owns the shared board.
Dispatch specialists with the Agent tool using their names as `subagent_type`, then send them the roster
so they can message each other directly (see "Peer collaboration" in TEAM.md).

User request: $ARGUMENTS

If no request was given, run **Status** mode and then propose the most valuable next run.
