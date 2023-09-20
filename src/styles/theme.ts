import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: 'Nixie One',
    },
    h2: {
      fontFamily: 'Pragati Narrow',
      fontWeight: 'normal',
    },
    body1: {
      fontFamily: 'Pragati Narrow',
      fontWeight: 'normal',
      fontSize: '1.2em',
    },
  },
  palette: {
    primary: {
      // Bleu/vert clair
      main: '#24A5A5',
    },
    secondary: {
      // Orange
      main: '#F29E50',
      contrastText: '#fff',
    },
    // background: {
    //   paper: '#ffffff',
    //   default: '#0E6666',
    // },
    a_renommer: {
      main: '#0E6666',
      light: '#24A5A5',
      dark: '#094B4B',
      // contrastText: '#242105', TODO
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: '15px',
        },
      },
    },
    // Couleur des inputs lors du survol
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: '2px solid #24A5A5',
          },
        },
      },
    },
    // Propriétés du label à l'intérieur des inputs
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#8E8E8E',
          top: '-5px',
          fontSize: '1.1em',
        },
      },
    },
    // Hauteur des inputs
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: '45px',
        },
      },
    },
    // Couleur et arrondi des inputs
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#8E8E8E',
          borderRadius: '10px',
        },
        input: {
          color: '#8E8E8E',
        },
      },
    },
    // Propriétés des boutons
    MuiButton: {
      styleOverrides: {
        root: {
          height: '40px',
          borderRadius: '10px',
          fontSize: '1em',
          fontWeight: 'bold',
          padding: '8px 25px',
        },
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    a_renommer: Palette['primary'];
  }

  interface PaletteOptions {
    a_renommer?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Container' {
  interface ContainerPropsColorOverrides {
    a_renommer: true;
  }
}
declare module '@mui/material/Box' {
  interface BoxPropsColorOverrides {
    a_renommer: true;
  }
}
declare module '@mui/material/Stack' {
  interface StackPropsColorOverrides {
    a_renommer: true;
  }
}

export default theme;
