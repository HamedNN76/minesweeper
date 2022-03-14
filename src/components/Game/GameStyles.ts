import {makeStyles} from '@mui/styles';

export const gameStyles = makeStyles({
  cell: {
    borderRadius: '0px !important',
    padding: '8px !important',
    height: 32,
    width: 32,
    minWidth: '32px !important',
  },
  text: {
    fontWeight: 'bold',
    margin: 0,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
