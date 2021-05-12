import styled from "styled-components";

export const Container = styled.div`
  padding: 15px;
`;

export const QuestionItem = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid #E3E4EB;
  }
  margin-bottom: 20px;
  padding-bottom: 10px;
`;

export const ProfileArea = styled.div`
  display: flex;
  align-items: center;
`;

export const SenderInfo = styled.div`
  color: #707495;
`;

export const SenderInfoName = styled.small`
  font-size: 14px;
`;

export const SenderInfoCreatedAt = styled.small``;

export const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 15px;
`;

export const QuestionArea = styled.div`
  padding-left: 47px;
`;

export const QuestionAreaTag = styled.div``;

export const QuestionAreaText = styled.strong``;

export const QuestionAreaAnswer = styled.div``;
