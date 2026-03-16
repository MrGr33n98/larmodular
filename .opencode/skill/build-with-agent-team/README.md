Build With Agent Team (Prototype) - Local Orchestrator

Overview
- A lightweight, local approach to simulate multi-agent collaboration for planning and prototyping work inside a repository.
- Does not require Claude’s real Agent Teams; uses a small Python-based orchestrator to run tasks in parallel.

Prereqs
- Python 3.x
- Optional: tmux for real-time visualization (not required for the prototype)

Usage
- Place a plan markdown file describing the tasks.
- Run: python3 .opencode/skill/build-with-agent-team/build-with-agent-team.py <plan.md> [num_agents]
- The script will spawn worker processes for each task and print progress to stdout.

Notes
- This is a prototype. For production-grade integration with your CI/CD, you’d want to wrap this into a proper CLI, error handling, and better inter-process communication.
