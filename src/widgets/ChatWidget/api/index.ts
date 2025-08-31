import { useEffect, useRef } from 'react';

import { addMessage } from '@/redux-rtk/store/messages';
import { askChatbot } from '@/redux-rtk/store/messages/messagesThunks';
import type { AutoTextareaHandle } from '@/shared/AutoTextarea';

import { useAppDispatch, useAppSelector } from '../../../redux-rtk/hooks';
import { showLoader, hideLoader } from '../../../redux-rtk/store/loader';

export const useChat = () => {
  const dispatch = useAppDispatch();
  const { isLoading, messages } = useAppSelector((state) => state.messagesReducer);
  const promptFieldRef = useRef<AutoTextareaHandle>(null);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        dispatch(showLoader());
      }, 500);
    } else {
      dispatch(hideLoader());
    }
  }, [dispatch, isLoading]);

  const submitHandler = () => {
    dispatch(
      addMessage({
        message: {
          id: messages.length,
          message: promptFieldRef.current!.getValue(),
          chatbotAnswer: false,
        },
      }),
    );
    dispatch(askChatbot({ question: promptFieldRef.current!.getValue() }));
    promptFieldRef.current?.clear();
  };

  return {
    submitHandler,
    promptFieldRef,
  };
};
