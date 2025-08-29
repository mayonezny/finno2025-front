import { TextBubble, type TextBubbleDto } from '@/shared/text-bubble';

import './chat-widget.scss';
import '@/shared/text-bubble';
import { ChatWidgetHeader } from './ChatWidgetHeader';

const demoChat: TextBubbleDto[] = [
  { id: 0, message: 'Здарова! Хочу услышать твой прогноз по рентабельности пирожков на 2026 год.' },
  {
    id: 1,
    chatbotAnswer: true,
    message:
      'Здарова щегол! Пирожки процветают, ожидаю увеличение рентабельности аж на 10%!\nВерно. Кредит или фонд решат локальную задачу, а pre-IPO решает стратегическую: повышает капитализацию, делает компанию привлекательной для крупных инвесторов и даёт ресурс не только для склада в Клину, но и для следующего десятка складов — уже без постоянных поисков денег.',
  },
  { id: 2, message: 'Почему у меня вырос показатель CCC на 12 дней?' },
  {
    id: 3,
    chatbotAnswer: true,
    message:
      'Рост связан с увеличением среднего срока оборачиваемости запасов. Клиенты стали дольше оплачивать счета, а поставщики остались на тех же условиях.\nЭто ухудшает краткосрочную ликвидность: свободные деньги растут медленнее, чем обязательства. Советую пересмотреть условия оплаты с поставщиками или ускорить инкассацию.',
  },
];

export const ChatWidget: React.FC = () => (
  <>
    <ChatWidgetHeader />
    <div className="chat-row">
      {demoChat.map((msg) => (
        <TextBubble
          id={msg.id}
          key={msg.id}
          chatbotAnswer={msg.chatbotAnswer}
          message={msg.message}
        />
      ))}
    </div>
  </>
);
