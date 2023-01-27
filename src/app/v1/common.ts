import { IPersonal } from './../types';
import { formatDate } from '@angular/common';
import { IEducation, IEmployment, ILanguage, ISkill, ISocialLink } from '../types';

import { configTemplate2 as config } from '../resume-data';
export class Common {
  public static formatDate(date: string) {
    return formatDate(date, 'MMM YYYY', 'en-IN');
  }

  public static employmentStack(employments: IEmployment[] | IEducation[]) {
    const _stack: any[] = [];
    employments.forEach(employment => {
      _stack.push({
        text: `${employment.designation} at ${employment.compayName}`,
        style: {
          background: config.subHeader.fillColor,
          color: config.subHeader.color,
          fillOpacity: 0.5,
          fontSize: config.subHeader.fontSize,
          bold:config.subHeader.bold
        },
      });
      _stack.push({ text: '' });
      _stack.push({
        text: `${this.formatDate(employment.from)} - ${this.formatDate(employment.to)}`,
        fontSize: config.subHeader2.fontSize, bold:config.subHeader2.bold
      });
      _stack.push({ text: '' });
      const empDescriptions = employment.description.split('\n');
      if (config.list) {
        const list: any[] = []
        empDescriptions.forEach(des => {
          list.push({ text: des, fontSize: config.normalText.fontSize });
        });
        _stack.push({ ul: list })
      } else {

        empDescriptions.forEach(des => {
          _stack.push({ text: des, fontSize: config.normalText.fontSize });
        });
      }
      _stack.push('\n');
    });

    return _stack;
  }

  public static profileDesc(profileDescription: string) {
    return {
      text: profileDescription,
      fontSize: config.normalText.fontSize,
    };
  }

  public static skills(skills: ISkill[] | ILanguage[]) {
    const _stack: any[] = [];
    skills.forEach(skill => {
      _stack.push({ text: '', margin: [0, 2] })
      _stack.push([{ text: skill.name, colSpan: 2 }, '']);
      _stack.push({ text: '', margin: [0, 2] })
      _stack.push(this._skillLines(skill.level));
    });

    return _stack;

  }

  private static _skillLines(level: 'Professional' | 'Fluent' | 'Proficient' | 'Conversant' | 'Intermediate' | 'Beginner') {
    const LEVEL = {
      'Professional': 5,
      'Fluent': 5,
      'Proficient': 3,
      'Conversant': 2,
      'Intermediate': 3,
      'Beginner': 2
    }
    return {
      table: {
        widths: ['*', '*', '*', '*', '*'],
        body: [
          ['', '', '', '', ''],

        ]
      },
      layout: {
        fillColor: function (rowIndex: number, node: any, columnIndex: number) {
          return (columnIndex < LEVEL[level]) ? config.skillLines.color : config.skillLines.bg;
        },
        hLineWidth: function (rowIndex: number, node: any, columnIndex: number) {
          return 0;
        },
        vLineWidth: function (rowIndex: number, node: any, columnIndex: number) {
          return config.skillLines.gap;
        },
        vLineColor: '#ffffff'
      }
    }


  }

  public static list(links: ISocialLink[]) {
    const _stack: any[] = [];
    links.forEach(l => {
      _stack.push({ text: '', margin: [0, 2] })
      _stack.push({ text: l.name })
      _stack.push({ text: '', margin: [0, 2] })
      _stack.push({ text: l.level, color: config.color.accent, fontSize: 8 })
    })
    return _stack;
  }

  public static profileDetails(pd: IPersonal) {
    return {
      stack: [
        { text: pd.email, color: config.color.accent },
        { text: pd.mobile },
        { text: pd.city },
        { text: pd.country },
      ],
    };
  }

  public static getImage(image: string | null) {
    if (!image)
      return ''
    if (image.startsWith('data:')) {
      return image;
    }
    return `http://localhost:4200/assets/profileImg.jpg`;
  }


}


