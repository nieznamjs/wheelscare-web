import { TemplateService } from '@services';
import { Templates } from '@constants';

describe('TemplateService', () => {
  let templateService: TemplateService;

  beforeEach(() => {
    templateService = new TemplateService();
  });

  it('should compile template', async () => {
    const result = await templateService.compileTemplate(Templates.USER_ACTIVATION, {
      email: 'test@example.com',
      url: 'https://example.com',
    });

    const expectedResult = `\
<p>Dziękujemy za zarejestrowanie się w naszym portalu za pomocą maila test@example.com. W celu aktywacji konta prosimy o kliknięcie w poniższy link (link jest aktywny godzinę):</p>
<a href="https://example.com">https://example.com</a>
`;

    expect(result).toEqual(expectedResult);
  });
});
