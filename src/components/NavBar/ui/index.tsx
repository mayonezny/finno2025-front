import { motion } from 'framer-motion';
import {
  Bell,
  BotMessageSquare,
  ChartNetwork,
  ChevronRightSquare,
  LineChartIcon,
  NotepadText,
} from 'lucide-react';
import React, { useState, useMemo } from 'react';

import './nav-bar.scss';
import { NavLinkButton } from '@/shared/ui/nav-link-button';
import { useMediaQuery } from '@/utils/hooks/useMediaQuery';

const ROWS = [
  { icon: LineChartIcon, label: 'Аналитика' },
  { icon: ChartNetwork, label: 'Сценарная аналитика' },
  { icon: BotMessageSquare, label: 'ИИ-ассистент' },
  { icon: NotepadText, label: 'Платежи' },
];

export const NavBar: React.FC = () => {
  const [isCollapsed, setCollapsed] = useState(true);
  const isMobile = useMediaQuery('(max-width: 1000px)');

  const cls = useMemo(
    () => `NavBar ${isCollapsed ? 'NavBar--collapsed' : 'NavBar--expanded'}`,
    [isCollapsed],
  );

  return !isMobile ? (
    <motion.aside
      className={cls}
      /* ширина и лёгкий слайд — приятнее */
      initial={{ x: -16, opacity: 0, width: 64 }}
      animate={{
        x: 0,
        opacity: 1,
        width: isCollapsed ? 64 : 288,
      }}
      transition={{
        type: 'spring',
        stiffness: 320,
        damping: 28,
      }}
    >
      {/* Верхняя кнопка */}
      <div className="NavBar__gr1">
        <div
          className="row"
          role="button"
          aria-label="Переключить боковую панель"
          onClick={() => setCollapsed((v) => !v)}
        >
          <motion.span
            style={{ display: 'inline-flex' }}
            animate={{ rotate: isCollapsed ? 0 : 180 }}
            transition={{ type: 'tween', duration: 0.2 }}
          >
            <ChevronRightSquare />
          </motion.span>

          <span className="row__label">Закрыть боковую панель</span>
        </div>
      </div>

      {/* Нижние пункты — фиксированная высота строк, без прыжков */}
      <div className="NavBar__gr2">
        {ROWS.map(({ icon: Icon, label }) => (
          <div className="row" key={label}>
            <Icon />
            <span className="row__label">{label}</span>
          </div>
        ))}
      </div>
    </motion.aside>
  ) : (
    <MobileNavBar />
  );
};

export const MobileNavBar = () => (
  <div className="MobileNavBar">
    <ChevronRightSquare />
    <button className="ai-chat-button">Чат с ИИ-ассистентом</button>
    <Bell />
  </div>
);
