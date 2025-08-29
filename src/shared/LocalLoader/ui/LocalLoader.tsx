import { motion, easeInOut } from 'framer-motion';
import React from 'react';

type Props = {
  /** Порядок цветов для анимации (минимум 2) */
  colors?: string[]; // по умолчанию: серые оттенки
  /** px — диаметр точки */
  size?: number; // по умолчанию 8
  /** px — высота прыжка */
  jumpPx?: number; // по умолчанию 6
  /** мс — длительность полного цикла одной точки */
  speedMs?: number; // по умолчанию 900
  /** количество точек */
  count?: number; // по умолчанию 3
  className?: string;
};

export const LocalLoader: React.FC<Props> = ({
  colors = ['#cdd3db', '#aeb6c1', '#8e97a3'],
  size = 8,
  jumpPx = 3,
  speedMs = 1000,
  count = 3,
  className = '',
}) => {
  // подготавливаем ключевые кадры цветов: [c1, c2, c1]
  const colorFrames = (palette: string[]) => {
    const c1 = palette[0];
    const c2 = palette[1] ?? c1;
    return [c1, c2, c1]; // смена цвета в верхней фазе
  };

  const duration = speedMs / 1000;

  return (
    <div
      className={className}
      style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: size }}
      role="status"
      aria-label="печатает…"
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          animate={{
            y: [0, -jumpPx, 0],
            opacity: [0.5, 1, 0.5],
            backgroundColor: colorFrames(colors), // цвет меняется в пике
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: easeInOut,
            // синхронизируем фазы так, чтобы точки шли волной
            delay: (i * duration) / count,
            // чтобы ключевые кадры совпадали по времени
            times: [0, 0.5, 1],
          }}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: colors[0],
            display: 'inline-block',
          }}
        />
      ))}
    </div>
  );
};
