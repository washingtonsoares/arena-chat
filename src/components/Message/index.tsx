import { ChatMessage } from '@arena-im/chat-types';
import { useMemo, useState } from 'react';
import { ReactComponent as HeartIcon } from '../../assets/heart.svg';
import { ReactComponent as HeartActiveIcon } from '../../assets/heart-active.svg';

import {
  MessageWrapper,
  MessageText,
  MessageAvatar,
  MessageAvatarWrapper,
  MessageContainer,
  MessageSender,
  ReactionIcon,
} from "./styled";

type Props = {
  message: any;
  isOwner: boolean;
  onAddReaction: (message: ChatMessage) => void;
  onDeleteReaction: (message: ChatMessage) => void;
}

function Message({ message, isOwner, onAddReaction, onDeleteReaction }: Props) {
  const currentUserReacted = useMemo(() => {
    if (message.currentUserReactions) {
      return message.currentUserReactions['love'];
    } else return false;
  }, [message]);

  const [userHasReacted, setUserHasReacted] = useState(currentUserReacted);

  const handleReaction = () => {
    if (userHasReacted) {
      onDeleteReaction(message);
      setUserHasReacted(false);
    } else {
      onAddReaction(message);
      setUserHasReacted(true);
    }
  }

  return (
    <MessageWrapper isOwner={isOwner}>
      <MessageAvatarWrapper>
        <MessageAvatar src={message.sender?.photoURL} />
      </MessageAvatarWrapper>
      <MessageContainer>
        <ReactionIcon
          isReacted={userHasReacted}
          onClick={handleReaction}
        >
          {userHasReacted ? <HeartActiveIcon /> : <HeartIcon /> }
        </ReactionIcon>
        <MessageSender>
          {message.sender?.displayName}
        </MessageSender>
        <MessageText>
          {message.message?.text}
        </MessageText>
      </MessageContainer>
    </MessageWrapper>
  );
}

export default Message;
