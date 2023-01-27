import { sample } from './../resume-data';
import { PdfMakeService } from './../v1/pdf-make.service';
import { Component, OnInit } from '@angular/core';
import { IResume } from '../types';
import { Router } from '@angular/router';
import { ResumeIDBService } from '../resume-idb.service';
import { Resume } from '../resume';

export const templates = [
  {
    tname: 'Template1',
    url: '../../assets/pdf-samples/template1.pdf',
    id: 0,
    img: '../../assets/pdf-samples/prev-images/template1.PNG'
  },
  {
    tname: 'Template2',
    url: '../../assets/pdf-samples/template2.pdf',
    id: 1,
    img: '../../assets/pdf-samples/prev-images/template2.PNG'
  },
  {
    tname: 'Template3',
    url: '../../assets/pdf-samples/template3.pdf',
    id: 2,
    img: '../../assets/pdf-samples/prev-images/template3.PNG'
  }
]

@Component({
  selector: 'app-template-dashboard',
  templateUrl: './template-dashboard.component.html',
  styleUrls: ['./template-dashboard.component.scss']
})
export class TemplateDashboardComponent implements OnInit {
  public templates = templates;
  private resume: IResume | Resume<string>;
  constructor(private pdfMake: PdfMakeService, private router: Router, private idbResume: ResumeIDBService,) {
    this.resume = history.state?.resumeData;
  }
  ngOnInit(): void {
    window.scroll(0,-100)
  }





  preview(template: { tname: string, url: string, id: number, img: string }) {

    const em = document.getElementById('pdfprev') as HTMLInputElement
    em.src = template.url
    const iframe = document.getElementById('if-pdfprev') as HTMLInputElement
    iframe.src = template.url
  }

  use(template: { tname: string, url: string, id: number, img: string }) {
    if (!this.resume) {
      console.error('No data present', 'Redirecting to create')
      this.router.navigate(['create-resume'])
      return;
    }

    this.pdfMake.createPdf(this.resume, () => {
      this.resume?.id ? this.idbResume.updateResume(this.resume) : this.idbResume.addResume(this.resume);
    }, template.id);
  }
}
