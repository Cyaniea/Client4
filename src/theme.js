import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B4513', // Warna coklat untuk header
      light: '#A0522D',
      dark: '#6B3E11',
    },
    secondary: {
      main: '#FFA07A', // Warna salmon muda untuk aksen
    },
    background: {
      default: '#FFF5E6', // Warna krem muda untuk background
    },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 400,
    },
    button: {
      textTransform: 'none', // Menghilangkan huruf kapital otomatis pada tombol
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Tombol dengan sudut yang lebih lembut
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#8B4513', // Warna default untuk AppBar
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
