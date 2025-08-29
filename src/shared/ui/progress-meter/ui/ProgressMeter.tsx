import React from 'react';

import type { ProgressMeterProps } from '../model/types';
import './ProgressMeter.scss';

export const ProgressMeter: React.FC<ProgressMeterProps> = ({
  value,
  max,
  unit = 'дней',
  criticalThreshold,
  goal,
  labels,
  height = 12,
  radius = 999,
  trackColor = 'var(--color-light-blue)',
}) => {
  const safeMax = Math.max(1, max);
  const clamped = Math.max(0, Math.min(value, safeMax));
  const ratio = clamped / safeMax;

  const barTone = ratio <= 0.25 ? 'red' : ratio <= 0.5 ? 'yellow' : 'green';

  const L = {
    critical: labels?.critical ?? 'Критично <',
    goal: labels?.goal ?? 'Цель ≥',
    maxShort: labels?.maxShort ?? 'макс.',
    of: labels?.of ?? 'из',
  };

  const trackStyle: React.CSSProperties = {
    height,
    borderRadius: radius,
    background: trackColor,
  };

  return (
    <div className="progress-meter">
      <div className="pm-wrapper">
        <div className="h1">
          <span>{clamped}</span>&nbsp;{unit}
        </div>
        <div className="body-regular">
          {L.of} {safeMax} {L.maxShort}
        </div>
      </div>

      <div className="pm-bar" style={trackStyle}>
        <div
          className={`pm-fill pm-fill--${barTone}`}
          style={{ width: `${ratio * 100}%`, borderRadius: radius }}
        />
      </div>

      {(criticalThreshold !== undefined || goal !== undefined) && (
        <div className="pm-wrapper">
          <div>
            {criticalThreshold !== undefined && (
              <span className="grey-caption">
                {L.critical} {criticalThreshold}
              </span>
            )}
          </div>
          <div>
            {goal !== undefined && (
              <span className="grey-caption">
                {L.goal} {goal}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
