import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
      transform: rotate(0deg);
  }
  to{
      transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  border: 2px solid #5021a6;
  border-top: 2px solid #FFF;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;
