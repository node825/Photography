# Create New Claude Configuration File

## Description
Initializes a new Claude configuration directory and file for project documentation. This command creates a `.claude` directory and sets up a `CLAUDE.md` file that contains project-specific instructions and guidelines for Claude Code operations. The specified directory path serves as the root directory for all Claude configuration operations.

## Arguments

- `directory-path` (optional): The root directory path where the `.claude` configuration will be created. If not provided, the current working directory will be used.

## Usage Examples

```bash
# Create configuration in the current directory
create-new-claude-file

# Create configuration in a specific directory
create-new-claude-file /path/to/project

# Create configuration in a relative directory
create-new-claude-file ./my-project
```

## Tasks

1. Accept an optional directory path argument that will serve as the root directory
2. Create a new directory named `.claude` inside the specified root directory if it does not already exist
3. Create a `CLAUDE.md` file inside the `.claude` directory if it does not already exist
4. Run the initialization command on the directory and update the `CLAUDE.md` file with appropriate content