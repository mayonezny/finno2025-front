import { AnimatePresence, cubicBezier, motion, type Variants } from 'framer-motion';
import {
  Bell,
  BotMessageSquare,
  ChartNetwork,
  ChevronRightSquare,
  LineChartIcon,
  NotepadText,
  Calendar,
} from 'lucide-react';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import './nav-bar.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { DatePicker, type DatePickerRef } from '@/shared/ui/date-picker';
import { useMediaQuery } from '@/utils/hooks/useMediaQuery';

const navigationRoutes = {
  home: '/',
  scenarioPage: 'scenario',
  aiChatbotPage: 'ai',
  paymentsPage: 'payments',
};

const ROWS = [
  { icon: LineChartIcon, label: 'Аналитика', url: navigationRoutes.home },
  {
    icon: ChartNetwork,
    label: 'Сценарная аналитика',
    url: navigationRoutes.scenarioPage,
  },
  {
    icon: BotMessageSquare,
    label: 'ИИ-ассистент',
    url: navigationRoutes.aiChatbotPage,
  },
  { icon: NotepadText, label: 'Платежи', url: navigationRoutes.paymentsPage },
  { icon: Calendar, label: 'Выбрать дату', url: navigationRoutes.home, last: true },
];

export const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const pickerRef = useRef<DatePickerRef>(null);

  const [isDPOpen, setDPOpen] = useState(false);
  const [dpInput, setdpInput] = useState('');

  const go = (path: string) => {
    navigate(path);
  };

  const easeOut = cubicBezier(0.16, 1, 0.3, 1);
  const easeIn = cubicBezier(0.4, 0, 0.2, 1);

  const dpVariants: Variants = {
    initial: { y: 24, opacity: 0, scale: 0.98 },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.22, ease: easeOut },
    },
    exit: {
      y: -24,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.18, ease: easeIn },
    },
  };

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
      <div className="NavBar__wr">
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
          {ROWS.map(({ icon: Icon, label, url, last }) => (
            <div
              className={last ? 'row last' : 'row'}
              key={label}
              onClick={last ? () => setDPOpen((prevState) => !prevState) : () => go(url)}
            >
              <Icon />
              <span className="row__label">{label}</span>
            </div>
          ))}
          <AnimatePresence initial={false} mode="popLayout">
            {isDPOpen && !isCollapsed && (
              <motion.div
                className="navbar-datepicker"
                variants={dpVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                layout
              >
                <DatePicker
                  ref={pickerRef}
                  value={null}
                  onChange={() => setdpInput(pickerRef.current!.value)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  ) : (
    <MobileNavBar />
  );
};

export const MobileNavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const pickerRef = useRef<DatePickerRef>(null);

  const [isDPOpen, setDPOpen] = useState(false);
  const [dpInput, setdpInput] = useState('');

  const [isCollapsed, setCollapsed] = useState(true);

  const easeOut = cubicBezier(0.16, 1, 0.3, 1);
  const easeIn = cubicBezier(0.4, 0, 0.2, 1);

  const dpVariants: Variants = {
    initial: { y: 24, opacity: 0, scale: 0.98 },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.22, ease: easeOut },
    },
    exit: {
      y: -24,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.18, ease: easeIn },
    },
  };

  const go = (path: string) => {
    navigate(path);
  };
  // (опционально) блочим скролл страницы, когда открыт drawer
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* верхняя мобильная плашка */}
      <div className="MobileNavBar">
        <ChevronRightSquare className="icon-btn" onClick={() => setOpen(true)} />
        {location.pathname === '/ai' ? (
          <h3>ИИ-ассистент</h3>
        ) : (
          <Link className="ai-chat-button" to={'/ai'}>
            Чат с ИИ-ассистентом
          </Link>
        )}
        <Bell className="icon" />
      </div>

      {/* full-screen drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="MobileDrawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* затемнение */}
            <motion.div
              className="MobileDrawer__backdrop"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* панель (вся ширина) */}
            <motion.aside
              className="MobileDrawer__panel NavBar NavBar--expanded" /* реюзаем стили рядов */
              role="dialog"
              aria-modal="true"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            >
              {/* верхний ряд с кнопкой закрытия */}
              <div className="NavBar__gr1">
                <div
                  className="row"
                  role="button"
                  aria-label="Закрыть меню"
                  onClick={() => setOpen(false)}
                >
                  <motion.span
                    style={{ display: 'inline-flex' }}
                    animate={{ rotate: 180 }} // смотрит влево как "назад"
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRightSquare />
                  </motion.span>
                  <span className="row__label">Закрыть меню</span>
                </div>
              </div>

              {/* пункты меню */}
              <div className="NavBar__gr2">
                {ROWS.map(({ icon: Icon, label, url, last }) => (
                  <div
                    className={last ? 'row last' : 'row'}
                    key={label}
                    onClick={
                      last
                        ? () => setDPOpen((prevState) => !prevState)
                        : () => {
                            setOpen(false);
                            go(url);
                          }
                    }
                  >
                    <Icon />
                    <span className="row__label">{label}</span>
                  </div>
                ))}
                <AnimatePresence initial={false} mode="popLayout">
                  {isDPOpen && (
                    <motion.div
                      className="navbar-datepicker"
                      variants={dpVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      layout
                    >
                      <DatePicker
                        ref={pickerRef}
                        value={null}
                        onChange={() => setdpInput(pickerRef.current!.value)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
  //
};
