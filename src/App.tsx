import ChatWidget from "./ChatWidget";
import { ChatContainer, ChatFeedWrapper } from "./styled";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Polls from "components/Polls";
import ChatContextProvider from "state/ChatContext";
import QnA from "components/QnA";

function App() {
  return (
    <ChatContextProvider>
      <ChatContainer>
        <ChatFeedWrapper>
          <Tabs>
            <TabList>
              <Tab>Chat</Tab>
              <Tab>Polls</Tab>
              <Tab>Q&A</Tab>
            </TabList>
            <TabPanel>
              <ChatWidget />
            </TabPanel>
            <TabPanel>
              <Polls />
            </TabPanel>
            <TabPanel>
              <QnA />
            </TabPanel>
          </Tabs>
        </ChatFeedWrapper>
      </ChatContainer>
    </ChatContextProvider>
  );
}

export default App;
