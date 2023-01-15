import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { DashboardService } from './../dashboard.service';
import { ResumeIDBService } from './../resume-idb.service';
import { IResumeDB } from './../types';

@Component({
  selector: 'app-resume-dashboard',
  templateUrl: './resume-dashboard.component.html',
  styleUrls: ['./resume-dashboard.component.scss'],
})
export class ResumeDashboardComponent {
  resumes$: Observable<IResumeDB[]> | null = null;
  constructor(private idbResume: ResumeIDBService, private router: Router, private dashboard: DashboardService) {
    this.openDb();
  }

  async openDb() {
    await this.idbResume.openResumeDb();
    this.resumes$ = this.idbResume.getAllResumes().pipe(
      tap(x => {
        console.log(x);
        if (!x?.length) {
          this.router.navigate(['create-resume']);
        }
      })
    ) as Observable<IResumeDB[]>;
  }

  addNewData() {
    this.router.navigate(['create-resume']);
  }
  download(resume: IResumeDB) {
    this.dashboard.download(resume);
  }

  delete(resume: IResumeDB) {
    this.dashboard.delete(resume);
    this.resumes$ = this.idbResume.getAllResumes() as Observable<IResumeDB[]>;
  }

  edit(data: IResumeDB) {
    this.dashboard.edit(data);
  }
}
