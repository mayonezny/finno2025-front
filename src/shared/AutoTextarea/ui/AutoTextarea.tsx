import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import './auto-textarea.scss';

// наружный тип того, что можно будет дергать через ref
export type AutoTextareaHandle = {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
  setValue: (val: string) => void;
};

export const AutoTextarea = forwardRef<
  AutoTextareaHandle,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  const { className = '', placeholder, ...rest } = props;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const resize = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }
  };

  // наружу отдаём удобные методы
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      if (inputRef.current) {
        inputRef.current.value = '';
        resize();
      }
    },
    getValue: () => inputRef.current?.value || '',
    setValue: (val: string) => {
      if (inputRef.current) {
        inputRef.current.value = val;
        resize();
      }
    },
  }));

  return (
    <div ref={chatRef} className="box">
      <textarea
        ref={inputRef}
        className={`textarea-input ${className}`}
        placeholder={placeholder}
        onInput={resize}
        rows={1}
        {...rest}
      />
    </div>
  );
});
