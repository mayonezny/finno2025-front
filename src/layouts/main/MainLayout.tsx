import React from 'react';
import { Outlet } from 'react-router-dom';

import './main-layout.scss';
import { NavBar } from '@/components/NavBar';

export const MainLayout: React.FC = () => (
  <div className="MainLayout">
    <NavBar />
    <Outlet />
  </div>
);
