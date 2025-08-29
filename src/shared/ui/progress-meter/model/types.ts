export type ProgressMeterProps = {
  value: number;
  max: number;

  unit?: string;

  criticalThreshold?: number;
  goal?: number;

  labels?: {
    critical?: string;
    goal?: string;
    maxShort?: string;
    of?: string;
  };

  height?: number;
  radius?: number;
  trackColor?: string;
};
