import { PollContainer, PollOption, PollQuestion, ProgressBar } from './styled'
import { Poll } from '@arena-im/chat-types';
import map from 'lodash.map';

type Props = {
  poll: Poll;
  totalVotes: number;
  handleVote: (optionIndex: number, pollId: string) => void; // TODO: Add PollOption type
}

function PollItem({ poll, handleVote, totalVotes }: Props) {
  const getFormattedPercentage = (optionTotal: number) => {
    const result = (optionTotal / totalVotes) * 100;
    return result.toFixed(1);
  }

  return (
    <PollContainer>
      <PollQuestion>
        {poll.question}
      </PollQuestion>
      {map(poll.options, (option, index) => (
        <PollOption key={index} onClick={() => handleVote(index, poll._id)}>
          <ProgressBar progress={getFormattedPercentage(option.total)} />
          {option.name}
          {poll.currentUserVote !== undefined && (
            <span>
              {getFormattedPercentage(option.total)}%
            </span>
          )}
        </PollOption>
      ))}
    </PollContainer>
  )
}

export default PollItem
