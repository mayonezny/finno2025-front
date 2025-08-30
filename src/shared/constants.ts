const local: boolean = true;
const safeMode: boolean = false;
export const API_URL = local ? `${safeMode ? 'https' : 'http'}://192.168.0.23:8080/api` : 'unknown';

export const PROMPT_URL = 'rag/query';
