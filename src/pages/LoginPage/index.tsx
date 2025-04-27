import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { login } from '../../api';
import { routes } from '../../routes';

function LoginPage() {
  function handleFormSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    mutation.mutate({ email, password });
  }

  const navigate = useNavigate();

  const mutation = useMutation({ mutationFn: login });

  if (mutation.isPending) return <CircularProgress />;

  if (mutation.error) return <Alert severity="error">{mutation.error.message}</Alert>;

  if (mutation.data) {
    localStorage.setItem('token', mutation.data.data.accessToken);
    navigate(routes.shoppingLists);
  }

  return (
    <>
      <form onSubmit={handleFormSubmission}>
        <TextField name="email" label="email" type="email" required />
        <TextField name="password" label="password" type="password" required />
        <Button variant="contained" type="submit">
          Ingresar
        </Button>
      </form>
    </>
  );
}

export default LoginPage;
