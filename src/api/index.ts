const api = 'http://localhost:3000/auth/register';

interface NewUser {
  name: string;
  email: string;
  password: string;
}

export function signup(newUser: NewUser) {
  return fetch(api, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(newUser),
  });
}
