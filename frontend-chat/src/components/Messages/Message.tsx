import {Box, Typography} from '@mui/material';
import React from 'react';
import dayjs from 'dayjs';

interface Props {
  message: string;
  author: string;
  datetime: string;
}

const Message: React.FC<Props> = ({message, author, datetime}) => {
  return (
    <Box component="section" sx={{
      border: '1px solid grey',
      borderRadius: '8px',
      padding: '16px',
      width: '660px',
    }}>
      <Typography variant="h6" component="p">
        {author}
      </Typography>
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2}}>
        <Typography variant="body2" component="p" sx={{flex: 1}}>
          {message}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ml: 2}}>
          {dayjs(datetime).format('DD.MM.YYYY HH:mm:ss')}
        </Typography>
      </Box>
    </Box>
  );
};

export default Message;