export interface Customer {
  _id: string;
  name: string;
  email: string;
}

export interface CustomerList {
  data: Customer[];
  total: number;
}
