import { createTheme } from '@mui/material/styles';

const theme = createTheme({

  spacing: factor => `${factor * 6}px`,

  typography: {
    allVariants: {
      letterSpacing: '0.03em',
      fontFamily: 'Pragati Narrow',
    },
    h1: {
      fontFamily: 'Nixie One',
    },
    body1: {
      fontFamily: 'Pragati Narrow',
      fontWeight: 'normal',
      fontSize: '1.2em',
    },
    body2: {
      fontFamily: 'Pragati Narrow',
      fontWeight: 'normal',
      fontSize: '0.9em',
    },
  },
  palette: {
    primary: {
      // Bleu/vert clair
      main: '#24A5A5',
      dark: '#0E6666',
    },
    secondary: {
      // Orange
      main: '#F29E50',
      contrastText: '#FEFEFE',
    },
    form: {
      main: '#0E6666',
      light: '#24A5A5',
      dark: '#094B4B',
      // contrastText: '#242105', TODO
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h3', component: 'span', className: 'brand-font' },
          style: {
            fontFamily: 'Nixie One',
          },
        },
      ],
      styleOverrides: {
        gutterBottom: {
          marginBottom: '20px',
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
        filled: {
          "&.MuiInputLabel-filled": {
            fontSize: '0.95em',
            top: '-7px'
          }
        }
      },
    },
    // Hauteur des inputs
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            backgroundClip: 'text', // Supprime le fond blanc par défaut de l'autocomplétion
            WebkitTextFillColor: '#8E8E8E', // Couleur du texte de l'autocomplétion
            caretColor: '#8E8E8E', // Couleur du curseur vertical
            animationName: 'onAutoFillStart', // Permet de capturer l'évènement d'autocomplétion
          },
          '&.auto-fill-state:not(:-webkit-autofill)': {
            animationName: 'onAutoFillCancel',
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          height: '30px',
          borderRadius: '10px',
          '&::before': {
            width: 'calc(100% - 17px)',
            left: '50%',
            transform: 'translateX(-50%)',
            borderBottom: 'none !important'
          },
          '&::after': {
            width: 'calc(100% - 17px)',
            left: '50%',
            transform: 'scaleX(0) translateX(-50%)',
          },
          '&.Mui-focused::after': { 
            width: 'calc(100% - 17px)',
            left: '50%',
            transform: 'scaleX(1) translateX(-50%)',
          },
        },

        input: {
          position: 'relative',
          bottom: '2px',
          height: '5px' // Diminue la taille pour réduire le curseur d'insertion clignotant
        }
      },
    },
    // Couleur et arrondi des inputs
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: '45px',
        },
        notchedOutline: {
          borderColor: '#8E8E8E',
          borderRadius: '10px',
        },
        input: {
          color: '#8E8E8E',
          padding: '16.5px 0px 16.5px 14px',
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
    MuiList: {
      styleOverrides: {
        root: {
          listStyleType: 'disc',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          display: 'list-item',
          paddingLeft: '10px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0E6666'
        }
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 3, 
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            padding: "16px",
          },
        },
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    form: Palette['primary'];
  }

  interface PaletteOptions {
    form?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Container' {
  interface ContainerPropsColorOverrides {
    form: true;
  }
}
declare module '@mui/material/Box' {
  interface BoxPropsColorOverrides {
    form: true;
  }
}
declare module '@mui/material/Stack' {
  interface StackPropsColorOverrides {
    form: true;
  }
}

export default theme;
