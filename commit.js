#!/usr/bin/env node

const inquirer = require("inquirer");

// Function to generate a random time in HH:MM:SS format
function getRandomTime() {
  const hours = String(Math.floor(Math.random() * 24)).padStart(2, "0");
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  const seconds = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Function to generate the Git command
function generateGitCommand(date, time, message) {
  const commitTime = time || getRandomTime();
  const dateTime = `${date} ${commitTime}`;
  return `GIT_AUTHOR_DATE="${dateTime}" GIT_COMMITTER_DATE="${dateTime}" git commit --amend -m "${message}"`;
}

// CLI prompts
async function runCLI() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "date",
        message: "Enter the date (YYYY-MM-DD):",
        validate: (input) => {
          return (
            /^\d{4}-\d{2}-\d{2}$/.test(input) ||
            "Please enter a valid date in YYYY-MM-DD format."
          );
        },
      },
      {
        type: "input",
        name: "time",
        message: "Enter the time (HH:MM:SS) [Leave blank for random]:",
        validate: (input) => {
          return (
            input === "" ||
            /^\d{2}:\d{2}:\d{2}$/.test(input) ||
            "Please enter a valid time in HH:MM:SS format."
          );
        },
      },
      {
        type: "input",
        name: "message",
        message: "Enter the commit message:",
        validate: (input) => {
          return input.trim() !== "" || "Commit message cannot be empty.";
        },
      },
    ]);

    const { date, time, message } = answers;
    const gitCommand = generateGitCommand(date, time, message);

    console.log("\nHere’s the Git command you can use to create the commit:");
    console.log(`\n${gitCommand}\n`);
  } catch (error) {
    console.error("Error running CLI:", error);
  }
}

runCLI();
