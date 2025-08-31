export type ProgressMeterProps = {
  value: number;
  max: number;

  unit?: string;

  criticalThreshold?: number;
  goal?: number;

  height?: number;
  radius: number;
  trackColor?: string;

  labels?: {
    critical?: string;
    goal?: string;
    maxShort?: string;
    of?: string;
  };
};
