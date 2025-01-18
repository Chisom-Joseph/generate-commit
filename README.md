# Generate Commit

**Generate Commit** is a CLI tool that allows you to easily create backdated Git commits. You can specify the commit date and time, or let the tool generate a random time for you. This tool automates the process of creating commits with custom timestamps, which is useful for projects where you need to backdate commits.

---

## Overview

Generate Commit is a command-line interface (CLI) tool designed to assist developers in generating Git commits with customizable timestamps. You can specify the commit date and time, or if you prefer, let the tool automatically generate a random timestamp for you. This tool is especially useful for backdating commits, such as when you need to align commit history with a specific project timeline.

---

## Features

- **Backdate commits**: Allows you to specify a custom commit date and time.
- **Random time generation**: Automatically generates a random time if no time is provided.
- **Interactive CLI**: Prompts the user to enter commit details and generates a commit command.
- **Non-interactive CLI**: Supports flags that allow you to pass the date, time, and commit message directly.
- **Custom commit messages**: You can provide a unique commit message for each generated commit.
- **Seamless Git integration**: Generates a commit command that you can directly run in your terminal.

---

## Installation

You can install the `generate-commit` package globally via npm to use it across all your projects:

```bash
npm install -g generate-commit
```

# generate-commit

## Usage

### 1. Interactive Mode:

Once installed, you can run the tool interactively. The tool will prompt you to input the commit date, time, and message. This mode is useful if you prefer to input commit details step-by-step.

To use it, simply run the following command in your terminal:

```bash
commit
```

When you run this command, the tool will prompt you to:

- **Enter the commit date:** If no date is provided, it will default to today's date.
- **Enter the commit time:** If no time is provided, the tool will generate a random time for you.
- **Enter the commit message:** You will be prompted to enter a custom commit message.

For example, the prompt might look like this:

```bash
Enter commit date (YYYY-MM-DD): 2025-01-15
Enter commit time (HH:MM): 15:30
Enter commit message: Initial commit
```

Enter commit date (YYYY-MM-DD): 2025-01-15 Enter commit time (HH:MM): 15:30 Enter commit message: Initial commit

Once you are done you will get a commit command that you can now run to commit your changes
