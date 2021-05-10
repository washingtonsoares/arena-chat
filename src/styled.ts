import styled from 'styled-components';

export const ChatContainer = styled.div`
  margin: 0 auto;
  margin-top: 100px;
`;

export const ChatFeedWrapper = styled.div`
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  max-width: 450px;
  margin: 0 auto;
  padding-bottom: 20px;
`;

export const Form = styled.form`
  padding: 30px 15px;
`;

export const InputMessage = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  border-radius: 10px;

  &:focus {
    outline: none;
  }
`;
