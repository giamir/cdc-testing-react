import path from 'path';
import Pact from 'pact';
import { fetchProductsData } from '../getProducts';

describe("Provider's API", () => {
  const url = 'http://localhost';
  const port = 5000;

  const provider = Pact({
    port: port,
    log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
    consumer: 'consumer-b',
    provider: 'provider'
  });

  const EXPECTED_BODY = [
    {
      id: 1,
      name: 'product 1'
    },
    {
      id: 2,
      name: 'product 2'
    }
  ];

  beforeAll(() => provider.setup());

  afterAll(() => provider.finalize());

  describe("works", () => {
    beforeAll(done => {
      const interaction = {
        state: 'I have a list of products',
        uponReceiving: 'a request for products',
        withRequest: {
          method: 'GET',
          path: '/products',
          headers: { 'Accept': 'application/json' }
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: EXPECTED_BODY
        }
      };
      provider.addInteraction(interaction).then(done, done);
    })

    // add expectations
    it('returns a successful body', async () => {
      expect.assertions(3);
      const response = await fetchProductsData();
      expect(response.headers.get('content-type')).toEqual('application/json; charset=utf-8');
      expect(response.status).toEqual(200);
      expect(await response.json()).toEqual(EXPECTED_BODY);
    });

    // verify with Pact, and reset expectations
    it('successfully verifies', () => provider.verify());
  })
})
