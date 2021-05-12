import { ExternalUser } from "@arena-im/chat-types";
import { Channel } from "@arena-im/chat-sdk/dist/channel/channel";
import { ChatMessage, QnaQuestion, } from "@arena-im/chat-types";

export type ChatContextValues = {
  user: ExternalUser | null | undefined;
  messages: ChatMessage[];
  isLoadingMessages: boolean;
  activeChannel: Channel | null;
  handleAddReaction: (message: ChatMessage) => void;
  handleDeleteReaction: (message: ChatMessage) => void;
  questions: QnaQuestion[] | null;
};
