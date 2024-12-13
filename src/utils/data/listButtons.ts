import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const listButtons = [
  {
    id: 0,
    action: 'set_watched',
    icon: VisibilityOffIcon 
  },
  {
    id: 1,
    action: 'set_unwatched',
    icon: VisibilityIcon 
  },
  {
    id: 2,
    action: 'note',
    icon: StarIcon 
  },
  {
    id: 3,
    action: 'delete',
    icon: DeleteForeverIcon 
  },
];