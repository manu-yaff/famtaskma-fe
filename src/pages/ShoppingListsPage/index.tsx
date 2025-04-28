import { Alert, Button, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchShoppingLists } from '../../api';

function ShoppingListsPage() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['shopping-lists'],
    queryFn: fetchShoppingLists,
  });

  if (isPending) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <>
      <Typography variant="h3">Listas de compra</Typography>
      <Button variant="contained">Agregar</Button>

      {data.data.length === 0 && <Typography variant="body2">No tienes ninguna lista</Typography>}

      {data.data.map((list) => (
        <div>
          <p>{list.id}</p>
          <p>{list.name}</p>
          <p>{list.createdAt}</p>
        </div>
      ))}
    </>
  );
}

export default ShoppingListsPage;
