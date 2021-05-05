import { AxiosResponse } from 'axios';
import { Customer, CustomerList } from 'types';
import { BaseService } from './base';

export class CustomersService extends BaseService {
  protected readonly basePath: string = '/customers';

  async list(searchTerm?: string, customerId?: string, take = 50): Promise<CustomerList> {
    try {
      const endPoint = this.endPoint();
      const newTake = take === 0 ? 50 : take;
      const search = searchTerm !== undefined ? encodeURIComponent(searchTerm) : '';

      const params = this.generateParams({
        search,
        cursor: customerId,
        take: newTake,
      });

      const resp = await this.client.get<Customer[]>(endPoint, params);

      return {
        data: resp.data,
        total: resp.data.length,
      };
    } catch (error) {
      return error.response;
    }
  }

  async getById(id: string): Promise<AxiosResponse<Customer>> {
    const endPoint = this.endPoint(`/${id}`);
    return this.client.get<Customer>(endPoint);
  }
}
