import { ChevronRight, ChevronLeft } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router'; // если у тебя SPA

import type { NavLinkButtonProps } from '../model/types';

import './NavLinkButton.scss';

export const NavLinkButton: React.FC<NavLinkButtonProps> = ({ label, to, direction = 'right' }) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;

  return (
    <Link to={to} className="nav-link-button">
      {direction === 'left' && <Icon size={24} className="nav-link-button__icon" />}
      <span className="h3">{label}</span>
      {direction === 'right' && <Icon size={24} className="nav-link-button__icon" />}
    </Link>
  );
};
