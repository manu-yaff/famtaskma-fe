import {
  LoginCredentials,
  LoginResponse,
  NewUserDto,
  ShoppingList,
  SuccessApiResponse,
} from './types';

const api = 'http://localhost:3000';

export async function signup(newUser: NewUserDto) {
  const response = await fetch(`${api}/auth/register`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw Error('Something went wrong');
  }

  return response.json();
}

export async function login(loginCredentials: LoginCredentials) {
  const response = await fetch(`${api}/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(loginCredentials),
  });

  if (!response.ok) {
    throw Error('Something went wrong!');
  }

  return response.json() as Promise<SuccessApiResponse<LoginResponse>>;
}

export async function fetchShoppingLists() {
  const token = localStorage.getItem('token');

  const response = await fetch(`${api}/shopping-lists`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return response.json() as Promise<SuccessApiResponse<ShoppingList[]>>;
}

export async function createShoppingList(name: string) {
  const token = localStorage.getItem('token');

  const response = await fetch(`${api}/shopping-lists`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return response.json() as Promise<SuccessApiResponse<ShoppingList>>;
}
