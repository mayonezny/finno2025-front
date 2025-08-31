import { Dropdown } from '@/shared/ui/dropdown';
import type { DropdownItem } from '@/shared/ui/dropdown/model/types';
import { Input } from '@/shared/ui/input';
import './scenario-page.scss';
import { SearchBar } from '@/shared/ui/search-bar';
import { ButtonSelector, type ButtonSelectorOption } from '@/shared/ui/button-selector';

const options: ButtonSelectorOption[] = [
  { value: 'pess', label: 'Пессимистичный' },
  { value: 'base', label: 'Стандартный' },
  { value: 'opt', label: 'Оптимистичный' },
];

export const ScenarioPage: React.FC = () => (
  <div style={{ maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <ButtonSelector
      options={options}
      defaultValue="pess"
      onChange={(v) => console.log('Неконтролируемый:', v)}
    />

    {/* 2. Контролируемый */}
    <ButtonSelector options={options} />
    <div>Выбран</div>

    {/* 3. Маленькая высота (30px) */}
    <ButtonSelector options={options} defaultValue="opt" size="s" />

    {/* 4. Disabled весь контрол */}
    <ButtonSelector options={options} value="base" disabled />

    {/* 5. Disabled конкретная опция */}
    <ButtonSelector
      options={[
        { value: '1', label: 'Первый' },
        { value: '2', label: 'Второй', disabled: true },
        { value: '3', label: 'Третий' },
      ]}
      defaultValue="3"
    />

    {/* 6. Много пунктов (равномерное распределение) */}
    <ButtonSelector
      options={[
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
        { value: 'c', label: 'C' },
        { value: 'd', label: 'D' },
        { value: 'e', label: 'E' },
      ]}
      defaultValue="c"
      size="m"
    />

    {/* 7. onChange только лог */}
    <ButtonSelector
      options={[
        { value: 'x', label: 'Х' },
        { value: 'y', label: 'Y' },
      ]}
      onChange={(v) => alert(`Выбрано: ${v}`)}
    />
  </div>
);
