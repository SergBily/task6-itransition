import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Message from './message/Message';

const InboxMessages = () => {
  const vv = 0;
  console.log(vv);

  return (
    <div>
      <Accordion sx={{ backgroundColor: 'transparent', border: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ color: '#fff', fontSize: '1.5rem' }}>INBOX</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Message title="hello my friend. Do you how i like you" />
            <Message title="HEllo" />
            <Message title="hello my friend. Do you how i like you" />
            <Message title="hello my friend. Do you how i like you" />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default InboxMessages;