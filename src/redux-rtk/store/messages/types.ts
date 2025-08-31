export interface Message {
  id: number;
  message: string;
  chatbotAnswer: boolean;
}

export interface MessagesState {
  isError: boolean;
  isLoading: boolean;
  isUpdated: boolean;
  info: string | null;
  messages: Message[];
}

export interface QueryRequest {
  question: string;
}

export interface QueryResponse {
  hits: number;
  context: string;
  answer: string;
}

export interface QueryError {
  message: string;
}
