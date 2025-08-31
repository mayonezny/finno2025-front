import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';

import { api } from '@/shared/axios.config';
import { PROMPT_URL } from '@/shared/constants';

import type { QueryError, QueryRequest, QueryResponse } from './types';

export const askChatbot = createAsyncThunk<
  QueryResponse,
  QueryRequest,
  { rejectValue: QueryError }
>('rag/query', async ({ question }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<QueryResponse> = await api.post(PROMPT_URL, {
      question,
    });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue({
      message: error?.response?.data?.message || error.message,
    });
  }
});
