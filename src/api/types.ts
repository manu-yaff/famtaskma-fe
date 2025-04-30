export type ErrorDetails = {
  message: string;
  error: string;
  statusCode: number;
};

export type SuccessApiResponse<T> = {
  error: false;
  data: T;
};

export type ErrorApiResponse = {
  error: true;
  errorDetails: ErrorDetails;
};

export type NewUserDto = {
  name: string;
  email: string;
  password: string;
};

export type LoginCredentials = Omit<NewUserDto, 'name'>;

export type LoginResponse = {
  accessToken: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  shoppingLists: Array<string>;
};

export type ShoppingList = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  users: User[];
};
