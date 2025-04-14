import { Drawer } from '@mui/material';

const ProfilModifyPics = ({ showPicModifier, setShowPicModifier }) => {
  return (
    <Drawer
      anchor={'bottom'}
      open={showPicModifier.show}
      onClose={() => setShowPicModifier({ show: false, type: '' })}
    >
      modif
    </Drawer>
  );
};

export default ProfilModifyPics;