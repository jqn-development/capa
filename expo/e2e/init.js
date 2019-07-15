const detox = require('detox');
const { reloadApp } = require('detox-expo-helpers');
const adapter = require('detox/runners/jest/adapter');
const config = require('../package.json').detox;

jest.setTimeout(30000);
jasmine.getEnv().addReporter(adapter);

beforeAll(async () => {
  await detox.init(config);
});

beforeEach(async () => {
  await reloadApp({ permissions: { photos: 'YES' } });
});

afterAll(async () => {
  await adapter.afterAll();
  await detox.cleanup();
});
