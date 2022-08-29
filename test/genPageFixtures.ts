import path from 'node:path';
import fs from 'node:fs/promises';
import { buildServer } from 'server/server';

const server = buildServer();

const pageFixtures = {
  homepage: { url: '/' },
};

const FIXTURES_LOCATION = path.resolve(__dirname, 'fixtures');

async function generatePageFixtures() {
  await Promise.all(
    Object.entries(pageFixtures).map(async ([name, { url }]) => {
      const response = await server.inject({
        method: 'GET',
        url,
      });

      await fs.writeFile(`${FIXTURES_LOCATION}/${name}.html`, response.body);
    })
  );
}

generatePageFixtures();
