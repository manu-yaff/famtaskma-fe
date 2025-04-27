import { Alert, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { signup } from '../../api';
import { routes } from '../../routes';

function SignupPage() {
  const navigate = useNavigate();

  function handleFormSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    mutate({ name, email, password });
  }

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: signup,
  });

  if (isSuccess) {
    navigate(routes.login);
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

      {isPending && <CircularProgress />}

      {error && <Alert severity="error">{error.message}</Alert>}
    </>
  );
}

export default SignupPage;
