import React from 'react';

import { fetchScenario } from '@/entities/scenario/scenario.api';
import type { ScenarioData, ScenarioKey } from '@/entities/scenario/types';
import { LocalLoader } from '@/shared/LocalLoader';
import { AnalyticsLineChart } from '@/shared/ui/analytics-line-chart';
import { BarChart } from '@/shared/ui/bar-chart';
import type { BarDatum } from '@/shared/ui/bar-chart';
import { ButtonSelector, type ButtonSelectorOption } from '@/shared/ui/button-selector';
import { DetailCard } from '@/shared/ui/detail-card';
import { InfoCard } from '@/shared/ui/info-card';
import type { infoCardType } from '@/shared/ui/info-card';
import { useMediaQuery } from '@/utils/hooks/useMediaQuery';
import { ChatWidget } from '@/widgets/ChatWidget';
import { KpiStats } from '@/widgets/kpi-stats';
import type { Metric as KpiMetric } from '@/widgets/kpi-stats';
import { WidgetCard } from '@/widgets/widget-card';

import './scenario-page.scss';
import { useNavigate } from 'react-router';

const SCENARIO_OPTIONS: (isMobile: boolean) => ButtonSelectorOption[] = (isMobile) => [
  { value: 'pess', label: isMobile ? 'Пессимист.' : 'Пессимистичный' },
  { value: 'base', label: 'Стандартный' },
  { value: 'opt', label: isMobile ? 'Оптимист.' : 'Оптимистичный' },
];

const netProfitQuestion = 'Расскажи подробнее о том как была высчитана чистая прибыль';

function colorByChange(changeLabel: string): string {
  const clean = changeLabel.trim();
  if (clean.startsWith('+')) {
    return 'var(--color-dark-green)';
  }
  if (clean.startsWith('-')) {
    return 'var(--color-dark-red)';
  }
  return '#888888';
}

function toBarData(src: ScenarioData['netProfitBars']): BarDatum[] {
  return Array.isArray(src) ? src : [];
}

export const ScenarioPage: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 1149px)');
  const navigate = useNavigate();

  const [scenarioKey, setScenarioKey] = React.useState<ScenarioKey>('base');

  const [loading, setLoading] = React.useState<boolean>(false);

  const [kpis, setKpis] = React.useState<KpiMetric[]>([]);
  const [ebitdaPercent, setEbitdaPercent] = React.useState<number>(0);
  const [ebitdaSeries, setEbitdaSeries] = React.useState<Record<string, number>>({});
  const [ocfBadge, setOcfBadge] = React.useState<string>('OCF/EBITDA: —');
  const [ebitdaDetail, setEbitdaDetail] = React.useState<{
    title: string;
    amount: string;
    details: string;
  }>({
    title: '—',
    amount: '—',
    details: '—',
  });

  const [netProfitChange, setNetProfitChange] = React.useState<string>('0% (0)');
  const [netProfitBars, setNetProfitBars] = React.useState<BarDatum[]>([]);
  const [netProfitDetail, setNetProfitDetail] = React.useState<{
    title: string;
    amount: string;
    details: string;
  }>({
    title: '—',
    amount: '—',
    details: '—',
  });

  React.useEffect(() => {
    void loadScenario(scenarioKey);
  }, []);

  async function loadScenario(key: ScenarioKey) {
    setLoading(true);
    try {
      const s = await fetchScenario(key);

      setKpis(s.kpis);

      setEbitdaPercent(s.ebitdaPercent);
      setEbitdaSeries(s.ebitdaSeries);
      setOcfBadge(s.ocfToEbitdaBadge);
      setEbitdaDetail(s.ebitdaDetail);

      setNetProfitChange(s.netProfitChange);
      setNetProfitBars(toBarData(s.netProfitBars));
      setNetProfitDetail(s.netProfitDetail);
    } finally {
      setLoading(false);
    }
  }

  const handleScenarioChange = (selectedValue: string) => {
    const key = (['pess', 'base', 'opt'] as const).includes(selectedValue as ScenarioKey)
      ? (selectedValue as ScenarioKey)
      : 'base';

    setScenarioKey(key);
    void loadScenario(key);
  };

  const AiQuestionHandler = (text: string) => {
    if (isMobile) {
      navigate('/ai');
    }
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('.prompt-bar__input');
      const button = document.querySelector<HTMLButtonElement>('.submit-button');

      if (!input || !button) {
        console.warn('Не найден input или submit-button');
        return;
      }

      input.value = text;
      input.dispatchEvent(new Event('input', { bubbles: true }));

      // клик без сабмита
      setTimeout(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      }, 100);

      button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    }, 100);
  };

  return (
    <div className="ScenarioPage">
      {!isMobile && <ChatWidget />}

      <div className="ScenarioPage__wrapper">
        <ButtonSelector
          options={SCENARIO_OPTIONS(isMobile)}
          value={scenarioKey}
          onChange={handleScenarioChange}
          size={'m'}
          aria-label="Выбор сценария"
        />

        <div className="ScenarioPage__widgets">
          {/* KPI блок */}
          {loading ? (
            <WidgetCard className="kpis">
              <LocalLoader className="local-loader" />
            </WidgetCard>
          ) : (
            <KpiStats layout="vertical" metrics={kpis} />
          )}

          {/* EBITDA Margin */}
          <WidgetCard
            className="ebitdaMargin"
            title="EBITDA Margin"
            hint={<InfoCard name={ocfBadge} type={'neutral' as infoCardType} />}
            footer={<DetailCard data={ebitdaDetail} defaultOpen preventClose />}
          >
            {loading ? (
              <LocalLoader className="local-loader" />
            ) : (
              <>
                <div className="h1" style={{ marginBottom: 8 }}>
                  {ebitdaPercent.toFixed(1)}%
                </div>
                <AnalyticsLineChart
                  data={ebitdaSeries}
                  unit="%"
                  color="red"
                  secondaryTitle="EBITDA:"
                />
              </>
            )}
          </WidgetCard>

          {/* Чистая прибыль */}
          <WidgetCard
            title="Чистая прибыль"
            className="netProfit"
            hint={
              <InfoCard
                name="Спросить у нейросети"
                type="neutral"
                clickable
                onClick={() => AiQuestionHandler(netProfitQuestion)}
              />
            }
            footer={<DetailCard data={netProfitDetail} defaultOpen preventClose />}
          >
            {loading ? (
              <LocalLoader className="local-loader" />
            ) : (
              <>
                <div className="h1" style={{ color: colorByChange(netProfitChange) }}>
                  {netProfitChange}
                </div>

                <BarChart
                  data={netProfitBars}
                  colorMode="single"
                  baseColor={'#f87171'}
                  maxHeight={96}
                  sensivity={20}
                />
              </>
            )}
          </WidgetCard>
        </div>
      </div>
    </div>
  );
};
