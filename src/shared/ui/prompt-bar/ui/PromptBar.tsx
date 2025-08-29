import { useState } from 'react';

import { AutoTextarea } from '@/shared/AutoTextarea';

import './prompt-bar.scss';

export const PromptBar: React.FC = () => (
  <div className="prompt-bar">
    <AutoTextarea className="prompt-bar__input" placeholder="Спросите что-нибудь..." />

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="#ff0000"
      stroke="#fff"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-square-chevron-right-icon lucide-square-chevron-right"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m10 8 4 4-4 4" />
    </svg>
  </div>
);
