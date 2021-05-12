import React, { createContext, useCallback, useEffect, useState } from "react";
import { ExternalUser } from "@arena-im/chat-types";
import ArenaChat from "@arena-im/chat-sdk";
import { Channel } from "@arena-im/chat-sdk/dist/channel/channel";
import { ChatMessage, MessageReaction, QnaQuestion, BaseQna } from "@arena-im/chat-types";
import { CHAT_SLUG, DEFAULT_USER, SITE_SLUG } from "../chat-config";
import { ChatContextValues } from "./types";

type Props = {
  children: React.ReactNode;
};

export const ChatContext = createContext({} as ChatContextValues);

function ChatContextProvider({ children }: Props) {
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [qnaInstance, setQnaInstance] = useState<BaseQna | null>(null);
  const [questions, setQuestions] = useState<QnaQuestion[]>([]);
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

    if (qnaInstance) {
      qnaInstance.onQuestionReceived((question) => {
        console.log(question);

        setQuestions((previous) => (previous ? [question, ...previous] : [question]));
      });

      qnaInstance.onQuestionModified((question) => {
        setQuestions(
          (previous) => previous?.map((item) => (item.key === question.key ? { ...question } : { ...item })) ?? [],
        );
      });

      qnaInstance.onQuestionDeleted((question) => {
        setQuestions((previous) => previous?.filter((item) => item.key !== question.key) ?? []);
      });
    }
  }, [activeChannel, qnaInstance]);

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
      console.log(previousMesages);

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

  const handleLoadQuestions = useCallback(async () => {
    if (activeChannel) {
      try {
        const qnaI = await activeChannel.getChatQnaInstance();
        const questionsList = await qnaI.loadQuestions();

        setQnaInstance(qnaI);
        setQuestions(questionsList);
      } catch (err) {
        setQnaInstance(null);
        setQuestions([]);
      }
    }
  }, [activeChannel]);

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
    handleLoadQuestions();
  }, [handleLoadQuestions]);

  useEffect(() => {
    if (user) {
      // load previous messages only if there is a user
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
      handleDeleteReaction,
      questions
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatContextProvider;
