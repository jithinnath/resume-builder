import { ResumeIDBService } from './resume-idb.service';
import { IndexDBService } from './index-db.service';
import {IResume} from './types';
// import { PdfMakeService } from './pdf-make.service';
import {Component} from '@angular/core';
import {PdfMakeService} from './v1/pdf-make.service';
import {sample} from './resume-data';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {
  constructor(private pdfMake:PdfMakeService,private idb:ResumeIDBService) {
  }

  title = 'resumeBuilder';

  async downloadSample() {
    await this.idb.openResumeDb();
    this.idb.addResume({...sample,name:sample.personalDetails.name})
    this.pdfMake.createPdf(sample as IResume);


  }
  home(){
    this.router.navigate(['resume-dashboard'])
  }
}
