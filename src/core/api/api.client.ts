import {
  CustomersService,
  UsersService,
} from './service';

export class APIClient {
  private static instance: APIClient;
  public readonly customers: CustomersService = new CustomersService();
  public readonly users: UsersService = new UsersService();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance(): APIClient {
    if (APIClient.instance) {
      return APIClient.instance;
    }

    APIClient.instance = new APIClient();
    return APIClient.instance;
  }
}
