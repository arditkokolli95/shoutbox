import getUserIP from '../GetUserIP';

const mockFetch: any = () => Promise.resolve({ json: () =>({ IPv4: '127.0.0.1' })});

describe('getUserApi()', () => {
  let fetchSpy;
  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });
  
  it('returns the result', async () => {
    const result = await getUserIP();
    expect(result.IPv4).toEqual('127.0.0.1');
  })
});