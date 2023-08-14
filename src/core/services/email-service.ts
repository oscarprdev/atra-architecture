export interface SendEmailInput {
  from: string;
  to: string;
  email: string;
  subject: string;
  content: string;
}

export const sendEmail = async (input: SendEmailInput) => {
  // const response = await fetch('url', {
  //     method: 'POST',
  //     body: JSON.stringify(input),
  //     headers: {
  //         'Content-type': 'Application/Json'
  //     }
  // })

  console.log(input, "email sent");

  return {
    ok: true,
  };
};
