import { TokenService } from '@services';

describe('TokenService', () => {
  // tslint:disable-next-line: max-line-length
  const expectedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjoidGVzdCIsImlhdCI6MTU1NjQ4ODAwNn0.tT7SQGgwv6Hze1lhRlLtnPn9pNTxC0F5kGG-DBbdtXo';
  const secret = 'dummy';
  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = new TokenService();
  });

  it('should generate token', async () => {
    const token = await tokenService.generateToken(secret, { test: 'test' });

    const expectedTokenFirstPart = expectedToken.split('.')[0];
    const tokenFirstPart = token.split('.')[0];

    expect(token.length).toEqual(expectedToken.length);
    expect(expectedTokenFirstPart).toEqual(tokenFirstPart);
  });

  it('should throw error when generating token with not allowed type of payload', async () => {
    try {
      await tokenService.generateToken(secret, true as any);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should decode token', async () => {
    const decodedData = await tokenService.decodeToken(expectedToken, secret) as { test: string };
    expect(decodedData.test).toEqual('test');
  });

  it('should throw error when wrong secret is used', async () => {
    try {
      const decodedData = await tokenService.decodeToken(expectedToken, 'wrongSecret') as { test: string };
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
