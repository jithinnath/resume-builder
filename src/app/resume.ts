import { IEmployment, IEducation, ISkill, ILanguage, ISocialLink, IResume, IPersonal } from './types';

export class Resume<T> {
  value: T | undefined;
  id?: number;
  name?: string;
  personalDetails: IPersonal;
  employmentHistory: IEmployment[] | [];
  educations: IEducation[] | [];
  skills: ISkill[] | [];
  languages: ILanguage[] | [];
  socialLinks: ISocialLink[] | [];
  constructor(options: IResume) {
    this.id = options.id;
    this.name = options.name;
    this.personalDetails = options.personalDetails;
    this.employmentHistory = options.employmentHistory || [];
    this.educations = options.educations || [];
    this.skills = options.skills || [];
    this.languages = options.languages || [];
    this.socialLinks = options.socialLinks || [];
  }
}
