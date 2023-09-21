import {
  AboutServiceInput,
  AboutServiceOutput,
  DeleteProjectOk,
  PersonalInfoServiceInput,
  PersonalInfoServiceOutput,
  ProvideMainImageProjectPromiseInput,
  RemoveProjectInput,
  UpdateMainImageHttpInput,
  UpdateProjectByIdOutput,
  UpdateProjectFormData,
  UpdateProjectHttpInput,
  UpdateProjectInput,
} from '../types/admin.types';
import { DefaultHttpBase } from './http-base';

export interface AdminSignInInput {
  email: string;
  password: string;
}

export const adminSignIn = async (
  input: AdminSignInInput
): Promise<boolean> => {
  const validInput: Record<string, string> = {
    email: 'prueba@gmail.com',
    password: '1234',
  };

  return (
    input.email === validInput.email && input.password === validInput.password
  );
};

export interface AdminService {
  updatePersonalInfo(
    input: PersonalInfoServiceInput
  ): Promise<PersonalInfoServiceOutput>;
  updateAboutInfo(input: AboutServiceInput): Promise<AboutServiceOutput>;
  updateProjectById(
    input: UpdateProjectInput
  ): Promise<UpdateProjectByIdOutput>;
  removeProjectById(input: RemoveProjectInput): Promise<number>;
}

export class DefaultAdminService
  extends DefaultHttpBase
  implements AdminService
{
  private provideAboutFormData(input: AboutServiceInput) {
    const formData = new FormData();

    Object.entries(input).forEach(([key, entry]) => {
      if (Array.isArray(entry)) {
        formData.append(key, JSON.stringify(entry));
        return;
      }

      formData.append(key, entry);
    });

    return formData;
  }

  private provideMainImageFormData(input: UpdateMainImageHttpInput) {
    const formData = new FormData();

    Object.entries(input).forEach(([key, entry]) => {
      formData.append(key, entry);
    });

    return formData;
  }

  private provideProjectInputFormData(input: UpdateProjectFormData) {
    const formData = new FormData();

    Object.entries(input).forEach(([key, entry]) => {
      if (key !== 'mainImage') {
        if (key === 'newImages') {
          entry.forEach((file: File) => {
            formData.append(key, file);
          });
          return;
        }

        if (key === 'images') {
          formData.append(key, JSON.stringify(entry));
          return;
        }

        formData.append(key, entry);
      }
    });

    return formData;
  }

  private async provideMainImageProjectPromise({
    image,
    project,
    id,
  }: ProvideMainImageProjectPromiseInput) {
    const mainImageFormData = this.provideMainImageFormData({
      mainImage: image,
      project: project,
    });

    const mainImageResponse = await this.patchFormData<UpdateProjectHttpInput>(
      `projects/main-image/${id}`,
      mainImageFormData
    );

    return mainImageResponse;
  }

  async updatePersonalInfo(
    input: PersonalInfoServiceInput
  ): Promise<PersonalInfoServiceOutput> {
    const response = await this.patchJson<PersonalInfoServiceInput>(
      'personal-info',
      input
    );

    return {
      data: {
        email: response.data.email,
        direction: response.data.direction,
        phone: response.data.phone,
      },
      status: response.status,
    };
  }

  async updateAboutInfo(input: AboutServiceInput): Promise<AboutServiceOutput> {
    const aboutFormData = this.provideAboutFormData(input);

    const response = await this.patchFormData<AboutServiceInput>(
      'about',
      aboutFormData
    );

    return {
      status: response.status,
      data: {
        image: response.data.image,
        text: response.data.text,
      },
    };
  }

  async updateProjectById(
    input: UpdateProjectInput
  ): Promise<UpdateProjectByIdOutput> {
    const promises = [];

    const projectFormData = this.provideProjectInputFormData(input.project);

    promises.push(
      this.patchFormData<UpdateProjectHttpInput>(
        `projects/${input.id}`,
        projectFormData
      )
    );

    if (input.project.mainImage) {
      promises.push(
        this.provideMainImageProjectPromise({
          image: input.project.mainImage,
          project: input.project.name,
          id: input.id,
        })
      );
    }

    const [projectResponse, mainImageResponse] = await Promise.all(promises);

    if (mainImageResponse) {
      return {
        projectResponse: {
          status: projectResponse.status,
          data: projectResponse.data,
        },
        mainImageResponse: {
          status: mainImageResponse.status,
          data: mainImageResponse.data,
        },
      };
    } else {
      return {
        projectResponse: {
          status: projectResponse.status,
          data: projectResponse.data,
        },
      };
    }
  }

  async removeProjectById({ id }: RemoveProjectInput): Promise<number> {
    const response = await this.delete<DeleteProjectOk>(`projects/${id}`);

    return response.status;
  }
}
