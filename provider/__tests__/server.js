import { Verifier } from 'pact';
import path from 'path';

import server from '../server.js';

let app;
beforeAll(() => { app = server.listen(5000) });
afterAll(() => app.close());

const defaultOpts = {
  provider: 'Provider',
  providerBaseUrl: 'http://localhost:5000',
  pactBrokerUrl: 'http://localhost:9292',
  publishVerificationResult: true,
  providerVersion: '1.0.0'
};

// Verify that the provider meets all consumers expectations
describe('Pact Verification', () => {
  it('should validate the expectations of consumer A', async () => {
    const opts = {
      ...defaultOpts,
      pactUrls: ['http://localhost:9292/pacts/provider/provider/consumer/consumer-a/latest']
    };

    expect.assertions(1);
    await expect(Verifier.verifyProvider(opts)).resolves.toBeDefined();
  });

  it('should validate the expectations of consumer B', async () => {
    const opts = {
      ...defaultOpts,
      pactUrls: ['http://localhost:9292/pacts/provider/provider/consumer/consumer-b/latest']
    };

    expect.assertions(1);
    await expect(Verifier.verifyProvider(opts)).resolves.toBeDefined();
  });
});
