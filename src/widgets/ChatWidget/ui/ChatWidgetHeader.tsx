import './chat-widget.scss';
import { Bell, SquareChevronRight } from 'lucide-react';

export const ChatWidgetHeader: React.FC = () => (
  <div className="chatwidget-header">
    <SquareChevronRight className="r" size={32} />
    <h3>ИИ-ассистент</h3>
    <Bell className="r" size={32} />
  </div>
);
