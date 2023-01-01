import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { sample, config } from './resume-data';

@Injectable({
  providedIn: 'root'
})
export class ResumeDataService {

  constructor() { }

  getResumeData(){
    return sample;
  }

  getConfig() {
    return config;
  }

  getServer(){
    return `http://localhost:4200`
  }
}
