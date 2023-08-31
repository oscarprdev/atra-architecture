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

export interface AdminService {
  updatePersonalInfo(
    input: PersonalInfoServiceInput
  ): Promise<PersonalInfoServiceOutput>;
}

export class DefaultAdminService
  extends DefaultHttpBase
  implements AdminService
{
  async updatePersonalInfo(
    input: PersonalInfoServiceInput
  ): Promise<PersonalInfoServiceOutput> {
    const response = await this.patch<PersonalInfoServiceInput>(
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
}
