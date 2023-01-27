export class ResumeData {}

export const config = {
  fontSize: 10,
  profileTextFontSize: 20,
  jobTitleFontSize: 15,
  nameFontSize: 64,
  boxFillColor: '#eeeeee',
  dividerLineColor: '#a1a1a1',
  headerFontSize: 25,
  subHeaderFontSize: 15,
  subHeaderFillColor: '#242424',
  subHeaderColor: '#fcfcfc',
  socialLinksFontSize: 8,
  imageFit: [100, 100],
};
export const configTemplate2 = {
  imageFit: [50, 50],

  //
  mainHeader: {
    fontSize: 20,
    color: '#343a40',
    fillColor: '#ffffff',
    bold: false,
  },
  header: {
    fontSize: 18,
    color: '#343a40',
    fillColor: '#ffffff',
    bold: false,
  },
  subHeader: {
    fontSize: 12,
    color: '#343a40',
    fillColor: '#ffffff',
    bold: false,
  },
  subHeader2: {
    fontSize: 10,
    color: '#343a40',
    fillColor: '#ffffff',
    bold: false,
  },
  normalText: {
    fontSize: 10,
    color: '#343a40',
    fillColor: '#ffffff',
  },
  color: {
    accent: '#448aff',
  },
  list: true,
  skillLines: {
    gap: 2,
    color: '#448aff',
    gapColor: '#ffffff',
    bg: '#eeeeee',
  },
};

export const configTemplate3 = {
  imageFit: [100, 300],

  //
  mainHeader: {
    fontSize: 20,
    color: '#343a40',
    fillColor: '#ffffff',
    bold: false,
  },
  header: {
    fontSize: 18,
    color: '#343a40',
    fillColor: '#ffffff',
    bold: false,
  },
  subHeader: {
    fontSize: 12,
    color: '#343a40',
    fillColor: '#ffffff',
    bold: false,
  },
  subHeader2: {
    fontSize: 10,
    color: '#343a40',
    fillColor: '#ffffff',
    bold: false,
  },
  normalText: {
    fontSize: 10,
    color: '#343a40',
    fillColor: '#ffffff',
  },
  color: {
    accent: '#9b9bb3',
  },
  list: true,
  skillLines: {
    gap: 2,
    color: '#9b9bb3',
    gapColor: '#ffffff',
    bg: '#CCCCCC',
  },
};

export const sample = {
  personalDetails: {
    profileImg: 'assets/profileImg.jpg',
    name: 'Timxxxdd Janssenxx',
    jobTitle: 'Full Stack Developer',
    email: 'jitinnath@gmail.com',
    mobile: '7738663466',
    address: 'Bengaluru,India',
    city: 'Bengaluru',
    country: 'India',
    profileDescription: `Experienced web developer with a history of design collaboration offers
  sophisticated coding and troubleshooting. Always ensure bringing projects
  to completion well ahead of deadline while exceeding functional
  expectation. Proactive problem-solver with exceptional time-management
  and organization skills.`,
  },
  employmentHistory: [
    {
      designation: 'Technology Analyst',
      compayName: 'Infosys Finacle -Edgeverve',
      city: 'Bengaluru',
      from: new Date('2019-10-15').toISOString(),
      to: new Date().toISOString(),
      description: `Create and implement banking product solutions based on Finacle core.
      Design custom user interfaces and middle-wares that simplifies Finacle
      core banking.
      Customize and Implement products for various banks on requirement.
      Design and develop PWA / Hybrid / Native web applications.
      Train new incoming junior developers.
      Achieved optimizing and Improved performance of new Income tax
      portal.
      Collaborated with business analysts and other functional teams to
      develop user interfaces in new Income tax portal.`,
    },
    {
      designation: 'System Engineer',
      compayName: 'Tata Consultancy Services',
      city: 'Mumbai',
      from: new Date('2015-12-07').toISOString(),
      to: new Date('2019-10-15').toISOString(),
      description: `Worked on troubleshooting and debugging various production issues.
      Worked on production defects and production deployments.
      Automated multiple manual tasks, where the support team usually face
      challenges. Automated report generation activities.`,
    },
  ],
  educations: [
    {
      designation: 'Bachelor of Technology',
      compayName: 'Govt College of Engineering Kannur',
      address: 'Kannur, Kerala',
      from: new Date('2011-06-01').toISOString(),
      to: new Date('2015-05-31').toISOString(),
      description: `Graduated in Electronics and Communication with First class`,
    },
  ],
  skills: [
    {
      name: 'Angular',
      level: 'Professional',
    },
    {
      name: 'Spring Boot',
      level: 'Professional',
    },
    {
      name: 'Oracle',
      level: 'Intermediate',
    },
    {
      name: 'MongoDB',
      level: 'Beginner',
    },
  ],
  languages: [
    {
      name: 'English',
      level: 'Fluent',
    },
  ],
  socialLinks: [
    {
      name: 'LinkedIn',
      level: 'https://www.linkedin.com/in/jitinn/',
    },
    {
      name: 'GitHub',
      level: 'https://github.com/jithinnath',
    },
  ],
  certifications: [],
};
