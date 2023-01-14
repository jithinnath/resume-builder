import { ResumeIDBService } from './resume-idb.service';
import { IResumeDB } from './types';
import { Injectable } from '@angular/core';
import { PdfMakeService } from './v1/pdf-make.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private pdfMake:PdfMakeService,private idb:ResumeIDBService,private router:Router) { }

  delete(data:IResumeDB){
    this.idb.deleteResume(data.id)
  }
  edit(data:IResumeDB){
    this.router.navigate(['create-resume'],{state:data})
  }
  download(data:IResumeDB){
    this.pdfMake.createPdf(data)
  }


}
