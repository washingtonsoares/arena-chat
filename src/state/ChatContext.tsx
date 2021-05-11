import React, { createContext, useCallback, useEffect, useState } from "react";
import { ExternalUser } from "@arena-im/chat-types";
import ArenaChat from "@arena-im/chat-sdk";
import { Channel } from "@arena-im/chat-sdk/dist/channel/channel";
import { ChatMessage, MessageReaction } from "@arena-im/chat-types";
import { CHAT_SLUG, DEFAULT_USER, SITE_SLUG } from "../chat-config";

type ChatContextValues = {
  user: ExternalUser | null | undefined;
  messages: ChatMessage[];
  isLoadingMessages: boolean;
  activeChannel: Channel | null;
  handleAddReaction: (message: ChatMessage) => void;
  handleDeleteReaction: (message: ChatMessage) => void;
};

type Props = {
  children: React.ReactNode;
};

export const ChatContext = createContext({} as ChatContextValues);

function ChatContextProvider({ children }: Props) {
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInstance, setChatInstance] = useState<ArenaChat>();
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [user, setUser] = useState<ExternalUser | null>();

  const initChat = useCallback(async () => {
    const arenaChat = new ArenaChat(SITE_SLUG);
    const liveChat = await arenaChat.getLiveChat(CHAT_SLUG);
    const channel = liveChat.getMainChannel();

    setChatInstance(arenaChat);
    setActiveChannel(channel);
  }, []);

  const initListeners = useCallback(async () => {
    if (activeChannel) {
      activeChannel?.onMessageReceived((message) => {
        setMessages((previousMessages) => [...previousMessages, message]);
      });
    }
  }, [activeChannel]);

  const initUser = useCallback(async () => {
    try {
      await chatInstance?.setUser(DEFAULT_USER);
      setUser(chatInstance?.user);
    } catch (e) {
      console.log('Unable to initialize user');
    }
  }, [chatInstance]);

  const loadPreviousMessages = useCallback(async () => {
    setIsLoadingMessages(true);
    try {
      const previousMesages = await activeChannel?.loadRecentMessages(20);

      setMessages(previousMesages ?? []);
      setIsLoadingMessages(false);
    } catch (e) {
      console.error("An error has ocurred");
    } finally {
      setIsLoadingMessages(false);
    }
  }, [activeChannel]);

  const handleAddReaction = (message: ChatMessage) => {
    const reactionType = 'love';

    const reaction: MessageReaction = {
      type: reactionType, // TODO: Tipar o type
      messageID: message.key ?? '', // TODO: Type 'string | undefined' is not assignable to type 'string'
    };

    activeChannel?.sendReaction(reaction);
  }

  const handleDeleteReaction = (message: ChatMessage) => {
    const reactionType = 'love';

    const reaction: MessageReaction = {
      type: reactionType,
      messageID: message.key ?? '',
    };

    activeChannel?.deleteReaction(reaction);
  }

  useEffect(() => {
    initChat();
  }, [initChat]);

  useEffect(() => {
    initUser();
  }, [initUser]);

  useEffect(() => {
    initListeners();
  }, [initListeners]);

  useEffect(() => {
    if (user && activeChannel) {
      loadPreviousMessages();
    }
  }, [user, activeChannel, loadPreviousMessages]);

  return (
    <ChatContext.Provider value={{
      user,
      messages,
      isLoadingMessages,
      activeChannel,
      handleAddReaction,
      handleDeleteReaction
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatContextProvider;
