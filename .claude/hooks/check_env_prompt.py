#!/usr/bin/env python3
"""UserPromptSubmit hook: block prompts that reference .env files."""

import json
import re
import sys


def main():
    hook_input = json.load(sys.stdin)
    prompt = hook_input.get("user_prompt", "")

    env_pattern = r"\.env\b|dotenv|ENV_FILE"
    if re.search(env_pattern, prompt, re.IGNORECASE):
        result = {
            "decision": "block",
            "reason": "Prompt references a .env file. Sharing environment files may expose secrets like API keys and passwords."
        }
        print(json.dumps(result), file=sys.stderr)
        sys.exit(2)


if __name__ == "__main__":
    main()
