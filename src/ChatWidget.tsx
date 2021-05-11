import React, { useState } from "react";
import ChatFeed from "./components/ChatFeed";
import { Form, InputMessage } from "./styled";
import Loader from "./components/Loader";
import { useChatContext } from "state/useChatContext";

function ChatWidget() {
  const { isLoadingMessages, activeChannel } = useChatContext();

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
