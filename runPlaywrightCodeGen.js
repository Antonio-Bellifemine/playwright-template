// run-playwright-codegen.js
const { exec } = require('child_process');
const sharedConfig = require('./sharedConfig.js');

// Get the project name from the command line arguments
const projectName = process.argv[2];

// Define a mapping between project names and URLs
const projectUrls = {
  embrace: sharedConfig.EMBRACE_PROJECT_URL,
  conduit: sharedConfig.CONDUIT_PROJECT_URL
};

// Get the base URL based on the project name
const baseUrl = projectUrls[projectName];

if (!baseUrl) {
  console.error(`Project "${projectName}" not found. Available projects are: ${Object.keys(projectUrls).join(', ')}`);
  process.exit(1);
}

// Run the npx playwright codegen command with the selected project URL
exec(`npx playwright codegen ${baseUrl}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});

