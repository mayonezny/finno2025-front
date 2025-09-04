import { useSelector } from 'react-redux';

import './debug-page.scss';
import type { RootState } from '@/redux-rtk';

export const DebugPage: React.FC = () => {
  const reports = useSelector((s: RootState) => s.statsReducer.stats);
  return (
    <div>
      <h1>Отчёты</h1>
      <pre>{JSON.stringify(reports, null, 2)}</pre>
    </div>
  );
};
