# Generate Commit

**Generate Commit** is a CLI tool that allows you to easily create backdated Git commits. You can specify the commit date and time, or let the tool generate a random time for you. This tool automates the process of creating commits with custom timestamps, which is useful for projects where you need to backdate commits.

---

## Features

- **Backdate commits**: Allows you to specify a custom commit date and time.
- **Random time generation**: Automatically generates a random time if no time is provided.
- **Interactive CLI**: Prompts the user to enter commit details and generates a commit command.
- **Non-interactive CLI**: Supports flags that allow you to pass the date, time, and commit message directly.
- **Custom commit messages**: You can provide a unique commit message for each generated commit.
- **Seamless Git integration**: Generates a commit command that you can directly run in your terminal.

---

## Flags

- `y`: Generate everything randomly (date, time, and message).
- `-d "<date>"`: Specify the date (in YYYY-MM-DD format).
- `-t "<time>"`: Specify the time (in HH:MM:SS format).
- `-m "<message>"`: Specify the commit message.

---

## Behavior

- If `-y` is used, it overrides everything and generates random values.
- If specific flags like `-d`, `-t`, or -m are provided, they are used. Missing fields are filled with random values.
- If no flags are used, the script enters an interactive prompt.
- If no inputs are provided, it generates missing values randomly.

---

## Installation

You can install the `generate-commit` package globally via npm to use it across all your projects:

```bash
npm install -g generate-commit
```

---

## Usage

Once installed, you can run the tool interactively. The tool will prompt you to input the commit date, time, and message. This mode is useful if you prefer to input commit details step-by-step.

To use it, simply run the following command in your terminal:

```bash
commit
```

or

```bash
npx generate-commit
```

When you run this command, the tool will prompt you to:

- **Enter the commit date:** If no date is provided, it will default to today's date.
- **Enter the commit time:** If no time is provided, the tool will generate a random time for you.
- **Enter the commit message:** You will be prompted to enter a custom commit message.

For example, the prompt will look like this:

```bash
Enter the date (YYYY-MM-DD) [Leave blank for random]: 2025-01-15
Enter the time (HH:MM:SS) [Leave blank for random]: 15:30:23
Enter the commit message [Leave blank for random]: Initial commit
```

Enter commit date (YYYY-MM-DD): 2025-01-15 Enter commit time (HH:MM): 15:30 Enter commit message: Initial commit

Once you are done you will get a commit command that you can now run to commit your changes, you can press `ENTER` to copy to clipboard or `ESC` to cancle

```bash
Here’s the Git command you can use to create the commit:

GIT_AUTHOR_DATE="2025-01-15 15:30:23" GIT_COMMITTER_DATE="2025-01-15 15:30:23" git commit --amend -m "Initial commit"

Press Enter to copy the command to your clipboard, or Press Esc to cancel...
```

You can now copy the command and use it to create your git commit

Built with ❤ by: [Chisom Joseph Njoku](https://github.com/Chisom-Joseph), follow me on GitHub

Feel free to contribute on [GitHub](https://github.com/Chisom-Joseph/generate-commit.git)
