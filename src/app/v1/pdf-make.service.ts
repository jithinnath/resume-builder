import { IResume, IDocConfig, IEmployment, IEducation, ISkill, ILanguage, ISocialLink } from './../types';
import { ResumeDataService } from './../resume-data.service';
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { formatDate } from '@angular/common';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfMakeService {
  private server: string = this.dataService.getServer();
  private _data!: IResume; // this.dataService.getResumeData() as IResume;
  private _config: IDocConfig = this.dataService.getConfig() as IDocConfig;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public createPdf(data: IResume, cacheData: () => void = () => {}) {
    this._data = data;
    (window.navigator as any).userAgentData.mobile
      ? pdfMake.createPdf(this._dd()).download()
      : pdfMake.createPdf(this._dd()).open();
    cacheData();
  }

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

  private _dd(): any {
    const dd: any = {
      header: 'jithinnath - not yet production ready',
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [20, 20, 20, 10],
      defaultStyle: {
        font: 'poppins',
        margin: [10, 10, 10, 10],
        fontSize: 10,
      },
      content: this._buildContent(),
      images: {
        profileImg: this.getImage(this._data?.personalDetails?.profileImg || ''),
      },
      styles: {},
    };
    return dd;
  }

  private _profileDetails() {
    return {
      stack: [
        { text: '', fontSize: this._config.jobTitleFontSize },
        { text: this._data?.personalDetails?.jobTitle, fontSize: this._config.jobTitleFontSize },
        { text: '', fontSize: this._config.jobTitleFontSize },
        { text: this._data?.personalDetails?.email },
        { text: this._data?.personalDetails?.mobile },
        { text: '\n' },
        { text: this._data?.personalDetails?.address },
      ],
    };
  }

  private _userInfoTable() {
    return {
      layout: 'noBorders',
      table: {
        widths: ['30%', '70%'],
        heights: [50, 100],
        body: [
          [
            { image: 'profileImg', fit: this._config.imageFit },
            {
              text: this._data?.personalDetails?.name,
              bold: false,
              fontSize: this.fontSizeforName(this._data?.personalDetails?.name),
            },
          ],
          [
            this._profileDetails(),
            {
              stack: [
                { text: 'Profile', fontSize: this._config.profileTextFontSize },
                {
                  text: this._data?.personalDetails?.profileDescription,
                  fontSize: this._config.fontSize,
                },
                '\n',
              ],
              fillColor: this._config.boxFillColor,
              fillOpacity: 0.5,
            },
          ],
        ],
      },
    };
  }

  private _buildContent() {
    return [
      this._userInfoTable(),
      {
        canvas: [
          {
            type: 'line',
            x1: 5,
            y1: 25,
            x2: 550,
            y2: 25,
            lineColor: this._config.dividerLineColor,
            lineWidth: 1,
          },
        ],
      },
      '\n\n',
      {
        columnGap: 5,
        columns: [
          {
            width: '68%',
            stack: [
              this._data?.employmentHistory?.length
                ? {
                    text: 'Employment History',
                    fontSize: this._config.headerFontSize,
                  }
                : '',
              ...this._employmentStack(this._data?.employmentHistory),
              this._data?.educations?.length ? { text: 'Education', fontSize: this._config.headerFontSize } : '',
              ...this._employmentStack(this._data?.educations),
            ],
          },
          {
            width: '42%',

            stack: [
              {
                stack: [this._buildBox(this._data?.skills, 'Skills'), '\n'],
              },
              {
                stack: [this._buildBox(this._data?.languages, 'Languages'), '\n'],
              },
              {
                stack: [this._buildBox(this._data?.socialLinks, 'Social Links'), '\n'],
              },
            ],
          },
        ],
      },
    ];
  }

  private _drawBox(rows: any[][] = [], width: any[] = [70, 80]) {
    return {
      layout: {
        hLineWidth: function (i: any, node: any) {
          return 0;
        },
        vLineWidth: function (i: any, node: any) {
          return 0;
        },
        paddingLeft: function (i: number, node: any) {
          return 8;
        },
        paddingRight: function (i: number, node: any) {
          return 8;
        },
        paddingTop: function (i: number, node: any) {
          return 2;
        },
        paddingBottom: function (i: number, node: any) {
          if (i === node.table.body.length - 1) {
            return 8;
          }
          return 2;
        },

        fillColor: this._config.boxFillColor,
      },

      table: {
        widths: width,
        body: rows,
      },
    };
  }

  private _employmentStack(employments: IEmployment[] | IEducation[]) {
    const _stack: any[] = [];
    employments.forEach(employment => {
      _stack.push({
        text: `${employment.designation} at ${employment.compayName}`,
        style: {
          background: this._config.subHeaderFillColor,
          color: this._config.subHeaderColor,
          fillOpacity: 0.5,
          fontSize: this._config.subHeaderFontSize,
        },
      });
      _stack.push({ text: '' });
      _stack.push({
        text: `${this._formatDate(employment.from)} - ${this._formatDate(employment.to)}`,
        fontSize: this._config.subHeaderFontSize,
      });
      _stack.push({ text: '' });
      const empDescriptions = employment.description.split('\n');
      empDescriptions.forEach(des => {
        _stack.push({ text: des });
      });
      _stack.push('\n');
    });

    return _stack;
  }

  private _buildBox(skills: ISkill[] | ILanguage[] | ISocialLink[], sectionName = '') {
    const _stack: any[] = [];
    if (!skills.length) return [];
    _stack.push([{ text: sectionName, fontSize: this._config.headerFontSize, colSpan: 2 }, '']);
    if (sectionName === 'Social Links') {
      skills.forEach(skill => {
        _stack.push([{ text: skill.name, colSpan: 2 }, '']);
        _stack.push([{ text: skill.level, alignment: 'left', style: { fontSize: 8 }, colSpan: 2 }, '']);
      });
    } else {
      skills.forEach(skill => {
        _stack.push([skill.name, { text: skill.level, alignment: 'right' }]);
      });
    }

    return this._drawBox(_stack);
  }

  fontSizeforName = (name: string) => (name.length < 12 ? 64 : name.length < 20 ? 30 : name.length < 30 ? 40 : 30);

  getImage(image: string) {
    if (image.startsWith('data:')) {
      return image;
    }
    return `${this.server}/${image}`;
  }

  private _formatDate(date: string) {
    return formatDate(date, 'MMM YYYY', 'en-IN');
  }
}
