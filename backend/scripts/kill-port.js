require('dotenv').config();
const { execSync } = require('child_process');

function killPort(port) {
  try {
    const stdout = execSync(`lsof -t -i:${port}`).toString().trim();
    if (stdout) {
      const pids = stdout.split('\n');
      console.log(`Killing processes on port ${port}: ${pids.join(', ')}`);
      pids.forEach(pid => {
        try {
          execSync(`kill -9 ${pid}`);
        } catch (e) {
          // Ignore errors if process already dead
        }
      });
    }
  } catch (e) {
    // No process found on port, ignore
  }
}

const port = process.env.PORT || 5005;
killPort(port);
