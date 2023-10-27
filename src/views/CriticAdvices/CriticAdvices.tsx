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
  Menu,
  MenuItem,
  Fade,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

// Import des composants customisés
import { Item, OrangeRating, YellowRating } from '@utils/styledComponent';

// Import des icônes
import EditNoteIcon from '@mui/icons-material/EditNote';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import AddToPhotosTwoToneIcon from '@mui/icons-material/AddToPhotosTwoTone';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';

const CriticAdvices = () => {
  // Affichage du synopsis
  const [displayOverwiew, setDisplayOverview] = useState(false);

  // Menu des outils pour modifier / supprimer
  const [displayTools, setDisplayTools] = useState(null);
  const openMenu = Boolean(displayTools);
  const handleToolsMenu = event => {
    setDisplayTools(event.currentTarget);
  };

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
            <EditNoteIcon
              sx={{ position: 'relative', left: '4px', cursor: 'pointer' }}
              onClick={handleToolsMenu}
            />
            <Menu
              id="basic-menu"
              anchorEl={displayTools}
              open={openMenu}
              onClose={() => setDisplayTools(null)}
              TransitionComponent={Fade}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
                sx: {
                  padding: '0',
                },
              }}
            >
              <Stack
                sx={{
                  backgroundColor: '#ededed',
                  padding: '5px 8px',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                }}
              >
                <MenuItem
                  onClick={() => setDisplayTools(null)}
                  sx={{ padding: '0', minHeight: 'auto' }}
                >
                  <ListItemIcon sx={{ minWidth: 'auto' }}>
                    <ModeEditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '0.8em',
                      },
                    }}
                  >
                    {'Modifier'}
                  </ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => setDisplayTools(null)}
                  sx={{ padding: '0', minHeight: 'auto' }}
                >
                  <ListItemIcon sx={{ minWidth: 'auto' }}>
                    <ClearIcon fontSize="small" sx={{ color: '#d32f2f' }} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '0.8em',
                        color: '#d32f2f',
                      },
                    }}
                  >
                    {'Supprimer'}
                  </ListItemText>
                </MenuItem>
              </Stack>
            </Menu>
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
            <Box marginBottom="7px" display="flex" flexGrow="1">
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
              <CardContent
                sx={{ padding: '0 0 0 12px !important', flexGrow: '1' }}
              >
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
                      <Stack direction="row" columnGap="5px">
                        <YellowRating
                          value={4.5}
                          precision={0.5}
                          readOnly
                          sx={{ position: 'relative', top: '1.4px' }}
                        />
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          component="p"
                        >
                          {'4.5 / 5'}
                        </Typography>
                      </Stack>
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
                    <Stack direction="row">
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        component="p"
                        color="primary.dark"
                      >
                        {'Synopsis :'}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        component="p"
                        marginLeft="5px"
                        onClick={() => setDisplayOverview(!displayOverwiew)}
                      >
                        {!displayOverwiew ? 'Afficher' : 'Masquer'}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Box>
            <Stack
              direction="row"
              flexGrow="1"
              marginBottom="7px"
              sx={{
                maxHeight: displayOverwiew ? '60px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.5s ease-in-out',
              }}
            >
              <Divider
                orientation="horizontal"
                sx={{ borderColor: 'primary.dark' }}
              />
              <Divider
                orientation="vertical"
                sx={{ borderColor: 'primary.dark' }}
              />
              <Typography
                variant="body2"
                component="p"
                align="left"
                paddingLeft="10px"
              >
                {
                  "L'astronaute Roy McBride s'aventure jusqu'aux confins du système solaire à la recherche de son père disparu et pour résoudre un mystère qui menace la survie de notre planète."
                }
              </Typography>
            </Stack>
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
          </Card>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          spacing={5}
          height="30px"
          padding="0 17px"
          flexGrow="1"
        >
          <Box height="100%" display="flex" alignItems="center" columnGap="5px">
            <ChatTwoToneIcon
              fontSize="small"
              sx={{ position: 'relative', top: '1px' }}
            />
            <Typography component="p" fontSize="1em" fontWeight="bold">
              {5}
            </Typography>
          </Box>
          <Box height="100%" display="flex" alignItems="center" columnGap="5px">
            <ThumbUpTwoToneIcon
              fontSize="small"
              sx={{ position: 'relative', bottom: '1px' }}
            />
            <Typography component="p" fontSize="1em" fontWeight="bold">
              {3}
            </Typography>
          </Box>
          <Box height="100%" display="flex" alignItems="center" columnGap="5px">
            <AddToPhotosTwoToneIcon fontSize="small" />
            <Typography component="p" fontSize="1em" fontWeight="bold">
              {'À voir'}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Item>
  );
};

export default CriticAdvices;
