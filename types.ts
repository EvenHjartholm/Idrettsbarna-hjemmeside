export enum DayOfWeek {
  Wednesday = "Onsdager",
  Thursday = "Torsdager"
}

export interface CourseSession {
  time: string;
  level: string;
  ageGroup: string;
  serviceId?: string; // Links to the ServiceItem id
  spots?: number | string; // Number of spots or status text
}

export interface ScheduleDay {
  day: DayOfWeek;
  startDate: string;
  durationInfo: string;
  sessions: CourseSession[];
}

export interface SessionContext {
  startDate: string;
  time: string;
  level: string;
  day: string;
}

export interface ServiceDetail {
  fullDescription: string;
  whatToBring: string[];
  learningGoals: string[];
  price: string;
  duration: string;
  location: string;
  age: string; // New field for specific age range
  parentalInvolvement?: string; // New field for parental involvement info
  membershipRequired?: boolean; // New field for membership requirement
  geoIntro?: string; // Short intro for AI/SEO (2-4 lines)
  faqs?: { question: string; answer: string }[]; // Course-specific FAQs
  startDate?: string; // Specific start date or scheduling info
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Baby' | 'Waves' | 'LifeBuoy' | 'School' | 'GraduationCap';
  imageUrl: string;
  ageRange?: string;
  details: ServiceDetail;
}

export interface EnrollmentFormData {
  parentFirstName: string;
  parentLastName: string;
  childFirstName: string;
  childBirthDate: string;
  email: string;
  phone: string;
  address: string;
  zipCity: string;
  selectedCourse: string;
  heardAboutUs: string;
  inquiryType: string;
  termsAccepted: string;
  message: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string; // Markdown or HTML string
  imageUrl?: string;
}

export type Theme = 'default' | 'refined' | 'bw' | 'luxury' | 'nordic';