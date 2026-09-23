import { faker } from "@faker-js/faker";
import fs from 'fs/promises';
import path from 'path';

const outputDir = path.join(process.cwd(), 'data');
const filePath = path.join(outputDir, 'sample-tasks.json');

function createFakeTask() {
  return {
    id: faker.string.uuid(),
    title: faker.hacker.phrase(), // Generates a realistic techy action phrase
    status: faker.helpers.arrayElement(['Todo', 'In Progress', 'Backlog', 'Completed']),
    priority: faker.helpers.arrayElement(['Low', 'Medium', 'High', 'Urgent']),
    createdAt: faker.date.past()
  };
}

async function exportTasks() {
  try {
    // 1. Generate 5 fake tasks
    const tasks = faker.helpers.multiple(createFakeTask, { count: 1000 });

    // 2. Create the folder if it doesn't already exist
    // recursive: true prevents errors if the folder already exists
    await fs.mkdir(outputDir, { recursive: true });
    console.log(`📁 Directory created or verified at: ${outputDir}`);

    // 3. Dump the formatted JSON string into the file
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf-8');
    console.log(`💾 Successfully dumped fake tasks to: ${filePath}`);
    
  } catch (error) {
    console.error('❌ Error executing file operations:', error);
  }
}

// Run the script
exportTasks();