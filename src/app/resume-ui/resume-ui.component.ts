import { Resume } from './../resume';
import { IEmployment, IResume } from './../types';
import { coerceStringArray } from '@angular/cdk/coercion';
import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PdfMakeService } from '../v1/pdf-make.service';
import { Observable } from 'rxjs';

export interface empDetails {
  id: number,
  rawFormValue: any,
}

export interface edDeatails {
  id: number,
  designation: string,
  compayName: string,
  city: string,
  from: string,
  to: string,
  description: string
}

@Component({
  selector: 'app-resume-ui',
  templateUrl: './resume-ui.componet.rewrite.html',
  styleUrls: ['./resume-ui.component.scss']
})
export class ResumeUIComponent implements OnInit {

  skillOptions: string[] = ['Angular', 'Java', 'Android'];
  languageOptions: string[] = ['English', 'Hindi', 'Malayalam'];
  linkOptions: string[] = ['GitHub', 'LinkedIn', 'Stackoverflow'];





  resumeForm = new FormGroup({
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
  })




  fg(form: any) {
    return form as FormGroup
  }
  addEmployment() {
    const empFormGroup = this.fb.group({
      designation: ['', [Validators.required]],
      compayName: ['', [Validators.required]],
      city: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['',],
      description: ['', [Validators.required]]
    })

    this.resumeForm.controls.employmentHistory.push(empFormGroup)



  }
  deleteEmployment(i: number) {
    this.resumeForm.controls.employmentHistory.removeAt(i)
  }

  addEducation() {
    const educationFormGroup = this.fb.group({
      designation: ['', [Validators.required]],
      compayName: ['', [Validators.required]],
      city: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['',],
      description: ['', [Validators.required]]
    })

    this.resumeForm.controls.educations.push(educationFormGroup)
  }

  deleteEducation(i: number) {
    this.resumeForm.controls.educations.removeAt(i)
  }

  addSkill() {
    const skillFormGroup = this.fb.group({
      name: ['', [Validators.required]],
      level: ['', [Validators.required]],
    })

    this.resumeForm.controls.skills.push(skillFormGroup)
  }

  deleteSkill(i: number) {
    this.resumeForm.controls.skills.removeAt(i)
  }

  addLanguage() {
    const languageFormGroup = this.fb.group({
      name: ['', [Validators.required]],
      level: ['', [Validators.required]],
    })

    this.resumeForm.controls.languages.push(languageFormGroup)
  }

  deleteLanguage(i: number) {
    this.resumeForm.controls.languages.removeAt(i)
  }



  addLink() {
    const languageFormGroup = this.fb.group({
      name: ['', [Validators.required]],
      level: ['', [Validators.required]],
    })

    this.resumeForm.controls.socialLinks.push(languageFormGroup)
  }

  deleteLink(i: number) {
    this.resumeForm.controls.socialLinks.removeAt(i)
  }








  constructor(private fb: FormBuilder, private pdfMake: PdfMakeService) { }
  ngOnInit(): void {


  }










  build(data: any) {
    console.log('form data', data)


    if (!this.resumeForm.valid) {
      this.resumeForm.markAllAsTouched();
      return;
    }
    if(!this.imgBase64){
      throw Error('upload image')
    }
    this._createPdfcall(data)


  }



  private _createPdfcall(data: any) {
    const resumData: Resume<string> = new Resume(data as IResume)
    resumData.personalDetails.profileImg = this.imgBase64
    this.pdfMake.createPdf(resumData)
  }


  private imgBase64: string = '';
  onFileChange(event: Event) {
    const filex = (document.getElementById('image') as HTMLInputElement)?.files![0];
    this.getBase64(filex, (e: any) => this.imgBase64 = e.target.result)
    const im = (document.getElementById('prev') as HTMLInputElement)
    im.src = URL.createObjectURL(filex)


  }

  getBase64(file: File, callback: any) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = callback
  }




  emptitle(emp:any){
    const empx = this.fg(emp)
    if(!this.fg(emp)?.get('designation')?.value || !this.fg(emp).get('compayName')?.value){
     return `Enter your employment details`
    }
    return  this.fg(emp).get('designation')?.value +' at ' +this.fg(emp).get('compayName')?.value
  }

}


