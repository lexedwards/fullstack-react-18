import path from 'node:path';
import fs from 'node:fs';
const DOMEnvironment = require('jest-environment-jsdom').default;

class CustomEnv extends DOMEnvironment {
  constructor(config, context) {
    if (config.projectConfig.testEnvironmentOptions?.fixture) {
      const html = fs.readFileSync(
        path.resolve(
          __dirname,
          'fixtures',
          config.projectConfig.testEnvironmentOptions.fixture
        ),
        'utf8'
      );
      super(
        {
          ...config,
          projectConfig: {
            ...config.projectConfig,
            testEnvironmentOptions: {
              ...config.projectConfig.testEnvironmentOptions,
              html,
            },
          },
        },
        context
      );
    } else {
      super(config, context);
    }
  }
  async setup() {
    await super.setup();
  }

  async teardown() {
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = CustomEnv;
