import { ResumeData } from './../resume-data';
import { ResumeIDBService } from './../resume-idb.service';
import { Resume } from './../resume';
import { IResume, IResumeDB } from './../types';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PdfMakeService } from '../v1/pdf-make.service';
import { Router } from '@angular/router';

export interface empDetails {
  id: number;
  rawFormValue: any;
}

export interface edDeatails {
  id: number;
  designation: string;
  compayName: string;
  city: string;
  from: string;
  to: string;
  description: string;
}

@Component({
  selector: 'app-resume-ui',
  templateUrl: './resume-ui.componet.rewrite.html',
  styleUrls: ['./resume-ui.component.scss'],
})
export class ResumeUIComponent implements OnInit {
  skillOptions: string[] = ['Angular', 'Java', 'Android'];
  languageOptions: string[] = ['English', 'Hindi', 'Malayalam'];
  linkOptions: string[] = ['GitHub', 'LinkedIn', 'Stackoverflow'];

  resumeForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    personalDetails: this.fb.group({
      name: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      profileDescription: ['', [Validators.required]],
    }),
    employmentHistory: new FormArray<any>([]),
    educations: new FormArray<any>([]),
    skills: new FormArray<any>([]),
    languages: new FormArray<any>([]),
    socialLinks: new FormArray<any>([]),
  });

  fg(form: any) {
    return form as FormGroup;
  }
  addEmployment() {
    const empFormGroup = this.fb.group({
      designation: ['', []],
      compayName: ['', []],
      city: ['', []],
      from: ['', []],
      to: [''],
      description: ['', []],
    });

    this.resumeForm.controls.employmentHistory.push(empFormGroup);
  }
  deleteEmployment(i: number) {
    this.resumeForm.controls.employmentHistory.removeAt(i);
  }

  addEducation() {
    const educationFormGroup = this.fb.group({
      designation: ['', []],
      compayName: ['', []],
      city: ['', []],
      from: ['', []],
      to: [''],
      description: ['', []],
    });

    this.resumeForm.controls.educations.push(educationFormGroup);
  }

  deleteEducation(i: number) {
    this.resumeForm.controls.educations.removeAt(i);
  }

  addSkill() {
    const skillFormGroup = this.fb.group({
      name: ['', []],
      level: ['', []],
    });

    this.resumeForm.controls.skills.push(skillFormGroup);
  }

  deleteSkill(i: number) {
    this.resumeForm.controls.skills.removeAt(i);
  }

  addLanguage() {
    const languageFormGroup = this.fb.group({
      name: ['', []],
      level: ['', []],
    });

    this.resumeForm.controls.languages.push(languageFormGroup);
  }

  deleteLanguage(i: number) {
    this.resumeForm.controls.languages.removeAt(i);
  }

  addLink() {
    const languageFormGroup = this.fb.group({
      name: ['', []],
      level: ['', []],
    });

    this.resumeForm.controls.socialLinks.push(languageFormGroup);
  }

  deleteLink(i: number) {
    this.resumeForm.controls.socialLinks.removeAt(i);
  }

  constructor(
    private fb: FormBuilder,
    private pdfMake: PdfMakeService,
    private idbResume: ResumeIDBService,
    private router: Router
  ) {}
  ngOnInit(): void {
    window.scrollTo(0, -100);
    this.openDB();
    const data = history.state;
    if (data && data?.name && data?.id) this.editDashboardData(data);
  }

  async openDB() {
    await this.idbResume.openResumeDb();
  }

  build(data: any) {
    console.log('form data', data);

    if (!this.resumeForm.valid) {
      this.resumeForm.markAllAsTouched();
      return;
    }
    if (!this.imgBase64) {
      throw Error('upload image');
    }
    this._createPdfcall(data);
  }

  private _createPdfcall(data: any) {
    if (data?.id === 0) {
      delete data.id;
    }

    data.name = data.personalDetails.name;

    const resumData: Resume<string> = new Resume(data as IResume);
    resumData.personalDetails.profileImg = this.imgBase64;
    this.router.navigate(['template-dashboard'], { state: { resumeData: resumData } });
    // this.pdfMake.createPdf(resumData, () => {
    //   data?.id ? this.idbResume.updateResume(data) : this.idbResume.addResume(data);

    //   this.router.navigate(['resume-dashboard']);
    // });
  }

  private imgBase64 = '';
  onFileChange(event: Event) {
    const filex: File = (document.getElementById('image') as HTMLInputElement)?.files![0];
    this.getBase64(filex, (e: any) => (this.imgBase64 = e.target.result));
    const im = document.getElementById('avatar') as HTMLInputElement;
    im.style.backgroundImage = `url(${URL.createObjectURL(filex)})`;
    // im.src = URL.createObjectURL(filex)
  }

  getBase64(file: File, callback: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = callback;
  }

  emptitle(emp: any, code = 0) {
    const empx = this.fg(emp);
    if (!this.fg(emp)?.get('designation')?.value || !this.fg(emp).get('compayName')?.value) {
      return code ? `Enter your education details` : `Enter your employment details`;
    }
    return this.fg(emp).get('designation')?.value + ' at ' + this.fg(emp).get('compayName')?.value;
  }

  uploadImage(x: HTMLInputElement) {
    console.log('file input', x);
    const k = document.getElementById('image') as HTMLInputElement;
    k.click();
    k.focus();
  }

  editDashboardData(data: IResumeDB) {
    if (!data) throw console.error('No data present');
    this.imgBase64 = data.personalDetails.profileImg || '';
    const im = document.getElementById('avatar') as HTMLInputElement;
    im.style.backgroundImage = `url(${this.imgBase64})`;

    data?.skills?.forEach(skill => this.addSkill());
    data?.educations?.forEach(ed => this.addEducation());
    data?.employmentHistory?.forEach(em => this.addEmployment());
    data?.languages?.forEach(l => this.addLanguage());
    data?.socialLinks?.forEach(s => this.addLink());
    this.resumeForm.patchValue({
      id: data.id,
      name: data.name,
      personalDetails: {
        name: data.personalDetails.name,
        jobTitle: data.personalDetails.jobTitle,
        email: data.personalDetails.email,
        mobile: data.personalDetails.mobile,
        city: data.personalDetails.city,
        country: data.personalDetails.country,
        profileDescription: data.personalDetails.profileDescription,
      },
      skills: data?.skills || [],
      socialLinks: data?.socialLinks,
      languages: data?.languages,
      employmentHistory: data?.employmentHistory,
      educations: data?.educations,
    });

    this.resumeForm.controls.skills.patchValue(data?.skills);
    console.log(this.resumeForm.getRawValue());
  }
}
