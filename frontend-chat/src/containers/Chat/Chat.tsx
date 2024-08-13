import {useEffect, useState} from 'react';
import {ApiMessage, IMessage} from '../../types';
import {Backdrop, Box, CircularProgress} from '@mui/material';
import AddMessageForm from '../../components/AddMessageForm/AddMessageForm';
import Messages from '../../components/Messages/Messages';
import axiosApi from '../../axiosApi';

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [lastMessage, setLastMessage] = useState<IMessage | null>(null);
  const [preload, setPreload] = useState<boolean>(false);


  const getMessages = async () => {
    try {
      setPreload(true);
      const lastMessageDatetime = lastMessage ? `?datetime=${lastMessage.datetime}` : '';
      const url = `/messages${lastMessageDatetime}`;

      const {data: newMessages} = await axiosApi.get<IMessage[]>(url);

      if (newMessages.length > 0) {
        const latestFirstMessages = [...newMessages, ...messages].sort(
          (a: IMessage, b: IMessage) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
        );
        setMessages(latestFirstMessages);
        setLastMessage(latestFirstMessages[0]);
      }

    } catch (error) {
      console.error('Failed to get messages:', error);
    } finally {
      setPreload(false);
    }
  };

  const createMessage = async (messageData: ApiMessage) => {
    try {
      await axiosApi.post('/messages', messageData);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  useEffect(() => {
    void getMessages();
  }, []);

  useEffect(() => {
    const interval = setInterval(getMessages, 3000);
    return () => clearInterval(interval);
  }, [lastMessage]);

  return (
    <Box component="main" my={3}>
      <AddMessageForm onSubmit={createMessage}/>
      <Messages messages={messages}/>
      <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={preload}>
        <CircularProgress color="inherit"/>
      </Backdrop>
    </Box>
  );
};

export default Chat;