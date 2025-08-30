import React from 'react';

import './text-bubble.scss';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { TextBubbleDto as TextBubbleProps } from '../model/TextBubble';

type MyCodeProps = React.HTMLAttributes<HTMLElement> & {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export const TextBubble: React.FC<TextBubbleProps> = ({
  message,
  align = 'right',
  shadow = true,
  chatbotAnswer = false,
}) => {
  const sideClass = align === 'right' ? 'is-right' : 'is-left';
  const components: Components = {
    a: (props) => <a {...props} target="_blank" rel="noreferrer" />,
    code({ inline, className, children, ...props }: MyCodeProps) {
      // типы у v9 корректно знают про inline/className
      return inline ? (
        <code className={className} {...props}>
          {children}
        </code>
      ) : (
        <pre className={className}>
          <code {...props}>{children}</code>
        </pre>
      );
    },
  };
  return (
    <>
      <ReactMarkdown
        className={
          chatbotAnswer
            ? `chat-bubble chat-bubble__chatbot_answer`
            : `chat-bubble ${sideClass} ${shadow ? 'has-shadow' : ''}`
        }
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {message}
      </ReactMarkdown>
      {/* <div
        className={
          chatbotAnswer
            ? `chat-bubble chat-bubble__chatbot_answer`
            : `chat-bubble ${sideClass} ${shadow ? 'has-shadow' : ''}`
        }
        role="note"
        aria-label={message}
      >
        {message}
      </div> */}
    </>
  );
};
