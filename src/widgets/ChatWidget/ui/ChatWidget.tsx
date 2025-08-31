import { animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { useAppSelector } from '@/redux/hooks';
import type { Message } from '@/redux/store/messages/types';
import { LocalLoader } from '@/shared/LocalLoader';
import { InfoCard } from '@/shared/ui/info-card';
import { PromptBar } from '@/shared/ui/prompt-bar';
import { TextBubble } from '@/shared/ui/text-bubble';
import './chat-widget.scss';
import { useMediaQuery } from '@/utils/hooks/useMediaQuery';

export const ChatWidget: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 1001px)');
  const { isLoaderActive } = useAppSelector((state) => state.loaderReducer);
  const { messages, info } = useAppSelector((state) => state.messagesReducer);
  const boxRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (boxRef.current) {
      scrollWithFramer(boxRef.current);
    }
  };

  const scrollWithFramer = (el: HTMLElement, duration = 2) => {
    animate(el.scrollTop, el.scrollHeight, {
      duration, // сек
      ease: 'easeOut',
      onUpdate: (v) => {
        el.scrollTop = v;
      },
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [isLoaderActive, messages]);

  return (
    <div className="chat-widget">
      {isDesktop && <h2 className="desktop-header">ИИ-ассистент</h2>}
      <div className="chat-row" ref={boxRef}>
        {messages.map((msg: Message) => (
          <TextBubble key={msg.id} chatbotAnswer={msg.chatbotAnswer} message={msg.message} />
        ))}
        {isLoaderActive ? <LocalLoader className="loader" /> : null}
        {info && <InfoCard name={'Ошибка соединения'} type="negative" />}
      </div>

      <PromptBar />
    </div>
  );
};
