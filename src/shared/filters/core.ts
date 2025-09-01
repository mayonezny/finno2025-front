export type Option<V> = { label: string; value: V };

export type FilterDef<TData, V> = {
  key: string;
  label: string;
  options: ReadonlyArray<Option<V>>;
  predicate: (item: TData, value: V) => boolean;
  allValue?: V;
};

type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type DefToState<D> = D extends { key: infer K; options: ReadonlyArray<Option<infer V>> }
  ? K extends string
    ? { [P in K]?: V }
    : never
  : never;

export type FiltersStateFromDefs<Defs extends readonly unknown[]> = UnionToIntersection<
  DefToState<Defs[number]>
>;

export function applyFilters<TData, Defs extends readonly FilterDef<TData, unknown>[]>(
  data: readonly TData[],
  defs: Defs,
  state: FiltersStateFromDefs<Defs>,
): TData[] {
  let out = data as TData[];

  for (const def of defs) {
    const key = def.key as string;
    const raw = (state as Record<string, unknown>)[key];

    const hasAll = Object.prototype.hasOwnProperty.call(def, 'allValue');
    const allVal = (def as { allValue?: unknown }).allValue;

    if (raw === undefined || (hasAll && raw === allVal)) {
      continue;
    }

    out = out.filter((item) => def.predicate(item, raw as never));
  }
  return out;
}
