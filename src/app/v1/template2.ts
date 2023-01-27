import { Template } from './template';
import { Common } from './common';
import { IResume } from '../types';
import { configTemplate2 as config } from '../resume-data';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

export class Template2 implements Template {
  public dd(data: IResume): TDocumentDefinitions {
    const dd: any = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [50, 30, 20, 10],
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
      {
        columnGap: 5,
        columns: [
          { width: 'auto', image: 'profileImg', fit: config.imageFit },
          [
            {
              text: data?.personalDetails?.name,
              bold: false,
              fontSize: config.mainHeader.fontSize,
            },
            { text: data?.personalDetails?.jobTitle, fontSize: config.subHeader.fontSize },
          ],
        ],
      },
      '\n',
      {
        columnGap: 5,
        columns: [
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
        ],
      },
    ];
  }
}
