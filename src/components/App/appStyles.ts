import {makeStyles} from '@mui/styles';
import {createTheme} from '@mui/material/styles';

export const useAppStyles = makeStyles({
  title: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  layoutContainer: {
    width: '100%',
    height: '100vh',
  },
  container: {
    minHeight: '100%',
    padding: '2rem',
    borderRadius: '0 !important',
  },
  content: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    margin: 30,
  },
  smallContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  levelSelector: {
    maxWidth: '150px !important',
    marginBottom: '15px !important',
  },
  play: {
    margin: '1rem 0 !important',
    minWidth: '200px !important',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
