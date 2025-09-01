import { useMemo, useState } from 'react';

import { applyFilters, type FilterDef, type FiltersStateFromDefs } from './core';

export function useFilters<TData, Defs extends readonly FilterDef<TData, unknown>[]>(
  data: readonly TData[],
  defs: Defs,
) {
  type State = FiltersStateFromDefs<Defs>;

  const [state, setState] = useState<State>({} as State);

  const set = <K extends keyof State>(key: K, value: State[K]) =>
    setState((s) => {
      const base: Record<string, unknown> = { ...(s as Record<string, unknown>) };
      base[key as string] = value as unknown;
      return base as State;
    });

  const clearAll = () => setState({} as State);

  const filtered = useMemo(() => applyFilters<TData, Defs>(data, defs, state), [data, defs, state]);

  return { state, set, clearAll, filtered, defs };
}
