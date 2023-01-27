import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { IPersonal } from './../types';
import { Common } from './common';
import { IResume } from '../types';
import { configTemplate3 as config } from '../resume-data';
import { Template } from './template';

export class Template3 implements Template {
  public dd(data: IResume): TDocumentDefinitions {
    const dd: any = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [20, 20, 20, 10],
      defaultStyle: {
        font: 'poppins',
        margin: [10, 10, 10, 10],
        fontSize: 10,
      },
      content: this.buildContent(data),
      images: {
        profileImg: Common.getImage(data.personalDetails.profileImg),
      },
      styles: {},
    };
    return dd;
  }

  private buildContent(data: IResume) {
    return [
      this._buildUserTable(data.personalDetails),
      '\n',
      {
        columnGap: 20,
        columns: [
          {
            width: '30%',
            stack: [
              { text: 'Details', fontSize: config.header.fontSize },
              Common.profileDetails(data?.personalDetails),
              '\n',
              '\n',
              { text: 'Skills', fontSize: config.header.fontSize },
              Common.skills(data?.skills),
              '\n',
              '\n',
              { text: 'Languages', fontSize: config.header.fontSize },
              Common.skills(data?.languages),
              '\n',
              '\n',
              { text: 'Social Profiles', fontSize: config.header.fontSize },
              ...Common.list(data?.socialLinks),
              '\n',
              '\n',
            ],
          },
          {
            width: '70%',
            stack: [
              //Profile
              [{ text: 'Profile', fontSize: config.header.fontSize }],
              { ...Common.profileDesc(data?.personalDetails?.profileDescription ?? '') },

              '\n',
              //Employment
              { text: 'Employment History', fontSize: config.header.fontSize },
              ...Common.employmentStack(data?.employmentHistory),
              //Education
              { text: 'Education', fontSize: config.header.fontSize },
              ...Common.employmentStack(data?.educations),
            ],
          },
        ],
      },
    ];
  }
  private _buildUserTable(pd: IPersonal) {
    return {
      table: {
        widths: ['30%', '70%'],
        body: [
          [
            { image: 'profileImg', fit: config.imageFit },

            [
              '\n',
              {
                text: pd.name,
                bold: false,
                fontSize: config.header.fontSize,
              },
              { text: pd.jobTitle, fontSize: config.subHeader.fontSize },
              '\n',
              Common.profileDetails(pd),
            ],
          ],
        ],
      },
      layout: {
        fillColor: '#eeeeee',

        hLineWidth: function (rowIndex: number, node: any, columnIndex: number) {
          return 0;
        },
        vLineWidth: function (rowIndex: number, node: any, columnIndex: number) {
          return 0;
        },
      },
    };
  }
}
