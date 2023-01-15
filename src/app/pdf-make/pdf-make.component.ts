import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf-make',
  templateUrl: './pdf-make.component.html',
  styleUrls: ['./pdf-make.component.scss'],
})
export class PdfMakeComponent implements OnInit {
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
  ngOnInit(): void {
    this.createPdf();
  }

  createPdf() {
    const dd: any = {
      defaultStyle: {
        font: 'poppins',
        margin: [10, 10, 10, 10],
      },
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [20, 20, 20, 10],
      content: [{ text: 'Full Stack Developer', fontSize: 15 }],
    };
    pdfMake.createPdf(dd).open();
  }
}
