export interface Data {
  home: Home;
  about: About;
  contact: Contact;
  projects: Project[];
}

export interface Home {
  title: string;
  subtitle: string;
  data: PersonalInfo;
}

export interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  direction: string;
}

export interface Project {
  id: string;
  name: string;
  year: string;
  mainImage: any;
  images: any[];
  top: boolean;
}

export interface About {
  mainImage: any;
  description: string[];
}

export interface Contact {
  mainImage: any;
  form: ContactFormData;
  button: string;
}

export interface ContactFormData {
  name: string;
  surname: string;
  subject: string;
  email: string;
  content: string;
}
