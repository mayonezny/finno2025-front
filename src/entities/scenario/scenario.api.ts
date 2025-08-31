import { SCENARIOS } from './scenarios.data';
import type { ScenarioKey, ScenarioData } from './types';

const DELAY_MS = 520; // ~полсекунды

export async function fetchScenario(key: ScenarioKey): Promise<ScenarioData> {
  await new Promise((r) => setTimeout(r, DELAY_MS));
  return SCENARIOS[key];
}
