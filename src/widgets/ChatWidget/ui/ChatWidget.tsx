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

import { ChatWidgetHeader } from './ChatWidgetHeader';

// const demoChat: Message[] = [
//   {
//     id: 0,
//     message: 'Здарова! Хочу услышать твой прогноз по рентабельности пирожков на 2026 год.',
//     chatbotAnswer: false,
//   },
//   {
//     id: 1,
//     chatbotAnswer: true,
//     message:
//       'Здарова щегол! Пирожки процветают, ожидаю увеличение рентабельности аж на 10%!\nВерно. Кредит или фонд решат локальную задачу, а pre-IPO решает стратегическую: повышает капитализацию, делает компанию привлекательной для крупных инвесторов и даёт ресурс не только для склада в Клину, но и для следующего десятка складов — уже без постоянных поисков денег.',
//   },
//   { id: 2, message: 'Почему у меня вырос показатель CCC на 12 дней?' },
//   {
//     id: 3,
//     chatbotAnswer: true,
//     message:
//       'Рост связан с увеличением среднего срока оборачиваемости запасов. Клиенты стали дольше оплачивать счета, а поставщики остались на тех же условиях.\nЭто ухудшает краткосрочную ликвидность: свободные деньги растут медленнее, чем обязательства. Советую пересмотреть условия оплаты с поставщиками или ускорить инкассацию.',
//   },
//];

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
      {isDesktop && <div className="h2 desktop-header">ИИ-ассистент</div>}
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
