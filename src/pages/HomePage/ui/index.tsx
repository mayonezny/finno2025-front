import { useState } from 'react';

import { CashflowTreemap } from '@/widgets/cashflow-treemap';

const treemap_data = [
  { id: 'sber-1', title: 'Сбербанк', value: 4_200_000 },
  { id: 'sber-2', title: 'Сбербанк', value: 2_200_000 },
  { id: 'sber-3', title: 'Сбербанк', value: 800_000 },
  { id: 'sber-4', title: 'Сбербанк', value: 800_000 },
  { id: 'sber-5', title: 'Сбербанк', value: 200_000 },
  { id: 'sber-6', title: 'Сбербанк', value: 200_000 },
];

export const HomePage = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" />
        <a href="https://react.dev" target="_blank" />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <CashflowTreemap
        title="Карта денежных потоков"
        infoCardType="negative"
        infoCardText="HHI: 0.35"
        data={treemap_data}
        onTileClick={(item) => {
          console.log('tile clicked', item);
        }}
      />
    </>
  );
};
