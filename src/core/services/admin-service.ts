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
    const formData = new FormData();

    Object.entries(input).forEach(([key, entry]) => {
      if (Array.isArray(entry)) {
        formData.append(key, JSON.stringify(entry));
        return;
      }

      formData.append(key, entry);
    });

    const response = await this.patchFormData<AboutServiceInput>(
      'about',
      formData
    );

    console.log(response);

    return {
      status: response.status,
      data: {
        image: response.data.image,
        text: response.data.text,
      },
    };
  }
}
