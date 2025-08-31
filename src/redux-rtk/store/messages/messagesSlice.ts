import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { askChatbot } from './messagesThunks';
import type { Message, MessagesState, QueryResponse } from './types';

const initialState: MessagesState = {
  isError: false,
  isLoading: false,
  isUpdated: false,
  info: null,
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ message: Message }>) => {
      const newMsg: Message = {
        id: state.messages.length,
        message: action.payload.message.message,
        chatbotAnswer: action.payload.message.chatbotAnswer,
      };
      state.messages.push(newMsg);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(askChatbot.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.info = null;
      })
      .addCase(askChatbot.fulfilled, (state, action: PayloadAction<QueryResponse>) => {
        state.isLoading = false;
        state.isError = false;
        const newMsg: Message = {
          id: state.messages.length,
          message: action.payload.answer,
          chatbotAnswer: true,
        };
        state.messages.push(newMsg);
      })
      .addCase(askChatbot.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.info = action.payload?.message || 'ошибка при вычислении ошибки лмао';
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
