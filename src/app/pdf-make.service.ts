import {Injectable} from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfMakeService {
  constructor() {
    (<any>pdfMake).fonts = {
      poppins: {
        normal: 'http://localhost:4200/assets/fonts/Poppins-Regular.ttf',
        bold: 'http://localhost:4200/assets/fonts/Poppins-Bold.ttf',
        italics: 'http://localhost:4200/assets/fonts/Poppins-Italic.ttf',
        bolditalics: 'http://localhost:4200/assets/fonts/Poppins-BoldItalic.ttf',
      },
    };
  }

  name() {
    return {text: 'Jithin Nath', bold: false, fontSize: 64};
  }


  createPdf() {
    pdfMake.createPdf(this.dd()).open();
  }

  profileDetails() {
    return {
      stack: [
        {text: '', fontSize: 15},
        {text: 'Full Stack Developer', fontSize: 15},
        {text: '', fontSize: 15},
        {text: 'jitinnath@gmail.com', fontSize: 10},
        {text: '7738663466', fontSize: 10},
        {text: '\n', fontSize: 10},
        {text: 'Bengaluru,India', fontSize: 10},
      ],
    };
  }


  dd() {
    const dd: any = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [20, 20, 20, 10],
      defaultStyle: {
        font: 'poppins',
        margin: [10, 10, 10, 10],
        fontSize: 10,
      },
      content: this.buildContent(),
      images: {
        profileImg: 'http://localhost:4200/assets/profileImg.jpg',
      },
      styles: {
        paraNormal: {
          fontSize: 10,
        },
      },
    };
    return dd;
  }

  userInfoTable() {
    return {
      layout: 'noBorders',
      table: {
        widths: ['30%', '70%'],
        heights: [50, 100],
        body: [
          [{image: 'profileImg', fit: [100, 100]}, this.name()],
          [this.profileDetails(), {
            stack: [
              {text: 'Profile', fontSize: 20},
              {text: 'Experienced web developer with a history of design collaboration offers sophisticated coding and troubleshooting. Always ensure bringing projects to completion well ahead of deadline while exceeding functional expectation. Proactive problem-solver with exceptional time-management and organization skills.', fontSize: 10},
              '\n',
            ], fillColor: '#eeeeee',
            fillOpacity: 0.5,
          }],
        ],
      },
    };
  }

  rightSection(rows: any[][] = [], width: any[] = [70, 80]) {
    return {
      layout: {
        hLineWidth: function(i: any, node: any) {
          return 0;
        },
        vLineWidth: function(i: any, node: any) {
          return 0;
        },
        // hLineColor: function (i:any,node:any) {
        //   return i === node.table.body.length ? 'black' : '#aaa';
        // },

        paddingLeft: function(i: number, node: any) {
          return 8;
        },
        paddingRight: function(i: number, node: any) {
          return 8;
        },
        paddingTop: function(i: number, node: any) {
          return 2;
        },
        paddingBottom: function(i: number, node: any) {
          console.log('i', i);
          console.log('node', node);
          if (i === node.table.body.length - 1) {
            return 8;
          }
          return 2;
        },

        fillColor: '#eeeeee',
      },

      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        // headerRows: 1,

        widths: width,
        // heights: [50, 100],

        body: rows,
      },
    };
  }

  buildContent() {
    return [
      this.userInfoTable(),
      {canvas: [{type: 'line', x1: 5, y1: 25, x2: 550, y2: 25, lineColor: '#a1a1a1', lineWidth: 1}]},
      '\n\n',
      {
        columnGap: 5,
        columns: [
          {
            width: '68%',
            stack: [

              {text: 'Employment History', fontSize: 25},
              {text: 'Technoloy Analyst at Infosys Finacle -', style: {background: '#242424', color: '#fcfcfc', fillOpacity: 0.5, fontSize: 15}},
              {text: 'Edgeverve, Bengaluru', style: {background: '#242424', color: '#fcfcfc', fillOpacity: 0.5, fontSize: 15}},
              {text: '', fontSize: 15},
              {text: '10/2019', fontSize: 15},
              {text: '', fontSize: 15},
              'Create and implement  banking product solutions based on Finacle core.',
              'Design custom user interfaces and middle-wares that simplifies Finacle core banking.',
              'Customize and Implement products for various banks on requirement.',
              'Design and develop PWA / Hybrid / Native web applications.',
              'Train new incoming junior developers.',
              'Achieved optimizing  and Improved performance of new Income tax portal.',
              'Collaborated with business analysts and other functional teams to develop user interfaces in new Income tax portal.',

              '\n',

              {text: 'System Engineer at Tata Consultancy Services,', style: {background: '#242424', color: '#fcfcfc', fillOpacity: 0.5, fontSize: 15}},
              {text: 'Mumbai', style: {background: '#242424', color: '#fcfcfc', fillOpacity: 0.5, fontSize: 15}},
              {text: '', fontSize: 15},
              {text: '12/2015 - 10/2019', fontSize: 15},
              {text: '', fontSize: 15},
              'Worked on troubleshooting and debugging various production issues.',
              'Worked on production defects and production deployments.',
              'Automated multiple manual tasks, where the support team usually face challenges. Automated report generation activities.',

              '\n',

              {text: 'Education', fontSize: 25},
              {text: 'Bachelor of Technology, Govt College of', style: {background: '#242424', color: '#fcfcfc', fillOpacity: 0.5, fontSize: 15}},
              {text: 'Engineering Kannur, Kannur, Kerala', style: {background: '#242424', color: '#fcfcfc', fillOpacity: 0.5, fontSize: 15}},
              {text: '06/2011 - 05/2015', fontSize: 15},
              'Graduated in Electronics and Communication with First class',


            ],
          },
          {
            width: '42%',

            stack: [
              {
                stack: [
                  this.rightSection([
                    [{text: 'Skills', fontSize: 25, colSpan: 2}, ''],
                    ['Angular', {text: 'Professional', alignment: 'right'}],
                    ['Spring Boot', {text: 'Professional', alignment: 'right'}],
                    ['Node js', {text: 'Professional', alignment: 'right'}],
                    ['Oracle', {text: 'Intermediate', alignment: 'right'}],
                    ['DB2', {text: 'Intermediate', alignment: 'right'}],
                    ['PostgreSQL', {text: 'Intermediate', alignment: 'right'}],
                    ['Mongo DB', {text: 'Intermediate', alignment: 'right'}],
                    ['Flutter', {text: 'Intermediate', alignment: 'right'}],
                    ['Android', {text: 'Intermediate', alignment: 'right'}],

                  ]),
                  '\n',
                ],
              },
              {
                stack: [


                  this.rightSection([
                    [{text: 'Languages', fontSize: 25, colSpan: 2}, ''],
                    ['English', {text: 'Fluent', alignment: 'right'}],
                    ['Hindi', {text: 'Fluent', alignment: 'right'}],
                    ['Malayalam', {text: 'Fluent', alignment: 'right'}],

                  ]),
                  '\n',

                ],
              },
              {
                stack: [


                  this.rightSection([
                    [{text: 'Social Links', fontSize: 25, colSpan: 2}, ''],
                    [{text: 'LinkedIn', colSpan: 2}, ''],
                    [{text: 'https://www.linkedin.com/in/jitinn/', alignment: 'left', style: {fontSize: 8}, colSpan: 2}, ''],
                    [{text: 'GitHub', colSpan: 2}, ''],
                    [{text: 'https://github.com/jithinnath', alignment: 'left', style: {fontSize: 8}, colSpan: 2}, ''],
                    [{text: 'Stackoverflow', colSpan: 2}, ''],
                    [{text: 'https://stackoverflow.com/users/8524235/jinn', alignment: 'left', style: {fontSize: 7}, colSpan: 2}, ''],

                  ]),
                  '\n',
                ],
              },
            ],
          },
        ],
      },
    ];
  }
}


