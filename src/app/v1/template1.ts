import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Template } from './template';
import { Common } from './common';
import { IEducation, IEmployment, ILanguage, IResume, ISkill, ISocialLink, IPersonal } from './../types';
import { formatDate } from "@angular/common";
import {config} from '../resume-data'
export class Template1 implements Template {

  public dd(data:IResume): TDocumentDefinitions {
    const dd: any = {

      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [20, 20, 20, 10],
      defaultStyle: {
        font: 'poppins',
        margin: [10, 10, 10, 10],
        fontSize: 10,
      },
      content:this._buildContent(data),
      images: {
        profileImg: Common.getImage(data?.personalDetails?.profileImg || ''),
      },
      styles: {},
    };
    return dd;
  }

  private _profileDetails(data:IResume) {
    return {
      stack: [
        { text: '', fontSize: config.jobTitleFontSize },
        { text: data?.personalDetails?.jobTitle, fontSize: config.jobTitleFontSize },
        { text: '', fontSize: config.jobTitleFontSize },
        { text: data?.personalDetails?.email },
        { text: data?.personalDetails?.mobile },
        { text: '\n' },
        { text: `${data?.personalDetails?.city},${data?.personalDetails?.country}` },
      ],
    };
  }

  private _userInfoTable(data:IResume) {
    return {
      layout: 'noBorders',
      table: {
        widths: ['30%', '70%'],
        heights: [50, 100],
        body: [
          [
            { image: 'profileImg', fit: config.imageFit },
            {
              text: data?.personalDetails?.name,
              bold: false,
              fontSize: this.fontSizeforName(data?.personalDetails?.name),
            },
          ],
          [
            this._profileDetails(data),
            {
              stack: [
                { text: 'Profile', fontSize: config.profileTextFontSize },
                {
                  text: data?.personalDetails?.profileDescription,
                  fontSize: config.fontSize,
                },
                '\n',
              ],
              fillColor: config.boxFillColor,
              fillOpacity: 0.5,
            },
          ],
        ],
      },
    };
  }

  private _buildContent(data:IResume) {
    return [
      this._userInfoTable(data),
      {
        canvas: [
          {
            type: 'line',
            x1: 5,
            y1: 25,
            x2: 550,
            y2: 25,
            lineColor: config.dividerLineColor,
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
              data?.employmentHistory?.length
                ? {
                  text: 'Employment History',
                  fontSize: config.headerFontSize,
                }
                : '',
              ...this._employmentStack(data?.employmentHistory),
              data?.educations?.length
                ? {
                  text: 'Education', fontSize: config.headerFontSize
                }
                : '',
              ...this._employmentStack(data?.educations),
            ],
          },
          {
            width: '42%',

            stack: [
              {
                stack: [this._buildBox(data?.skills, 'Skills'), '\n'],
              },
              {
                stack: [this._buildBox(data?.languages, 'Languages'), '\n'],
              },
              {
                stack: [this._buildBox(data?.socialLinks, 'Social Links'), '\n'],
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

        fillColor: config.boxFillColor,
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
          background: config.subHeaderFillColor,
          color: config.subHeaderColor,
          fillOpacity: 0.5,
          fontSize: config.subHeaderFontSize,
        },
      });
      _stack.push({ text: '' });
      _stack.push({
        text: `${this._formatDate(employment.from)} - ${this._formatDate(employment.to)}`,
        fontSize: config.subHeaderFontSize,
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
    _stack.push([{ text: sectionName, fontSize: config.headerFontSize, colSpan: 2 }, '']);
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



  private _formatDate(date: string) {
    return formatDate(date, 'MMM YYYY', 'en-IN');
  }
}
