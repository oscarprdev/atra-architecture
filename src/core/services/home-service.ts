import { Home, PersonalInfo } from '../types/data.types'
import { DefaultHttpBase } from './http-base'

interface HomeService {
  getHeroText(): Promise<Home | void>
}

export class DefaultHomeService extends DefaultHttpBase implements HomeService {
  async getHeroText() {
    const [heroInfo, personalInfo] = await Promise.all([
      await this.get<Home>('home'),
      await this.get<PersonalInfo>('personal-info'),
    ])

    if (heroInfo && personalInfo) {
      return {
        ...heroInfo,
        data: { ...personalInfo },
      } satisfies Home
    }
  }
}
