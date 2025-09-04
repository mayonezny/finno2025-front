import { configureStore, combineReducers } from '@reduxjs/toolkit';

import loaderReducer from './store/loader/loaderSlice';
import messagesReducer from './store/messages/messagesSlice';
import statsReducer from './store/stats/statsSlice';

// сюда импортируешь редьюсеры
// import todosReducer from './todos/slice';

export const rootReducer = combineReducers({
  messagesReducer,
  loaderReducer,
  statsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefault) => getDefault().concat(api.middleware), // если потом подключишь RTK Query
});

// типы для хуков
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
