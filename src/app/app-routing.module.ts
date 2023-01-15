import { ResumeDashboardComponent } from './resume-dashboard/resume-dashboard.component';
import { ResumeUIComponent } from './resume-ui/resume-ui.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'create-resume', component: ResumeUIComponent },
  { path: 'resume-dashboard', component: ResumeDashboardComponent },
  { path: '', redirectTo: 'resume-dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
