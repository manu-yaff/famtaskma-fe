import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { createShoppingList } from '../../api';

interface AddShoppingListProps {
  refetch: () => void;
}

function AddShoppingListForm({ refetch }: AddShoppingListProps) {
  const [open, setOpen] = useState(false);

  const { mutate, error, isSuccess } = useMutation({ mutationFn: createShoppingList });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isSuccess) {
    refetch();
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Agregar lista
      </Button>
      {error && <Alert severity="error">{error.message}</Alert>}
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              const formData = new FormData(event.currentTarget);

              const listName = formData.get('list-name') as string;

              mutate(listName);

              event.preventDefault();
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>Nueva lista</DialogTitle>
        <DialogContent>
          <DialogContentText>Añade una lista para agregar productos a ella</DialogContentText>
          <TextField
            label="Nombre de la lista"
            required
            name="list-name"
            variant="standard"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">Agregar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddShoppingListForm;
