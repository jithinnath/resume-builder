export class Types {
}


export interface IDocConfig {
  fontSize: number,
  profileTextFontSize: number,
  jobTitleFontSize: number,
  nameFontSize: number,
  boxFillColor: string,
  dividerLineColor: string,
  headerFontSize: number,
  subHeaderFontSize: number,
  subHeaderFillColor: string,
  socialLinksFontSize: number,
  imageFit: number[],
  subHeaderColor:string
}

export interface IEmployment {
  designation: string,
  compayName: string,
  city: string,
  from: string,
  to: string,
  description: string
}

export interface IEducation {
  designation: string,
  compayName: string,
  address: string,
  from: string,
  to: string,
  description: string
}

export interface ISkill {
  name: string,
  level: 'Professional' | 'Intermediate' | 'Beginner'
}

export interface ILanguage {
  name: string,
  level: 'Fluent' | 'Proficient' | 'Conversant'
}

export interface ISocialLink {
  name: 'string',
  level: 'string'
}

export interface IResume {
  personalDetails:IPersonal
  employmentHistory: IEmployment[] | [],
  educations: IEducation[] | [],
  skills: ISkill[] | [],
  languages: ILanguage[] | [],
  socialLinks: ISocialLink[] | []

}

export interface IPersonal {
  profileImg: string | null,
  name: string,
  jobTitle: string | null,
  email: string | null,
  mobile: string | null,
  address: string | null,
  profileDescription: string | null,
}

export interface IResumeDB extends IResume {
  name:string,
  id:number
}
