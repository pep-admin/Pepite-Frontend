// Icônes amitié
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneIcon from '@mui/icons-material/Done';

// Autres icônes
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BlockIcon from '@mui/icons-material/Block';
import ClearIcon from '@mui/icons-material/Clear';

export const friendshipButtons = [
  {
    id: 0,
    action: 'send',
    color: '#4d4d4d',
    icon: PersonAddIcon, // Demander en ami
  },
  {
    id: 1,
    action: 'accept',
    color: 'green',
    icon: DoneIcon, // Validation de la demande reçue
  },
  {
    id: 2,
    action: 'cancel',
    color: '#aa9a70',
    icon: AccessTimeIcon, // Acceptation en attente
  },
  {
    id: 3,
    action: 'remove',
    color: '#4d4d4d',
    icon: ClearIcon,
  },
  {
    id: 4,
    action: 'decline',
    color: '#4d4d4d',
    icon: ClearIcon,
  },
];

export const otherButtons = [
  {
    id: 0,
    action: 'follow',
    color: '#4d4d4d',
    icon: BookmarkIcon,
  },
  {
    id: 1,
    action: 'unfollow',
    color: '#24A5A5',
    icon: BookmarkIcon,
  },
  {
    id: 2,
    action: 'block',
    color: '#4d4d4d',
    colorEnabled: '#B0241A',
    icon: BlockIcon,
  },
  {
    id: 3,
    action: 'unblock',
    color: '#B0241A',
    icon: BlockIcon,
  },
];
