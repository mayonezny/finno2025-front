import './InfoCard.scss';

export type infoCardType = 'positive' | 'neutral' | 'negative' | 'danger';

type Props = {
  name: string;
  type?: infoCardType;
};

export const InfoCard: React.FC<Props> = ({ name = 'Информация', type = 'neutral' }) => (
  <div className={`info-card ${type}-card h3`}>{name}</div>
);
