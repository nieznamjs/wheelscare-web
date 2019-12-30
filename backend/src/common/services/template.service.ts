import { readFile } from 'fs';
import { resolve as pathResolve } from 'path';
import { compile } from 'handlebars';
import { Injectable } from '@nestjs/common';
import { Templates } from '../constants';

@Injectable()
export class TemplateService {
  private readonly ENCODING = 'utf-8';

  // TODO: make data use generic type
  public async compileTemplate(templateName: Templates, data: any): Promise<string> {
    const template = await this.readTemplate(templateName);
    const compiledTemplate = compile(template);

    return compiledTemplate(data);
  }

  private async readTemplate(templateName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      readFile(pathResolve(__dirname, `../templates/${templateName}.hbs`), this.ENCODING, (err: Error, data: string) => {
        if (err) { return reject(err); }

        resolve(data);
      });
    });
  }
}
