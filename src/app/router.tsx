import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '@/layouts/main';

import { HomePage } from '../pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // общая обёртка с меню
    children: [
      { index: true, element: <HomePage /> },
      // { path: 'todos', element: <TodosPage /> },
    ],
  },
]);
