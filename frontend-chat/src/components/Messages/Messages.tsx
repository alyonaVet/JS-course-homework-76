import {Stack} from '@mui/material';
import Message from './Message';
import {IMessage} from '../../types';
import React from 'react';

interface Props {
  messages: IMessage[];
}

const Messages: React.FC<Props> = ({messages}) => {
  return (
    <Stack spacing={2} sx={{minWidth: 12}} direction="column" alignItems="center" mt={5}>
      {messages.map((message: IMessage) => {
        return <Message
          key={message.id}
          message={message.message}
          author={message.author}
          datetime={message.datetime}
        />;
      })}
    </Stack>
  );
};

export default Messages;