import { ResumeIDBService } from './resume-idb.service';
import { IResume } from './types';
// import { PdfMakeService } from './pdf-make.service';
import { Component, OnInit } from '@angular/core';
import { PdfMakeService } from './v1/pdf-make.service';
import { sample } from './resume-data';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private pdfMake: PdfMakeService, private idb: ResumeIDBService, private router: Router) {}
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // this.pdfMake.createPdf(sample as IResume);
  }

  title = 'resumeBuilder';

  async downloadSample() {
    // await this.idb.openResumeDb();
    // this.idb.addResume({...sample,name:sample.personalDetails.name})
    // this.pdfMake.createPdf(sample as IResume);
    this.router.navigate(['template-dashboard']);
  }
  home() {
    this.router.navigate(['resume-dashboard']);
  }
}
