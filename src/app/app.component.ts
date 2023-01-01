import { IResume } from './types';
// import { PdfMakeService } from './pdf-make.service';
import { Component, OnInit } from '@angular/core';
import { PdfMakeService } from './v1/pdf-make.service';
import { sample } from './resume-data';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private pdfMake:PdfMakeService){}
  ngOnInit(): void {
    //this.pdfMake.createPdf();
  }
  title = 'resumeBuilder';

  downloadSample(){
   this.pdfMake.createPdf(sample as IResume)
  }
}
