#!/usr/bin/env python3
import sys
import subprocess
import multiprocessing as mp

def worker(name, cmd):
    print(f"[{name}] START: {cmd}")
    p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    # Read stdout line by line without using iter with a potentially confusing sentinel
    while True:
        line = p.stdout.readline()
        if not line:
            break
        print(f"[{name}] {line.rstrip()}\n")
    p.wait()
    print(f"[{name}] DONE with exit code {p.returncode}")
    return p.returncode

def parse_plan(plan_path):
    tasks = []
    with open(plan_path, 'r', encoding='utf-8') as f:
        for line in f:
            t = line.strip()
            if t.startswith('- '):
                tasks.append(t[2:])
    return tasks

def main(plan_path, num_agents):
    tasks = parse_plan(plan_path)
    if not tasks:
        print("No tasks found in plan. Exiting.")
        return 1

    # Build placeholder commands for each task
    commands = [f"bash -lc 'echo Working on: {t}; sleep 1; echo Done: {t}'" for t in tasks]

    # Create a pool of workers (one per agent)
    n = max(1, int(num_agents))
    pool = mp.Pool(processes=n)
    results = [pool.apply_async(worker, args=(f"agent-{i+1}", commands[i])) for i in range(min(n, len(commands)))]
    pool.close()
    pool.join()
    return all(r.get() == 0 for r in results)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: build-with-agent-team.py <plan.md> [num_agents]")
        sys.exit(2)
    plan = sys.argv[1]
    n = int(sys.argv[2]) if len(sys.argv) > 2 else 3
    ok = main(plan, n)
    sys.exit(0 if ok else 1)
