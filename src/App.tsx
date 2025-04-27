import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';
import LoginPage from './pages/LoginPage';
import ShoppingListsPage from './pages/ShoppingListsPage';
import SignupPage from './pages/SignupPage';
import { routes } from './routes';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h2>here goes the home</h2>} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path={routes.shoppingLists} element={<ShoppingListsPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
