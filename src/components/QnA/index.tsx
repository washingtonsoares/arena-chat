import { useChatContext } from "state/useChatContext";
import dayjs from 'dayjs';
import {
  Container,
  QuestionItem,
  ProfileArea,
  ProfileImage,
  SenderInfo,
  SenderInfoName,
  SenderInfoCreatedAt,
  QuestionArea,
  QuestionAreaTag,
  QuestionAreaText,
  QuestionAreaAnswer
} from "./styled";

function QnA() {
  const { questions } = useChatContext();

  const formatDate = (date: number) => {
   return dayjs(date).format('HH:mm');
  }

  return (
    <Container>
      {questions?.map((question) => (
        <QuestionItem key={question.key}>
          <ProfileArea>
            <ProfileImage src={question.sender?.image ?? ""} />
            <SenderInfo>
              <SenderInfoName>{question.sender.name} </SenderInfoName>
              <SenderInfoCreatedAt>{formatDate(question.createdAt)}</SenderInfoCreatedAt>
            </SenderInfo>
          </ProfileArea>
          <QuestionArea>
            <QuestionAreaText>{question.text}</QuestionAreaText>
            <QuestionAreaAnswer>
              {question.answer ? (
                <> A: {question.answer?.text ?? ""} </>
              ) : (
                <i>
                  <small>
                    Question not answered
                  </small>
                </i>
              )}
            </QuestionAreaAnswer>
          </QuestionArea>
        </QuestionItem>
      ))}
    </Container>
  );
}

export default QnA;
