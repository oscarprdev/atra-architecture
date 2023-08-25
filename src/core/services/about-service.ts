import { AboutInfo } from '../types/data.types';
import { getAboutData } from './data-service';
import { DefaultHttpBase } from './http-base';

interface AboutService {
  getAboutScreenInfo(): Promise<AboutInfo | void>;
}

export class DefaultAboutService
  extends DefaultHttpBase
  implements AboutService
{
  async getAboutScreenInfo() {
    const mainImage = (await getAboutData()).mainImage;
    const aboutInfo = await this.get<AboutInfo>('about');

    if (aboutInfo) {
      return {
        ...aboutInfo,
        mainImage,
      } satisfies AboutInfo;
    }
  }
}
