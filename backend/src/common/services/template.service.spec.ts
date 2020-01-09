import { TemplateService } from './template.service';
import { Templates } from '@constants';

describe('TemplateService', () => {
  let templateService: TemplateService;

  beforeEach(() => {
    templateService = new TemplateService();
  });

  it('should compile template', async () => {
    const result = await templateService.compileTemplate(Templates.USER_ACTIVATION, {
      userDisplayName: 'Deftcode',
      url: 'https://example.com',
    });

    const expectedResult = `\
<h1>Witaj Deftcode!</h1>

<p>Dziękujemy za zarejestrowanie się w naszym portalu. W celu aktywacji konta prosimy o kliknięcie w poniższy link (link jest aktywny godzinę):</p>
<a href="https://example.com">https://example.com</a>`;

    expect(result).toEqual(expectedResult);
  });
});
