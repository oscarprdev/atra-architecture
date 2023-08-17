export interface AdminSignInInput {
  email: string,
  password: string
}

export const adminSignIn = async (input: AdminSignInInput): Promise<boolean> => {
  const validInput: Record<string, string> = {
    email: 'prueba@gmail.com',
    password: '1234'
  }

  console.log(input)

  return input.email === validInput.email && input.password === validInput.password
}
