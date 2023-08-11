export interface Data {
  home: Home;
  about: About;
  projects: Project[];
}

export interface Home {
  title: string;
  subtitle: string;
  data: HomeData;
}

export interface HomeData {
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
  top: boolean;
}

export interface About {
  mainImage: any;
  description: string[];
}