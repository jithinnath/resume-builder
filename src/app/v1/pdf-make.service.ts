import { IResume, IDocConfig, IEmployment, IEducation, ISkill, ILanguage, ISocialLink } from './../types';
import { ResumeDataService } from './../resume-data.service';
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { formatDate } from '@angular/common';
import { Template2 } from './template2';
import { Template3 } from './template3';
import { Template1 } from './template1';
import { Template } from './template';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfMakeService {
  private server: string = this.dataService.getServer();
  private _data!: IResume; // this.dataService.getResumeData() as IResume;
  private _config: IDocConfig = this.dataService.getConfig() as IDocConfig;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public createPdf(data: IResume, cacheData: () => void = () => {}, templateId = 0) {
    this._data = data;
    this.t = this.initTemplate(templateId);
    (window.navigator as any).userAgentData.mobile
      ? pdfMake.createPdf(this.t.dd(this._data)).download()
      : pdfMake.createPdf(this.t.dd(this._data)).open();
    cacheData();
  }

  public previewPdf(data: IResume, callback: (data: string) => void = () => null) {
    this._data = data;
    pdfMake.createPdf(this.t.dd(this._data)).getDataUrl(data => {
      callback(data);
    });
  }
  t: Template = new Template1();
  constructor(private dataService: ResumeDataService) {
    (<any>pdfMake).fonts = {
      poppins: {
        normal: `${this.server}/assets/fonts/Poppins-Regular.ttf`,
        bold: `${this.server}/assets/fonts/Poppins-Bold.ttf`,
        italics: `${this.server}/assets/fonts/Poppins-Italic.ttf`,
        bolditalics: `${this.server}/assets/fonts/Poppins-BoldItalic.ttf`,
      },
    };
  }

  initTemplate(selected: number) {
    let template: Template | null = null;
    switch (selected) {
      case 0: {
        template = new Template1();
        break;
      }
      case 1: {
        template = new Template2();
        break;
      }
      case 2: {
        template = new Template3();
        break;
      }
      default: {
        template = new Template1();
      }
    }
    return template;
  }
}
