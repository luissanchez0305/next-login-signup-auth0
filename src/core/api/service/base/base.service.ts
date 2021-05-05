import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { axiosClient, axiosConfig } from './axios.instance';
import { Logger } from '../../../../core';

export abstract class BaseService {
  protected readonly client: AxiosInstance;
  protected readonly logger: Logger;
  protected abstract readonly basePath: string;

  protected endPoint = (path = ''): string => `${this.basePath}${path}`;

  protected generateParams = (params: any): AxiosRequestConfig => {
    return { ...axiosConfig, ...{ params } };
  };

  constructor(
    client: AxiosInstance | undefined = undefined,
    logger: Logger | undefined = undefined
  ) {
    this.client = client || axiosClient;
    this.logger = logger || new Logger();
  }
}
