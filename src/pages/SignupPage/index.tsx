import { Button, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { signup } from '../../api';

function SignupPage() {
  const navigate = useNavigate();

  function handleFormSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    mutation.mutate({ name, email, password });
  }

  const mutation = useMutation({
    mutationFn: signup,
  });

  if (mutation.isPending) return <h2>Loading</h2>;

  if (mutation.error) return <h2>{mutation.error.message}</h2>;

  if (mutation.isSuccess) {
    navigate('/login');
  }

  return (
    <>
      <Typography variant="h4">Crea una cuenta para continuar</Typography>
      <form onSubmit={handleFormSubmission}>
        <Stack spacing={2}>
          <TextField name="name" label="name" required />
          <TextField name="email" label="email" type="email" required />
          <TextField name="password" label="password" type="password" required />
          <Button variant="contained" type="submit">
            Registrarse
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default SignupPage;
