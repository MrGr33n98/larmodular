Build With Agent Team (Prototype)

- Purpose: Lightweight, local alternative to Claude's Agent Teams for coordinating multi-component work inside a repository.
- Scope: Prototyping orchestration of frontend/backend/infra tasks based on a plan document.
- Prereqs: Python 3.x, no external services required. Optional: tmux for visual monitoring (not required for this prototype).
- How it works: This is a minimal, self-contained prototype that spawns worker processes to simulate parallel agents executing tasks derived from a plan file.
- Limitations: Not a full replacement for Claude’s Agent Teams; intended for quick planning and basic orchestration inside a single repo.
- Typical usage: Describe a plan in Markdown and run a local Python script to simulate agent execution.
