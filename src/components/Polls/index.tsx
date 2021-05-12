import { useCallback, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { Poll, BasePolls } from "@arena-im/chat-types";
import { Container } from "./styled";
import PollItem from "./PollItem";
import { useChatContext } from "state/useChatContext";

function Polls() {
  const { activeChannel, user } = useChatContext();
  const [isLoadingPolls, setIsLoadingPolls] = useState(false);
  const [pollsInstance, setPollsInstance] = useState<BasePolls | undefined>();
  const [polls, setPolls] = useState<Poll[]>([]);

  const getPolls = useCallback(async () => {
    setIsLoadingPolls(true);

    try {
      const pollsConnection = await activeChannel?.getPollsIntance(
        user?.id || ""
      );
      const loadedPolls = await pollsConnection?.loadPolls();

      setPolls(loadedPolls ?? []);
      setPollsInstance(pollsConnection);
    } catch (e) {
    } finally {
      setIsLoadingPolls(false);
    }

    setIsLoadingPolls(false);
  }, [activeChannel, user]);

  useEffect(() => {
    getPolls();
  }, [getPolls]);

  useEffect(() => {
    if (pollsInstance) {
      pollsInstance.onPollModified((receivedPoll: Poll) => {
        const updatedPolls = polls?.map(poll => {
          if (poll._id === receivedPoll._id) {
            return receivedPoll;
          }
          return poll;
        });
        setPolls(updatedPolls ?? []);
      })
    }
  }, [pollsInstance, polls]);

  const handleVote = async (optionIndex: number, pollId: string) => {
    try {
      await pollsInstance?.pollVote(pollId, optionIndex);
    } catch (e) {}
  };

  const renderPolls = () => {
    return polls.map((poll) => (
      <PollItem
        key={poll._id}
        poll={poll}
        handleVote={handleVote}
        totalVotes={poll.total}
      />
    ));
  };

  return <Container>{isLoadingPolls ? <Loader /> : renderPolls()}</Container>;
}

export default Polls;
