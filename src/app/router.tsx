import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '@/layouts/main';
import { AiChatbotPage } from '@/pages/AiChatbotPage';
import { DebugPage } from '@/pages/DebugPage';
import { PaymentsPage } from '@/pages/PaymentsPage';
import { ScenarioPage } from '@/pages/ScenarioPage';

import { HomePage } from '../pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // общая обёртка с меню
    children: [
      { index: true, element: <HomePage /> },
      { path: 'scenario', element: <ScenarioPage /> },
      { path: 'ai', element: <AiChatbotPage /> },
      { path: 'payments', element: <PaymentsPage /> },
      { path: 'debug', element: <DebugPage /> },
    ],
  },
]);
