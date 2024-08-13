import React, {ChangeEvent, useState} from 'react';
import {Box, Button, FormControl, OutlinedInput, TextField} from '@mui/material';
import {ApiMessage} from '../../types';

interface Props {
  onSubmit: (message: ApiMessage) => void;
}

const AddMessageForm: React.FC<Props> = ({onSubmit}) => {

  const [messageData, setMessageData] = useState<ApiMessage>({
    message: '',
    author: '',
  });

  const onFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setMessageData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      ...messageData
    });
    setMessageData({
      message: '',
      author: '',
    });
  };

  return (
    <Box component="form" onSubmit={onFormSubmit}
         style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <FormControl sx={{width: '400px', marginRight: '20px'}}>
        <TextField
          name="message"
          label="Enter your message"
          required
          value={messageData.message}
          onChange={onFieldChange}
        />
      </FormControl>
      <FormControl sx={{width: '200px', marginRight: '20px'}}>
        <OutlinedInput
          name="author"
          placeholder="Enter your name"
          value={messageData.author}
          onChange={onFieldChange}
          required/>
      </FormControl>
      <Button variant="contained" type="submit">Send</Button>
    </Box>
  );
};

export default AddMessageForm;