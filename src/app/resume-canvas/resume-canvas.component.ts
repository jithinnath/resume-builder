import { Component, ElementRef, ViewChild } from '@angular/core';

import jsPDF from 'jspdf';
// const pdfMake = require('pdfmake/build/pdfmake.js');
// const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
// import 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-resume-canvas',
  templateUrl: './resume-canvas.component.html',
  styleUrls: ['./resume-canvas.component.scss'],
})
export class ResumeCanvasComponent {
  @ViewChild('resume') res!: ElementRef;
  private jspdf = new jsPDF();

  constructor() {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  submit() {
    (<any>pdfMake).fonts = {
      poppins: {
        // normal: 'Poppins-Black.ttf',
        // bold: 'Poppins-Bold.ttf',
        // italics: 'Poppins-Italic.ttf',
        // bolditalics: 'Poppins-BoldItalic.ttf'
        normal: 'http://localhost:4200/assets/fonts/Poppins-Regular.ttf',
      },
    };

    const dd: TDocumentDefinitions = {
      defaultStyle: {
        font: 'poppins',
        margin: [10, 10, 10, 10],
      },
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [20, 20, 20, 10],
      content: [
        {
          columns: [
            {
              width: '30%',
              stack: [
                { image: 'profileImg', fit: [100, 100] },
                { text: 'Full Stack Developer', fontSize: 15 },
                { text: 'jitinnath@gmail.com', fontSize: 10 },
                { text: '7738663466', fontSize: 10 },
                { text: '', fontSize: 10 },
                { text: 'Bengaluru,India', fontSize: 10 },
              ],
            },
            {
              width: '70%',
              stack: [
                { text: 'Jithin Nath', fontSize: 64 },
                { text: 'Profile', fontSize: 20 },
                {
                  text: 'Experienced web developer with a history of design collaboration offers sophisticated coding and troubleshooting. Always ensure bringing projects to completion well ahead of deadline while exceeding functional expectation. Proactive problem-solver with exceptional time-management and organization skills.',
                  fontSize: 10,
                },
              ],
            },
          ],
          columnGap: 10,
        },
        { canvas: [{ type: 'line', x1: -100, y1: 50, x2: 1000, y2: 50 }] },
      ],
      styles: {
        red: {
          background: 'red',
        },
        green: {
          background: 'green',
        },
        black: {
          background: 'black',
        },
        background1: {
          background: '#5190a5',
        },
        header: {
          fontSize: 22,
          alignment: 'center',
          color: 'white',
        },
      },
      images: {
        profileImg: 'http://localhost:4200/assets/profileImg.jpg',
      },
    };
    pdfMake.createPdf(dd).open();

    // this.jspdf.html(this.res.nativeElement, {
    //   callback: (pdf) => {
    //     pdf.save('MyPdfFile.pdf')
    //   },
    //   margin: 32, // optional: page margin
    //   // optional: other HTMLOptions
    // })
  }
}
