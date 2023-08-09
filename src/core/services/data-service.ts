import { Data, Home, Project } from "../types/data.type.ts";
import { data } from "../data/data.ts";

export const dataService = async (): Promise<Data> => {
  return Promise.resolve(data);
};

export const getHomeData = async (): Promise<Home> => {
  return Promise.resolve(data.home);
};

export const getProjectsData = async (): Promise<Project[]> => {
  return Promise.resolve(data.projects);
};

export const getProjectById = async (id: string): Promise<Project> => {
  const project = data.projects.find((project) => project.id === id);

  return Promise.resolve(project);
};
