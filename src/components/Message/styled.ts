import styled from "styled-components";

type MessageWrapperProps = {
  isOwner: boolean;
}

type HeartIconProps = {
  isReacted: boolean;
}

export const MessageWrapper = styled.div<MessageWrapperProps>`
  padding: 10px;
  display: flex;

  justify-content: ${({ isOwner }) => isOwner ? 'flex-end' : 'flex-start'};
`;

export const MessageAvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-right: 15px;
`;

export const MessageAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const ReactionIcon = styled.div<HeartIconProps>`
  height: 25px;
  width: 25px;
  background-color: red;
  position: absolute;
  left: 5px;
  bottom: -20px;
  display: ${({ isReacted }) => isReacted ? 'block' : 'none'};
  cursor: pointer;
  background-color: #efedee;
  border: 3px solid #FFF;
  border-radius: 50%;
  padding: 3px;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  position: relative;

  &:hover {
    ${ReactionIcon} {
      display: block;
    }
  }
`;

export const MessageSender = styled.span`
  color: #979797;
  padding-left: 5px;
  margin-bottom: 5px;
`;

export const MessageText = styled.span`
  background: #efedee;
  border-radius: 15px;
  font-size: 14px;
  line-height: 16px;
  color: #3c4047;
  max-width: 270px;
  padding: 8px;
`;
