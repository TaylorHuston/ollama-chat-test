# ollama-chat-test

Test outputs from [ollama-chat](https://github.com/TaylorHuston/ollama-chat) build workflow experiments.

## What Is This?

This repo contains the specs, plans, and generated code from testing an automated AI coding workflow. The workflow uses:

- **Architect** (Claude Code) - Reads the spec, creates a phased implementation plan
- **Developer** (Local LLM or Claude) - Implements each phase
- **Reviewer** (Local LLM or Claude) - Scores code against acceptance criteria, loops until passing


## The Test Case

A vanilla JavaScript todo app with:
- Add/complete/delete tasks
- localStorage persistence
- Detailed visual spec (exact hex colors, pixel values, etc.)

## Results Summary

| Model | Time | Event Wiring | Accessibility | Error Handling | Code Quality |
|-------|------|--------------|---------------|----------------|--------------|
| Qwen 2.5 Coder 7B | ~15 min | ❌ Missing | Partial | Basic | Good |
| Qwen 2.5 Coder 14B (constrained) | ~2 hrs | ✅ Correct | Good | Basic | Better |
| Qwen 2.5 Coder 14B (clean) | <10 min | ✅ Correct | Good | Basic | Better |
| DeepSeek Coder V2 16B | Fast | ✅ Correct | None | Basic | Fair |
| Claude Sonnet 4.5 | Fastest | ✅ Correct | Full ARIA + keyboard | Comprehensive | Excellent |

### Key Findings

**Qwen 2.5 Coder (7B vs 14B):** The 14B consistently produced more complete code than the 7B. It wired up event listeners correctly, included keyboard accessibility, and produced cleaner file separation (HTML/CSS/JS).

**DeepSeek Coder V2 16B:** Fast inference (10GB VRAM, 100% GPU), got event wiring correct. But code quality was closer to Qwen 7B than 14B - no file separation, no ARIA, `innerHTML` with template literals (XSS risk), `confirm()` dialogs, array indices instead of unique IDs. Works, but needs cleanup.

**VRAM Matters:** The 14B can run 100% on GPU (9.7GB) with a clean system, but fragmentation from previous model loads can force CPU offloading. The first 14B run was 10x slower due to a 55/45 CPU/GPU split.

**Clean:** The first Qwen 14B run was slow due to VRAM fragmentation (working theory). After a clean restart, it ran much faster.

**Sonnet is a Different League:** The gap between Sonnet and local models was larger than expected. Sonnet produced genuinely production-quality code:
- Full ARIA attributes (`role`, `aria-checked`, `aria-label`)
- Proper `isLocalStorageAvailable()` check with graceful error handling
- Dedicated error message UI element
- Event delegation (cleaner than per-item listeners)
- Focus management (auto-focus input on page load)
- Multiple responsive breakpoints (640px and 320px)
- A TESTING.md documentation file (unprompted!)

**Bottom line:** Local models produce "it works" code. Sonnet produces "ship it" code. For prototyping and learning, local models are fine. For anything going to production, the quality gap is hard to ignore.

See the `.workflow/` directories for full agent conversation logs.

## VRAM Fragmentation Workaround

If you're switching between models and see unexpected CPU offloading (`ollama ps` shows split), either:

```bash
# Restart Ollama service
sudo systemctl restart ollama

# Or force-unload the current model before loading a larger one
curl http://localhost:11434/api/generate -d '{"model": "qwen2.5-coder:7b", "keep_alive": 0}'
```

This is a [known Ollama issue](https://medium.com/@rafal.kedziorski/ollamas-hidden-vram-bug-scripted-detection-and-cleanup-b3d6439d2199) with runner processes not fully releasing VRAM.

## Related

- [ollama-chat](https://github.com/TaylorHuston/ollama-chat) - The workflow tool
- [Blog post](https://taylorhuston.me) - Write-up of the experiment (coming soon)
