const api = 'http://localhost:3000';

type NewUserDto = {
  name: string;
  email: string;
  password: string;
};

type LoginCredentials = Omit<NewUserDto, 'name'>;

type LoginResponse = {
  error: boolean;
  data: {
    accessToken: string;
  };
};

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

  return response.json() as Promise<LoginResponse>;
}
