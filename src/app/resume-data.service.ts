import { Injectable } from '@angular/core';
import { config, sample } from './resume-data';

@Injectable({
  providedIn: 'root',
})
export class ResumeDataService {
  getResumeData() {
    return sample;
  }

  getConfig() {
    return config;
  }

  getServer() {
    return `https://jithinnath.github.io/resume-builder/`;
  }
}
