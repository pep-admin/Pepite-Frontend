// Import des libs externes
import {
  Stack,
  Box,
  Typography,
  Avatar,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import PropTypes from 'prop-types';

import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const CriticAdvicesReview = ({ type, setNewCriticText, criticInfos }) => {
  function customTextArea() {
    return (
      <FormControl variant="outlined" fullWidth sx={{ height: '100%' }}>
        <InputLabel
          htmlFor="custom-outlined-input"
          sx={{ fontStyle: 'italic', overflow: 'visible' }}
        >
          {'Votre critique'}
        </InputLabel>
        <OutlinedInput
          id="custom-outlined-input"
          label={'Votre critique'}
          placeholder={'Vous pouvez rédiger une nouvelle critique'}
          multiline
          minRows={'4'}
          sx={{
            height: '60px',
            borderRadius: '0',
            fontSize: '1em',
            fontStyle: 'italic',
            '& .MuiOutlinedInput-notchedOutline': {
              borderRadius: '10px 0 0 10px',
              borderColor: '#8e8e8e6e',
            },
          }}
          inputProps={{
            sx: { height: '100% !important', borderRadius: '10px 0 0 10px' },
          }}
          onChange={e => setNewCriticText(e.target.value)}
        />
      </FormControl>
    );
  }

  return (
    <Stack
      direction="row-reverse"
      position="relative"
      borderRadius="10px"
      flexGrow="1"
      marginBottom={type === 'new-critic' ? '7px' : '0'}
      sx={{
        backgroundColor: '#ededed',
      }}
    >
      <Avatar
        variant="square"
        alt="Photo de Kate"
        src="http://127.0.0.1:5173/images/kate.jpg"
        sx={{
          width: 60,
          height: 60,
          filter: 'grayscale(1)',
        }}
      />
      <Box
        height={type === 'new-critic' ? '100%' : '50px'}
        padding={type === 'new-critic' ? '0' : '7px 10px 0 20px'}
        display="flex"
        alignItems="center"
        flexGrow="1"
        overflow={type === 'new-critic' ? 'visible' : 'scroll'}
      >
        {type === 'new-critic' ? (
          customTextArea()
        ) : (
          <Typography
            variant="body2"
            component="blockquote"
            textAlign="left"
            fontStyle="italic"
          >
            <Typography variant="body2" component="p">
              {`${criticInfos.text}`}
            </Typography>
            <Typography variant="body2" component="cite" fontWeight="bold">
              {'- Kate Austen -'}
            </Typography>
          </Typography>
        )}
      </Box>
      <Box
        position="absolute"
        top="17.5px"
        right="47.5px"
        height="25px"
        width="25px"
        borderRadius="50%"
        sx={{
          backgroundColor: '#24A5A5',
          boxShadow:
            '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
        }}
      >
        <FormatQuoteIcon sx={{ color: '#fff' }} />
      </Box>
    </Stack>
  );
};

CriticAdvicesReview.propTypes = {
  type: PropTypes.string.isRequired,
  setNewCriticText: PropTypes.func.isRequired,
  criticInfos: PropTypes.array.isRequired,
};

export default CriticAdvicesReview;
