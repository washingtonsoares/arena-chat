import useArenaChat from 'hooks/useArenaChat';
import Message from '../Message';
import { ChatFeedWrapper } from './styled';

function ChatFeed() {
  const {
    user,
    handleAddReaction,
    handleDeleteReaction,
    messages
  } = useArenaChat();

  return (
    <ChatFeedWrapper>
      {messages.map((message: any) => {
        const isOwner = user?.id === message.sender?.uid;

        return !message.type ? (
          <Message
            key={message.key}
            message={message}
            isOwner={isOwner}
            onAddReaction={handleAddReaction}
            onDeleteReaction={handleDeleteReaction}
          />
        ) : null;
      })}
    </ChatFeedWrapper>
  )
}

export default ChatFeed;
