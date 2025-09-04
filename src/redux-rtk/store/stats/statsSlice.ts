import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { august } from '@/entities/jsonSkeleton';
import type { WeeklyDataset, WeeklyReport } from '@/entities/jsonSkeleton/model/types';

import { loadReports, saveReports } from './model';
import type { statsState } from './types';

const initialState: statsState = {
  stats: loadReports<WeeklyDataset>(august),
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    addReport(state: statsState, action: PayloadAction<{ report: WeeklyReport }>) {
      state.stats.push(action.payload.report);
    },
    setDataset(state, action: PayloadAction<{ stats: WeeklyDataset }>) {
      state.stats = action.payload.stats;
      saveReports(action.payload.stats); // сохраняем в localStorage
    },
  },
});

export const { addReport, setDataset } = statsSlice.actions;

export default statsSlice.reducer;
