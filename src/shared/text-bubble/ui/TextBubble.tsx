import React, { type JSX } from 'react';

import './text-bubble.scss';
import type { TextBubbleDto as TextBubbleProps } from '../model/TextBubble';

export const TextBubble: React.FC<TextBubbleProps> = ({
  message,
  align = 'right',
  shadow = true,
  chatbotAnswer = false,
}) => {
  const sideClass = align === 'right' ? 'is-right' : 'is-left';

  return (
    <div
      className={
        chatbotAnswer
          ? `chat-bubble chat-bubble__chatbot_answer`
          : `chat-bubble ${sideClass} ${shadow ? 'has-shadow' : ''}`
      }
      role="note"
      aria-label={message}
    >
      {message}
    </div>
  );
};
