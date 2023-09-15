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

interface PersonalInfoServiceOutput {
  data: PersonalInfoServiceInput;
  status: number;
}

interface PersonalInfoServiceInput {
  email: string;
  direction: string;
  phone: string;
}

interface AboutServiceInput {
  image?: File;
  text: string[];
}

interface AboutServiceOutput {
  data: AboutServiceInput;
  status: number;
}

export interface UpdateProjectInput {
  name: string;
  year: number;
  images: string[];
  description: string;
  top: boolean;
  mainImage?: File;
  newImages?: File[];
}

export interface UpdateProjectHttpInput {
  name: string;
  year: number;
  images: string[];
  description: string;
  top: boolean;
  newImages?: File[];
}

export interface UpdateMainImageHttpInput {
  mainImage: File;
  project: string;
}

export interface AdminService {
  updatePersonalInfo(
    input: PersonalInfoServiceInput
  ): Promise<PersonalInfoServiceOutput>;
  updateAboutInfo(input: AboutServiceInput): Promise<AboutServiceOutput>;
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

  private provideProjectInputFormData(input: UpdateProjectInput) {
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

  private async provideMainImageProjectPromise(
    input: { image: File; project: string },
    id: string
  ) {
    const mainImageFormData = this.provideMainImageFormData({
      mainImage: input.image,
      project: input.project,
    });

    const mainImageResponse = await this.patchFormData<UpdateProjectHttpInput>(
      `projects/main-image/${id}`,
      mainImageFormData
    );

    return mainImageResponse;
  }

  async updateProjectById(input: UpdateProjectInput, id: string) {
    const promises = [];

    const projectFormData = this.provideProjectInputFormData(input);

    promises.push(
      this.patchFormData<UpdateProjectHttpInput>(
        `projects/${id}`,
        projectFormData
      )
    );

    if (input.mainImage) {
      promises.push(
        this.provideMainImageProjectPromise(
          { image: input.mainImage, project: input.name },
          id
        )
      );
    }

    const [projectResponse, mainImageResponse] = await Promise.all(promises);

    return projectResponse.data;
  }
}
