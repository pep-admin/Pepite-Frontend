import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BlockIcon from '@mui/icons-material/Block';
import PendingIcon from '@mui/icons-material/Pending';

export const contactsActionButtons = [
  {
    id: 0,
    action: 'friendship',
    colorDisabled: '#808080',
    colorEnabled: '#E7AE1A',
    iconFalse: PersonAddIcon,
    iconTrue: PendingIcon
  },
  {
    id: 1,
    action: 'followed',
    colorDisabled: '#808080',
    colorEnabled: '#24A5A5',
    iconFalse: BookmarkIcon,
    iconTrue: BookmarkIcon
  },
  {
    id: 2,
    action: 'blocked',
    colorDisabled: '#808080',
    colorEnabled: '#B0241A',
    iconFalse: BlockIcon,
    iconTrue: BlockIcon
  }
]