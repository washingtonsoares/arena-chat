import React, { useState } from "react";
import ChatFeed from "./components/ChatFeed";
import { Form, InputMessage } from "./styled";
import Loader from "./components/Loader";
import useArenaChat from "hooks/useArenaChat";

function ChatWidget() {
  const { isLoadingMessages, activeChannel } = useArenaChat();

  const [inputValue, setInputValue] = useState("");

  const handleNewMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    activeChannel?.sendMessage({ text: inputValue });
    setInputValue("");
  };

  return (
    <>
      {isLoadingMessages ? <Loader /> : <ChatFeed />}
      <Form onSubmit={(e) => handleNewMessage(e)}>
        <InputMessage
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          value={inputValue}
          autoFocus
        />
      </Form>
    </>
  );
}

export default ChatWidget;
