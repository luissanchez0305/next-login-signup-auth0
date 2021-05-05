import { AxiosResponse } from 'axios';
import { BaseService } from './base';
import { CreateUserDto, User, UserLoginResponseDTO } from '../../../types';

export class UsersService extends BaseService {
  protected readonly basePath: string = '/users';

  async create(createUserDto: CreateUserDto): Promise<AxiosResponse<User>> {
    const endPoint = this.endPoint();
    return this.client.post<User>(endPoint, createUserDto);
  }

  async login(email: string, password: string): Promise<AxiosResponse<UserLoginResponseDTO>> {
    try {
      const resp = await this.client.post<UserLoginResponseDTO>('/auth/login', { email, password });
      return resp;
    } catch (error) {
      return error.response;
    }
  }

  async getProfile(): Promise<AxiosResponse<User>> {
    try {
      const endPoint = this.endPoint('/me');
      const resp = await this.client.get<User>(endPoint);
      return resp;
    } catch (error) {
      return error.response;
    }
  }
}
