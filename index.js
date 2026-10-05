import fs from 'fs';
import path from 'path';

const API_URL = 'https://www.useful-finds-daily.com/api/v1/today-in-tech';

async function run() {
  try {
    const readmePath = process.env['INPUT_README-PATH'] || 'README.md';
    const tagStart = process.env['INPUT_TAG-START'] || '<!-- TODAY-IN-TECH:START -->';
    const tagEnd = process.env['INPUT_TAG-END'] || '<!-- TODAY-IN-TECH:END -->';

    console.log(`Fetching today's tech milestone from ${API_URL}...`);
    const res = await fetch(API_URL, {
      headers: {
        'User-Agent': 'github-action-today-in-tech/1.0 (+https://www.useful-finds-daily.com)'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch from Useful Finds Daily API: ${res.status}`);
    }

    const json = await res.json();
    const item = json.data;

    console.log(`Fetched: [${item.date}] ${item.title}`);

    // Build replacement markdown block
    const block = `
### ⚡ Today in Tech History (${item.date})

**${item.title}**

> ${item.summary}

👉 [Read the full verified engineering history on Useful Finds Daily](${item.url}?utm_source=github_action&utm_medium=profile_readme&utm_campaign=today_in_tech) · *Data provided by [Useful Finds Daily Archive](https://www.useful-finds-daily.com)*
`;

    const fullPath = path.resolve(process.cwd(), readmePath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`Target file ${fullPath} not found. Creating a minimal one...`);
      fs.writeFileSync(fullPath, `${tagStart}\n${block}\n${tagEnd}\n`, 'utf-8');
      console.log('Created and populated README file.');
      return;
    }

    const content = fs.readFileSync(fullPath, 'utf-8');
    const regex = new RegExp(`${tagStart}[\\s\\S]*?${tagEnd}`, 'm');

    if (!regex.test(content)) {
      console.log(`Tags not found in ${readmePath}. Appending to the end of file...`);
      const updated = `${content}\n\n${tagStart}\n${block}\n${tagEnd}\n`;
      fs.writeFileSync(fullPath, updated, 'utf-8');
    } else {
      console.log(`Replacing content between tags in ${readmePath}...`);
      const updated = content.replace(regex, `${tagStart}\n${block}\n${tagEnd}`);
      fs.writeFileSync(fullPath, updated, 'utf-8');
    }

    console.log('Successfully updated README with today in tech milestone!');
  } catch (error) {
    console.error('Action failed:', error.message);
    process.exit(1);
  }
}

run();
