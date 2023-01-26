import { sample } from './../resume-data';
import { PdfMakeService } from './../v1/pdf-make.service';
import { Component, OnInit } from '@angular/core';
import { IResume } from '../types';

@Component({
  selector: 'app-template-dashboard',
  templateUrl: './template-dashboard.component.html',
  styleUrls: ['./template-dashboard.component.scss']
})
export class TemplateDashboardComponent implements OnInit{
  constructor(private pdfMake:PdfMakeService){}
   pdfB64 = '';
  ngOnInit(): void {
    this.pdfMake.previewPdf(sample as IResume,(dataUrl)=>{
      console.log(dataUrl)
      const iframepdf = document.getElementById('if') as HTMLInputElement
      iframepdf.src = dataUrl;

      const targetElement = document.querySelector('#iframeContainer') as HTMLInputElement;
    //   targetElement.style.backgroundImage = `url(${dataUrl})`;
    const iframe = document.createElement('iframe');
    iframe.src = dataUrl;
    targetElement?.appendChild(iframe);
    })


  }

}
