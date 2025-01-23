#!/usr/bin/env node

import pkg from "terminal-kit";
import clipboardy from "clipboardy";
import inquirer from "inquirer";
import { program } from "commander";

const { terminal: term } = pkg;

// Generate random time in HH:MM:SS format
function getRandomTime() {
  const hours = String(Math.floor(Math.random() * 24)).padStart(2, "0");
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  const seconds = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Generate random date in YYYY-MM-DD format
function getRandomDate() {
  const year = String(Math.floor(Math.random() * (2025 - 2000 + 1)) + 2000);
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Generate a random commit message
function getRandomMessage() {
  const messages = [
    "Refactor codebase",
    "Fix critical bug",
    "Add new feature",
    "Update documentation",
    "Improve performance",
    "Fix typo",
    "Optimize build",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

// Validate date format (YYYY-MM-DD)
function validateDate(date) {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  return datePattern.test(date);
}

// Validate time format (HH:MM:SS)
function validateTime(time) {
  const timePattern = /^\d{2}:\d{2}:\d{2}$/;
  return timePattern.test(time);
}

// Generate the Git command
function generateGitCommand(date, time, message) {
  const commitDate = date || getRandomDate();
  const commitTime = time || getRandomTime();
  const dateTime = `${commitDate} ${commitTime}`;
  const commitMessage = message || getRandomMessage();
  return `GIT_AUTHOR_DATE="${dateTime}" GIT_COMMITTER_DATE="${dateTime}" git commit -m "${commitMessage}"`;
}

// CLI prompt function
async function runCLI() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "date",
        message: "Enter the date (YYYY-MM-DD) [Leave blank for random]:",
        validate: (input) => {
          if (input === "" || validateDate(input)) {
            return true;
          }
          return "Please enter a valid date in YYYY-MM-DD format.";
        },
      },
      {
        type: "input",
        name: "time",
        message: "Enter the time (HH:MM:SS) [Leave blank for random]:",
        validate: (input) => {
          if (input === "" || validateTime(input)) {
            return true;
          }
          return "Please enter a valid time in HH:MM:SS format.";
        },
      },
      {
        type: "input",
        name: "message",
        message: "Enter the commit message [Leave blank for random]:",
      },
    ]);

    const { date, time, message } = answers;
    const gitCommand = generateGitCommand(date, time, message);

    displayCommandWithCopyButton(gitCommand);
  } catch (error) {
    console.error("Error running CLI:", error);
  }
}

// Function to display the Git command with a "copy" button and cancel option
async function displayCommandWithCopyButton(gitCommand) {
  console.log("\nHere’s the Git command you can use to create the commit:");
  console.log(`\n${gitCommand}\n`);

  term.bold(
    "Press Enter to copy the command to your clipboard, or Press Esc to cancel...\n"
  );

  // Wait for the user to press Enter or Esc
  term.inputField({}, (error, input) => {
    if (error) {
      console.error("Error:", error);
      return;
    }

    if (input === "") {
      // If Enter key is pressed, copy to clipboard
      clipboardy.writeSync(gitCommand);
      term("\n✅ The command has been copied to your clipboard!\n");
      process.exit(); // Exit after copying
    } else if (input.toLowerCase() === "q") {
      // If "q" is pressed, cancel the action
      term("\n❌ Command not copied. Exiting...\n");
      process.exit(); // Exit without copying
    }
  });

  // Listen for the Escape key (Esc)
  term.on("key", (key) => {
    if (key === "ESCAPE") {
      term("\n❌ Command not copied. Exiting...\n");
      process.exit(); // Exit without copying
    }
  });
}

// Command-line arguments setup
program
  .option("-y", "Generate random date, time, and commit message")
  .option("-d <date>", "Specify the date in YYYY-MM-DD format")
  .option("-t <time>", "Specify the time in HH:MM:SS format")
  .option("-m <message>", "Specify the commit message");

// Validate command-line input for date and time
program.parse(process.argv);

const options = program.opts();

if (options.y) {
  // Generate everything randomly
  const gitCommand = generateGitCommand();
  displayCommandWithCopyButton(gitCommand);
} else {
  const date = options.d || null;
  const time = options.t || null;
  const message = options.m || null;

  // Validate the date and time inputs
  if (date && !validateDate(date)) {
    console.error("Error: Invalid date format. Please use YYYY-MM-DD.");
    process.exit(1); // Exit with an error code
  }

  if (time && !validateTime(time)) {
    console.error("Error: Invalid time format. Please use HH:MM:SS.");
    process.exit(1); // Exit with an error code
  }

  if (date || time || message) {
    const gitCommand = generateGitCommand(date, time, message);
    displayCommandWithCopyButton(gitCommand);
  } else {
    // Prompt user for missing inputs
    runCLI();
  }
}
