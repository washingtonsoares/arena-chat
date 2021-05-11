import { useContext } from 'react';
import { ChatContext } from './ChatContext';

export function useChatContext() {
  return useContext(ChatContext);
}
