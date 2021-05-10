import styled from "styled-components";

export const Container = styled.div`
  padding: 15px;
`;

export const PollContainer = styled.div`
  margin-bottom: 16px;
  border: 1px solid rgb(224, 230, 232);
  box-shadow: rgb(44 44 82 / 10%) 0px 2px 4px;
  border-radius: 4px;
  padding: 15px;
`;

export const PollQuestion = styled.h3``

export const PollOption = styled.div`
  border-radius: 4px;
  background-color: transparent;
  border: 1px solid rgb(241, 243, 246);
  box-shadow: rgb(74 74 74 / 16%) 0px 2px 4px;
  padding: 0px 12px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;


  &:hover {
    background-color: #FFF;
    opacity: 0.9;
    cursor: pointer;
    font-weight: bold;
  }
`;

type ProgressBarProps = {
  progress: string;
}

export const ProgressBar = styled.div<ProgressBarProps>`
  background-color: #98cff1;
  width: ${({ progress }) => `${progress}%`};
  position: absolute;
  height: 40px;
  left: 0;
  border-radius: 4px;
  opacity: 0.3;
`;

