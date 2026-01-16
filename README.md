# ollama-chat-test

Test outputs from [ollama-chat](https://github.com/TaylorHuston/ollama-chat) build workflow experiments.

## What Is This?

This repo contains the specs, plans, and generated code from testing an automated AI coding workflow. The workflow uses:

- **Architect** (Claude Code) - Reads the spec, creates a phased implementation plan
- **Developer** (Qwen 2.5 Coder via Ollama) - Implements each phase
- **Reviewer** (Qwen 2.5 Coder via Ollama) - Scores code against acceptance criteria, loops until passing

## Directory Structure

```
├── SPEC.md              # The specification the AI was given
├── PLAN.md              # AI-generated implementation plan
├── qwen7b/              # Output from Qwen 2.5 Coder 7B
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── localStorage.js
│   └── .workflow/       # JSON logs of each agent handoff
└── output2/             # Output from Qwen 2.5 Coder 14B (in progress)
```

## The Test Case

A vanilla JavaScript todo app with:
- Add/complete/delete tasks
- localStorage persistence
- Detailed visual spec (exact hex colors, pixel values, etc.)

## Results Summary

| Model | VRAM Usage | Speed | Result |
|-------|------------|-------|--------|
| Qwen 2.5 Coder 7B | ~6GB | Fast (~30-50 tok/s) | Functional but missing event wiring |
| Qwen 2.5 Coder 14B | ~15GB | Slow (memory constrained) | TBD |

See the `.workflow/` directories for full agent conversation logs.

## Related

- [ollama-chat](https://github.com/TaylorHuston/ollama-chat) - The workflow tool
- [Blog post](https://taylorhuston.me) - Write-up of the experiment (coming soon)
