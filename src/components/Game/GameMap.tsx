import React, {useMemo} from 'react';
import {Button, ButtonProps} from '@mui/material';
import {gameStyles} from './GameStyles';

export type GameMapProps = {
  square: string;
  onClick: ButtonProps['onClick'];
  testId: string;
};

export function GameMap(props: GameMapProps) {
  const {square, onClick, testId} = props;
  const classes = gameStyles();

  const color = useMemo<ButtonProps['color']>(() => {
    if (square === '□') {
      return 'primary';
    }
    if (square === '*') {
      return 'error';
    }
    return 'success';
  }, [square]);

  return (
    <Button
      variant="outlined"
      color={color}
      onClick={onClick}
      className={classes.cell}
      data-testid={testId}
    >
      <span className={classes.text}>{square !== '□' ? square : ''}</span>
    </Button>
  );
}
