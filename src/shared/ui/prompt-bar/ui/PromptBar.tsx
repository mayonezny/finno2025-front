import { useState } from 'react';

import { AutoTextarea } from '@/shared/AutoTextarea';
import './prompt-bar.scss';
import { useChat } from '@/widgets/ChatWidget/api';

export const PromptBar: React.FC = () => {
  const { submitHandler, promptFieldRef } = useChat();
  const [valid, setValid] = useState(false);
  const checkValid = () => {
    setValid(false);
    if (promptFieldRef.current!.getValue().length > 3) {
      setValid(true);
    } else {
      setValid(false);
    }
  };
  const handleClick = () => {
    checkValid();
    if (valid) {
      submitHandler();
    }
    checkValid();
  };
  return (
    <div className="prompt-bar">
      <AutoTextarea
        className="prompt-bar__input"
        placeholder="Спросите что-нибудь..."
        ref={promptFieldRef}
        onChange={checkValid}
      />
      <button
        className={valid ? 'submit-button' : 'submit-button submit-button__disabled'}
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
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
      </button>
    </div>
  );
};
