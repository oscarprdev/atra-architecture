interface Response<S> {
  status: number;
  data: S;
  createdAt: string;
}

interface HttpBase {
  get<T>(keyEndpoint: string): Promise<Response<T>>;
}

export class DefaultHttpBase implements HttpBase {
  private readonly apiUrl: string = 'https://atra-backend.vercel.app/';

  async get<T>(keyEndpoint: string): Promise<Response<T>> {
    try {
      const response = await fetch(`${this.apiUrl}${keyEndpoint}`);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const jsonResponse: Response<T> = await response.json();

      return jsonResponse;
    } catch (e: unknown) {
      console.log(e);
      throw new Error('An error occurred while fetching data');
    }
  }

  async patchJson<T>(keyEndpoint: string, input: T): Promise<Response<T>> {
    try {
      const response = await fetch(`${this.apiUrl}${keyEndpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'Application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const jsonResponse: Response<T> = await response.json();

      return jsonResponse;
    } catch (e: unknown) {
      console.log(e);
      throw new Error('An error occurred while fetching data');
    }
  }

  async patchFormData<T>(
    keyEndpoint: string,
    input: FormData
  ): Promise<Response<T>> {
    try {
      const response = await fetch(`${this.apiUrl}${keyEndpoint}`, {
        method: 'PATCH',
        body: input,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const jsonResponse: Response<T> = await response.json();

      return jsonResponse;
    } catch (e: unknown) {
      console.log(e);
      throw new Error('An error occurred while fetching data');
    }
  }

  async delete<T>(keyEndpoint: string): Promise<Response<T>> {
    try {
      const response = await fetch(`${this.apiUrl}${keyEndpoint}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const jsonResponse: Response<T> = await response.json();

      return jsonResponse;
    } catch (e: unknown) {
      console.log(e);
      throw new Error('An error occurred while fetching data');
    }
  }
}
