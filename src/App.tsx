import ChatWidget from "./ChatWidget";
import { ChatContainer, ChatFeedWrapper } from "./styled";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Polls from "components/Polls";
import ChatContextProvider from "state/ChatContext";

function App() {
  return (
    <ChatContextProvider>
      <ChatContainer>
        <ChatFeedWrapper>
          <Tabs>
            <TabList>
              <Tab>Chat</Tab>
              <Tab>Polls</Tab>
            </TabList>
            <TabPanel>
              <ChatWidget />
            </TabPanel>
            <TabPanel>
              <Polls />
            </TabPanel>
          </Tabs>
        </ChatFeedWrapper>
      </ChatContainer>
    </ChatContextProvider>
  );
}

export default App;
