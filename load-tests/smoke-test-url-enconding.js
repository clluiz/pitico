import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { spawn } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path, { dirname } from "path"
import { fileURLToPath } from "url";

const sleep = promisify(setTimeout);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function setup() {
  console.log("Starting PostgreSQL container...");
  const container = await new PostgreSqlContainer("postgres:17-alpine").start();

  const databaseUrl = container.getConnectionUri();
  console.log(`Database container started at ${databaseUrl}`);

  let serverProcess;
  let k6Process;

  try {
    console.log("Running database migrations...");

    const filePath = path.resolve(__dirname, '../migrations/initial.sql');

    const sql = fs.readFileSync(filePath, "utf-8");

    console.log(sql)
    
    const execResult = await container.exec([
      "psql",
      "-U", container.getUsername(),
      "-d", container.getDatabase(),
      "-c", sql
    ]);

     console.log(execResult.output);

    console.log("Starting server...");
    serverProcess = spawn("pnpm", ["run", "dev"], {
      env: { ...process.env, DATABASE_URL: databaseUrl, PORT: "5000" },
      detached: true, // To kill the process tree
    });

    serverProcess.stdout.on("data", (data) => {
      console.log(`[server]: ${data}`);
    });

    serverProcess.stderr.on("data", (data) => {
      console.error(`[server-error]: ${data}`);
    });

    console.log("Waiting for server to be ready...");
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Server did not start in time"));
      }, 30000); // 30 seconds timeout

      serverProcess.stdout.on("data", (data) => {
        if (data.toString().includes("Server running on port 5000")) {
          clearTimeout(timeout);
          console.log("Server is ready!");
          resolve();
        }
      });
    });

    console.log("Running k6 smoke test...");
    await new Promise((resolve, reject) => {
      k6Process = spawn("k6", ["run", "load-tests/smoke-test-writes.js"]);

      k6Process.stdout.on('data', (data) => {
        console.log(`[k6]: ${data}`);
      });

      k6Process.stderr.on('data', (data) => {
        console.error(`[k6-error]: ${data}`);
      });

      k6Process.on('close', (code) => {
        if (code === 0) {
          console.log("k6 test finished successfully.");
          resolve();
        } else {
          reject(new Error(`k6 test failed with code ${code}`));
        }
      });
    });

  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    if (serverProcess) {
      console.log("Stopping server...");
      // Kill the whole process group
      process.kill(-serverProcess.pid);
    }
    console.log("Stopping PostgreSQL container...");
    await container.stop();
    console.log("Container stopped.");
  }
}

setup();
