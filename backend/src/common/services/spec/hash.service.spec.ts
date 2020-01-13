import { HashService } from '@services';

describe('HashService', () => {
  let hashService: HashService;

  beforeEach(() => {
    hashService = new HashService();
  });

  it('should encrypt text', async () => {
    const text = 'someDummyText';
    const hash = await hashService.encrypt(text);

    expect(hash.length).toEqual(60);
    expect(typeof hash).toEqual('string');
  });

  it('should compare encrypted and decrypted text', async () => {
    const text = 'someDummyText';
    const validHash = '$2b$12$t1gCAUWHXMv7mcUZC0MsyOShBNDHf2oGEb56RPWevIh069m5/ZbQG';
    const invalidHash = '$2b$12$txxCAUWHXMv7mcUZC0MsyOShBNDHf2oGEb56RPWevIh069m5/ZbQG';

    const validHashCompareResult = await hashService.compare(text, validHash);
    const invalidHashCompareResult = await hashService.compare(text, invalidHash);

    expect(validHashCompareResult).toEqual(true);
    expect(invalidHashCompareResult).toEqual(false);
  });
});
