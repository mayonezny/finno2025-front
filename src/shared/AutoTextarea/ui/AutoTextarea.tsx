import React, { useRef, useEffect } from 'react';
import './auto-textarea.scss';

export const AutoTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (
  props,
) => {
  const { className, placeholder } = props;
  const ref = useRef<HTMLTextAreaElement>(null);
  const chatRef = useRef<HTMLDivElement>(null); // контейнер чата

  const resize = () => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
      // прокрутить чат вниз
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }
  };

  return (
    <div ref={chatRef} className="box">
      {/* textarea */}
      <textarea
        className={`textarea-input ${className}`}
        placeholder={placeholder}
        ref={ref}
        onInput={resize}
        rows={1}
      />
    </div>
  );
};
