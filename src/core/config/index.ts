import { DefaultTheme } from 'styled-components';
import { AppURL } from 'types';

export class Config {
  private static instance: Config;

  public readonly apiBaseURL: string = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  public readonly apiReqTimeout: number = process.env.NEXT_PUBLIC_API_REQ_TIMEOUT
    ? Number(`${process.env.API_REQ_TIMEOUT}`)
    : 5000;

  public appTheme: DefaultTheme['name'] = process.env.NEXT_PUBLIC_APP_THEME
    ? (process.env.NEXT_PUBLIC_APP_THEME as DefaultTheme['name'])
    : 'dark';

  public readonly appURLs: AppURL[] = [
    {
      url: process.env.NEXT_PUBLIC_APP_URL_IGNITION_WEBSITE,
      iconName: 'ignition.svg',
      name: 'EsferaSoluciones',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance(): Config {
    if (Config.instance) {
      return Config.instance;
    }
    Config.instance = new Config();
    return Config.instance;
  }
}
