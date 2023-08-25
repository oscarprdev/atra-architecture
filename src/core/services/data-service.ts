import { type About, type Contact, type Data, type Home, type Project } from '../types/data.types.ts';
import { data } from '../data/data.ts';

export const dataService = async (): Promise<Data> => {
  return await Promise.resolve(data);
};

export const getHomeData = async (): Promise<Home> => {
  return await Promise.resolve(data.home);
};

export const getProjectsData = async (): Promise<Project[]> => {
  return await Promise.resolve(data.projects);
};

export const getProjectById = async (id: string | string[]): Promise<Project | void> => {
  const project = data.projects.find((project) => project.id === id);

  if (project) {
    return await Promise.resolve(project);
  }
};

export const getAboutData = async (): Promise<About> => {
  return await Promise.resolve(data.about);
};

export const getContactData = async (): Promise<Contact> => {
  return await Promise.resolve(data.contact);
};
