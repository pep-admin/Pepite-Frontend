// Import des libs externes
import {
  Stack,
  Box,
  Avatar,
  Typography,
  Divider,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@mui/material';

// Import des composants customisés
import { Item, OrangeRating, YellowRating } from '@utils/styledComponent';

// Import des icônes
import EditNoteIcon from '@mui/icons-material/EditNote';
import ChatIcon from '@mui/icons-material/Chat';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const CriticAdvices = () => {
  return (
    <Item margintop="6px">
      <Stack height="100%">
        <Stack
          direction="row"
          height="35px"
          alignItems="center"
          justifyContent="space-between"
          padding="0 10px"
          columnGap="10px"
        >
          {/* Si conseil d'un ami */}
          {/* <Avatar
              alt="Photo de Kate"
              src="http://127.0.0.1:5173/images/kate.jpg"
              sx={{
                width: 37,
                height: 37,
                marginRight: '5px'
              }}
            /> */}
          <Typography
            variant="body2"
            component="p"
            fontWeight="bold"
            minWidth="80px"
          >
            {'Vous avez noté'}
          </Typography>
          <Box display="flex" alignItems="center" columnGap="5px">
            <OrangeRating
              value={4}
              precision={0.1}
              readOnly
              sx={{ position: 'relative', bottom: '0.5px' }}
            />
            <Typography variant="body2" component="p" fontWeight="bold">
              {'4 / 5'}
            </Typography>
          </Box>
          <Box
            minWidth="80px"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <EditNoteIcon />
          </Box>
        </Stack>
        <Divider />
        <Stack padding="7px 10px">
          <Card
            sx={{
              height: '100%',
              width: 'auto',
              boxShadow: 'none',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <Box marginBottom="7px" display="flex">
              <CardActionArea sx={{ height: '100px', width: 'auto' }}>
                <CardMedia
                  component="img"
                  height="100%"
                  image="http://127.0.0.1:5173/images/mars.jpg"
                  alt="green iguana"
                  sx={{
                    objectFit: 'contain',
                    borderRadius: '10px',
                  }}
                />
              </CardActionArea>
              <CardContent sx={{ padding: '0 12px !important', flexGrow: '1' }}>
                <Stack>
                  <Stack>
                    <Stack direction="row" alignItems="center" columnGap="10px">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        component="h5"
                        textAlign="left"
                        color="primary.dark"
                      >
                        {'Seul sur mars'}
                      </Typography>
                      <YellowRating value={4.5} precision={0.5} readOnly />
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        component="p"
                      >
                        {'4.5 / 5'}
                      </Typography>
                    </Stack>
                    <Stack direction="row">
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        component="p"
                        color="primary.dark"
                      >
                        {'Type :'}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        marginLeft="5px"
                      >
                        {'film'}
                      </Typography>
                    </Stack>
                    <Stack direction="row">
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        component="p"
                        color="primary.dark"
                      >
                        {'Genre :'}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        marginLeft="5px"
                      >
                        {'science-fiction'}
                      </Typography>
                    </Stack>
                    <Stack direction="row">
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        component="p"
                        color="primary.dark"
                      >
                        {'Année :'}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        marginLeft="5px"
                      >
                        {'2014'}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Box>
            <Stack
              direction="row-reverse"
              position="relative"
              borderRadius="10px"
              flexGrow="1"
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
                height="50px"
                padding="15px 10px 0 20px"
                display="flex"
                alignItems="center"
                flexGrow="1"
                overflow="scroll"
              >
                <Typography
                  variant="body2"
                  component="blockquote"
                  textAlign="left"
                  fontStyle="italic"
                >
                  <Typography variant="body2" component="p">
                    {'Une belle aventure martienne'}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="cite"
                    fontWeight="bold"
                  >
                    {'- Kate Austen -'}
                  </Typography>
                </Typography>
              </Box>
              <Box
                position="absolute"
                top="-12.5px"
                right="50%"
                height="25px"
                width="25px"
                borderRadius="50%"
                sx={{ backgroundColor: '#24A5A5' }}
              >
                <FormatQuoteIcon sx={{ color: '#fff' }} />
              </Box>
            </Stack>
          </Card>
        </Stack>
        <Divider />
        <Stack height="30px" padding="0 10px" flexGrow="1">
          <Box height="100%" display="flex" alignItems="center" columnGap="5px">
            <ChatIcon fontSize="small" />
            <Typography component="p" fontSize="1em" fontWeight="bold">
              {5}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Item>
  );
};

export default CriticAdvices;
