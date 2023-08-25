interface Response<S> {
  status: number,
  data: S,
  createdAt: string
}

interface HttpBase {
  get<T>(keyEndpoint: string): Promise<T | void>
} 

export class DefaultHttpBase implements HttpBase {
  private readonly apiUrl: string = "https://atra-backend.vercel.app/" 

  async get<T>(keyEndpoint: string) {
    try {
      const response = await fetch(`${this.apiUrl}${keyEndpoint}`)

      const jsonResponse: Response<T> = await response.json()

      return jsonResponse.data satisfies T
    } catch (e: unknown) {
        console.log(e)
    }
  }
}